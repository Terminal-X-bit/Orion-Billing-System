// Provisioning engine: maps Orion billing concepts to RouterOS configuration.
//
//   package  -> /ip/hotspot/user/profile  (rate limit, shared users, expiry script)
//   voucher  -> /ip/hotspot/user          (password = voucher code, limits, expiry)
//   payment  -> hotspot user creation on successful M-Pesa STK payment
//
// All RouterOS values are derived from billing data so the router is always
// the enforcement point.

const { withRouterConnection } = require('./routeros-client')

function formatUptime(totalSeconds) {
  const d = Math.floor(totalSeconds / 86400)
  const h = Math.floor((totalSeconds % 86400) / 3600)
  const m = Math.floor((totalSeconds % 3600) / 60)
  const parts = []
  if (d > 0) parts.push(`${d}d`)
  if (h > 0) parts.push(`${h}h`)
  if (m > 0 && d === 0) parts.push(`${m}m`)
  if (parts.length === 0) parts.push('1m')
  return parts.join('')
}

// "24 Hours" -> 1d, "1 Hour" -> 1h, "7 Days" -> 1w, "30 Days" -> 30d.
function durationToUptime(durationLabel, fallbackSeconds = 86400) {
  const s = String(durationLabel || '').toLowerCase()
  let seconds = null
  const months = s.match(/(\d+)\s*(mo|month|months)\b/)
  const weeks = s.match(/(\d+)\s*(w|week|weeks)\b/)
  const days = s.match(/(\d+)\s*(d|day|days)\b/)
  const hours = s.match(/(\d+)\s*(h|hour|hrs|hours)\b/)
  const minutes = s.match(/(\d+)\s*(m|min|mins|minutes)\b/)
  if (months) seconds = Number(months[1]) * 30 * 86400
  else if (weeks) seconds = Number(weeks[1]) * 7 * 86400
  else if (days) seconds = Number(days[1]) * 86400
  else if (hours) seconds = Number(hours[1]) * 3600
  else if (minutes) seconds = Number(minutes[1]) * 60
  return formatUptime(seconds === null ? fallbackSeconds : seconds)
}

/** Raw seconds for the same duration labels (used for DB expiry timestamps). */
function durationToSeconds(durationLabel, fallbackSeconds = 86400) {
  const s = String(durationLabel || '').toLowerCase()
  const months = s.match(/(\d+)\s*(mo|month|months)\b/)
  const weeks = s.match(/(\d+)\s*(w|week|weeks)\b/)
  const days = s.match(/(\d+)\s*(d|day|days)\b/)
  const hours = s.match(/(\d+)\s*(h|hour|hrs|hours)\b/)
  const minutes = s.match(/(\d+)\s*(m|min|mins|minutes)\b/)
  if (months) return Number(months[1]) * 30 * 86400
  if (weeks) return Number(weeks[1]) * 7 * 86400
  if (days) return Number(days[1]) * 86400
  if (hours) return Number(hours[1]) * 3600
  if (minutes) return Number(minutes[1]) * 60
  return fallbackSeconds
}

// "20 Mbps" -> "20M/20M" RouterOS rate limit (symmetric).
function speedToRateLimit(speedLabel, fallback = '10M') {
  const m = String(speedLabel || '').match(/(\d+(?:\.\d+)?)\s*(mbps|m|gbps|g)/i)
  if (!m) return fallback
  const n = Number(m[1])
  const value = /g/i.test(m[2]) ? String(Math.round(n * 1000)) : String(Math.round(n))
  return `${value}M/${value}M`
}

// "5 GB" -> bytes; Unlimited/null -> null (no data cap).
function dataQuotaToBytes(dataLabel) {
  if (!dataLabel) return null
  if (/unlimited|infinit/i.test(String(dataLabel))) return null
  const m = String(dataLabel).match(/(\d+(?:\.\d+)?)\s*(kb|mb|gb|tb)/i)
  if (!m) return null
  const n = Number(m[1])
  const unit = m[2].toLowerCase()
  const mult = unit === 'kb' ? 1024 : unit === 'mb' ? 1024 ** 2 : unit === 'gb' ? 1024 ** 3 : 1024 ** 4
  return Math.round(n * mult)
}

function profileNameFor(pkg) {
  return String(
    pkg.mikrotik_profile ||
      `orion-${String(pkg.name)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
        .slice(0, 40)}`
  )
}

// Shared-users is capped by RouterOS; multi-device packages map 1:1.
function sharedUsersFor(pkg) {
  return String(Math.max(1, Math.min(10, Number(pkg.device_limit) || 1)))
}

