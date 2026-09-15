// Live portal preview for Settings -> Captive Portal Branding.
//
// Instead of a lookalike, this builds the preview from the REAL portal files:
// portal.html, portal.css and portal.js are raw-imported at build time, and
// the branding blob + brand-color <style> are injected exactly like the
// bridge does (script before </head>, followed by the override style). The
// preview therefore always matches what guests see — same markup, same
// styles, same client logic — with zero network dependency: /packages
// fails inside the srcdoc iframe, which is precisely the portal's demo
// fallback, so the simulated M-Pesa flow works in the preview too.

import portalHtml from '../mikrotik-bridge/portal/portal.html?raw'
import portalCss from '../mikrotik-bridge/portal/portal.css?raw'
import portalJs from '../mikrotik-bridge/portal/portal.js?raw'
import brandColorsSrc from '../mikrotik-bridge/src/brand-colors.js?raw'

export type PortalBrandingPreview = {
  businessName: string
  supportPhone: string
  primaryColor: string
  portalTitle: string
  portalMessage: string
  footerNote?: string
}

/**
 * Execute a dependency-free CommonJS module source in the browser and return
 * its exports. Used for brand-colors.js so the dashboard runs the exact same
 * color-derivation code as the bridge, and for the vendored QR generator
 * (Vite cannot import CJS named exports directly, so we evaluate the raw
 * source through a minimal module shim).
 */
export function loadCjsSource(src: string): Record<string, unknown> {
  const module = { exports: {} as Record<string, unknown> }
  // eslint-disable-next-line no-new-func
  const fn = new Function('module', 'exports', 'require', src)
  fn(module, module.exports, () => ({}))
  return module.exports
}

const brandColors = loadCjsSource(brandColorsSrc) as {
  buildBrandPalettes: (color: string) => {
    light: Record<string, string>
    dark: Record<string, string>
  }
}

/** JSON-escape "<" so "</script>" in operator text can't break the script tag. */
function brandingScript(branding: PortalBrandingPreview): string {
  const json = JSON.stringify(branding).replace(/</g, '\\u003c')
  return `<script>window.ORION_BRANDING=${json};</script>`
}

/** Same output shape as the bridge's buildBrandStyle(). */
export function brandStyleTag(primaryColor: string): string {
  const palettes = brandColors.buildBrandPalettes(primaryColor)
  const css = (palette: Record<string, string>) =>
    Object.entries(palette)
      .map(([name, value]) => `${name}: ${value};`)
      .join(' ')
  return (
    `<style>:root{${css(palettes.light)}}[data-theme="dark"]{${css(palettes.dark)}}</style>`
  )
}

/**
 * Compose the full preview document. Kept close to the bridge's injection
 * order: branding script + brand style immediately before </head>.
 */
export function buildPortalPreviewDocument(branding: PortalBrandingPreview): string {
  const html = portalHtml as string
  const style = portalCss as string
  const js = portalJs as string

  const head = brandingScript(branding) + brandStyleTag(branding.primaryColor) + '\n'
  const marker = '</head>'
  const idx = html.indexOf(marker)
  const out = idx === -1 ? head + html : html.slice(0, idx) + head + html.slice(idx)

  // Inline the CSS and JS so no relative requests are needed.
  return out
    .replace(/<link rel="stylesheet" href="portal\.css" \/>/, `<style>\n${style}\n</style>`)
    .replace(/<script src="portal\.js"><\/script>/, `<script>\n${js}\n</script>`)
    // Drop the Google Fonts links: they hang offline (guest Wi-Fi has no
    // internet before login) and the iframe has no network anyway.
    .replace(/<link rel="preconnect"[^>]*\/>\s*/g, '')
    .replace(/<link rel="stylesheet" href="https:\/\/fonts\.googleapis\.com[^>]*\/>\s*/g, '')
}
