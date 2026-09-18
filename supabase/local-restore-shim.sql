-- local-restore-shim.sql — make supabase/schema.sql applicable on vanilla
-- Postgres (used by the CI restore drill and any local Docker Postgres).
--
-- Supabase provides out of the box:
--   * the anon / authenticated roles (its GoTrue auth service's principals)
--   * the auth schema with auth.uid() / auth.role() helpers
--   * grants connecting those roles to the public schema
--
-- Vanilla Postgres has none of these, so schema.sql's `create policy ... to
-- authenticated` and its `security definer` function referencing auth.uid()
-- would fail. This shim supplies minimal, faithful stand-ins.
--
-- NOT for production Supabase — harmless there (everything is IF NOT
-- EXISTS / guarded), but pointless: Supabase already ships the real thing.

-- 1. Supabase roles (NOLOGIN — they are SET ROLE principals, not logins).
DO $$
BEGIN
  IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'anon') THEN
    CREATE ROLE anon NOLOGIN NOINHERIT;
  END IF;
  IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'authenticated') THEN
    CREATE ROLE authenticated NOLOGIN NOINHERIT;
  END IF;
  IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'service_role') THEN
    CREATE ROLE service_role NOLOGIN NOINHERIT BYPASSRLS;
  END IF;
END $$;

-- 2. Minimal auth schema: the two helpers Supabase injects into every query.
CREATE SCHEMA IF NOT EXISTS auth;

DO $$
BEGIN
  IF to_regprocedure('auth.uid()') IS NULL THEN
    CREATE FUNCTION auth.uid() RETURNS uuid
    LANGUAGE sql STABLE
    AS $$ SELECT NULL::uuid $$;
  END IF;
  IF to_regprocedure('auth.role()') IS NULL THEN
    CREATE FUNCTION auth.role() RETURNS text
    LANGUAGE sql STABLE
    AS $$ SELECT NULL::text $$;
  END IF;
END $$;

-- 3. Usage grants (Supabase's defaults): roles reach the public schema and
--    sequences (needed for serial columns; gen_random_uuid() needs none, but
--    future schema edits might).
GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;
GRANT USAGE ON SCHEMA auth TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA public
  GRANT USAGE ON SEQUENCES TO anon, authenticated, service_role;
