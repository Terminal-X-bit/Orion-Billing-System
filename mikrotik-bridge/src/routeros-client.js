// RouterOS binary API protocol client (MikroTik API service, port 8728/8729).
// Zero external dependencies: implements the raw word-length-prefixed sentence
// protocol documented at https://help.mikrotik.com/docs/display/ROS/API
//
// Sentence grammar:
//   - Each word is length-prefixed (1 byte < 128, 0x80+n bytes up to 4 length
//     bytes for larger words, 0x00 terminates the sentence).
//   - Commands look like: "/ip/hotspot/active/print", "=key=value", "?query".
//   - Replies start with !re (row), !done (end), !trap (error), !fatal (fatal).

const net = require('net')
const tls = require('tls')
const crypto = require('crypto')
const { EventEmitter } = require('events')

const CONTINUATION = 0x80
// (first & 0xc0) === CONTINUATION  -> two length bytes
// (first & 0xe0) === 0xc0          -> three length bytes
// otherwise (0xe0 prefix)          -> four length bytes

function encodeLength(len) {
  if (len < CONTINUATION) return Buffer.from([len])
  if (len < 0x4000) {
    const v = len | (CONTINUATION << 8)
    return Buffer.from([(v >> 8) & 0xff, v & 0xff])
  }
  if (len < 0x200000) {
    const v = len | (0xc0 << 16)
    return Buffer.from([(v >> 16) & 0xff, (v >> 8) & 0xff, v & 0xff])
  }
  if (len >= 1 << 28) throw new Error(`RouterOS word too large: ${len} bytes`)
  const v = len | (0xe0 << 24)
  return Buffer.from([(v >> 24) & 0xff, (v >> 16) & 0xff, (v >> 8) & 0xff, v & 0xff])
}

function encodeWord(word) {
  const buf = Buffer.from(word, 'utf8')
  return Buffer.concat([encodeLength(buf.length), buf])
}

const EMPTY = Buffer.from([0x00])

class RouterOsClient extends EventEmitter {
  constructor({ host, port = 8728, user, password, tls: useTls = false, timeoutMs = 10000 }) {
    super()
    this.host = host
    this.port = Number(port) || 8728
    this.user = user
    this.password = password
    this.useTls = !!useTls
    this.timeoutMs = Number(timeoutMs) || 10000
    this.socket = null
    this.connected = false
    this.pending = Buffer.alloc(0)
    this.buffer = Buffer.alloc(0)
    this.doneWaiters = [] // { resolve, reject, rows, trap, timer }
    this.fatal = null
    this.queueTail = null // serializes commands: RouterOS replies strictly in order
  }

  _readLengthAt(offset) {
    // Returns { value, bytes } or null when more bytes are needed.
    const buf = this.buffer
    if (offset >= buf.length) return null
    const first = buf[offset]
    if (first < CONTINUATION) return { value: first, bytes: 1 }
    if ((first & 0xc0) === CONTINUATION) {
      if (offset + 2 > buf.length) return null
      return { value: ((first & 0x3f) << 8) | buf[offset + 1], bytes: 2 }
    }
    if ((first & 0xe0) === 0xc0) {
      if (offset + 3 > buf.length) return null
      return {
        value: ((first & 0x1f) << 16) | (buf[offset + 1] << 8) | buf[offset + 2],
        bytes: 3,
      }
    }
    if (offset + 4 > buf.length) return null
    return {
      value:
        ((first & 0x0f) << 24) |
        (buf[offset + 1] << 16) |
        (buf[offset + 2] << 8) |
        buf[offset + 3],
      bytes: 4,
    }
  }

  /**
   * Try to read exactly one complete sentence from the head of the buffer.
   * Returns { words, bytes } or null when the sentence is still incomplete.
   */
  _tryReadSentence() {
    const buf = this.buffer
    const words = []
    let offset = 0
    for (;;) {
      const len = this._readLengthAt(offset)
      if (!len) return null
      if (len.value === 0) {
        // Empty word terminates the sentence.
        this.buffer = buf.slice(offset + len.bytes)
        return { words, bytes: offset + len.bytes }
      }
      const start = offset + len.bytes
      if (start + len.value > buf.length) return null
      words.push(buf.slice(start, start + len.value).toString('utf8'))
      offset = start + len.value
    }
  }