/** Seconds until a voucher's expires_at, or null when it has no expiry. */
function voucherTtlSeconds(voucher) {
  if (!voucher || !voucher.expires_at) return null
  const ttlMs = new Date(voucher.expires_at).getTime() - Date.now()
  return Number.isFinite(ttlMs) ? Math.max(0, Math.floor(ttlMs / 1000)) : null
}

/**
 * Ensure a hotspot user profile exists on the router for this package.
 * Users get per-user uptime limits from their voucher; the profile provides
 * the speed ceiling, shared-device count and idle disconnect policy.
 */
async function ensurePackageProfile(routerCfg, pkg, { sessionTimeoutMin = 1440, idleTimeoutMin = 15 } = {}) {
  const profile = profileNameFor(pkg)
  const rateLimit = speedToRateLimit(pkg.speed_limit)
  const sharedUsers = sharedUsersFor(pkg)
  const sessionTimeout = formatUptime((Number(sessionTimeoutMin) || 1440) * 60)
  const idleTimeout = `${Number(idleTimeoutMin) || 15}m`

  return withRouterConnection(routerCfg, async (client) => {
    const existing = await client.run('/ip/hotspot/user/profile/print', [`?name=${profile}`])
    const params = [
      `=name=${profile}`,
      `=rate-limit=${rateLimit}`,
      `=shared-users=${sharedUsers}`,
      `=session-timeout=${sessionTimeout}`,
      `=idle-timeout=${idleTimeout}`,
      `=status-autorefresh=1m`,
    ]
    if (existing.length > 0) {
      await client.run('/ip/hotspot/user/profile/set', [`=.id=${existing[0]['.id']}`, ...params.slice(1)])
      return { profile, created: false, rateLimit, sharedUsers }
    }
    await client.run('/ip/hotspot/user/profile/add', params)
    return { profile, created: true, rateLimit, sharedUsers }
  })
}

/**
 * Create (or update) a hotspot user whose login password is the voucher code.
 * `limit-uptime` (never the profile's session-timeout) enforces the package
 * duration so two vouchers for the same package expire independently.
 * Returns the RouterOS user id.
 */
async function ensureVoucherUser(routerCfg, voucher, pkg, { sessionTimeoutMin = 1440 } = {}) {
  const profile = pkg ? profileNameFor(pkg) : 'default'
  const uptime = pkg
    ? durationToUptime(pkg.duration_display, (Number(sessionTimeoutMin) || 1440) * 60)
    : formatUptime((Number(sessionTimeoutMin) || 1440) * 60)
  const bytesQuota = pkg ? dataQuotaToBytes(pkg.data_limit) : null
  const comment = `orion:${voucher.id}`

  return withRouterConnection(routerCfg, async (client) => {
    const existing = await client.run('/ip/hotspot/user/print', [`?comment=${comment}`])
    const params = [
      `=name=${voucher.code}`,
      `=password=${voucher.code}`,
      `=profile=${profile}`,
      `=limit-uptime=${uptime}`,
      `=comment=${comment}`,
    ]
    if (bytesQuota) params.push(`=limit-bytes-total=${bytesQuota}`)
    if (existing.length > 0) {
      await client.run('/ip/hotspot/user/set', [`=.id=${existing[0]['.id']}`, ...params.slice(1)])
      return { routerUserId: existing[0]['.id'], updated: true, limitUptime: uptime }
    }
    const res = await client.run('/ip/hotspot/user/add', params)
    return { routerUserId: res.length > 0 ? res[0]['.id'] || '1' : '1', updated: false, limitUptime: uptime }
  })
}

/** Remove a hotspot user (voucher deleted / consumed). */
async function removeVoucherUser(routerCfg, voucher) {
  return withRouterConnection(routerCfg, async (client) => {
    const existing = await client.run('/ip/hotspot/user/print', [`?comment=orion:${voucher.id}`])
    if (existing.length === 0) return { removed: false }
    await client.run('/ip/hotspot/user/remove', [`=.id=${existing[0]['.id']}`])
    return { removed: true }
  })
}

/** Live hotspot sessions with per-user usage. */
async function listActiveSessions(routerCfg) {
  return withRouterConnection(routerCfg, async (client) => {
    const [actives, users] = await Promise.all([
      client.run('/ip/hotspot/active/print'),
      client.run('/ip/hotspot/user/print'),
    ])
    const userByPkid = new Map(users.map((u) => [u['.id'], u]))
    return actives.map((a) => {
      const u = userByPkid.get(a.user) || {}
      return {
        router_user_id: a.user,
        session_id: a['.id'],
        username: a.user,
        address: a.address,
        mac: a['mac-address'] || a.mac_address || '',
        uptime: a.uptime || '0s',
        session_time_left: a['session-time-left'] || '',
        bytes_in: Number(a['bytes-in'] || a.bytes_in || 0),
        bytes_out: Number(a['bytes-out'] || a.bytes_out || 0),
        login_by: a['login-by'] || '',
        comment: u.comment || '',
        profile: a.profile || u.profile || '',
        server: a.server || '',
        since: a['started'] || a.start || '',
      }
    })
  })
}

