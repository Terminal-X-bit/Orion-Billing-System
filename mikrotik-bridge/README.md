# Orion MikroTik Bridge

Standalone Node.js service that connects the Orion Supabase billing system to
MikroTik RouterOS. It keeps hotspot configuration on the router in sync with
billing records so the router is always the enforcement point.

```
Supabase (billing)  <----REST (service key)----  Bridge  ----RouterOS API (8728/8729)----  MikroTik
                                                     |
                                                     +--- HTTP API (:8787, x-bridge-key) --- dashboard
```

## What it does

| Supabase state                        | RouterOS action                                        |
| ------------------------------------- | ------------------------------------------------------ |
| Active package                        | Upsert `/ip/hotspot/user/profile` (rate limit, shared users, idle timeout) |
| Voucher with `mikrotik_user_synced=false` | Create `/ip/hotspot/user` (name = voucher code, `limit-uptime` = package duration, optional `limit-bytes-total`) |
| Voucher past `expires_at`             | Stamp `expired_at` (RouterOS independently expires the user via `limit-uptime`) |
| `stk_requests` row with `status=paid` | Insert matching `transactions` row (idempotent via `provider_ref`) + mint an access voucher which is then provisioned on the router |

Mapping rules (see `src/provisioning.js`):

- Package duration text (`"24 Hours"`, `"7 Days"`, `"1 Hour"`, `"30 Days"`) becomes
  the voucher user's `limit-uptime`.
- `speed_limit` (`"20 Mbps"`) becomes the profile `rate-limit` (`20M/20M`).
- `data_limit` (`"5 GB"`, `"Unlimited"`) becomes `limit-bytes-total` (or no cap).
- `device_limit` becomes profile `shared-users` (capped 1–10).
- Profile name: `pkg.mikrotik_profile` or `orion-<slugified package name>`.

Each voucher is a hotspot user whose username **and** password equal the voucher
code, so guests log in by typing the code once.

## Requirements

- Node.js >= 18 (uses global `fetch`)
- Network reachability from the bridge host to each router's API port
  (8728 plain or 8729 TLS), with the API service enabled on the router
- A Supabase service-role key (server-side only — never expose it to the browser)

## Router preparation (RouterOS)

```rsc
/ip service enable api
/user add name=orion-bridge group=full password=STRONG-PASSWORD
# optional: restrict the API user to the bridge host
/ip firewall filter add chain=input protocol=tcp dst-port=8728 src-address=<bridge-ip> action=accept
```

## Configuration

Copy `.env.example` to `.env` in this directory and fill in:

- `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` — project REST endpoint + service key
- `MIKROTIK_API_USER` / `MIKROTIK_API_PASSWORD` — RouterOS credentials for all routers
- `BRIDGE_API_KEY` — shared secret for the HTTP API (`x-bridge-key` header)
- `BRIDGE_DEFAULT_ROUTER_ID` — routers-table id used for package/voucher sync
- `BRIDGE_PORT`, `BRIDGE_POLL_INTERVAL_MS` — API port and sync cadence
- `MPESA_CONSUMER_KEY`, `MPESA_CONSUMER_SECRET`, `MPESA_SHORTCODE`,
  `MPESA_PASSKEY`, `MPESA_ENVIRONMENT` (`sandbox`/`production`), and
  `MPESA_CALLBACK_URL` — Safaricom Daraja credentials for STK Push. When unset,
  `/pay` responds 503 and the rest of the bridge works normally.

## Running

```bash
cd mikrotik-bridge
npm start          # or: node index.js
```

Console output lists the generated API key when `BRIDGE_API_KEY` is unset.

## HTTP API

Dashboard/operator endpoints require `x-bridge-key: <BRIDGE_API_KEY>`. The
`/portal*`, `/packages`, `/pay*` and `/mpesa/callback` endpoints are public
(used by the captive portal and Safaricom) and rate limited per IP instead.

