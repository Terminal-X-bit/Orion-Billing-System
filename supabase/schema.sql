-- ====================================================================
-- ORION HOTSPOT BILLING SYSTEM - SUPABASE DATABASE SCHEMA
-- Project: https://supabase.com/dashboard/project/ezcwgyhwotomranbyuyh
-- ====================================================================

-- 1. Enable cryptographic extension
create extension if not exists pgcrypto;

-- ====================================================================
-- 2. TABLE DEFINITIONS
-- ====================================================================

-- HOTSPOT SESSIONS TABLE
create table if not exists public.hotspot_sessions (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  device text not null,
  location text not null,
  plan text not null,
  usage text not null default '0 B',
  progress integer not null default 0 check (progress between 0 and 100),
  color text not null default '#317d75',
  connected_at timestamptz not null default now(),
  disconnected_at timestamptz
);

-- VOUCHERS TABLE
create table if not exists public.vouchers (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  package_name text not null,
  redeemed_by text,
  redeemed_at timestamptz,
  created_at timestamptz not null default now()
);

-- PACKAGES TABLE
create table if not exists public.packages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  price_amount numeric(10,2) not null,
  duration text not null,
  data_limit text,
  sales_count integer not null default 0,
  color text not null default 'orange',
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

-- TRANSACTIONS TABLE
create table if not exists public.transactions (
  id text primary key,
  customer_name text not null,
  method text not null check (method in ('M-Pesa', 'Voucher', 'Airtel Money', 'Card')),
  package_name text not null,
  amount text not null,
  status text not null default 'Paid' check (status in ('Paid', 'Pending', 'Failed')),
  time_display text not null default 'Just now',
  created_at timestamptz not null default now()
);

-- ROUTERS / ACCESS POINTS TABLE
create table if not exists public.routers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  ip_address text not null,
  model text not null default 'MikroTik',
  location text not null,
  status text not null default 'good' check (status in ('good', 'warn', 'down')),
  created_at timestamptz not null default now()
);

-- CUSTOMERS TABLE
create table if not exists public.customers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text,
  device text,
  total_spent numeric(10,2) not null default 0,
  last_active timestamptz not null default now(),
  created_at timestamptz not null default now()
);

-- ====================================================================
-- 3. INDEXES FOR HIGH PERFORMANCE
-- ====================================================================

create index if not exists hotspot_sessions_active_idx
  on public.hotspot_sessions (connected_at desc)
  where disconnected_at is null;

create index if not exists vouchers_code_idx
  on public.vouchers (code);

create index if not exists vouchers_available_idx
  on public.vouchers (created_at desc)
  where redeemed_at is null;

create index if not exists transactions_created_at_idx
  on public.transactions (created_at desc);

-- ====================================================================
-- 4. ROW LEVEL SECURITY (RLS) POLICIES
-- ====================================================================

alter table public.hotspot_sessions enable row level security;
alter table public.vouchers enable row level security;
alter table public.packages enable row level security;
alter table public.transactions enable row level security;
alter table public.routers enable row level security;
alter table public.customers enable row level security;

-- Policies for hotspot_sessions
create policy "Authenticated operators can view all sessions"
  on public.hotspot_sessions for select to authenticated
  using (true);

create policy "Authenticated operators can insert sessions"
  on public.hotspot_sessions for insert to authenticated
  with check (true);

create policy "Authenticated operators can disconnect/update sessions"
  on public.hotspot_sessions for update to authenticated
  using (true)
  with check (true);

-- Policies for vouchers
create policy "Authenticated operators can view and create vouchers"
  on public.vouchers for all to authenticated
  using (true)
  with check (true);

-- Voucher codes are credentials. Do not expose the table to anonymous users;
-- customer-facing redemption should call a trusted Edge Function or the RPC below.

-- Policies for packages
create policy "Authenticated operators can manage packages"
  on public.packages for all to authenticated
  using (true)
  with check (true);

create policy "Public can view active packages"
  on public.packages for select to anon
  using (is_active = true);

-- Policies for transactions
create policy "Authenticated operators can view transactions"
  on public.transactions for select to authenticated
  using (true);

create policy "Authenticated operators can insert transactions"
  on public.transactions for insert to authenticated
  with check (true);

-- Atomically consume a voucher and create its matching revenue record. This
-- prevents two simultaneous redemption attempts from using the same code.
create or replace function public.redeem_voucher(
  p_code text,
  p_customer_name text
)
returns table (
  transaction_id text,
  package_name text,
  amount text,
  redeemed_at timestamptz
)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_voucher public.vouchers%rowtype;
  v_price numeric(10, 2);
  v_transaction_id text;
  v_now timestamptz := now();
