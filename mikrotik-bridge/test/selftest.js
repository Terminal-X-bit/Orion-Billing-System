// Pure-logic self-tests for the bridge (no network or router required).
// Run: node test/selftest.js
const assert = require('assert')
const { RouterOsClient, encodeWord } = require('../src/routeros-client')
const provisioning = require('../src/provisioning')
const { makeClient } = require('../src/supabase-rest')
const {
  timestampFor,
  normalizePhone,
  makeDarajaClient,
  parseStkCallback,
} = require('../src/daraja')
const { generateVoucherCode, VOUCHER_ALPHABET } = require('../src/voucher-codes')

// ---------------------------------------------------------------------------
// RouterOS sentence framing
// ---------------------------------------------------------------------------

const enc = require('../src/routeros-client')
{
  const { encodeLength } = enc
  assert.deepStrictEqual([...encodeLength(0x00)], [0x00])
  assert.deepStrictEqual([...encodeLength(0x7f)], [0x7f])
  // 0x80 -> 0x80 0x80 per MikroTik encoding
  assert.deepStrictEqual([...encodeLength(0x80)], [0x80, 0x80])
  assert.deepStrictEqual([...encodeLength(0x3fff)], [0xbf, 0xff])
  // 0x4000 -> three-byte form
  assert.deepStrictEqual([...encodeLength(0x4000)], [0xc0, 0x40, 0x00])
  // 0x200000 -> four-byte form
  assert.deepStrictEqual([...encodeLength(0x200000)], [0xe0, 0x20, 0x00, 0x00])
  assert.throws(() => encodeLength(1 << 28))
}

// encodeWord round-trip through the parser
{
  const client = new RouterOsClient({ host: '1.2.3.4', user: 'u', password: 'p' })
  const word = 'hello=world'
  const buf = encodeWord(word)
  assert.strictEqual(buf[0], word.length)
  assert.strictEqual(buf.slice(1).toString('utf8'), word)

  // Feed a full reply sentence and confirm the parser emits it.
  const reply = Buffer.concat([
    encodeWord('!re'),
    encodeWord('=name=test-user'),
    encodeWord('=bytes-in=12345'),
    Buffer.from([0x00]),
  ])
  client.buffer = Buffer.concat([client.buffer, reply])
  const sentence = client._tryReadSentence()
  assert.ok(sentence, 'sentence should parse')
  assert.deepStrictEqual(sentence.words, ['!re', '=name=test-user', '=bytes-in=12345'])
  assert.strictEqual(client.buffer.length, 0, 'buffer fully consumed')

  // Split delivery: feed one byte at a time; parse only at the end.
  client.buffer = Buffer.alloc(0)
  for (const b of reply) client.buffer = Buffer.concat([client.buffer, Buffer.from([b])])
  const split = client._tryReadSentence()
  assert.ok(split, 'sentence should parse after byte-by-byte delivery')
  assert.strictEqual(split.words.length, 3)
}

// Multi-sentence stream parsing + word > 127 bytes (2-byte length prefix)
{
  const client = new RouterOsClient({ host: '1.2.3.4', user: 'u', password: 'p' })
  const longWord = 'x'.repeat(200)
  const stream = Buffer.concat([
    encodeWord('!re'),
    encodeWord(`=data=${longWord}`),
    Buffer.from([0x00]),
    encodeWord('!done'),
    Buffer.from([0x00]),
  ])
  client.buffer = stream
  const first = client._tryReadSentence()
  assert.strictEqual(first.words[0], '!re')
  assert.strictEqual(first.words[1], `=data=${longWord}`)
  const second = client._tryReadSentence()
  assert.deepStrictEqual(second.words, ['!done'])
}

// !trap parsing via _handleSentence
{
  const client = new RouterOsClient({ host: '1.2.3.4', user: 'u', password: 'p' })
  const waiter = { rows: [], trap: null, resolve: () => {}, reject: (e) => waiter.err = e, timer: null }
  client.doneWaiters.push(waiter)
  client._handleSentence(['!trap', '=message=bogus command'])
  assert.strictEqual(waiter.trap, 'bogus command')
  client._handleSentence(['!done'])
  assert.strictEqual(waiter.err.message, 'bogus command')
}

// ---------------------------------------------------------------------------
// Provisioning mappings
// ---------------------------------------------------------------------------

assert.strictEqual(provisioning.durationToUptime('24 Hours'), '1d')
assert.strictEqual(provisioning.durationToUptime('1 Hour'), '1h')
assert.strictEqual(provisioning.durationToUptime('7 Days'), '7d')
assert.strictEqual(provisioning.durationToUptime('30 Days'), '30d')
assert.strictEqual(provisioning.durationToUptime('1 hour'), '1h')
assert.strictEqual(provisioning.durationToUptime('48 hours'), '2d')
assert.strictEqual(provisioning.durationToUptime('90 minutes'), '1h30m')
assert.strictEqual(provisioning.durationToUptime('2 Weeks'), '14d')
assert.strictEqual(provisioning.durationToUptime('1 Month'), '30d')
assert.strictEqual(provisioning.durationToUptime('', 3600), '1h')

