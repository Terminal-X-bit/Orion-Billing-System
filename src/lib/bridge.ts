// MikroTik bridge API client.
//
// The dashboard talks to the on-prem bridge (mikrotik-bridge/, default port
// 8787), which owns the real RouterOS API connection. Auth is the shared
// `x-bridge-key` header the bridge prints at startup (BRIDGE_API_KEY).
//
// Resolution order for the bridge URL:
//   1. operator override, persisted in localStorage (Settings -> MikroTik)
//   2. VITE_BRIDGE_URL build-time env (set in .env.local)
//   3. window.location.hostname + default port 8787

export type BridgeStatus = {
  ok: boolean
  startedAt: string
  lastPollAt: string | null
  polls: number
  errors: number
  pollIntervalMs: number
  defaultRouterId: string | null
}

export type BridgeSession = {
  router_user_id: string
  session_id: string
  username: string
  address: string
  mac: string
  uptime: string
  session_time_left: string
  bytes_in: number
  bytes_out: number
  login_by: string
  comment: string
  profile: string
  server: string
  since: string
}

export type BridgeHealth = {
  identity: string
  board_name: string
  version: string
  uptime: string
  cpu_load: number
  free_memory_mb: number
  total_memory_mb: number
  interfaces_total: number
  interfaces_running: number
  bytes_sent: number
  bytes_received: number
}

export type BridgePing = {
  sent: number
  received: number
  loss_pct: number
  avg_ms: number | null
}

export type BridgeConfig = { url: string; apiKey: string }

const URL_STORAGE_KEY = 'orion_bridge_url'
const KEY_STORAGE_KEY = 'orion_bridge_key'
const ROUTER_ID_STORAGE_KEY = 'orion_bridge_router_id'
const DEFAULT_BRIDGE_PORT = 8787

/** Validate + normalize an http(s) URL, or null when invalid. */
function safeHttpUrl(raw: string | null | undefined): string | null {
  if (!raw) return null
  try {
    const u = new URL(raw.trim())
    if (u.protocol !== 'http:' && u.protocol !== 'https:') return null
    return u.toString().replace(/\/$/, '')
  } catch {
    return null
  }
}

function localStorageGet(key: string): string {
  try {
    return localStorage.getItem(key) || ''
  } catch {
    return ''
  }
}

export function getBridgeConfig(): BridgeConfig {
  const url =
    safeHttpUrl(localStorageGet(URL_STORAGE_KEY)) ||
    safeHttpUrl((import.meta.env?.VITE_BRIDGE_URL as string | undefined) || '') ||
    (typeof window !== 'undefined' && window.location.hostname
      ? `http://${window.location.hostname}:${DEFAULT_BRIDGE_PORT}`
      : `http://localhost:${DEFAULT_BRIDGE_PORT}`)
  return { url, apiKey: localStorageGet(KEY_STORAGE_KEY) }
}

export function setBridgeConfig(url: string, apiKey: string) {
  try {
    if (url.trim()) localStorage.setItem(URL_STORAGE_KEY, safeHttpUrl(url) || url.trim())
    else localStorage.removeItem(URL_STORAGE_KEY)
    if (apiKey.trim()) localStorage.setItem(KEY_STORAGE_KEY, apiKey.trim())
    else localStorage.removeItem(KEY_STORAGE_KEY)
  } catch {
    /* private mode */
  }
}

/** Router id used for live calls (mirrors BRIDGE_DEFAULT_ROUTER_ID). */
export function getBridgeRouterId(): string {
  try {
    return localStorage.getItem(ROUTER_ID_STORAGE_KEY) || ''
  } catch {
    return ''
  }
}

export function setBridgeRouterId(id: string) {
  try {
    if (id.trim()) localStorage.setItem(ROUTER_ID_STORAGE_KEY, id.trim())
    else localStorage.removeItem(ROUTER_ID_STORAGE_KEY)
  } catch {
    /* private mode */
  }
}

export class BridgeError extends Error {
  status: number
  constructor(message: string, status: number) {
    super(message)
    this.status = status
  }
}

async function bridgeFetch<T>(
  path: string,
  { method = 'GET', body }: { method?: string; body?: unknown } = {},
): Promise<T> {
  const { url, apiKey } = getBridgeConfig()
  let res: Response
  try {
    res = await fetch(`${url}${path}`, {
      method,
      headers: {
        'x-bridge-key': apiKey,
        ...(body !== undefined ? { 'Content-Type': 'application/json' } : {}),
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
      // Health/polling data must never come from the HTTP cache — a cached
      // 200 would mask a dead bridge.
      cache: 'no-store',
    })
  } catch {
    throw new BridgeError(`Cannot reach the MikroTik bridge at ${url}`, 0)
  }
  const text = await res.text().catch(() => '')
  let data: any = null
  try {
    data = text ? JSON.parse(text) : null
  } catch {
    /* non-JSON reply */
  }
  if (!res.ok) {
    const message = (data && data.error) || `Bridge request failed (HTTP ${res.status})`
    throw new BridgeError(message, res.status)
  }
  return data as T
}

export function formatBytes(bytes: number): string {
  const n = Number(bytes) || 0
  if (n >= 1024 ** 3) return `${(n / 1024 ** 3).toFixed(1)} GB`
  if (n >= 1024 ** 2) return `${(n / 1024 ** 2).toFixed(1)} MB`
  if (n >= 1024) return `${(n / 1024).toFixed(0)} KB`
  return `${n} B`
}

export const bridgeApi = {
  status: () => bridgeFetch<BridgeStatus>('/health'),

  /** Ask the bridge to run one provisioning/sync pass immediately. */
  syncNow: () => bridgeFetch<{ ok: boolean }>('/sync', { method: 'POST' }),

  listSessions: (routerId: string) =>
    bridgeFetch<{ router: string; sessions: BridgeSession[] }>(
      `/sessions/${encodeURIComponent(routerId)}`,
    ),

  disconnectSession: (routerId: string, activeId: string) =>
    bridgeFetch<{ disconnected: boolean }>(
      `/sessions/${encodeURIComponent(routerId)}/disconnect`,
      { method: 'POST', body: { activeId } },
    ),

  routerHealth: (routerId: string) =>
    bridgeFetch<BridgeHealth>(`/routers/${encodeURIComponent(routerId)}/health`),

  rebootRouter: (routerId: string) =>
    bridgeFetch<{ rebooting: boolean }>(`/routers/${encodeURIComponent(routerId)}/reboot`, {
      method: 'POST',
    }),

  pingFromRouter: (routerId: string, address: string, count = 4) =>
    bridgeFetch<BridgePing>(`/routers/${encodeURIComponent(routerId)}/ping`, {
      method: 'POST',
      body: { address, count },
    }),

  setCustomerBlocked: (routerId: string, address: string, blocked: boolean) =>
    bridgeFetch<{ blocked: boolean; address: string }>(
      `/customers/${encodeURIComponent(routerId)}/block`,
      { method: 'POST', body: { address, blocked } },
    ),
}
