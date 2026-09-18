// Tests for the shared polling-probe hook (src/hooks/useProbe.ts).
//
// Both reachability features — the Settings bridge card and the portal
// preview pill — run through this hook, so these tests pin down the contract
// they both rely on:
//   1. interval polling (immediate probe, sequential rounds, key-change restart)
//   2. error handling (stale data kept, fallback message for non-Errors)
//   3. the refresh() outcome contract ({ ok: true; data } | { ok: false; error },
//      never rejects — the Settings "Test connection" button depends on this)
//
// Timers are real: bun test has no fake-timer control, so suites use short
// intervals (2–30 ms) with generous assertion margins to stay deterministic.
// Every wait steps inside act(): under Bun + happy-dom, React renders
// scheduled outside act do not repaint on their own, but exiting an act scope
// flushes all pending work — so each waitUntil step both yields to timers and
// flushes the renders the probe triggered. Do NOT wrap a waitUntil in an
// outer act(): nested act defers flushes to the outermost scope, which
// deadlocks any render-dependent condition.

import { afterEach, describe, expect, test } from 'bun:test'
import { act } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { useProbe, type ProbeOutcome, type ProbeState } from './useProbe'

type Latest<T> = ProbeState<T> & { refresh: () => Promise<ProbeOutcome<T>> }

const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms))

async function waitUntil(condition: () => boolean, timeoutMs = 2_000): Promise<void> {
  const deadline = Date.now() + timeoutMs
  while (!condition()) {
    if (Date.now() > deadline) throw new Error('waitUntil timed out')
    await act(async () => {
      await sleep(2)
    })
  }
}

/** Probe stub that counts invocations. */
function makeProbe<T>(impl: () => Promise<T>) {
  const state = { calls: 0 }
  const fn = async () => {
    state.calls++
    return impl()
  }
  return { fn, get calls() { return state.calls } }
}

// --- render harness ---------------------------------------------------------

type Handle<T> = {
  readonly state: Latest<T>
  rerender: (next: { probe?: () => Promise<T>; intervalMs?: number; keyId?: string }) => void
  unmount: () => void
}

const mountedHandles: Array<{ unmount: () => void }> = []

// Safety net: unmount anything a failed test left behind.
afterEach(() => {
  while (mountedHandles.length) mountedHandles.pop()!.unmount()
})

function mountProbe<T>(
  probe: () => Promise<T>,
  { intervalMs = 60_000, keyId = 'k1' }: { intervalMs?: number; keyId?: string } = {},
): Handle<T> {
  let latest: Latest<T> | null = null

  const container = document.createElement('div')
  document.body.appendChild(container)

  const props = { probe, intervalMs, keyId }
  function Harness() {
    latest = useProbe(props.probe, props.intervalMs, props.keyId)
    return null
  }

  const root: Root = createRoot(container)
  act(() => root.render(<Harness />))

  let unmounted = false
  const handle: Handle<T> = {
    get state() {
      if (!latest) throw new Error('Probe harness rendered no state')
      return latest
    },
    rerender(next) {
      Object.assign(props, next)
      act(() => root.render(<Harness />))
    },
    unmount() {
      if (unmounted) return
      unmounted = true
      act(() => root.unmount())
      container.remove()
    },
  }
  mountedHandles.push(handle)
  return handle
}

// --- interval polling -------------------------------------------------------