assert.strictEqual(provisioning.speedToRateLimit('20 Mbps'), '20M/20M')
assert.strictEqual(provisioning.speedToRateLimit('50 Mbps Turbo'), '50M/50M')
assert.strictEqual(provisioning.speedToRateLimit('1 Gbps'), '1000M/1000M')
assert.strictEqual(provisioning.speedToRateLimit('mystery'), '10M')
assert.strictEqual(provisioning.speedToRateLimit(''), '10M')

assert.strictEqual(provisioning.dataQuotaToBytes('5 GB'), 5 * 1024 ** 3)
assert.strictEqual(provisioning.dataQuotaToBytes('500 MB'), 500 * 1024 ** 2)
assert.strictEqual(provisioning.dataQuotaToBytes('Unlimited'), null)
assert.strictEqual(provisioning.dataQuotaToBytes('Unlimited Shared'), null)
assert.strictEqual(provisioning.dataQuotaToBytes(''), null)
assert.strictEqual(provisioning.dataQuotaToBytes(null), null)

assert.strictEqual(provisioning.profileNameFor({ name: '1 Hour Unlimited Rush' }), 'orion-1-hour-unlimited-rush')
assert.strictEqual(
  provisioning.profileNameFor({ name: 'Family & Team 4-Devices 30d Unlimited', mikrotik_profile: 'family-4d' }),
  'family-4d'
)
assert.strictEqual(provisioning.sharedUsersFor({ device_limit: 4 }), '4')
assert.strictEqual(provisioning.sharedUsersFor({ device_limit: 0 }), '1')
assert.strictEqual(provisioning.sharedUsersFor({}), '1')

// Voucher TTL
{
  const now = Date.now()
  const ttl = provisioning.voucherTtlSeconds({ expires_at: new Date(now + 90_000).toISOString() })
  assert.ok(ttl >= 88 && ttl <= 90, `ttl should be ~90s, got ${ttl}`)
  assert.strictEqual(provisioning.voucherTtlSeconds({ expires_at: new Date(now - 1000).toISOString() }), 0)
  assert.strictEqual(provisioning.voucherTtlSeconds({ expires_at: null }), null)
  assert.strictEqual(provisioning.voucherTtlSeconds({}), null)
}

// ---------------------------------------------------------------------------
// Supabase REST client URL building (fetch is stubbed)
// ---------------------------------------------------------------------------

{
  const calls = []
  const realFetch = global.fetch
  global.fetch = async (url, opts) => {
    calls.push({ url: String(url), opts })
    return { ok: true, status: 200, text: async () => JSON.stringify([{ id: 'x1' }]) }
  }
  const db = makeClient({ url: 'https://abc.supabase.co/', serviceKey: 'sk' })

  db.select('vouchers', { columns: 'id,code', filters: { mikrotik_user_synced: 'eq.false', expired_at: 'is.null' }, limit: 5 })
  db.insert('audit_logs', [{ action: 'x' }])
  db.update('packages', { id: 'eq.p1' }, { synced_to_router: true })
  db.updateQuietly('stk_requests', { id: 'eq.s1' }, { provisioned_at: 'now' })

  assert.strictEqual(calls.length, 4)
  assert.strictEqual(
    calls[0].url,
    'https://abc.supabase.co/rest/v1/vouchers?select=id%2Ccode&mikrotik_user_synced=eq.false&expired_at=is.null&limit=5'
  )
  assert.strictEqual(calls[0].opts.headers.apikey, 'sk')
  assert.strictEqual(calls[1].opts.method, 'POST')
  assert.strictEqual(calls[1].opts.headers.Prefer, 'return=representation')
  assert.strictEqual(calls[2].opts.method, 'PATCH')
  assert.strictEqual(calls[3].opts.headers.Prefer, undefined)
  assert.deepStrictEqual(JSON.parse(calls[2].opts.body), { synced_to_router: true })

  // Error path
  global.fetch = async () => ({ ok: false, status: 401, text: async () => 'nope' })
  assert.rejects(() => db.select('vouchers', {}), /HTTP 401/)

  global.fetch = realFetch
}

// ---------------------------------------------------------------------------
// Daraja (M-Pesa) helpers
// ---------------------------------------------------------------------------

assert.ok(/^\d{14}$/.test(timestampFor()), 'timestamp is 14 digits')
assert.strictEqual(timestampFor(new Date(2026, 8, 14, 17, 6, 9)), '20260914170609')

