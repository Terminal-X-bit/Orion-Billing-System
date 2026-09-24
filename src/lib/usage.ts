// Live data-usage windows, derived from MikroTik bridge session telemetry.
//
// The ispledger demo shows Today's / Weekly / Monthly Data Usage charts.
// RouterOS active sessions only report *cumulative* per-session counters
// (bytes-in/out), so the same user polled twice must not be double-counted,
// and a session resuming after a pause must still land its bytes on the right
// calendar day. This module keeps a tiny per-session accumulator: every poll
// contributes only the delta, bucketed into the local calendar day it arrived.
//
// All numbers are honest: with no bridge telemetry the UI shows empty states,
// never fabricated usage.

export type UsageSample = {
  /** Stable per-session key, e.g. `username@address`. */
  key: string
  bytesIn: number
  bytesOut: number
}

export type UsagePoint = {
  /** Calendar day start (local, ms epoch). */
  dayStart: number
  bytes: number
}

export type UsageWindows = {
  today: number
  week: number
  month: number
  /** Oldest-first daily series covering the month-to-date window. */
  series: UsagePoint[]
  hasData: boolean
}

/** Internal per-session accumulator: highest cumulative counter seen, plus the
 *  bytes credited per local calendar day. */
type SessionAcc = {
  cumulative: number
  byDay: Map<number, number>
}

const DAY_MS = 86_400_000

function startOfLocalDay(d: Date): number {
  const x = new Date(d)
  x.setHours(0, 0, 0, 0)
  return x.getTime()
}

function credit(acc: SessionAcc, dayStart: number, bytes: number) {
  acc.byDay.set(dayStart, (acc.byDay.get(dayStart) || 0) + bytes)
}

/**
 * Fold a fresh telemetry snapshot into the accumulator and derive the usage
 * windows. `store` is mutated in place; callers may persist it (e.g. to
 * localStorage) for continuity across reloads.
 *
 * Caveat (documented in the UI): the first time a session is observed its full
 * cumulative counter is credited to today — RouterOS does not expose when those
 * bytes were transferred.
 */
export function updateUsageWindows(
  store: Map<string, SessionAcc>,
  samples: UsageSample[],
  now: Date = new Date(),
): UsageWindows {
  const todayStart = startOfLocalDay(now)
  const weekStart = todayStart - 6 * DAY_MS
  const monthStart = startOfLocalDay(new Date(now.getFullYear(), now.getMonth(), 1))

  for (const s of samples) {
    const total = Math.max(0, Math.round(s.bytesIn + s.bytesOut))
    const acc = store.get(s.key)
    if (!acc || total < acc.cumulative) {
      // New session, or the counter restarted (re-authentication): credit what
      // we can see now to today, the only day attributable from a snapshot.
      const fresh = acc || { cumulative: 0, byDay: new Map<number, number>() }
      fresh.cumulative = total
      credit(fresh, todayStart, total)
      store.set(s.key, fresh)
    } else if (total > acc.cumulative) {
      credit(acc, todayStart, total - acc.cumulative)
      acc.cumulative = total
    }
    // total === acc.cumulative: no new bytes, nothing to credit.
  }

  // Sum per-day buckets across all sessions for each window.
  const sumSince = (from: number): number => {
    let sum = 0
    store.forEach((acc) => acc.byDay.forEach((bytes, day) => { if (day >= from) sum += bytes }))
    return sum
  }

  const series: UsagePoint[] = []
  for (let i = 29; i >= 0; i--) {
    const dayStart = todayStart - i * DAY_MS
    let bytes = 0
    store.forEach((acc) => { bytes += acc.byDay.get(dayStart) || 0 })
    series.push({ dayStart, bytes })
  }

  return {
    today: sumSince(todayStart),
    week: sumSince(weekStart),
    month: sumSince(monthStart),
    series,
    hasData: samples.length > 0 || store.size > 0,
  }
}
