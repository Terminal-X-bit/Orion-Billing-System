import { useCallback, useRef, useState } from 'react'
import {
  bridgeApi,
  getBridgeConfig,
  getBridgeRouterId,
  setBridgeRouterId,
  type BridgeHealth,
  type BridgeSession,
  type BridgeStatus,
} from '../lib/bridge'
import { useProbe, type ProbeOutcome } from './useProbe'

// Live MikroTik data via the on-prem bridge. Polls on an interval and exposes
// manual refresh + kick actions. All state is UI-level; the bridge remains the
// single owner of RouterOS communication.
//
// The polling/lifecycle machinery lives in the shared useProbe hook — the same
// implementation that drives the portal reachability pill (see
// portalReachability.ts). This module only owns the RouterOS-specific probe.
//
// The probe reports errors in-band (error field in the result) instead of
// throwing: useProbe keeps previous data on a thrown error, but here a dead
// bridge must immediately flip `status` to null so the Settings card pill
// shows offline rather than stale-online.

export type MikrotikLive = {
  status: BridgeStatus | null
  health: BridgeHealth | null
  sessions: BridgeSession[]
  lastError: string | null
  routerId: string
  /** Router id used for live calls (BRIDGE_DEFAULT_ROUTER_ID). */
  setRouterId: (id: string) => void
  refresh: () => Promise<ProbeOutcome<MikrotikProbe>>
  /** True while a probe round (initial poll or manual refresh) is in flight. */
  isChecking: boolean
  /** Bumps on every completed probe round. */
  probeCount: number
  /** Kick one live session on the router (real RouterOS active remove). */
  kick: (sessionId: string, username: string) => Promise<boolean>
}

type ProbeResult = {
  status: BridgeStatus | null
  health: BridgeHealth | null
  sessions: BridgeSession[]
  error: string | null
}

export type MikrotikProbe = ProbeResult

const DEFAULT_INTERVAL_MS = 15_000

function errorMessage(err: any, fallback: string): string {
  return err?.message || fallback
}

export function useMikrotik(intervalMs: number = DEFAULT_INTERVAL_MS): MikrotikLive {
  const [routerId, setRouterIdState] = useState<string>(() => getBridgeRouterId())
  const routerIdRef = useRef(routerId)
  routerIdRef.current = routerId

  const setRouterId = useCallback((id: string) => {
    setRouterIdState(id)
    setBridgeRouterId(id)
  }, [])

  // One probe round = bridge status + router health + live sessions.
  const probe = useCallback(async (): Promise<ProbeResult> => {
    let s: BridgeStatus
    try {
      s = await bridgeApi.status()
    } catch (err: any) {
      // Bridge itself is unreachable: nothing is live, clear everything.
      return { status: null, health: null, sessions: [], error: errorMessage(err, 'Bridge unreachable') }
    }

    const rid = routerIdRef.current
    if (!rid) {
      return { status: s, health: null, sessions: [], error: null }
    }

    try {
      const [h, sess] = await Promise.all([
        bridgeApi.routerHealth(rid),
        bridgeApi.listSessions(rid),
      ])
      return { status: s, health: h, sessions: sess.sessions, error: null }
    } catch (err: any) {
      // Bridge is up but the router call failed — report it, drop router data.
      return { status: s, health: null, sessions: [], error: errorMessage(err, 'Router unreachable') }
    }
  }, [])

  // The poll loop keys on the bridge URL so a reconfigured bridge restarts
  // the cycle immediately.
  const bridgeUrl = getBridgeConfig().url
  const { data, isChecking, probeCount, refresh: probeRefresh } = useProbe(
    probe,
    intervalMs,
    bridgeUrl,
  )

  // The probe reports errors in-band (see above), so useProbe's outcome.ok is
  // always true. Translate the in-band error into the outcome contract so
  // callers of refresh() (Settings "Test connection") see the real result.
  const refresh = useCallback(async (): Promise<ProbeOutcome<MikrotikProbe>> => {
    const outcome = await probeRefresh()
    if (outcome.ok && outcome.data.error) return { ok: false, error: outcome.data.error }
    return outcome
  }, [probeRefresh])

  const kick = useCallback(async (sessionId: string, _username: string) => {
    const rid = routerIdRef.current
    if (!rid) return false
    try {
      await bridgeApi.disconnectSession(rid, sessionId)
      return true
    } catch (err: any) {
      console.warn('Kick failed:', errorMessage(err, 'Kick failed'))
      return false
    }
  }, [])

  return {
    status: data?.status ?? null,
    health: data?.health ?? null,
    sessions: data?.sessions ?? [],
    lastError: data?.error ?? null,
    routerId,
    setRouterId,
    refresh,
    isChecking,
    probeCount,
    kick,
  }
}
