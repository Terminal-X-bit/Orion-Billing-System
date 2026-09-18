# Multi-stage build for the Orion dashboard (Vite + React).
#
# The dashboard is a pure static SPA served by nginx with an SPA fallback and
# a proxy to the bridge — so the operator UI and the guest portal can share
# one origin. Sharing one origin is what makes the portal pill and the
# "Test connection" reachability checks work from a containerized deployment
# (no CORS, no cross-origin no-cors probes).
#
# Build context is the repo root:
#   docker build -f Dockerfile -t orion-dashboard .

# ---- Stage 1: build the SPA -------------------------------------------------
# Bun base (not node) because the project's dependency lockfile is bun.lock —
# package-lock.json is stale (it predates the test devDependencies), so npm ci
# would fail its lockfile-vs-package.json consistency check. Bun's
# --frozen-lockfile guarantees the same reproducibility against bun.lock.
FROM oven/bun:1-alpine AS build

WORKDIR /app

# Install from the committed lockfile (reproducible), then copy the rest of
# the app. The Supabase client is a runtime dep of the SPA bundle, so it must
# be installed before the build.
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile --no-progress

COPY index.html vite.config.ts tsconfig.json tsconfig.app.json tsconfig.node.json ./
COPY src ./src

# VITE_* vars are baked at build time (Vite inlines them into the bundle), so
# pass them as build args:
#   docker build --build-arg VITE_SUPABASE_URL=... --build-arg VITE_SUPABASE_ANON_KEY=...
ARG VITE_SUPABASE_URL
ARG VITE_SUPABASE_ANON_KEY
ARG VITE_PORTAL_URL
ARG VITE_BRIDGE_URL
ENV VITE_SUPABASE_URL=${VITE_SUPABASE_URL} \
    VITE_SUPABASE_ANON_KEY=${VITE_SUPABASE_ANON_KEY} \
    VITE_PORTAL_URL=${VITE_PORTAL_URL} \
    VITE_BRIDGE_URL=${VITE_BRIDGE_URL}

# `tsc -b` (part of npm run build) type-checks — CI parity with the Actions job.
RUN bun run build

# ---- Stage 2: serve with nginx ----------------------------------------------
FROM nginx:1.27-alpine

COPY deploy/nginx-orion.conf /etc/nginx/conf.d/default.conf

# SPA fallback + /portal proxy live in deploy/nginx-orion.conf.
EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1/ >/dev/null 2>&1 || exit 1

CMD ["nginx", "-g", "daemon off;"]
