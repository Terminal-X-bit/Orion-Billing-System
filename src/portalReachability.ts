// Reachability probe for the live guest portal (served by the MikroTik bridge).
//
// The dashboard cannot fetch the portal page cross-origin, so we use a
// no-cors-mode fetch: if the network stack answers at all (HTTP 200, 404,
// CORS error, ...), the host is up and something is listening on that port.
// Only a full network failure (connection refused / DNS / timeout) means the
// portal host is down. That is exactly the distinction the preview header
// needs to show "online" vs "offline".
//
// The polling/lifecycle machinery (overlap protection, cancellation, keyed
// restarts) is shared with the bridge health poll — see hooks/useProbe.ts.

import { useCallback } from 'react'
import { resolvePortalUrl } from './portalUrl'
import { useProbe, type ProbeOutcome } from './hooks/useProbe'

export type PortalReachability = {
  url: string
  /** 'checking' | 'online' | 'offline' */
  state: 'checking' | 'online' | 'offline'
  /** Timestamp of the last completed probe, for a "checked Xs ago" tooltip. */
  checkedAt: number | null
  /** Force a probe round now; resolves with the fresh outcome. */
  refresh: () => Promise<ProbeOutcome<{ ok: boolean; checkedAt: number }>>
}

/** Single reachability check — resolves true when the host answers. */
export async function probePortalReachability(url: string, timeoutMs = 4000): Promise<boolean> {
  const controller = new AbortController()
  const timer = window.setTimeout(() => controller.abort(), timeoutMs)
  try {
    await fetch(url, {
      method: 'GET',
      mode: 'no-cors',
      cache: 'no-store',
      redirect: 'follow',
      signal: controller.signal,
    })
    // Any response (even opaque) means the server answered -> reachable.
    return true
  } catch {
    // Abort is a timeout -> treat as offline; every other network error too.
    return false
  } finally {
    window.clearTimeout(timer)
  }
}

/**
 * Polls the live portal URL and exposes an online/offline state.
 * Re-probes when the resolved URL changes; re-checks every 30s.
 */
export function usePortalReachability(intervalMs = 30_000): PortalReachability {
  const url = resolvePortalUrl()

  const probe = useCallback(async () => {
    const ok = await probePortalReachability(url)
    return { ok, checkedAt: Date.now() }
  }, [url])

  const { data, isChecking, refresh } = useProbe(probe, intervalMs, url)

  // The probe reports reachability in-band (`ok`) — it never throws, so
  // lastError is always null here and the state must read data.ok.
  const state: PortalReachability['state'] =
    isChecking && !data
      ? 'checking'
      : data?.ok
        ? 'online'
        : 'offline'

  return { url, state, checkedAt: data?.checkedAt ?? null, refresh }
}
