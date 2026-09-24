// MikroTik <-> Orion Supabase bridge: entry point and worker loop.
//
// Watches Supabase for:
//   - vouchers without a RouterOS hotspot user  -> create hotspot user
//   - packages needing profile reconciliation  -> upsert hotspot profile
//   - paid M-Pesa STK payments                  -> provision access + record transaction
//
// Exposes a small authenticated HTTP API for the dashboard:
//   GET  /health                 - bridge status
//   GET  /sessions/:routerId     - live hotspot sessions
//   POST /sessions/:routerId/disconnect { activeId }
//   GET  /routers/:routerId/health
//   POST /routers/:routerId/reboot
//   POST /routers/:routerId/ping { address }
//   POST /customers/:id/block    { address, blocked }
//
// Plus public (rate-limited, unauthenticated) captive-portal endpoints:
//   GET  /packages               - active packages for the portal
//   POST /pay { phone, packageId } - initiate M-Pesa STK Push
//   GET  /pay/:checkoutRequestId - poll payment status + voucher code
//   POST /mpesa/callback         - Daraja STK outcome webhook
//   GET  /portal                 - captive portal login page (guests see this;
//                                  branded via Settings -> Portal Branding)
//   GET  /portal.css, /portal.js - portal assets
//
// Run: node index.js   (config from environment or ../.env.local)

const http = require('http')
const fs = require('fs')
const path = require('path')
const crypto = require('crypto')

const { makeClient } = require('./src/supabase-rest')
const provisioning = require('./src/provisioning')
const {
  makeDarajaClient,
  parseStkCallback,
  normalizePhone,
  CALLBACK_TIMEOUT_MS,
} = require('./src/daraja')
const { generateVoucherCode } = require('./src/voucher-codes')
const { makeBrandingStore, buildBrandingScript, buildBrandStyle } = require('./src/branding')

// ---------------------------------------------------------------------------
// Captive portal static assets (served to guests from the walled garden)
// ---------------------------------------------------------------------------

const PORTAL_DIR = path.join(__dirname, 'portal')
const PORTAL_MIME = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'application/javascript; charset=utf-8' }

/** Read a portal asset, or null when it does not exist. */
function readPortalAsset(name) {
  try {
    return fs.readFileSync(path.join(PORTAL_DIR, name))
  } catch (_) {
    return null
  }
}

/**
 * Inject operator branding (Settings -> Captive Portal Branding) into the
 * portal HTML just before </head> as window.ORION_BRANDING. The static
 * portal files stay static — guests always receive current branding without
 * any client-side fetch, and it also works when Supabase is unreachable
 * (falls back to last-known-good branding or the built-in defaults).
 */
async function injectBranding(htmlBody) {
  try {
    const { branding } = await brandingStore.load()
    const head =
      buildBrandingScript(branding) +
      buildBrandStyle(branding.primaryColor) +
      '\n'
    const buf = Buffer.from(head)
    const marker = '</head>'
    const idx = htmlBody.indexOf(marker)
    if (idx === -1) return Buffer.concat([buf, htmlBody])
    return Buffer.concat([htmlBody.slice(0, idx), buf, htmlBody.slice(idx)])
  } catch (err) {
    console.warn('[portal] branding injection failed:', err && err.message)
    return htmlBody
  }
}

/** Serve the portal page + assets. Returns true when the request was handled. */
async function tryServePortal(req, res, pathname) {
  if (req.method !== 'GET' && req.method !== 'HEAD') return false
  const base = '/portal'
  // /portal, /portal/ and sibling assets like /portal.css, /portal.js
  if (
    pathname !== base &&
    pathname !== base + '/' &&
    !pathname.startsWith(base + '/') &&
    !pathname.startsWith(base + '.')
  ) {
    return false
  }
  let name
  if (pathname === base || pathname === base + '/') {
    name = 'portal.html'
  } else if (pathname.startsWith(base + '.')) {
    name = pathname.slice(1) // '/portal.css' -> 'portal.css'
  } else {
    name = pathname.slice(base.length + 1) // '/portal/foo' -> 'foo'
  }
  name = name.replace(/\\/g, '/')
  if (name.includes('..') || name.startsWith('/')) return false
  const body = readPortalAsset(name)
  if (!body) return false
  const ext = path.extname(name)
  const payload = ext === '.html' ? await injectBranding(body) : body
  res.writeHead(200, {
    'Content-Type': PORTAL_MIME[ext] || 'application/octet-stream',
    'Content-Length': payload.length,
    'Cache-Control': 'no-store',
  })
  res.end(req.method === 'HEAD' ? undefined : payload)
  return true
}

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

