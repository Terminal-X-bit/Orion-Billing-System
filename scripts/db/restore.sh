#!/usr/bin/env bash
# Restore an Orion dump produced by scripts/db/backup.sh and VERIFY it end to
# end. Safety gates are deliberately strict — restores are destructive.
#
# Usage:
#   ./scripts/db/restore.sh <dump-file> <target-dsn> [--drop] [--verify-only]
#
#   --drop        Drop the target's public schema first (DESTRUCTIVE). For
#                 self-managed Postgres only — never run against Supabase.
#   --verify-only Restore into a scratch database on the target server, run
#                 the integrity checks, then drop the scratch DB. Never
#                 touches the target's real schema. This is what CI runs.
#
# Target DSNs must be URL-style (postgresql://user:pass@host:5432/dbname) —
# the scratch database name is swapped into the path segment.
#
# Integrity checks (the "tested restore procedure" — an unverified backup is
# just a file):
#   1. pg_restore --list parses (archive is not corrupt)
#   2. every expected core table exists and its rows are queryable
#   3. orphan counts (vouchers w/o package, transactions w/o customer) are
#      reported as warnings — they are informational, not failures, because
#      deleted packages/customers leave legitimate orphans in this schema.
#
# See docs/OPERATIONS.md for the full runbook.

set -euo pipefail

usage() { echo "usage: $0 <dump-file> <target-dsn> [--drop] [--verify-only]" >&2; exit 2; }

[ $# -ge 2 ] || usage
DUMP="$1"
TARGET="$2"
shift 2

DROP=0
VERIFY_ONLY=0
while [ $# -gt 0 ]; do
  case "$1" in
    --drop) DROP=1; shift ;;
    --verify-only) VERIFY_ONLY=1; shift ;;
    *) usage ;;
  esac
done

command -v pg_restore >/dev/null || { echo "pg_restore not found (install postgresql-client)" >&2; exit 1; }
command -v psql >/dev/null || { echo "psql not found (install postgresql-client)" >&2; exit 1; }
[ -f "$DUMP" ] || { echo "dump not found: $DUMP" >&2; exit 1; }
case "$TARGET" in
  postgresql://*|postgres://*) ;;
  *) echo "target DSN must be URL-style (postgresql://...)" >&2; exit 2 ;;
esac

# --- 1. Archive parses -------------------------------------------------------
echo "[restore] checking archive ..."
pg_restore "$DUMP" --list >/dev/null
echo "[restore] archive OK"

STAMP="$(date -u +%Y%m%dT%H%M%SZ)"
SCRATCH="orion_verify_$STAMP"

if [ "$VERIFY_ONLY" = 1 ]; then
  echo "[restore] --verify-only: restoring into scratch database $SCRATCH"
  psql "$TARGET" -v ON_ERROR_STOP=1 -c "CREATE DATABASE \"$SCRATCH\";"
  # Swap the database name in the URL path: .../postgres -> .../<scratch>.
  RESTORE_URL="${TARGET%/*}/$SCRATCH"
else
  if [ "$DROP" = 1 ]; then
    echo "[restore] --drop: dropping and recreating the target's public schema"
    psql "$TARGET" -v ON_ERROR_STOP=1 <<'SQL'
DROP SCHEMA IF EXISTS public CASCADE;
CREATE SCHEMA public;
SQL
  fi
  RESTORE_URL="$TARGET"
fi

cleanup() {
  if [ "$VERIFY_ONLY" = 1 ]; then
    psql "$TARGET" -c "DROP DATABASE IF EXISTS \"$SCRATCH\";" >/dev/null || true
    echo "[restore] scratch database dropped"
  fi
}
trap cleanup EXIT

# --- 2. Restore ---------------------------------------------------------------
# --no-owner --no-privileges matches backup.sh so the restore lands on any
# target without depending on supabase_* roles existing.
echo "[restore] restoring ..."
pg_restore --no-owner --no-privileges --no-comments --exit-on-error \
  --dbname="$RESTORE_URL" "$DUMP"
echo "[restore] restore complete"

# --- 3. Data integrity checks -------------------------------------------------
echo "[restore] running integrity checks ..."
psql "$RESTORE_URL" -v ON_ERROR_STOP=1 <<'SQL'
-- Every core table must exist and be queryable.
SELECT 'hotspot_sessions' AS table_name, count(*) AS rows FROM hotspot_sessions
UNION ALL SELECT 'vouchers',          count(*) FROM vouchers
UNION ALL SELECT 'packages',          count(*) FROM packages
UNION ALL SELECT 'transactions',      count(*) FROM transactions
UNION ALL SELECT 'routers',           count(*) FROM routers
UNION ALL SELECT 'customers',         count(*) FROM customers
UNION ALL SELECT 'stk_requests',      count(*) FROM stk_requests
UNION ALL SELECT 'audit_logs',        count(*) FROM audit_logs
UNION ALL SELECT 'portal_settings',   count(*) FROM portal_settings;
SQL

# Orphan report (informational only — see header note).
psql "$RESTORE_URL" -t -A -F' | ' <<'SQL' || true
SELECT 'warn: vouchers without a matching package:', count(*)
FROM vouchers v LEFT JOIN packages p ON p.name = v.package_name
WHERE v.package_name IS NOT NULL AND p.id IS NULL
UNION ALL
SELECT 'warn: transactions without a matching customer:', count(*)
FROM transactions t LEFT JOIN customers c ON c.name = t.customer_name
WHERE t.customer_name IS NOT NULL AND c.id IS NULL;
SQL

echo "[restore] integrity checks passed"
echo "[restore] DONE — backup verified restorable"