describe('useProbe — interval polling', () => {
  test('probes immediately on mount and exposes the result', async () => {
    const probe = makeProbe(async () => 42)
    const h = mountProbe(probe.fn)

    // Before the first probe settles: no data yet, first round in flight.
    expect(h.state.data).toBeNull()
    expect(h.state.isChecking).toBe(true)

    await waitUntil(() => h.state.data === 42)
    expect(probe.calls).toBe(1)
    expect(h.state.isChecking).toBe(false)
    expect(h.state.lastError).toBeNull()
    expect(h.state.probeCount).toBe(1)

    // The interval is 60s: no further probes should fire.
    await act(async () => {
      await sleep(30)
    })
    expect(probe.calls).toBe(1)
  })

  test('re-probes on the interval, without runaway looping', async () => {
    const probe = makeProbe(async (): Promise<number> => probe.calls)
    const h = mountProbe(probe.fn, { intervalMs: 6 })

    await waitUntil(() => probe.calls >= 3)
    // Upper bound guards against a runaway loop that re-probes without
    // waiting for the interval: ~3 sequential 6ms rounds fit in 20ms,
    // ~20 rounds would not.
    await act(async () => {
      await sleep(20)
    })
    expect(probe.calls).toBeGreaterThanOrEqual(3)
    expect(probe.calls).toBeLessThanOrEqual(12)
    expect(h.state.data).toBeGreaterThan(0)
  })

  test('a slow probe never overlaps itself (next round waits for the previous)', async () => {
    let calls = 0
    let inFlight = 0
    let maxInFlight = 0
    const probe = async () => {
      calls++
      inFlight++
      maxInFlight = Math.max(maxInFlight, inFlight)
      await sleep(25)
      inFlight--
      return calls
    }
    const h = mountProbe(probe, { intervalMs: 2 })

    await act(async () => {
      await sleep(80)
    })
    expect(maxInFlight).toBe(1)
    expect(calls).toBeGreaterThanOrEqual(2) // it did keep polling, slowly
  })

  test('key change cancels the old loop and starts a new one', async () => {
    const a = makeProbe(async () => 'A')
    const b = makeProbe(async () => 'B')
    const h = mountProbe(a.fn, { intervalMs: 30, keyId: 'a' })
    await waitUntil(() => h.state.data === 'A')

    h.rerender({ keyId: 'b', probe: b.fn, intervalMs: 5 })
    await waitUntil(() => h.state.data === 'B')
    await act(async () => {
      await sleep(25)
    })

    expect(a.calls).toBe(1) // old loop did not fire again
    expect(b.calls).toBeGreaterThanOrEqual(2) // new loop polls on its interval
  })

  test('unmount stops the loop; an in-flight probe resolving late is harmless', async () => {
    let calls = 0
    let release!: () => void
    const gate = new Promise<void>((resolve) => {
      release = resolve
    })
    const probe = async () => {
      calls++
      if (calls === 1) await gate
      return calls
    }
    const h = mountProbe(probe, { intervalMs: 5 })
    await waitUntil(() => calls === 1)

    h.unmount()
    await act(async () => {
      release()
      await sleep(25)
    })

    expect(calls).toBe(1) // no further rounds were scheduled
    expect(h.state.probeCount).toBe(0) // no state updates after unmount
    expect(h.state.data).toBeNull()
  })
})

// --- error handling ---------------------------------------------------------

describe('useProbe — error handling', () => {
  test('a failed probe keeps previous data and records the error', async () => {
    let fail = false
    const probe = async () => {
      if (fail) throw new Error('bridge down')
      return 'v1'
    }
    const h = mountProbe(probe, { intervalMs: 5 })
    await waitUntil(() => h.state.data === 'v1')

    fail = true
    await waitUntil(() => h.state.lastError === 'bridge down')

    expect(h.state.data).toBe('v1') // stale data intentionally kept
    expect(h.state.isChecking).toBe(false)
    expect(h.state.probeCount).toBeGreaterThanOrEqual(2)
  })

  test('lastError clears once a probe succeeds again', async () => {
    let fail = false
    const probe = async () => {
      if (fail) throw new Error('down')
      return 'up'
    }
    const h = mountProbe(probe, { intervalMs: 5 })
    await waitUntil(() => h.state.data === 'up')

    fail = true
    await waitUntil(() => h.state.lastError === 'down')
    fail = false
    await waitUntil(() => h.state.data === 'up' && h.state.lastError === null)

    expect(h.state.lastError).toBeNull()
    expect(h.state.data).toBe('up')
  })

  test('non-Error rejections fall back to a generic message', async () => {
    const probe = async (): Promise<string> => {
      throw 'nope' // deliberately not an Error instance
    }
    const h = mountProbe(probe)
    await waitUntil(() => h.state.lastError !== null)

    expect(h.state.lastError).toBe('Probe failed')
    expect(h.state.data).toBeNull()
  })
})