| Method | Path                              | Auth | Body                  | Notes                                   |
| ------ | --------------------------------- | ---- | --------------------- | --------------------------------------- |
| GET    | `/health`                         | key  | –                     | Uptime, poll counters, error count      |
| GET    | `/sessions/:routerId`             | key  | –                     | Active hotspot sessions with usage      |
| POST   | `/sessions/:routerId/disconnect`  | key  | `{"activeId": "..."}` | Kick one session (RouterOS active `.id`) |
| GET    | `/routers/:routerId/health`       | key  | –                     | CPU/RAM/uptime/interface counters       |
| POST   | `/routers/:routerId/reboot`       | key  | –                     | Reboot the router                       |
| POST   | `/routers/:routerId/ping`         | key  | `{"address": "..."}`  | Ping from the router, returns loss/avg  |
| POST   | `/customers/:id/block`            | key  | `{"address": "...", "blocked": true}` | Firewall address-list `orion-blocked` |
| GET    | `/packages`                       | public | –                   | Active packages for the portal          |
| POST   | `/pay`                            | public | `{"phone": "07XX...", "packageId": "..."}` | Initiates M-Pesa STK Push, returns `checkoutRequestId` |
| GET    | `/pay/:checkoutRequestId`         | public | –                   | Poll status; returns `voucherCode` when paid |
| POST   | `/mpesa/callback`                 | public | Daraja STK callback | Webhook for Safaricom payment outcomes  |
| GET    | `/portal`                         | public | –                   | Captive portal login page (guest-facing) |
| GET    | `/portal.css`, `/portal.js`       | public | –                   | Captive portal assets                   |

### Payment flow

```
Captive portal            Bridge                          Safaricom Daraja
     |  POST /pay            |                                   |
     |---------------------->|  STK push (CustomerPayBillOnline) |
     |                       |---------------------------------->|
     |  { checkoutRequestId }|                                   |
     |<----------------------|                                   |
     |                       |        customer enters PIN on phone
     |  GET /pay/:id (poll)  |                                   |
     |---------------------->|<--------- POST /mpesa/callback ---|
     |  { status: paid,      |  stk_requests.status = 'paid'     |
     |    voucherCode }      |  fulfilment worker:               |
     |<----------------------|   1. transactions row (idempotent)|
     |                       |   2. vouchers row (minted)        |
     |                       |   3. voucher worker provisions    |
     |                       |      the hotspot user on MikroTik |
```

The guest connects to the Wi-Fi, enters the returned voucher code as the
hotspot username/password, and is online — no operator involvement.

If a callback is delayed, polling `/pay/:id` and the periodic reconcile worker
query Daraja's STK query API directly. Requests still pending after 2 hours are
marked `cancelled`.

Example:

```bash
curl -H "x-bridge-key: $BRIDGE_API_KEY" http://127.0.0.1:8787/health
```

## Schema additions

Run `supabase/schema.sql` (idempotent) to add the columns this bridge uses:

- `packages`: `speed_limit`, `device_limit`, `mikrotik_profile`, `synced_to_router`
- `vouchers`: `package_price`, `expires_at`, `mikrotik_user_synced`, `expired_at`
- `transactions`: `amount_value`, `customer_phone`, `checkout_request_id`,
  `mpesa_receipt`, `provisioned_at`, `provider_ref`
- `routers`: `api_port`, `api_user`, `last_synced_at`, `system_identity`
- tables `stk_requests`, `audit_logs`

## Captive portal

`portal/` contains a standalone, dependency-free login page that the bridge
serves at `http://<bridge-host>:8787/portal`. Guests see it when they join the
Wi-Fi; it matches the Orion dashboard design (DM Sans/Manrope, coral/sage
tokens, light+dark themes with the same `orion_theme` localStorage key).

The page offers two ways online:

1. **Voucher** — the code is submitted as both hotspot username and password to
   the MikroTik login handler (matching how vouchers are provisioned).
2. **Buy with M-Pesa** — loads packages from `GET /packages`, starts STK Push
   via `POST /pay`, polls `GET /pay/:checkoutRequestId`, and reveals the minted
   voucher code on success. Tapping **Start browsing** sends the guest to the
   `?dst=` target.

When the bridge is unreachable (e.g. the file is opened outside the hotspot for
a demo), the page falls back to bundled demo packages and simulates payments and
voucher logins, so the full flow can be shown without a router or Daraja.

### Router-side setup (one file + two commands)

Copy `portal/router-login.html` onto the router's hotspot html-directory as
`login.html`, substituting the bridge host, then allow guests to reach the
bridge:

```rsc
/ip hotspot profile set [find] html-directory=flash/hotspot
/ip hotspot walled-garden ip add action=accept disabled=no dst-address=<BRIDGE_IP>
```

The router's `login.html` immediately redirects guests to `/portal` carrying
`linkloginonly` (the router's POST login endpoint) and `dst` (their original
destination). Keep MikroTik's default `alogin.html` / `logout.html` pages so
post-login states still render.

## Next steps / integration ideas

- Persist per-router API credentials in a secrets manager instead of one shared pair.
- Replace the shared `default router` with per-package router assignment.
