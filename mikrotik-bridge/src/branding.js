// Portal branding store: reads the operator-configured branding row from
// Supabase (public.portal_settings, single row id = 1) and turns it into a
// safe blob the captive portal can consume.
//
// The dashboard's Settings -> Captive Portal Branding tab writes that row;
// the bridge injects it into /portal as window.ORION_BRANDING. If Supabase
// is unreachable or the table is missing, the portal falls back to the
// same defaults that used to be hardcoded in portal.html.

const DEFAULT_BRANDING = Object.freeze({
  businessName: 'Harbor House',
  supportPhone: '+254 700 123 456',
  primaryColor: '#d36b4d',
  portalTitle: "You're connected — sign in",
  portalMessage: 'Enter the voucher code from your receipt, or buy instant access with M-Pesa.',
  footerNote: '',
})

const MAX_LEN = {
  businessName: 48,
  supportPhone: 32,
  portalTitle: 96,
  portalMessage: 160,
  footerNote: 120,
}

const HEX_RE = /^#[0-9a-fA-F]{6}$/
const CONTROL_RE = /[\u0000-\u001f\u007f-\u009f]/g

/** Strip control chars, collapse whitespace, clamp to a max length. */
function cleanText(value, maxLen) {
  if (typeof value !== 'string') return ''
  const cleaned = value.replace(CONTROL_RE, ' ').replace(/\s+/g, ' ').trim()
  return cleaned.length > maxLen ? cleaned.slice(0, maxLen).trimEnd() : cleaned
}

/**
 * Sanitize an arbitrary row (or user input) into a safe branding object.
 * Unknown/missing fields fall back to defaults, so a half-written row
 * can never blank out the portal.
 */
function normalizeBranding(raw) {
  const out = { ...DEFAULT_BRANDING }
  if (!raw || typeof raw !== 'object') return out

  const businessName = cleanText(raw.business_name ?? raw.businessName, MAX_LEN.businessName)
  const supportPhone = cleanText(raw.support_phone ?? raw.supportPhone, MAX_LEN.supportPhone)
  const portalTitle = cleanText(raw.portal_title ?? raw.portalTitle, MAX_LEN.portalTitle)
  const portalMessage = cleanText(raw.portal_message ?? raw.portalMessage, MAX_LEN.portalMessage)
  const footerNote = cleanText(raw.footer_note ?? raw.footerNote, MAX_LEN.footerNote)
  const colorRaw = String(raw.primary_color ?? raw.primaryColor ?? '').trim().toLowerCase()

  if (businessName) out.businessName = businessName
  if (supportPhone) out.supportPhone = supportPhone
  if (portalTitle) out.portalTitle = portalTitle
  if (portalMessage) out.portalMessage = portalMessage
  // Empty footer note is meaningful (hides the line), so no truthiness guard.
  out.footerNote = footerNote
  if (HEX_RE.test(colorRaw)) out.primaryColor = colorRaw

  return out
}

function clamp8(n) {
  return Math.max(0, Math.min(255, Math.round(n)))
}

/** '#rrggbb' -> [r, g, b] (assumes HEX_RE already matched). */
function hexToRgb(hex) {
  return [
    parseInt(hex.slice(1, 3), 16),
    parseInt(hex.slice(3, 5), 16),
    parseInt(hex.slice(5, 7), 16),
  ]
}

/** [r, g, b] -> '#rrggbb' in lowercase hex. */
function rgbToHex(rgb) {
  return '#' + rgb.map((v) => clamp8(v).toString(16).padStart(2, '0')).join('')
}

/** Mix toward white (t > 0) or black (t < 0); t in [-1, 1]. */
function mix(hex, t) {
  const [r, g, b] = hexToRgb(hex)
  const k = Math.max(-1, Math.min(1, t))
  const target = k >= 0 ? 255 : 0
  const amount = Math.abs(k)
  return rgbToHex([r + (target - r) * amount, g + (target - g) * amount, b + (target - b) * amount])
}