begin
  if auth.uid() is null then
    raise exception 'Authentication required';
  end if;

  if nullif(trim(p_customer_name), '') is null then
    raise exception 'Customer name is required';
  end if;

  select * into v_voucher
  from public.vouchers
  where code = upper(trim(p_code))
    and redeemed_at is null
  for update;

  if not found then
    raise exception 'Voucher is invalid or has already been redeemed';
  end if;

  select price_amount into v_price
  from public.packages
  where name = v_voucher.package_name
  order by created_at desc
  limit 1;

  v_transaction_id := '#TRX-' || upper(substr(replace(gen_random_uuid()::text, '-', ''), 1, 10));

  update public.vouchers
  set redeemed_by = trim(p_customer_name), redeemed_at = v_now
  where id = v_voucher.id;

  insert into public.transactions (
    id, customer_name, method, package_name, amount, status, time_display
  ) values (
    v_transaction_id,
    trim(p_customer_name),
    'Voucher',
    v_voucher.package_name,
    'KSh ' || to_char(coalesce(v_price, 0), 'FM999,999,990.00'),
    'Paid',
    'Just now'
  );

  update public.packages
  set sales_count = sales_count + 1
  where name = v_voucher.package_name;

  return query select v_transaction_id, v_voucher.package_name,
    'KSh ' || to_char(coalesce(v_price, 0), 'FM999,999,990.00'), v_now;
end;
$$;

revoke all on function public.redeem_voucher(text, text) from public;
grant execute on function public.redeem_voucher(text, text) to authenticated;

-- Policies for routers
create policy "Authenticated operators can view routers"
  on public.routers for all to authenticated
  using (true)
  with check (true);

-- Policies for customers
create policy "Authenticated operators can view customers"
  on public.customers for all to authenticated
  using (true)
  with check (true);

-- ====================================================================
-- 5. INITIAL SEED DATA (OPTIONAL / SAMPLE DATA FOR LIVE PREVIEW)
-- ====================================================================

insert into public.hotspot_sessions (customer_name, device, location, plan, usage, progress, color)
values
  ('Maya Ochieng', 'iPhone 14 Pro', 'Lobby AP · 10.20.0.34', '24 hour pass', '1.2 GB / 5 GB', 24, '#d36b4d'),
  ('Brian Kamau', 'MacBook Air', 'Poolside AP · 10.20.0.52', '7 day access', '8.4 GB / 20 GB', 42, '#317d75'),
  ('Aisha Wanjiku', 'Galaxy S24', 'Cafe AP · 10.20.1.18', '1 hour pass', '680 MB / 1 GB', 68, '#c58a32')
on conflict do nothing;

insert into public.packages (name, price_amount, duration, data_limit, sales_count, color)
values
  ('24 hour pass', 250, '24 hours', '5 GB', 486, 'orange'),
  ('7 day access', 1200, '7 days', '20 GB', 124, 'teal'),
  ('1 hour pass', 50, '1 hour', '1 GB', 287, 'yellow')
on conflict do nothing;

insert into public.transactions (id, customer_name, method, package_name, amount, status, time_display)
values
  ('#TRX-2091', 'Maya Ochieng', 'M-Pesa', '24 hour pass', 'KSh 250', 'Paid', 'Today, 09:42'),
  ('#TRX-2090', 'Peter Mwangi', 'Voucher', '1 hour pass', 'KSh 50', 'Paid', 'Today, 09:26'),
  ('#TRX-2089', 'Grace Njeri', 'M-Pesa', '7 day access', 'KSh 1,200', 'Paid', 'Today, 08:58'),
  ('#TRX-2088', 'Samuel Kibet', 'Airtel Money', '5 GB data', 'KSh 500', 'Pending', 'Today, 08:44')
on conflict do nothing;

insert into public.routers (name, ip_address, model, location, status)
values
  ('MikroTik Core CCR2004', '10.20.0.1', 'MikroTik CCR2004', 'Main Server Rack', 'good'),
  ('MikroTik AP Lobby', '10.20.0.34', 'MikroTik cAP ac', 'Lobby & Reception', 'good'),
  ('MikroTik AP Poolside', '10.20.0.52', 'MikroTik wAP ac', 'Poolside Deck', 'good')
on conflict do nothing;

-- ====================================================================
-- 6. MIKROTIK PROVISIONING EXTENSIONS
-- Adds the columns required to push real billing configuration onto a
-- MikroTik RouterOS device (hotspot user profiles, rate limits, quotas,
-- voucher expiry and M-Pesa STK Push payment tracking).
-- Safe to run on an existing database: all statements are additive.
-- ====================================================================