  _handleData(chunk) {
    if (this.pending.length) {
      this.buffer = Buffer.concat([this.pending, this.buffer])
      this.pending = Buffer.alloc(0)
    }
    this.buffer = Buffer.concat([this.buffer, chunk])
    for (;;) {
      const sentence = this._tryReadSentence()
      if (!sentence) break
      this._handleSentence(sentence.words)
    }
    if (this.buffer.length) {
      // Stage the incomplete tail so a later reset starts from a clean frame.
      this.pending = Buffer.from(this.buffer)
      this.buffer = Buffer.alloc(0)
    }
  }

  _handleSentence(words) {
    const type = words[0]
    if (type === '!fatal') {
      this.fatal = words.slice(1).join(' ')
      this._cleanup()
      return
    }
    if (type === '!re' || type === '!trap') {
      const row = {}
      for (const word of words.slice(1)) {
        if (word.startsWith('=')) {
          const eq = word.indexOf('=', 1)
          const key = word.slice(1, eq === -1 ? undefined : eq)
          row[key] = eq === -1 ? '' : word.slice(eq + 1)
        }
      }
      // FIFO routing: RouterOS answers commands strictly in the order they
      // were written (a command's full reply is sent before the next one
      // starts), and writeSentence serializes writes, so rows always belong
      // to the oldest unsettled waiter.
      const waiter = this.doneWaiters[0]
      if (!waiter) return
      if (type === '!re') waiter.rows.push(row)
      else waiter.trap = waiter.trap || row.message || 'RouterOS error'
      return
    }
    if (type === '!done') {
      const waiter = this.doneWaiters.shift()
      if (!waiter) return
      clearTimeout(waiter.timer)
      // !done can carry trailing attributes: =ret=<challenge> for legacy
      // login, =ret=<new .id> after /add. Parse them like !re rows.
      if (words.length > 1) {
        const row = {}
        for (const word of words.slice(1)) {
          if (word.startsWith('=')) {
            const eq = word.indexOf('=', 1)
            const key = word.slice(1, eq === -1 ? undefined : eq)
            row[key] = eq === -1 ? '' : word.slice(eq + 1)
          }
        }
        waiter.rows.push(row)
      }
      if (waiter.trap) waiter.reject(new Error(waiter.trap))
      else waiter.resolve(waiter.rows)
    }
  }

  connect() {
    if (this.connected || this.socket) {
      return Promise.reject(new Error('RouterOS client already connected'))
    }
    return new Promise((resolve, reject) => {
      let settled = false
      const fail = (err) => {
        if (settled) return
        settled = true
        this._cleanup()
        reject(err)
      }

      const onError = (err) =>
        fail(new Error(`RouterOS connect failed (${this.host}:${this.port}): ${err.message}`))

      const onTimeout = () =>
        fail(new Error(`RouterOS connect/login timed out after ${this.timeoutMs}ms (${this.host}:${this.port})`))

      const loginTimer = setTimeout(onTimeout, this.timeoutMs)

      const socket = this.useTls
        ? tls.connect({ host: this.host, port: this.port, rejectUnauthorized: false })
        : net.connect({ host: this.host, port: this.port })
      this.socket = socket

      socket.once('error', onError)
      socket.once(this.useTls ? 'secureConnect' : 'connect', () => {
        this.connected = true
        this.pending = Buffer.alloc(0)
        this.buffer = Buffer.alloc(0)
        socket.on('data', (d) => {
          try {
            this._handleData(d)
          } catch (err) {
            this.emit('error', err)
          }
        })
        socket.on('error', (err) => {
          this.connected = false
          this.emit('error', err)
        })
        socket.on('close', () => {
          this.connected = false
          this.emit('close')
        })

        // Modern RouterOS (6.43+) accepts plaintext name/password in one
        // sentence; older firmware needs the MD5 challenge/response dance.
        this._login()
          .then(() => {
            clearTimeout(loginTimer)
            settled = true
            resolve(this)
          })
          .catch((err) => {
            clearTimeout(loginTimer)
            fail(new Error(`RouterOS login failed for ${this.user}@${this.host}: ${err.message}`))
          })
      })
    })
  }

