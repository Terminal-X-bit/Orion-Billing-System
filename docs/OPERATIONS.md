# Orion Operations Guide

Deployment topology, container lifecycle, the tested backup/restore procedure,
secret handling, and the sequenced roadmap for the remaining operational
workstreams (observability, background jobs, UI hardening).

---

## 1. Topology

```
                        ┌──────────────────────────────┐
   operator browser ───▶│  dashboard (nginx, :8080)    │
                        │  - serves the built SPA      │
                        │  - proxies /portal* ─────────┼───┐
                        └──────────────┬───────────────┘   │
                                       │ HTTPS/HTTP        │
                        ┌──────────────▼───────────────┐   │
                        │  bridge (node, :8787)        │   │
                        │  - polls Supabase            │───┘ (same host,
                        │  - serves captive portal     │      shared origin)
                        └──────────────┬───────────────┘
                                       │ RouterOS binary API :8728
                        ┌──────────────▼───────────────┐
                        │  MikroTik router (hotspot)   │
                        └──────────────────────────────┘

        Supabase (hosted Postgres + Auth + REST) ←— polled by the bridge
```

- **dashboard** (repo-root `Dockerfile`): builds the Vite SPA, serves it with
  nginx (SPA fallback, hashed-asset caching, security headers) and proxies
  `/portal*` to the bridge so the operator UI and the guest portal share one
  origin — that is what keeps the dashboard's reachability checks CORS-free.
- **bridge** (`mikrotik-bridge/Dockerfile`): the worker loop + captive portal
  + M-Pesa (Daraja) integration. Must be reachable from the MikroTik router's
  hotspot network (guests are redirected to it via `portal/router-login.html`)
  **and** must reach the router on :8728. Publish it on the LAN interface,
  not just localhost.
- **Supabase** stays hosted — no database container here. The backup scripts
  in §3 are the safety net for it.

## 2. Deploying with compose

```bash
cp deploy/env.templates bridge.env      # fill in service-role key, router creds
cp deploy/env.templates dashboard.env   # fill in VITE_SUPABASE_URL/ANON_KEY
docker compose up -d --build
```

- Dashboard UI: http://localhost:8080 — guest portal also reachable at
  http://localhost:8080/portal (proxied to the bridge).
- Bridge API: http://localhost:8787/health (needs the `x-bridge-key` header
  for authenticated endpoints; `/health` itself is open for liveness checks).
- Update flow: `git pull && docker compose up -d --build` — builds are cached,
  so an unchanged app rebuilds in seconds.

The bridge's `/health` reports uptime and poll counters; compose's
`restart: unless-stopped` handles crashes, and the Docker healthchecks flip
the containers to `unhealthy` after repeated failures. Wire your monitor of
choice (Uptime Kuma is a fine edge-friendly pick) to the dashboard's `/` and
the bridge's `/health`.

## 3. Backups & restore

Supabase backs up its own infrastructure, but *you* own the ability to
recover your data — especially before schema migrations or Supabase project
maintenance. The scripts live in `scripts/db/`:

### 3.1 Backup

```bash
./scripts/db/backup.sh "postgresql://postgres:PASS@db.ezcwgyhwotomranbyuyh.supabase.co:5432/postgres" \
  --out /var/backups/orion --keep 14
```

- Custom-format dump (`-Fc`, compressed) + sha256 checksum sidecar.
- `--no-owner --no-privileges` so the dump restores onto any target without
  depending on Supabase's `supabase_*` roles.
- Use the **IPv4/pooler** hostname from Supabase Project Settings → Database —
  the direct `db.*.supabase.co` hostname is IPv6-only on many networks.
- Cron it nightly (example in the script header), and copy the output
  directory off-host (restic/borg/rclone to S3/B2) — backups on the same
  disk as the database they protect are not backups.

### 3.2 Restore (the tested part)

```bash
# Non-destructive verify of any dump against a scratch database:
./scripts/db/restore.sh backups/orion-20260918T023000Z.dump \
  "postgresql://postgres:PASS@localhost:5432/postgres" --verify-only

# Real restore (self-managed Postgres only):
./scripts/db/restore.sh backups/orion-20260918T023000Z.dump \
  "postgresql://postgres:PASS@localhost:5432/postgres" --drop
```

- `--verify-only` creates `orion_verify_<stamp>`, restores, runs integrity
  checks (core tables exist and are queryable; orphan counts as warnings),
  drops the scratch DB. It never touches the target's real schema.