function loadDotEnv(file) {
  try {
    const raw = fs.readFileSync(file, 'utf8')
    for (const line of raw.split(/\r?\n/)) {
      const m = line.match(/^\s*(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/)
      if (!m) continue
      if (process.env[m[1]] === undefined) {
        process.env[m[1]] = m[2].trim().replace(/^["']|["']$/g, '')
      }
    }
  } catch (_) { /* optional file */ }
}

loadDotEnv(path.join(__dirname, '.env'))
loadDotEnv(path.join(__dirname, '..', '.env.local'))

function required(name) {
  const v = process.env[name]
  if (!v) {
    console.error(`[config] Missing required environment variable: ${name}`)
    process.exit(1)
  }
  return v
}

const config = {
  supabaseUrl: required('SUPABASE_URL'),
  supabaseServiceKey: required('SUPABASE_SERVICE_ROLE_KEY'),
  bridgeApiKey: process.env.BRIDGE_API_KEY || crypto.randomBytes(24).toString('hex'),
  pollIntervalMs: Number(process.env.BRIDGE_POLL_INTERVAL_MS) || 30000,
  port: Number(process.env.BRIDGE_PORT) || 8787,
  defaultRouterId: process.env.BRIDGE_DEFAULT_ROUTER_ID || '',
  daraja: {
    consumerKey: process.env.MPESA_CONSUMER_KEY || '',
    consumerSecret: process.env.MPESA_CONSUMER_SECRET || '',
    shortcode: process.env.MPESA_SHORTCODE || '',
    passkey: process.env.MPESA_PASSKEY || '',
    environment: process.env.MPESA_ENVIRONMENT || 'sandbox',
    callbackUrlBase: process.env.MPESA_CALLBACK_URL || '',
  },
}

if (!process.env.BRIDGE_API_KEY) {
  console.warn(`[config] BRIDGE_API_KEY not set - generated ephemeral key for this run: ${config.bridgeApiKey}`)
}

const db = makeClient({ url: config.supabaseUrl, serviceKey: config.supabaseServiceKey })

// Portal branding (Settings -> Captive Portal Branding), TTL-cached so each
// guest request doesn't hit Supabase; falls back to last-known-good values.
const brandingStore = makeBrandingStore(db, { cacheTtlMs: 30_000 })

// Daraja client is only created when credentials are present; /pay returns a
// friendly 503 instead of crashing when payments are not configured.
let daraja = null
try {
  if (config.daraja.consumerKey && config.daraja.shortcode) {
    if (!config.daraja.callbackUrlBase) {
      console.warn('[daraja] MPESA_CALLBACK_URL not set; STK callbacks cannot reach this bridge')
    }
    daraja = makeDarajaClient(config.daraja)
  }
} catch (err) {
  console.warn('[daraja] disabled:', err.message)
}

// Public (unauthenticated) captive-portal endpoints get light rate limiting.
const PUBLIC_RATE = { windowMs: 60_000, max: 20 }
const publicRateBuckets = new Map()
function publicRateAllow(ip) {
  const now = Date.now()
  const bucket = publicRateBuckets.get(ip) || { count: 0, windowStart: now }
  if (now - bucket.windowStart > PUBLIC_RATE.windowMs) {
    bucket.count = 0
    bucket.windowStart = now
  }
  bucket.count += 1
  publicRateBuckets.set(ip, bucket)
  if (publicRateBuckets.size > 5000) {
    for (const [key, entry] of publicRateBuckets) {
      if (now - entry.windowStart > PUBLIC_RATE.windowMs) publicRateBuckets.delete(key)
    }
  }
  return bucket.count <= PUBLIC_RATE.max
}

// ---------------------------------------------------------------------------
// Router config resolution (routers table row -> RouterOS connection cfg)
// ---------------------------------------------------------------------------

async function getRouter(routerId) {
  const rows = await db.select('routers', {
    filters: { id: `eq.${routerId}` },
    limit: 1,
  })
  const row = rows[0]
  if (!row) throw new Error(`Router ${routerId} not found`)
  const apiUser = row.api_user || process.env.MIKROTIK_API_USER
  const apiPassword = process.env.MIKROTIK_API_PASSWORD
  if (!apiUser || !apiPassword) {
    throw new Error('MIKROTIK_API_USER / MIKROTIK_API_PASSWORD not configured')
  }
  return {
    id: row.id,
    name: row.name,
    host: row.ip_address,
    port: row.api_port || 8728,
    user: apiUser,
    password: apiPassword,
  }
}

function audit(action, entity, entityId, detail) {
  return db
    .insert('audit_logs', [{ actor: 'bridge', action, entity, entity_id: String(entityId || ''), detail }])
    .catch((err) => console.warn('[audit] insert failed:', err.message))
}

// ---------------------------------------------------------------------------
// Access voucher minting (used by M-Pesa fulfilment)
// ---------------------------------------------------------------------------

async function voucherCodeExists(code) {
  const rows = await db.select('vouchers', { columns: 'id', filters: { code: `eq.${code}` }, limit: 1 })
  return rows.length > 0
}

/**
 * Mint an unredeemed voucher for a package with an absolute expiry.
 * The regular voucher sync worker provisions it on the router.
 */
async function createAccessVoucher(pkg) {
  const durationSeconds = provisioning.durationToSeconds(pkg.duration, 86400)
  const expiresAt = new Date(Date.now() + durationSeconds * 1000).toISOString()
  const prefix = String(pkg.name || 'ORN').toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 4) || 'ORN'
  for (let attempt = 0; attempt < 3; attempt++) {
    const code = generateVoucherCode(prefix)
    if (await voucherCodeExists(code)) continue
    const inserted = await db.insert('vouchers', {
      code,
      package_name: pkg.name,
      package_price: pkg.price_amount,
      expires_at: expiresAt,
      mikrotik_user_synced: false,
    })
    return { id: inserted[0].id, code, expires_at: expiresAt }
  }
  throw new Error('Could not generate a unique voucher code')
}

// ---------------------------------------------------------------------------
// Workers
// ---------------------------------------------------------------------------

/** Upsert a RouterOS hotspot profile for every active package. */
async function syncPackageProfiles() {
  const packages = await db.select('packages', {
    columns: 'id,name,duration,data_limit,speed_limit,device_limit,mikrotik_profile,synced_to_router,is_active',
    filters: { is_active: 'eq.true' },
  })
  let synced = 0
  for (const pkg of packages) {
    const routerId = config.defaultRouterId
    if (!routerId) break
    let routerCfg
    try {
      routerCfg = await getRouter(routerId)
    } catch (err) {
      console.warn('[profiles] router unavailable:', err.message)
      break
    }
    try {
      const res = await provisioning.ensurePackageProfile(routerCfg, pkg)
      synced += 1
      if (res.created) {
        console.log(`[profiles] created profile ${res.profile} (${res.rateLimit}, shared=${res.sharedUsers})`)
      }
      if (!pkg.synced_to_router) {
        await db.updateQuietly('packages', { id: `eq.${pkg.id}` }, { synced_to_router: true })
      }
    } catch (err) {
      console.warn(`[profiles] ${pkg.name}:`, err.message)
    }
  }
  return synced
}

/** Create a RouterOS hotspot user for every unsynced voucher. */
async function syncVouchers() {
  const vouchers = await db.select('vouchers', {
    columns: 'id,code,package_name,package_price,expires_at,mikrotik_user_synced',
    filters: { mikrotik_user_synced: 'eq.false', expired_at: 'is.null' },
    order: 'created_at.desc',
    limit: 100,
  })
  if (vouchers.length === 0) return 0

  const packageNames = [...new Set(vouchers.map((v) => v.package_name))]
  const packages = await db.select('packages', {
    columns: 'id,name,duration,data_limit,speed_limit,device_limit,mikrotik_profile',
  })
  const pkgByName = new Map(packages.map((p) => [p.name, p]))

  const routerId = config.defaultRouterId
  if (!routerId) {
    console.warn('[vouchers] BRIDGE_DEFAULT_ROUTER_ID not set; skipping provisioning')
    return 0
  }
  let routerCfg
  try {
    routerCfg = await getRouter(routerId)
  } catch (err) {
    console.warn('[vouchers] router unavailable:', err.message)
    return 0
  }

  let provisioned = 0
  for (const voucher of vouchers) {
    const pkg = pkgByName.get(voucher.package_name)
    try {
      await provisioning.ensureVoucherUser(routerCfg, voucher, pkg)
      await db
        .updateQuietly('vouchers', { id: `eq.${voucher.id}` }, { mikrotik_user_synced: true })
      provisioned += 1
      console.log(`[vouchers] provisioned ${voucher.code} (${voucher.package_name})`)
    } catch (err) {
      console.warn(`[vouchers] ${voucher.code}:`, err.message)
    }
  }
  if (provisioned > 0) void audit('provision_vouchers', 'voucher', vouchers[0].id, { count: provisioned })
  return provisioned
}

/** Mark vouchers whose expiry has passed (RouterOS enforces the same limit). */
async function expireVouchers() {
  const now = new Date().toISOString()
  const stale = await db.select('vouchers', {
    columns: 'id,code',
    filters: {
      expires_at: `lt.${now}`,
      expired_at: 'is.null',
      redeemed_at: 'is.null',
    },
    limit: 50,
  })
  for (const voucher of stale) {
    try {
      // RouterOS removes the hotspot user once limit-uptime elapses; record the
      // expiry in Supabase so the dashboard reflects it and the voucher sync
      // never re-provisions the code.
      await db.updateQuietly('vouchers', { id: `eq.${voucher.id}` }, { expired_at: now })
      console.log(`[vouchers] expired ${voucher.code}`)
    } catch (err) {
      console.warn(`[vouchers] expire ${voucher.code}:`, err.message)
    }
  }
  return stale.length
}

/**
 * Fulfil paid M-Pesa STK payments: record the transaction and mint an access
 * voucher. The regular voucher sync worker provisions the voucher on the
 * router, completing the automatic pay -> provision flow.
 */
async function syncStkPayments() {
  const paid = await db.select('stk_requests', {
    columns: 'id,checkout_request_id,phone,package_id,package_name,amount,status,mpesa_receipt,voucher_code,created_at',
    filters: { status: 'eq.paid', provisioned_at: 'is.null' },
    order: 'created_at.desc',
    limit: 25,
  })
  if (paid.length === 0) return 0

  let processed = 0
  for (const req of paid) {
    try {
      // Idempotency: unique index on transactions.provider_ref makes duplicate
      // inserts impossible; the pre-check just avoids noisy 409s.
      const existing = await db.select('transactions', {
        columns: 'id',
        filters: { provider_ref: `eq.${req.checkout_request_id}` },
        limit: 1,
      })
      if (existing.length === 0) {
        const transactionId = `#TRX-${crypto.randomBytes(5).toString('hex').toUpperCase()}`
        await db.insert('transactions', {
          id: transactionId,
          customer_name: `M-Pesa ${req.phone}`,
          method: 'M-Pesa',
          package_name: req.package_name,
          amount: `KSh ${Number(req.amount).toLocaleString()}`,
          amount_value: Number(req.amount),
          status: 'Paid',
          time_display: 'Just now',
          customer_phone: req.phone,
          mpesa_receipt: req.mpesa_receipt || null,
          checkout_request_id: req.checkout_request_id,
          provider_ref: req.checkout_request_id,
        })
        console.log(`[stk] recorded transaction ${transactionId} for ${req.checkout_request_id}`)
      }

      // Mint the access voucher (idempotent: keep existing code on retries).
      if (!req.voucher_code) {
        const pkgRows = await db.select('packages', {
          columns: 'id,name,price_amount,duration,data_limit,speed_limit,device_limit',
          filters: req.package_id ? { id: `eq.${req.package_id}` } : { name: `eq.${req.package_name}` },
          limit: 1,
        })
        const pkg = pkgRows[0] || { name: req.package_name, price_amount: Number(req.amount), duration: '24 Hours' }
        const voucher = await createAccessVoucher(pkg)
        await db.updateQuietly('stk_requests', { id: `eq.${req.id}` }, { voucher_code: voucher.code })
        req.voucher_code = voucher.code
        console.log(`[stk] minted voucher ${voucher.code} for ${req.checkout_request_id}`)
      }

      await db
        .updateQuietly('stk_requests', { id: `eq.${req.id}` }, { provisioned_at: new Date().toISOString() })
      processed += 1
    } catch (err) {
      if (/provider_ref_uidx|duplicate key/i.test(err.message)) {
        // Lost an insert race; the winning row already did the work.
        await db
          .updateQuietly('stk_requests', { id: `eq.${req.id}` }, { provisioned_at: new Date().toISOString() })
          .catch(() => {})
        processed += 1
        continue
      }
      console.warn(`[stk] ${req.checkout_request_id}:`, err.message)
    }
  }
  if (processed > 0) void audit('fulfil_stk_payments', 'stk_request', paid[0].id, { count: processed })
  return processed
}

/**
 * Reconcile STK requests whose callback never arrived (poll Daraja directly).
 * Marks requests cancelled after 2 hours of limbo.
 */
async function reconcileStkRequests() {
  if (!daraja) return 0
  const pending = await db.select('stk_requests', {
    columns: 'id,checkout_request_id,status,created_at',
    filters: { status: 'eq.pending' },
    order: 'created_at.asc',
    limit: 20,
  })
  const now = Date.now()
  const stale = pending.filter(
    (r) => now - new Date(r.created_at).getTime() > CALLBACK_TIMEOUT_MS
  )
  let updated = 0
  for (const req of stale) {
    try {
      if (now - new Date(req.created_at).getTime() > 2 * 3600 * 1000) {
        await db.updateQuietly('stk_requests', { id: `eq.${req.id}` }, {
          status: 'cancelled',
          result_desc: 'No callback received (timeout)',
          updated_at: new Date().toISOString(),
        })
        updated += 1
        continue
      }
      const q = await daraja.stkQuery(req.checkout_request_id)
      if (q.paid || q.failed) {
        await db.updateQuietly('stk_requests', { id: `eq.${req.id}` }, {
          status: q.paid ? 'paid' : 'failed',
          result_code: q.resultCode,
          result_desc: q.resultDesc,
          mpesa_receipt: q.mpesaReceipt,
          updated_at: new Date().toISOString(),
        })
        updated += 1
        console.log(`[stk] reconciled ${req.checkout_request_id}: ${q.paid ? 'paid' : 'failed'}`)
      }
    } catch (err) {
      console.warn(`[stk] reconcile ${req.checkout_request_id}:`, err.message)
    }
  }
  return updated
}

// ---------------------------------------------------------------------------
// HTTP API
// ---------------------------------------------------------------------------

const state = {
  startedAt: new Date().toISOString(),
  lastPollAt: null,
  polls: 0,
  errors: 0,
}

/** Human label for a remaining-time duration, e.g. "5h 42m left". */
function formatRemaining(ms) {
  if (ms <= 0) return 'Expired'
  const mins = Math.floor(ms / 60000)
  const d = Math.floor(mins / 1440)
  const h = Math.floor((mins % 1440) / 60)
  const m = mins % 60
  if (d > 0) return `${d}d ${h}h left`
  if (h > 0) return `${h}h ${m}m left`
  return `${m}m left`
}

function sendJson(res, status, body) {
  const payload = JSON.stringify(body)
  res.writeHead(status, { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(payload) })
  res.end(payload)
}

async function readJsonBody(req) {
  const chunks = []
  for await (const chunk of req) chunks.push(chunk)
  const raw = Buffer.concat(chunks).toString('utf8')
  return raw ? JSON.parse(raw) : {}
}

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, 'http://localhost')
    const parts = url.pathname.split('/').filter(Boolean)

    // Captive portal page + assets (no auth; RouterOS walled-garden traffic)
    if (await tryServePortal(req, res, url.pathname)) return

    // Public captive-portal endpoints (no bridge key; rate limited per IP).
    const ip =
      (req.headers['x-forwarded-for'] || '').split(',')[0].trim() ||
      req.socket.remoteAddress ||
      'unknown'
    const isPublicRoute =
      url.pathname === '/packages' ||
      url.pathname === '/pay' ||
      /^\/pay\/[^/]+$/.test(url.pathname) ||
      /^\/account\/[^/]+$/.test(url.pathname) ||
      url.pathname === '/mpesa/callback'
    if (isPublicRoute) {
      if (!publicRateAllow(ip)) {
        sendJson(res, 429, { error: 'too many requests' })
        return
      }
    } else {
      const key = req.headers['x-bridge-key'] || ''
      if (key !== config.bridgeApiKey) {
        sendJson(res, 401, { error: 'unauthorized' })
        return
      }
    }

    if (req.method === 'GET' && url.pathname === '/health') {
      sendJson(res, 200, {
        ok: true,
        startedAt: state.startedAt,
        lastPollAt: state.lastPollAt,
        polls: state.polls,
        errors: state.errors,
        pollIntervalMs: config.pollIntervalMs,
        defaultRouterId: config.defaultRouterId || null,
      })
      return
    }

    // POST /sync - run one provisioning/sync pass immediately (dashboard button)
    if (req.method === 'POST' && url.pathname === '/sync') {
      void pollOnce()
      sendJson(res, 200, { ok: true, message: 'Sync pass started' })
      return
    }

    // /sessions/:routerId
    if (req.method === 'GET' && parts[0] === 'sessions' && parts[1] && parts.length === 2) {
      const routerCfg = await getRouter(parts[1])
      const sessions = await provisioning.listActiveSessions(routerCfg)
      sendJson(res, 200, { router: routerCfg.name, sessions })
      return
    }

    // /sessions/:routerId/disconnect { activeId }
    if (req.method === 'POST' && parts[0] === 'sessions' && parts[2] === 'disconnect') {
      const body = await readJsonBody(req)
      if (!body.activeId) {
        sendJson(res, 400, { error: 'activeId is required' })
        return
      }
      const routerCfg = await getRouter(parts[1])
      const result = await provisioning.disconnectSession(routerCfg, body.activeId)
      void audit('disconnect_session', 'router', parts[1], { activeId: body.activeId })
      sendJson(res, 200, result)
      return
    }

    // /routers/:routerId/health
    if (req.method === 'GET' && parts[0] === 'routers' && parts[2] === 'health') {
      const routerCfg = await getRouter(parts[1])
      const health = await provisioning.getRouterHealth(routerCfg)
      sendJson(res, 200, health)
      return
    }

    // /routers/:routerId/reboot
    if (req.method === 'POST' && parts[0] === 'routers' && parts[2] === 'reboot') {
      const routerCfg = await getRouter(parts[1])
      const result = await provisioning.rebootRouter(routerCfg)
      void audit('reboot_router', 'router', parts[1], {})
      sendJson(res, 200, result)
      return
    }

    // /routers/:routerId/ping { address }
    if (req.method === 'POST' && parts[0] === 'routers' && parts[2] === 'ping') {
      const body = await readJsonBody(req)
      if (!body.address) {
        sendJson(res, 400, { error: 'address is required' })
        return
      }
      const routerCfg = await getRouter(parts[1])
      const result = await provisioning.pingFromRouter(routerCfg, body.address, body.count || 4)
      sendJson(res, 200, result)
      return
    }

    // /customers/:id/block { address, blocked }
    if (req.method === 'POST' && parts[0] === 'customers' && parts[2] === 'block') {
      const body = await readJsonBody(req)
      if (!body.address) {
        sendJson(res, 400, { error: 'address is required' })
        return
      }
      const routerCfg = await getRouter(config.defaultRouterId)
      const result = await provisioning.setCustomerBlocked(routerCfg, body.address, body.blocked !== false)
      void audit(body.blocked !== false ? 'block_customer' : 'unblock_customer', 'customer', parts[1], {
        address: body.address,
      })
      sendJson(res, 200, result)
      return
    }

    // ------------------------------------------------------------------
    // Public captive-portal endpoints (rate limited above)
    // ------------------------------------------------------------------

    // GET /packages - list active packages for the portal
    if (req.method === 'GET' && url.pathname === '/packages') {
      const packages = await db.select('packages', {
        columns:
          'id,name,price_amount,duration,data_limit,speed_limit,device_limit',
        filters: { is_active: 'eq.true' },
        order: 'price_amount.asc',
      })
      sendJson(res, 200, { packages })
      return
    }

    // GET /account/:phone - customer self-service lookup (public route, rate
    // limited; the "phone number" is treated as the account identifier).
    // Returns the customer's purchase history (paid stk_requests joined to
    // the vouchers they minted) and a live summary of their most recent
    // active purchase: time/data remaining is derived from the same
    // expires_at / package limits the bridge provisions into RouterOS.
    if (req.method === 'GET' && parts[0] === 'account' && parts[1] && parts.length === 2) {
      const { normalizePhone } = require('./src/daraja')
      const phone = normalizePhone(decodeURIComponent(parts[1]))
      if (!phone) {
        sendJson(res, 400, { error: 'Invalid phone number (expected 07XX / 2547XX / +2547XX)' })
        return
      }

      const purchases = await db.select('stk_requests', {
        columns: 'id,package_name,amount,status,mpesa_receipt,voucher_code,created_at',
        filters: { phone: `eq.${phone}` },
        order: 'created_at.desc',
        limit: 20,
      })

      // Enrich paid purchases with the minted voucher's live expiry + package
      // limits (usage accounting lives in RouterOS, not the DB, so "data
      // used" is approximated from the package definition).
      const latestPaid = purchases.find((p) => p.status === 'paid' && p.voucher_code)
      let current = null
      if (latestPaid) {
        const vRows = await db.select('vouchers', {
          columns: 'code,package_name,expires_at,expired_at',
          filters: { code: `eq.${latestPaid.voucher_code}` },
          limit: 1,
        })
        const voucher = vRows[0]
        const pkgRows = await db.select('packages', {
          columns: 'name,duration,data_limit,speed_limit,device_limit,price_amount',
          filters: { name: `eq.${latestPaid.package_name}` },
          limit: 1,
        })
        const pkg = pkgRows[0]
        if (voucher) {
          const expiresAt = voucher.expires_at ? new Date(voucher.expires_at) : null
          const expired = voucher.expired_at || (expiresAt && expiresAt.getTime() <= Date.now())
          const remainingMs = expiresAt && !expired ? expiresAt.getTime() - Date.now() : 0
          current = {
            voucherCode: voucher.code,
            packageName: voucher.package_name,
            dataLimit: pkg?.data_limit || '—',
            speedLimit: pkg?.speed_limit || '—',
            devices: pkg?.device_limit || 1,
            expiresAt: voucher.expires_at,
            expired: !!expired,
            remainingLabel: expired
              ? 'Expired'
              : expiresAt
                ? formatRemaining(remainingMs)
                : 'No expiry (never expires)',
          }
        }
      }

      sendJson(res, 200, {
        phone,
        current,
        purchases: purchases.map((p) => ({
          packageName: p.package_name,
          amount: p.amount,
          status: p.status,
          mpesaReceipt: p.mpesa_receipt || undefined,
          voucherCode: p.voucher_code || undefined,
          createdAt: p.created_at,
        })),
      })
      return
    }

    // POST /pay { phone, packageId } - initiate M-Pesa STK Push
    if (req.method === 'POST' && url.pathname === '/pay') {
      if (!daraja) {
        sendJson(res, 503, { error: 'M-Pesa payments are not configured on this hotspot' })
        return
      }
      const body = await readJsonBody(req)
      const phone = normalizePhone(body.phone)
      if (!phone) {
        sendJson(res, 400, { error: 'A valid Safaricom phone number is required (e.g. 07XX or 2547XX)' })
        return
      }
      const pkgRows = await db.select('packages', {
        columns: 'id,name,price_amount,duration,data_limit,speed_limit,device_limit',
        filters: { id: `eq.${body.packageId}`, is_active: 'eq.true' },
        limit: 1,
      })
      const pkg = pkgRows[0]
      if (!pkg) {
        sendJson(res, 404, { error: 'Package not found or inactive' })
        return
      }

      let push
      try {
        push = await daraja.stkPush({
          phone,
          amount: pkg.price_amount,
          accountReference: config.daraja.shortcode,
          description: 'Internet',
        })
      } catch (err) {
        console.warn('[pay] STK push failed:', err.message)
        sendJson(res, 502, { error: `M-Pesa request failed: ${err.message}` })
        return
      }

      const inserted = await db.insert('stk_requests', {
        checkout_request_id: push.checkoutRequestId,
        merchant_request_id: push.merchantRequestId,
        phone,
        package_id: pkg.id,
        package_name: pkg.name,
        amount: pkg.price_amount,
        status: 'pending',
      })
      const stkRequest = inserted[0]
      console.log(`[pay] STK push sent to ${phone} for ${pkg.name} (${push.checkoutRequestId})`)
      sendJson(res, 200, {
        checkoutRequestId: push.checkoutRequestId,
        statusUrl: `/pay/${push.checkoutRequestId}`,
        message: push.customerMessage || 'Enter your M-Pesa PIN on the prompt sent to your phone.',
      })
      void audit('stk_push_initiated', 'stk_request', stkRequest.id, { phone, package: pkg.name })
      return
    }

    // GET /pay/:checkoutRequestId - poll payment status for the portal
    if (req.method === 'GET' && parts[0] === 'pay' && parts[1] && parts.length === 2) {
      const checkoutRequestId = decodeURIComponent(parts[1])
      const rows = await db.select('stk_requests', {
        columns: 'id,checkout_request_id,phone,package_name,amount,status,result_code,result_desc,mpesa_receipt,voucher_code,created_at',
        filters: { checkout_request_id: `eq.${checkoutRequestId}` },
        limit: 1,
      })
      const request = rows[0]
      if (!request) {
        sendJson(res, 404, { error: 'Unknown checkout request' })
        return
      }
      // Late callback? Query Daraja directly when the request is still pending.
      if (request.status === 'pending' && daraja) {
        try {
          const q = await daraja.stkQuery(request.checkout_request_id)
          if (q.paid) {
            await db.updateQuietly('stk_requests', { id: `eq.${request.id}` }, {
              status: 'paid',
              result_code: q.resultCode,
              result_desc: q.resultDesc,
              mpesa_receipt: q.mpesaReceipt,
              updated_at: new Date().toISOString(),
            })
            request.status = 'paid'
            request.mpesa_receipt = q.mpesaReceipt
          } else if (q.failed) {
            await db.updateQuietly('stk_requests', { id: `eq.${request.id}` }, {
              status: 'failed',
              result_code: q.resultCode,
              result_desc: q.resultDesc,
              updated_at: new Date().toISOString(),
            })
            request.status = 'failed'
            request.result_desc = q.resultDesc
          }
        } catch (err) {
          console.warn(`[pay] stkQuery ${request.checkout_request_id}:`, err.message)
        }
      }
      sendJson(res, 200, {
        status: request.status,
        packageName: request.package_name,
        amount: request.amount,
        mpesaReceipt: request.mpesa_receipt,
        voucherCode: request.status === 'paid' ? request.voucher_code : undefined,
        resultDesc: request.result_desc || undefined,
      })
      return
    }

    // POST /mpesa/callback - Daraja posts the STK outcome here
    if (req.method === 'POST' && url.pathname === '/mpesa/callback') {
      const body = await readJsonBody(req)
      const cb = parseStkCallback(body)
      if (!cb || !cb.checkoutRequestId) {
        sendJson(res, 200, { ResultCode: 0, ResultDesc: 'Accepted (unrecognized payload)' })
        return
      }
      const rows = await db.select('stk_requests', {
        columns: 'id,status',
        filters: { checkout_request_id: `eq.${cb.checkoutRequestId}` },
        limit: 1,
      })
      const request = rows[0]
      if (!request) {
        sendJson(res, 200, { ResultCode: 0, ResultDesc: 'Accepted (unknown checkout)' })
        return
      }
      const paid = cb.resultCode === 0
      await db.updateQuietly('stk_requests', { id: `eq.${request.id}` }, {
        status: paid ? 'paid' : 'failed',
        result_code: cb.resultCode,
        result_desc: cb.resultDesc,
        mpesa_receipt: cb.mpesaReceipt,
        updated_at: new Date().toISOString(),
      })
      console.log(`[mpesa] callback for ${cb.checkoutRequestId}: ${paid ? 'PAID' : 'failed'} (${cb.resultDesc})`)
      void audit('stk_callback', 'stk_request', request.id, {
        paid,
        receipt: cb.mpesaReceipt,
        resultDesc: cb.resultDesc,
      })
      // Daraja requires a 200 acknowledgement in this shape.
      sendJson(res, 200, { ResultCode: 0, ResultDesc: 'Accepted' })
      return
    }

    sendJson(res, 404, { error: 'not found' })
  } catch (err) {
    state.errors += 1
    console.error('[http]', err.message)
    sendJson(res, 500, { error: err.message })
  }
})