  /**
   * Log in: try the modern one-sentence login first, then fall back to the
   * legacy challenge/response MD5 handshake used by RouterOS < 6.43.
   */
  async _login() {
    try {
      await this.writeSentence('/login', `=name=${this.user}`, `=password=${this.password}`)
      return { mode: 'plaintext' }
    } catch (plainErr) {
      try {
        // Legacy handshake: bare /login makes the router reply !done with
        // =ret=<challenge>; respond with 00 + md5(0x00 + password + challenge).
        const challengeRows = await this.writeSentence('/login')
        const challengeHex = challengeRows[0] && challengeRows[0].ret
        if (!challengeHex) throw new Error('router returned no login challenge')
        const md5 = crypto.createHash('md5')
        md5.update(
          Buffer.concat([
            Buffer.from([0x00]),
            Buffer.from(this.password, 'utf8'),
            Buffer.from(challengeHex, 'utf8'),
          ])
        )
        await this.writeSentence('/login', `=name=${this.user}`, `=response=00${md5.digest('hex')}`)
        return { mode: 'md5' }
      } catch (legacyErr) {
        throw new Error(`${plainErr.message} (legacy MD5 fallback also failed: ${legacyErr.message})`)
      }
    }
  }

  /**
   * Write one command sentence and resolve with its reply.
   * Commands are serialized through an internal queue so a caller using
   * Promise.all can never interleave replies (the RouterOS API is not
   * multiplexed). A timed-out command kills the connection, because its late
   * reply would otherwise be misattributed to the next queued command.
   */
  writeSentence(command, ...words) {
    const attempt = () =>
      new Promise((resolve, reject) => {
        if (!this.connected || !this.socket) {
          reject(new Error('RouterOS socket not connected'))
          return
        }
        const waiter = { rows: [], trap: null, resolve, reject, timer: null }
        this.doneWaiters.push(waiter)
        const buf = Buffer.concat([
          encodeWord(command),
          ...words.filter((w) => w !== undefined && w !== null).map(encodeWord),
          EMPTY,
        ])
        this.socket.write(buf)
        waiter.timer = setTimeout(() => {
          const idx = this.doneWaiters.indexOf(waiter)
          if (idx !== -1) this.doneWaiters.splice(idx, 1)
          reject(new Error(`RouterOS command "${command}" timed out after ${this.timeoutMs}ms`))
          // The reply may still arrive; tear down so it cannot poison the
          // next command's reply stream.
          this._cleanup()
        }, this.timeoutMs)
      })
    const prev = this.queueTail || Promise.resolve()
    const result = prev.then(attempt, attempt)
    this.queueTail = result.catch(() => {})
    return result
  }

  /** Run a command and return all !re rows (resolves on !done). */
  run(command, words = []) {
    return this.writeSentence(command, ...words)
  }

  _cleanup() {
    this.connected = false
    const err = new Error(this.fatal ? `RouterOS fatal: ${this.fatal}` : 'RouterOS connection closed')
    for (const w of this.doneWaiters) {
      clearTimeout(w.timer)
      w.reject(err)
    }
    this.doneWaiters = []
    this.pending = Buffer.alloc(0)
    this.buffer = Buffer.alloc(0)
    if (this.socket) {
      const socket = this.socket
      this.socket = null
      try { socket.destroy() } catch (_) { /* noop */ }
    }
  }

  close() {
    this._cleanup()
  }
}

/** Open, login, run fn(client), and always close in one call. */
async function withRouterConnection(cfg, fn) {
  const client = new RouterOsClient(cfg)
  try {
    await client.connect()
    return await fn(client)
  } finally {
    client.close()
  }
}

module.exports = { RouterOsClient, withRouterConnection, encodeWord, encodeLength }