- `--drop` is self-managed-Postgres-only; on hosted Supabase restore by
  pointing a new project at the dump, or ask Supabase support for a PITR
  restore.
- **Verify every backup on arrival.** An unverified backup is just a file.

### 3.3 The drill that keeps it honest

CI (`.github/workflows/ci.yml`, `db-restore-drill` job) applies
`supabase/local-restore-shim.sql` (vanilla-Postgres stand-ins for Supabase's
roles and auth helpers), applies `supabase/schema.sql`, runs `backup.sh`,
then `restore.sh --verify-only` against a scratch DB — on every push. If the
procedure or the schema drifts, CI goes red instead of a 3 a.m. restore
failing.

## 4. Secrets

- `.gitignore` covers `.env*`, `bridge.env`, `dashboard.env` — real keys never
  enter the repo. Templates live in `deploy/env.templates` and `.env.example`.
- The bridge holds the **service-role key** (bypasses RLS) — it must never
  run outside your infrastructure, and `mikrotik-bridge/README.md` documents
  why the dashboard only ever gets the anon key.
- Rotation: regenerate `BRIDGE_API_KEY` in `bridge.env`, `docker compose up
  -d` the bridge, then update the dashboard's bridge URL/auth in Settings —
  the dashboard stores the key in localStorage, so re-enter it per operator
  device.

## 5. Roadmap — remaining workstreams

Sequenced by leverage: each stage unblocks the ones after it.

### Stage 1 — Observability & alerts (next)

The shared `useProbe`/`useMikrotik` poller already knows when the bridge or
portal is down — today that knowledge dies in a React state object. Expose it:

1. **`/metrics` on the bridge** (Prometheus text format): poll round count,
   last poll age, error count, sessions, provisioning backlog, RouterOS
   connection state. The bridge already tracks all of these internally.
2. **Alerting**: Prometheus + Grafana + Alertmanager in compose (or a
   lightweight Uptime Kuma + webhook path for edge deployments).
3. **Alert routes**: bridge down, portal down, poll errors spiking, M-Pesa
   reconciliation backlog (stale `stk_requests`), voucher provisioning
   backlog, router down (via RouterOS health), disk space on the backup host.
4. **Per-tenant scoping**: the schema is single-tenant today; when the
   `tenant_id` migration lands (Stage 3), every metric and alert label gets a
   `tenant` label for free via the same code path.

### Stage 2 — Background jobs

The bridge's worker loop already does payment reconciliation (Daraja status
queries for stalled STK requests, 2h cancellation), expiry stamping, and
voucher provisioning — but all of it lives inside `index.js`'s single loop,
which means one slow job delays everything. Extract into:

1. **A jobs module** (`mikrotik-bridge/src/jobs/`) with independent
   intervals, per-job error budgets, and jittered scheduling — same
   zero-dependency style as the rest of the bridge.
2. **Reporting job**: nightly rollups (revenue by package/day, session
   counts, expiry forecasts) into new `report_daily` table; surfaced in the
   dashboard's Reports page and delivered by the notification path below.
3. **Notifications**: SMS delivery for voucher purchases, expiry reminders,
   and payment failures via the existing Supabase Edge Function
   (`supabase/functions/send-sms`). Retry with backoff, dead-letter after N
   attempts, and record every attempt in `audit_logs`.
4. **Idempotency**: every job writes a `jobs_state` row (job name, last run,
   last success, last error) — this is also the source for Stage 1's
   backlog/health metrics.

### Stage 3 — Multi-tenant + UI hardening

1. **Multi-tenancy**: `tenant_id` on every table + RLS policies keyed to a
   `tenant_id` claim in the JWT; dashboard resolves the tenant from auth,
   bridge gets a per-tenant service credential. This is the only migration
   that touches every table — do it before UI hardening so pages don't need
   re-hardening.
2. **UI hardening** for both workflows:
   - Customer flow: mobile-first portal polish, skeleton loaders instead of
     spinners, offline/reconnect UX, Kenyan-language copy review (EN/SW).
   - Operator flow: keyboard-first tables (arrow-key navigation, type-ahead
     search), bulk actions on vouchers/customers, CSV export, empty/loading/
     error states audit across all six management pages.
   - Accessibility: heading hierarchy, focus management in the portal modal
     flows, `aria-live` for the status pills.
   - Performance: virtualize the transactions/vouchers tables, code-split the
     Settings area, preconnect hints for Supabase.

---

*Runbook maintenance note: when topology changes, update §1; when a new job
or metric lands, add it to the Stage 1/2 checklists so the next implementer
doesn't re-derive the design.*
