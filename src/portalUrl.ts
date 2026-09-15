// Resolves the URL of the live guest portal (served by the MikroTik bridge).
//
// The dashboard cannot know the bridge's address on its own: the bridge runs
// somewhere on the hotspot network and its address lives in its own env.
// Resolution order:
//   1. operator override, persisted in localStorage (Settings input)
//   2. VITE_PORTAL_URL build-time env (set in .env.local, e.g. http://192.168.88.10:8787)
//   3. window.location.hostname + the bridge's default port 8787
//
// Only http(s) URLs are accepted — anything else (javascript:, data:, ...)
// is ignored so a bad value can never become a clickable link.

export const PORTAL_URL_STORAGE_KEY = 'orion_portal_url'

const DEFAULT_BRIDGE_PORT = 8787

/** Validate + normalize an http(s) URL, or null when invalid. */
export function safeHttpUrl(raw: string | null | undefined): string | null {
  if (!raw) return null
  try {
    const u = new URL(raw.trim())
    if (u.protocol !== 'http:' && u.protocol !== 'https:') return null
    return u.toString()
  } catch {
    return null
  }
}

export function getPortalUrlOverride(): string {
  try {
    return localStorage.getItem(PORTAL_URL_STORAGE_KEY) || ''
  } catch {
    return ''
  }
}

export function setPortalUrlOverride(url: string) {
  try {
    if (url.trim()) localStorage.setItem(PORTAL_URL_STORAGE_KEY, url.trim())
    else localStorage.removeItem(PORTAL_URL_STORAGE_KEY)
  } catch {
    /* private mode */
  }
}

/** Resolve the portal URL: override -> env -> hostname + default bridge port. */
export function resolvePortalUrl(): string {
  const override = safeHttpUrl(getPortalUrlOverride())
  if (override) return override

  const fromEnv = safeHttpUrl(
    (import.meta.env?.VITE_PORTAL_URL as string | undefined) || '',
  )
  if (fromEnv) return fromEnv

  if (typeof window !== 'undefined' && window.location.hostname) {
    return `http://${window.location.hostname}:${DEFAULT_BRIDGE_PORT}/portal`
  }
  return `http://localhost:${DEFAULT_BRIDGE_PORT}/portal`
}
