#!/usr/bin/env bash
# Back up the Orion Supabase database to a timestamped, checksummed dump and
# prune old backups beyond --keep.
#
# Usage:
#   ./scripts/db/backup.sh "postgresql://postgres:PASS@HOST:5432/postgres" \
#     [--out DIR] [--keep N]
#
# Notes:
#   - Custom format (-Fc) is already compressed; never gzip it again.
#   - --no-owner --no-privileges keeps the dump restorable on any target
#     (Supabase re-applies its own grants; vanilla Postgres has no
#     supabase_* roles to grant to).
#   - Supabase direct connections need the IPv4/pooler hostname from the
#     dashboard (Project Settings -> Database); IPv6-only hostnames fail on
#     most networks. See docs/OPERATIONS.md for the full runbook.
#
# Cron example (nightly 02:30 UTC, keep 14):
#   30 2 * * * /opt/orion/scripts/db/backup.sh "$ORION_PG_DSN" --out /var/backups/orion --keep 14

set -euo pipefail

if [ $# -lt 1 ]; then
  echo "usage: $0 <postgres-dsn> [--out DIR] [--keep N]" >&2
  exit 2
fi

DSN="$1"
shift
OUT="./backups"
KEEP=14
while [ $# -gt 0 ]; do
  case "$1" in
    --out) OUT="$2"; shift 2 ;;
    --keep) KEEP="$2"; shift 2 ;;
    *) echo "unknown option: $1" >&2; exit 2 ;;
  esac
done

command -v pg_dump >/dev/null || { echo "pg_dump not found (install postgresql-client)" >&2; exit 1; }

mkdir -p "$OUT"
STAMP="$(date -u +%Y%m%dT%H%M%SZ)"
FILE="$OUT/orion-$STAMP.dump"

echo "[backup] dumping to $FILE ..."
pg_dump "$DSN" --format=custom --no-owner --no-privileges --file="$FILE"

# Checksum so restores can verify integrity before pg_restore runs.
if command -v sha256sum >/dev/null; then
  sha256sum "$FILE" > "$FILE.sha256"
else
  shasum -a 256 "$FILE" > "$FILE.sha256"   # macOS fallback
fi

# Retention: keep the newest KEEP dumps (checksum files ride along).
ls -1t "$OUT"/orion-*.dump 2>/dev/null | tail -n +"$((KEEP + 1))" | while read -r old; do
  rm -f "$old" "$old.sha256"
  echo "[backup] pruned $old"
done

SIZE=$(du -h "$FILE" | cut -f1)
echo "[backup] done: $FILE ($SIZE, keeping $KEEP)"