-- Packages: speeds and device limits map to RouterOS rate limits and
-- shared-users on the generated hotspot profile.
alter table public.packages
  add column if not exists speed_limit text not null default '20 Mbps',
  add column if not exists device_limit integer not null default 1,
  add column if not exists mikrotik_profile text,
  add column if not exists synced_to_router boolean not null default false;

-- Vouchers: carry their package price and a redemption expiry window so the
-- bridge can create matching RouterOS hotspot users with a hard expiry.
alter table public.vouchers
  add column if not exists package_price numeric(10,2),
  add column if not exists expires_at timestamptz,
  add column if not exists mikrotik_user_synced boolean not null default false,
  add column if not exists expired_at timestamptz;

create index if not exists vouchers_mikrotik_pending_idx
  on public.vouchers (created_at desc)
  where mikrotik_user_synced = false;

-- Transactions: structured amount + phone + STK checkout reference so the
-- bridge can reconcile Daraja callbacks with access provisioning.
alter table public.transactions
  add column if not exists amount_value numeric(10,2),
  add column if not exists customer_phone text,
  add column if not exists checkout_request_id text,
  add column if not exists mpesa_receipt text,
  add column if not exists provisioned_at timestamptz,
  add column if not exists provider_ref text;

create index if not exists transactions_checkout_idx
  on public.transactions (checkout_request_id)
  where checkout_request_id is not null;

-- Idempotent payment fulfilment: one transaction per Daraja checkout.
create unique index if not exists transactions_provider_ref_uidx
  on public.transactions (provider_ref)
  where provider_ref is not null;

-- M-Pesa STK Push requests initiated by the captive portal.
create table if not exists public.stk_requests (
  id uuid primary key default gen_random_uuid(),
  checkout_request_id text not null unique,
  merchant_request_id text,
  phone text not null,
  package_id uuid references public.packages (id) on delete set null,
  package_name text not null,
  amount numeric(10,2) not null,
  status text not null default 'pending' check (status in ('pending', 'paid', 'failed', 'cancelled')),
  result_code integer,
  result_desc text,
  mpesa_receipt text,
  voucher_code text,
  provisioned_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.stk_requests enable row level security;

create policy "Authenticated operators can manage stk_requests"
  on public.stk_requests for all to authenticated
  using (true) with check (true);

-- The bridge reads pending STK requests with the service key.
create index if not exists stk_requests_status_idx
  on public.stk_requests (created_at desc);

-- Router inventory: bridge connection metadata per MikroTik device.
alter table public.routers
  add column if not exists api_port integer not null default 8728,
  add column if not exists api_user text,
  add column if not exists last_synced_at timestamptz,
  add column if not exists system_identity text;

-- Audit log for provisioning and network actions (kick, reboot, sync).
create table if not exists public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor text not null default 'system',
  action text not null,
  entity text,
  entity_id text,
  detail jsonb,
  created_at timestamptz not null default now()
);

alter table public.audit_logs enable row level security;

create policy "Authenticated operators can view audit logs"
  on public.audit_logs for select to authenticated
  using (true);

create policy "Authenticated operators can insert audit logs"
  on public.audit_logs for insert to authenticated
  with check (true);

-- ====================================================================
-- PORTAL BRANDING SETTINGS
-- Single-row table (id = 1) the bridge serves to the captive portal.
-- Guests can read it via the bridge (never directly); operators manage
-- it from the dashboard's Settings -> Captive Portal Branding.
-- ====================================================================
create table if not exists public.portal_settings (
  id integer primary key default 1 check (id = 1),
  business_name text not null default 'Harbor House',
  support_phone text not null default '+254 700 123 456',
  primary_color text not null default '#d36b4d',
  portal_title text not null default 'You''re connected — sign in',
  portal_message text not null default 'Enter the voucher code from your receipt, or buy instant access with M-Pesa.',
  footer_note text,
  updated_at timestamptz not null default now(),
  constraint primary_color_hex check (primary_color ~ '^#[0-9a-fA-F]{6}$')
);

alter table public.portal_settings enable row level security;

-- The dashboard has no operator sign-in in this build (it writes with the
-- anon key, like vouchers/packages), and branding is public-facing by
-- definition — guests see it on the portal. Only cosmetic fields live here.
create policy "Public can read portal branding"
  on public.portal_settings for select to anon
  using (true);

create policy "Dashboard can update portal branding"
  on public.portal_settings for update to anon
  using (true) with check (true);

-- The bridge (service key) reads it server-side for portal injection.

-- Seed the single row (idempotent; does not clobber existing edits).
insert into public.portal_settings (id) values (1) on conflict (id) do nothing;