// --- refresh() outcome contract ----------------------------------------------

describe('useProbe — refresh() outcome contract', () => {
  test('resolves with the fresh outcome and updates state', async () => {
    let value = 1
    const probe = async () => value
    const h = mountProbe(probe)
    await waitUntil(() => h.state.data === 1)

    value = 2
    let outcome!: ProbeOutcome<number>
    await act(async () => {
      outcome = await h.state.refresh()
    })

    expect(outcome).toEqual({ ok: true, data: 2 })
    expect(h.state.data).toBe(2)
    expect(h.state.lastError).toBeNull()
    expect(h.state.isChecking).toBe(false)
    expect(h.state.probeCount).toBe(2)
  })

  test('failures resolve as { ok: false, error } and never reject', async () => {
    let fail = true
    const probe = async () => {
      if (fail) throw new Error('socket hang up')
      return 'ok'
    }
    const h = mountProbe(probe)

    let outcome!: ProbeOutcome<string>
    await act(async () => {
      outcome = await h.state.refresh()
    })
    expect(outcome).toEqual({ ok: false, error: 'socket hang up' })
    expect(h.state.lastError).toBe('socket hang up')

    fail = false
    await act(async () => {
      outcome = await h.state.refresh()
    })
    expect(outcome).toEqual({ ok: true, data: 'ok' })
    expect(h.state.lastError).toBeNull()
  })

  test('isChecking spans the whole refresh, then clears', async () => {
    let release!: () => void
    const gate = new Promise<void>((resolve) => {
      release = resolve
    })
    const probe = async () => {
      await gate
      return 'gated'
    }
    const h = mountProbe(probe)

    // The initial (gated) probe is in flight.
    expect(h.state.isChecking).toBe(true)

    let outcome!: ProbeOutcome<string>
    let manual!: Promise<ProbeOutcome<string>>
    await act(async () => {
      manual = h.state.refresh()
      await sleep(2)
    })
    expect(h.state.isChecking).toBe(true) // still gated

    await act(async () => {
      release()
      outcome = await manual
    })
    expect(h.state.isChecking).toBe(false)
    expect(outcome).toEqual({ ok: true, data: 'gated' })
  })

  test('a manual refresh can overlap the polling loop without disturbing it', async () => {
    let calls = 0
    const probe = async () => {
      calls++
      await sleep(10)
      return calls
    }
    const h = mountProbe(probe, { intervalMs: 60_000 })
    await waitUntil(() => h.state.data === 1)

    let manual!: Promise<ProbeOutcome<number>>
    await act(async () => {
      manual = h.state.refresh()
      await sleep(1)
    })
    await act(async () => {
      const outcome = await manual
      expect(outcome.ok).toBe(true)
    })

    expect(h.state.data).toBe(2)
    expect(h.state.probeCount).toBe(2)
    // The loop's next tick is still a full interval away — the manual refresh
    // must not have scheduled an extra round.
    await act(async () => {
      await sleep(10)
    })
    expect(calls).toBe(2)
  })

  test('refresh() after unmount resolves without touching state', async () => {
    let calls = 0
    const probe = async () => {
      calls++
      return calls
    }
    const h = mountProbe(probe)
    await waitUntil(() => h.state.data === 1)
    const snapshot = h.state

    h.unmount()
    let outcome!: ProbeOutcome<number>
    await act(async () => {
      outcome = await snapshot.refresh()
    })

    expect(outcome).toEqual({ ok: true, data: 2 })
    expect(snapshot.probeCount).toBe(1) // no re-render happened after unmount
  })
})