// ---------------------------------------------------------------------------
// Main loop
// ---------------------------------------------------------------------------

let running = true

async function pollOnce() {
  state.lastPollAt = new Date().toISOString()
  state.polls += 1
  const results = await Promise.allSettled([
    syncPackageProfiles(),
    syncVouchers(),
    expireVouchers(),
    syncStkPayments(),
    reconcileStkRequests(),
  ])
  for (const r of results) {
    if (r.status === 'rejected') {
      state.errors += 1
      console.warn('[poll] worker failed:', r.reason && r.reason.message)
    }
  }
}

async function main() {
  console.log(`[bridge] Orion MikroTik bridge starting on port ${config.port}`)
  console.log(`[bridge] Supabase: ${config.supabaseUrl.replace(/^https:\/\//, '').split('.')[0]}`)

  server.listen(config.port, () => {
    console.log(`[bridge] HTTP API listening on http://127.0.0.1:${config.port} (auth: x-bridge-key header)`)
  })

  while (running) {
    try {
      await pollOnce()
    } catch (err) {
      state.errors += 1
      console.warn('[poll] unexpected:', err.message)
    }
    await new Promise((resolve) => setTimeout(resolve, config.pollIntervalMs))
  }
}

process.on('SIGINT', () => {
  console.log('\n[bridge] shutting down')
  running = false
  server.close(() => process.exit(0))
  setTimeout(() => process.exit(0), 2000).unref()
})

main().catch((err) => {
  console.error('[bridge] fatal:', err)
  process.exit(1)
})