// Kenyan phone normalization to Daraja's 2547XXXXXXXX / 2541XXXXXXXX
assert.strictEqual(normalizePhone('0712345678'), '254712345678')
assert.strictEqual(normalizePhone('+254712345678'), '254712345678')
assert.strictEqual(normalizePhone('254712345678'), '254712345678')
assert.strictEqual(normalizePhone('712345678'), '254712345678')
assert.strictEqual(normalizePhone('0110 123 456'), '254110123456') // 01xx numbers (fixed/aipo) are valid Safaricom ranges
assert.strictEqual(normalizePhone('0720 112 233'), '254720112233')
assert.strictEqual(normalizePhone('+254 712 345 678'), '254712345678')
assert.strictEqual(normalizePhone('00254712345678'), '254712345678')
assert.strictEqual(normalizePhone('12345'), null)
assert.strictEqual(normalizePhone(''), null)
assert.strictEqual(normalizePhone(null), null)
assert.strictEqual(normalizePhone('abcdefghij'), null)

// Client construction validates credentials
assert.throws(() => makeDarajaClient({ consumerSecret: 's', shortcode: '1', passkey: 'p' }))
assert.throws(() => makeDarajaClient({ consumerKey: 'k', consumerSecret: 's', passkey: 'p' }))
assert.throws(() => makeDarajaClient({ consumerKey: 'k', consumerSecret: 's', shortcode: '1' }))

// Callback parsing (success + cancellation shapes)
{
  const success = {
    Body: {
      stkCallback: {
        MerchantRequestID: '29115-34620561-1',
        CheckoutRequestID: 'ws_CO_DMZ_12321_23423476',
        ResultCode: 0,
        ResultDesc: 'The service request is processed successfully.',
        CallbackMetadata: {
          Item: [
            { Name: 'Amount', Value: 350 },
            { Name: 'MpesaReceiptNumber', Value: 'QHD82910KP' },
            { Name: 'PhoneNumber', Value: 254712345678 },
            { Name: 'TransactionDate', Value: 20260914171022 },
          ],
        },
      },
    },
  }
  const parsed = parseStkCallback(success)
  assert.strictEqual(parsed.checkoutRequestId, 'ws_CO_DMZ_12321_23423476')
  assert.strictEqual(parsed.resultCode, 0)
  assert.strictEqual(parsed.amount, 350)
  assert.strictEqual(parsed.mpesaReceipt, 'QHD82910KP')
  assert.strictEqual(parsed.phone, '254712345678')

  const cancelled = {
    Body: {
      stkCallback: {
        MerchantRequestID: 'x',
        CheckoutRequestID: 'ws_CO_2',
        ResultCode: 1032,
        ResultDesc: 'Request cancelled by user',
      },
    },
  }
  const parsedCancel = parseStkCallback(cancelled)
  assert.strictEqual(parsedCancel.resultCode, 1032)
  assert.strictEqual(parsedCancel.mpesaReceipt, null)

  assert.strictEqual(parseStkCallback({}), null)
  assert.strictEqual(parseStkCallback(null), null)
  assert.strictEqual(parseStkCallback({ Body: {} }), null)
}

// Voucher code generation: format + unambiguous alphabet + custom prefix
{
  for (let i = 0; i < 50; i++) {
    const code = generateVoucherCode('HARBOR')
    assert.ok(/^HARBOR-[A-HJ-NP-Z2-9]{4}-[A-HJ-NP-Z2-9]{4}$/.test(code), `format: ${code}`)
  }
  const seen = new Set()
  for (let i = 0; i < 200; i++) seen.add(generateVoucherCode('ORN'))
  assert.ok(seen.size > 190, `codes should be mostly unique, got ${seen.size}`)
  assert.strictEqual(generateVoucherCode('test pkg!')[0], 'T')
  for (const ch of VOUCHER_ALPHABET) assert.ok(!'0O1I'.includes(ch))
}

// ---------------------------------------------------------------------------
// Portal branding (normalize, escape, palettes, cached store)
// ---------------------------------------------------------------------------
const {
  DEFAULT_BRANDING,
  normalizeBranding,
  buildBrandingScript,
  buildBrandStyle,
  buildBrandPalettes,
  makeBrandingStore,
} = require('../src/branding')