/** Disconnect one active session by its RouterOS active .id. */
async function disconnectSession(routerCfg, activeId) {
  return withRouterConnection(routerCfg, async (client) => {
    await client.run('/ip/hotspot/active/remove', [`=.id=${activeId}`])
    return { disconnected: true }
  })
}

/** System resource + identity used for the router health cards. */
async function getRouterHealth(routerCfg) {
  return withRouterConnection(routerCfg, async (client) => {
    const [resource, identity, ifaces] = await Promise.all([
      client.run('/system/resource/print'),
      client.run('/system/identity/print'),
      client.run('/interface/print'),
    ])
    const r = resource[0] || {}
    const totalIfaces = ifaces.filter((i) => i.type !== 'loopback')
    const running = totalIfaces.filter((i) => i.running === 'true')
    const tx = totalIfaces.reduce((acc, i) => acc + Number(i['tx-byte'] || 0), 0)
    const rx = totalIfaces.reduce((acc, i) => acc + Number(i['rx-byte'] || 0), 0)
    return {
      identity: (identity[0] || {}).name || routerCfg.host,
      board_name: r['board-name'] || '',
      version: r.version || '',
      uptime: r.uptime || '',
      cpu_load: Number(r['cpu-load'] || 0),
      free_memory_mb: Math.round(Number(r['free-memory'] || 0) / 1024 / 1024),
      total_memory_mb: Math.round(Number(r['total-memory'] || 0) / 1024 / 1024),
      interfaces_total: totalIfaces.length,
      interfaces_running: running.length,
      bytes_sent: tx,
      bytes_received: rx,
    }
  })
}

/** Ping an address from the router itself. */
async function pingFromRouter(routerCfg, address, count = 4) {
  return withRouterConnection(routerCfg, async (client) => {
    const rows = await client.run('/ping', [`=address=${address}`, `=count=${String(count)}`, `=interval=1`])
    const sent = rows.length
    const received = rows.filter((r) => r.status === 'received').length
    const times = rows.filter((r) => r['time']).map((r) => Number(String(r['time']).replace(/ms/, '')))
    const avg = times.length ? times.reduce((a, b) => a + b, 0) / times.length : null
    return {
      sent,
      received,
      loss_pct: sent ? Math.round(((sent - received) / sent) * 100) : 100,
      avg_ms: avg,
    }
  })
}

/** Reboot the router. */
async function rebootRouter(routerCfg) {
  return withRouterConnection(routerCfg, async (client) => {
    await client.run('/system/reboot')
    return { rebooting: true }
  })
}

/** Ensure a firewall address-list entry exists (used for blocking customers). */
async function setCustomerBlocked(routerCfg, address, blocked) {
  return withRouterConnection(routerCfg, async (client) => {
    const listName = 'orion-blocked'
    const existing = await client.run('/ip/firewall/address-list/print', [
      `?list=${listName}`,
      `?address=${address}`,
    ])
    if (blocked) {
      if (existing.length === 0) {
        await client.run('/ip/firewall/address-list/add', [
          `=list=${listName}`,
          `=address=${address}`,
          `=comment=orion-blocked`,
        ])
      }
      return { blocked: true, address }
    }
    for (const row of existing) {
      await client.run('/ip/firewall/address-list/remove', [`=.id=${row['.id']}`])
    }
    return { blocked: false, address }
  })
}

/** List hotspot user profiles (package reconciliation). */
async function listProfiles(routerCfg) {
  return withRouterConnection(routerCfg, async (client) => {
    const profiles = await client.run('/ip/hotspot/user/profile/print')
    return profiles.map((p) => ({
      id: p['.id'],
      name: p.name,
      rate_limit: p['rate-limit'] || '',
      shared_users: p['shared-users'] || '',
      session_timeout: p['session-timeout'] || '',
    }))
  })
}

module.exports = {
  voucherTtlSeconds,
  durationToSeconds,
  durationToUptime,
  speedToRateLimit,
  dataQuotaToBytes,
  profileNameFor,
  sharedUsersFor,
  ensurePackageProfile,
  ensureVoucherUser,
  removeVoucherUser,
  listActiveSessions,
  disconnectSession,
  getRouterHealth,
  pingFromRouter,
  rebootRouter,
  setCustomerBlocked,
  listProfiles,
}