/** Relative luminance (WCAG) — used to pick the readable ink on brand fills. */
function luminance(hex) {
  const [r, g, b] = hexToRgb(hex).map((v) => {
    const c = v / 255
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

/**
 * Derive the portal's brand tokens from one primary color, per theme.
 * Only brand-derived variables are overridden — neutral backgrounds/ink
 * keep the dashboard's palette in both themes.
 */
function buildBrandPalettes(primaryColor) {
  const base = HEX_RE.test(primaryColor) ? primaryColor.toLowerCase() : DEFAULT_BRANDING.primaryColor
  // Ink flips to dark when the brand fill gets light enough that white
  // text would fail contrast (default coral ~0.25 stays white, amber gold
  // ~0.30 flips to dark).
  const onBrand = luminance(base) > 0.28 ? '#192320' : '#ffffff'
  return {
    light: {
      '--coral': base,
      '--coral-subtle': mix(base, 0.85),
      '--coral-glow': mix(base, 0) + '30',
      '--on-brand': onBrand,
    },
    dark: {
      '--coral': mix(base, 0.08),
      '--coral-subtle': mix(base, -0.78),
      '--coral-glow': mix(base, 0) + '35',
      '--on-brand': onBrand,
    },
  }
}

/** Serialize one theme's palette to a `--var: value;` string. */
function paletteToCss(palette) {
  return Object.entries(palette)
    .map(([name, value]) => `${name}: ${value};`)
    .join(' ')
}

/**
 * Build the inline <style> that recolors the portal to the brand color,
 * per theme. Inserted before </head> so it wins over portal.css without
 * needing !important.
 */
function buildBrandStyle(primaryColor) {
  const palettes = buildBrandPalettes(primaryColor)
  return (
    `<style>:root{${paletteToCss(palettes.light)}}` +
    `[data-theme="dark"]{${paletteToCss(palettes.dark)}}</style>`
  )
}

/**
 * Build the inline <script> that hands branding to the portal.
 * JSON-encodes then escapes "<" so "</script>" inside operator-supplied
 * text can never break out of the script element.
 */
function buildBrandingScript(branding) {
  const json = JSON.stringify(branding).replace(/</g, '\\u003c')
  return `<script>window.ORION_BRANDING=${json};</script>`
}

/**
 * TTL-cached loader for the branding row. Uses the supabase-rest client's
 * select(); on any failure it serves the last known good branding (or
 * defaults) so the portal never breaks because Supabase is down.
 */
function makeBrandingStore(restClient, { cacheTtlMs = 30_000 } = {}) {
  let cache = { branding: { ...DEFAULT_BRANDING }, fetchedAt: 0, updatedAt: null }

  async function load({ force = false } = {}) {
    const fresh = Date.now() - cache.fetchedAt < cacheTtlMs
    if (!force && fresh) {
      return { branding: cache.branding, updatedAt: cache.updatedAt, cached: true }
    }
    try {
      const rows = await restClient.select('portal_settings', {
        columns: 'business_name,support_phone,primary_color,portal_title,portal_message,footer_note,updated_at',
        filters: { id: 'eq.1' },
        limit: 1,
      })
      const row = Array.isArray(rows) && rows.length > 0 ? rows[0] : null
      cache = {
        branding: normalizeBranding(row),
        fetchedAt: Date.now(),
        updatedAt: row && typeof row.updated_at === 'string' ? row.updated_at : null,
      }
    } catch (err) {
      // Keep serving the previous branding (or defaults) and surface why.
      cache.fetchedAt = Date.now() // back off until the next TTL window
      return {
        branding: cache.branding,
        updatedAt: cache.updatedAt,
        cached: true,
        error: err && err.message ? err.message : String(err),
      }
    }
    return { branding: cache.branding, updatedAt: cache.updatedAt, cached: false }
  }

  return { load, defaults: DEFAULT_BRANDING }
}

module.exports = {
  DEFAULT_BRANDING,
  normalizeBranding,
  buildBrandingScript,
  buildBrandStyle,
  buildBrandPalettes,
  makeBrandingStore,
  cleanText,
}