// DB row -> normalized shape, unknown fields fall back to defaults.
{
  const b = normalizeBranding({
    business_name: '  Acme  Networks  ',
    support_phone: '0700-111 222\n',
    primary_color: '#317D75',
    portal_title: 'Karibu — sign in',
    portal_message: '',
    footer_note: 'Terms apply',
  })
  assert.strictEqual(b.businessName, 'Acme Networks')
  assert.strictEqual(b.supportPhone, '0700-111 222')
  assert.strictEqual(b.primaryColor, '#317d75')
  assert.strictEqual(b.portalTitle, 'Karibu — sign in')
  assert.strictEqual(b.portalMessage, DEFAULT_BRANDING.portalMessage, 'empty DB message falls back')
  assert.strictEqual(b.footerNote, 'Terms apply')

  // CamelCase input (dashboard-style payload) also accepted.
  const c = normalizeBranding({ businessName: 'X', supportPhone: '119', primaryColor: 'javascript:alert(1)' })
  assert.strictEqual(c.businessName, 'X')
  assert.strictEqual(c.primaryColor, DEFAULT_BRANDING.primaryColor, 'bad color rejected')

  // Sanitization: control chars stripped, long strings clamped.
  const long = 'A'.repeat(200)
  const s = normalizeBranding({ business_name: 'bad\u0000\u001f name', portal_message: long })
  assert.strictEqual(s.businessName, 'bad name', 'control chars stripped and whitespace collapsed')
  assert.ok(s.portalMessage.length <= 160)

  // Non-objects and nulls give pure defaults.
  assert.deepStrictEqual(normalizeBranding(null), DEFAULT_BRANDING)
  assert.deepStrictEqual(normalizeBranding(42), DEFAULT_BRANDING)
}

// Script injection is JSON-safe: </script> cannot break out.
{
  const evil = normalizeBranding({ business_name: '</script><script>alert(1)</script>' })
  const tag = buildBrandingScript(evil)
  assert.ok(!tag.toLowerCase().includes('</script><script>alert'), 'must escape < in JSON')
  assert.ok(tag.startsWith('<script>window.ORION_BRANDING='))
  const parsed = JSON.parse(tag.replace(/^<script>window\.ORION_BRANDING=/, '').replace(/;?<\/script>$/, ''))
  assert.strictEqual(parsed.businessName, '</script><script>alert(1)</script>')
}

// Brand palettes: hex handling, derived tints, readable ink.
{
  const p = buildBrandPalettes('#725796')
  assert.strictEqual(p.light['--coral'], '#725796')
  assert.ok(p.light['--coral-subtle'] !== p.light['--coral'], 'light tint derived')
  assert.ok(p.light['--coral-glow'].endsWith('30'))
  assert.ok(p.dark['--coral-glow'].endsWith('35'))
  assert.ok(p.dark['--coral'] !== p.light['--coral'], 'dark theme lightens slightly')
  assert.strictEqual(p.light['--on-brand'], '#ffffff')
  const lightBrand = buildBrandPalettes('#c58a32').light['--on-brand']
  assert.strictEqual(lightBrand, '#192320', 'light brand colors get dark ink')
  assert.strictEqual(buildBrandPalettes('not-a-color').light['--coral'], DEFAULT_BRANDING.primaryColor, 'invalid falls back')

  // Dark-tint derivation must DARKEN, not brighten (toward-black mixing).
  const chan = (hex, i) => parseInt(hex.slice(1 + i * 2, 3 + i * 2), 16)
  const darkPalettes = buildBrandPalettes('#4f779a').dark
  for (const i of [0, 1, 2]) {
    assert.ok(chan(darkPalettes['--coral-subtle'], i) < chan('#4f779a', i), 'dark coral-subtle channel darkens')
  }
  assert.ok(chan(darkPalettes['--coral'], 0) > chan('#4f779a', 0), 'dark coral lightens slightly toward white')
}

// Style block targets both themes.
{
  const css = buildBrandStyle('#4f779a')
  assert.ok(css.startsWith('<style>'))
  assert.ok(css.includes(':root{'))
  assert.ok(css.includes('[data-theme="dark"]{'))
  assert.ok(css.includes('--coral: #4f779a;'))
}

// Cached store: serves rows from a stub client, TTL-caches, survives errors.
;(async () => {
  let calls = 0
  const row = { business_name: 'Store Co', support_phone: '100', primary_color: '#4f779a', updated_at: '2026-09-15T00:00:00Z' }
  const stub = { select: async () => { calls += 1; return [row] } }
  const store = makeBrandingStore(stub, { cacheTtlMs: 60_000 })
  const first = await store.load()
  assert.strictEqual(first.branding.businessName, 'Store Co')
  assert.strictEqual(first.updatedAt, '2026-09-15T00:00:00Z')
  await store.load()
  assert.strictEqual(calls, 1, 'second load within TTL is cached')

  const failing = makeBrandingStore({ select: async () => { throw new Error('down') } }, { cacheTtlMs: 0 })
  const bad = await failing.load()
  assert.strictEqual(bad.branding.businessName, 'Harbor House', 'falls back to defaults on error')
  assert.ok(bad.error)

  console.log('All bridge self-tests passed.')
})().catch((err) => {
  console.error(err)
  process.exit(1)
})
