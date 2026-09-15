// Brand-color derivation shared by the bridge (portal HTML injection) and the
// dashboard's live portal preview (Settings -> Captive Portal Branding).
// Keeping one implementation means the preview always matches what guests see.

const DEFAULT_PRIMARY = '#d36b4d'
const HEX_RE = /^#[0-9a-fA-F]{6}$/

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
  const base = HEX_RE.test(primaryColor) ? primaryColor.toLowerCase() : DEFAULT_PRIMARY
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
 * per theme. The bridge inserts it before </head> so it wins over
 * portal.css without needing !important.
 */
function buildBrandStyle(primaryColor) {
  const palettes = buildBrandPalettes(primaryColor)
  return (
    `<style>:root{${paletteToCss(palettes.light)}}` +
    `[data-theme="dark"]{${paletteToCss(palettes.dark)}}</style>`
  )
}

module.exports = {
  DEFAULT_PRIMARY,
  HEX_RE,
  hexToRgb,
  rgbToHex,
  mix,
  luminance,
  buildBrandPalettes,
  buildBrandStyle,
  paletteToCss,
}
