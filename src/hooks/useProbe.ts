// Shared polling-probe hook.
//
// One implementation for every "is X reachable / healthy, polled forever"
// concern in the dashboard. Today it drives:
//   - useMikrotik()          — MikroTik bridge + RouterOS data (Settings card)
//   - usePortalReachability()— live guest portal status (preview header)
//
// Lifecycle rules (formerly duplicated with subtle differences between the two
// consumers — now they behave identically):
//   - probe immediately on mount and on every identity/config change
//   - re-probe on the interval; a new round starts only after the previous
//     one settles, so a slow probe never overlaps itself
//   - unmount, key changes, and refresh() calls after unmount are all
//     cancellation-safe (no setState after unmount)
//   - `isChecking` is true during the first probe and for the whole duration
//     of any refresh(); between ticks it is false (a scheduled-but-waiting
//     timer is not an in-flight probe)
//   - on error, previous data is kept (stale until the next successful probe)

import { useCallback, useEffect, useRef, useState } from 'react'

export type ProbeState<TData> = {
  /** Latest successfully probed data, or null before the first success. */
  data: TData | null
  /** Error message from the most recent probe attempt, or null. */
  lastError: string | null
  /** True while a probe round is in flight (initial probe or refresh()). */
  isChecking: boolean
  /** Bumps on every completed refresh(); lets callers react to the outcome. */
  probeCount: number
}

/** What refresh() resolves with — it never rejects, so poll loops stay alive. */
export type ProbeOutcome<TData> =
  | { ok: true; data: TData }
  | { ok: false; error: string }

/**
 * Runs `probe` once immediately, then on `intervalMs` (with overlap
 * protection). `probe` must be stable — wrap it in useCallback.
 *
 * The polling loop restarts whenever `key` or `intervalMs` changes.
 */
export function useProbe<TData>(
  probe: () => Promise<TData>,
  intervalMs: number,
  key: string,
): ProbeState<TData> & { refresh: () => Promise<ProbeOutcome<TData>> } {
  const [data, setData] = useState<TData | null>(null)
  const [lastError, setLastError] = useState<string | null>(null)
  const [isChecking, setIsChecking] = useState(true)
  const [probeCount, setProbeCount] = useState(0)

  // Refs let refresh() reuse the exact probe/params the effect loop uses,
  // without being listed as effect deps (probe identity churn on parent
  // re-renders must not restart the poll loop — see PortalPreview's note on
  // literal-object churn).
  const probeRef = useRef(probe)
  probeRef.current = probe

  const runProbe = useCallback(async (): Promise<ProbeOutcome<TData>> => {
    try {
      const result = await probeRef.current()
      setData(result)
      setLastError(null)
      return { ok: true, data: result }
    } catch (err: any) {
      const message = err?.message || 'Probe failed'
      setLastError(message)
      // Previous data is intentionally kept: stale data beats no data while
      // the target is flapping.
      return { ok: false, error: message }
    } finally {
      setProbeCount((c) => c + 1)
    }
  }, [])

  // Resolves with the fresh outcome (never rejects) so callers — e.g. the
  // Settings card's "Test connection" button — can read THIS round's result
  // without waiting for a re-render.
  const refresh = useCallback((): Promise<ProbeOutcome<TData>> => {
    setIsChecking(true)
    return runProbe().finally(() => setIsChecking(false))
  }, [runProbe])

  const refreshRef = useRef(refresh)
  refreshRef.current = refresh

  useEffect(() => {
    let cancelled = false
    let timer: number | undefined

    const tick = async () => {
      await refreshRef.current()
      if (!cancelled) timer = window.setTimeout(tick, intervalMs)
    }

    void tick()

    return () => {
      cancelled = true
      if (timer) window.clearTimeout(timer)
    }
  }, [key, intervalMs])

  return { data, lastError, isChecking, probeCount, refresh }
}
