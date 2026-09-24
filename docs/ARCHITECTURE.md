# Orion Architecture — 13-Component Reference Model

Verification of the reference hotspot-billing architecture (ISP → customers)
against this codebase, with implementation status, divergences, and the
specific gaps. Audit date: 2026-09-18.

Legend: ✅ implemented · 🟡 partial · ❌ missing · ⚠️ verified divergent

| # | Component | Status | Notes |
|---|-----------|--------|-------|
| 1 | Internet / ISP | ✅ | Out of scope for software; compose topology assumes the ISP modem feeds the MikroTik WAN. Fiber/4G-5G/Starlink agnostic. |
| 2 | Firewall | ⚠️ divergent | **No dedicated firewall component.** The MikroTik doubles as firewall (its built-in firewall is real, and the bridge never exposes the service-role key beyond its own process). Container hardening: bridge runs as unprivileged `node`, bridge API is key-gated, public routes are rate-limited. The diagram's "protects servers" box is not a separate host. |
| 3 | MikroTik Router / Gateway | ✅ | `mikrotik-bridge/src/routeros-client.js` — raw RouterOS binary API client (login, !re/!trap/!done), zero dependencies. Provisioning maps packages → hotspot profiles (rate-limit, shared-users) and vouchers → hotspot users (`limit-uptime`, `limit-bytes-total`). Router health, reboot, ping, session disconnect via `/routers/:id/*` endpoints. NAT/DHCP/hotspot config remain on-router. |
| 4 | RADIUS Server | ⚠️ divergent | **No RADIUS anywhere in the codebase** (verified: zero matches). Authentication is RouterOS **hotspot local users** provisioned directly by the bridge: voucher code = username = password, limits enforced via `limit-uptime`/`limit-bytes-total` user attributes. *Functionally equivalent for voucher flows* (auth, session accounting via RouterOS, time/data caps) — but not RADIUS, so external RADIUS features (centralized multi-AP auth, 802.1X, CoA) are not available. See "RADIUS gap" below. |
| 5 | Billing Application Server | ✅ | `mikrotik-bridge/index.js` — the bridge IS this server: worker loop (provision profiles, vouchers, transactions, expiry stamping), M-Pesa flows, authenticated HTTP API, captive portal serving. |
| 6 | Database Server | ✅ | Hosted Supabase Postgres. Schema (`supabase/schema.sql`): users→customers, packages, vouchers, payments→stk_requests/transactions, sessions→hotspot_sessions, data usage (via RouterOS counters), logs→audit_logs, portal_settings. Backups + tested restore: `scripts/db/`, run in CI. |
| 7 | Network Switch | ✅ | Physical layer — not software. Managed-switch VLANs/PoE/monitoring are deployment concerns; `docs/OPERATIONS.md` topology notes the bridge must be LAN-reachable. |
| 8 | Wi-Fi Access Points | ✅ | Any business-grade AP behind the MikroTik (UniFi, MikroTik cAP/wAP, TP-Link Omada in the Add-Router modal's model list). The dashboard manages them as `routers` rows; provisioning is router-side. |
| 9 | Captive Portal | ✅ | `mikrotik-bridge/portal/` served by the bridge at `/portal`: voucher login, package listing, M-Pesa STK purchase + polling, branding injection, demo fallback, router-login redirector. |
| 10 | Payment Integration | 🟡 | M-Pesa (Daraja STK Push + callback + reconcile + 2h cancellation) is complete. **Bank, card, and other mobile-money providers are missing** — `transactions.method` has columns for them (check constraint allows 'Card', 'Airtel Money', 'Voucher'), and the dashboard can record them manually, but there is no automated flow. |
| 11 | Admin Dashboard | ✅ | Vite/React SPA: packages, vouchers (generate/print/SMS), customers, transactions, routers, reports, settings (portal branding with live preview, MikroTik, SMS, payments), monitoring via bridge API. Audit-log writer on provisioning/kick/reboot. |
| 12 | Customer Portal | ✅ *(this change)* | Was **missing** — the portal could only buy/login, not check an account. Now: **"My account" tab** on the captive portal — phone-number lookup via `GET /account/:phone` returns active plan (time remaining, data allowance, speed, devices, voucher, expiry) and full purchase history. Remaining time derives from the same `expires_at` the bridge provisions into RouterOS. **Data-used-so-far is not shown** (see RADIUS gap). |
| 13 | Wi-Fi Customers / Devices | ✅ | End users connect via APs, hit the captive portal, pay via M-Pesa, receive a voucher code, and are enforced by RouterOS hotspot limits. Devices/smartphones need no software. |

## Verification of specific claims

- "RADIUS handles authentication/accounting" — **divergent by design.** The
  system authenticates via RouterOS hotspot users, not RADIUS. All four
  RADIUS functions (authn, authz, session accounting, usage/time tracking)
  exist but are split: authn via hotspot user-manager, time/data caps via
  user attributes, session data via RouterOS `/ip/hotspot/active` reads.
- "Billing app communicates with MikroTik/RADIUS" — the first half is
  verified (binary API); there is no RADIUS side.
- "Database stores data usage" — **not stored.** RouterOS enforces byte
  counters internally; the DB has no usage columns. Reports' data-consumed
  metric honestly reads "—" pending this.
- "Captive portal: view their account" (component 12) — **was missing, now
  implemented** (phone-based lookup; see above).
- Diagram prices (1h=KSh20, 24h=KSh100, 7d=KSh300) differ from the app's
  presets (70/350/1500) — presets are operator-editable data, not code.

## The RADIUS gap (the real architectural decision)

Adding RADIUS (e.g. freeRADIUS + MikroTik RADIUS client) would buy:

1. **Per-session usage accounting** in the DB (`radacct`) → real "data used",
   "data remaining", and the Reports data-consumed metric.
2. Centralized auth across multiple routers/APs.
3. Standard CoA (disconnect users mid-session without the current
   `/sessions` RouterOS kick path).

Cost: a new stateful service (or Supabase Edge call-out), session-DB
lifecycle, and a migration of existing vouchers → RADIUS users. The current
hotspot-user design is simpler and adequate for single-router deployments;
adopt RADIUS when multi-router or per-session-usage requirements arrive.

## Payment gap (component 10)

M-Pesa is the only automated rail. Adding others means one new module per
provider (à la `daraja.js`): initiation + webhook + reconciliation, a
`provider` column on `stk_requests`, and the portal's buy tab gaining a
method switch. The schema already tolerates the method names.
