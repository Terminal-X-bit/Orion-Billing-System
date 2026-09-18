# MikroTik bridge — zero-dependency Node service that connects Supabase
# billing to RouterOS hotspot provisioning and serves the captive portal.
#
# Build context is the repo root:
#   docker build -f mikrotik-bridge/Dockerfile -t orion-bridge .
#
# Runtime config is env-only (no bake-time args, so one image serves every
# environment) — see compose.yaml and mikrotik-bridge/README.md for the list:
#   SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, BRIDGE_API_KEY, MIKROTIK_*,
#   MPESA_* (optional; omitted runs the bridge without payment flows).

FROM node:22-alpine

WORKDIR /app

# No dependencies to install — the bridge is deliberately dependency-free —
# so just copy the service files. (A stray node_modules here is build junk.)
COPY mikrotik-bridge/package.json mikrotik-bridge/index.js ./
COPY mikrotik-bridge/src ./src
COPY mikrotik-bridge/portal ./portal

# Run as the unprivileged `node` user; the bridge only listens on TCP and
# needs no writable filesystem.
USER node

ENV NODE_ENV=production

EXPOSE 8787

# The bridge serves /health (uptime + poll counters). Gated behind
# start-period because the first poll cycle can take a moment.
HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:' + (process.env.BRIDGE_PORT || 8787) + '/health').then(r => process.exit(r.ok ? 0 : 1)).catch(() => process.exit(1))"

CMD ["node", "index.js"]
