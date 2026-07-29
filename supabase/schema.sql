-- =============================================================================
-- IDOKO C IDOKO CONSULTING — SUPABASE SCHEMA
-- =============================================================================
-- Run this in Supabase SQL Editor (Project → SQL Editor → New Query → Run).
-- It creates all tables, RLS policies, storage buckets, indexes, and seed data.
-- =============================================================================

-- Extensions
create extension if not exists "pgcrypto";
create extension if not exists "uuid-ossp";

-- =============================================================================
-- 1. PROFILES (admin users)
-- =============================================================================
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique not null,
  full_name text,
  phone text,
  role text not null default 'admin' check (role in ('admin', 'super_admin')),
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- =============================================================================
-- 2. SERVICES (offered by the firm)
-- =============================================================================
create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  short_description text,
  description text,
  icon text,
  base_fee numeric(12,2) default 0,
  pricing_type text default 'quote' check (pricing_type in ('fixed', 'quote', 'free')),
  active boolean default true,
  sort_order int default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- =============================================================================
-- 3. CLIENTS
-- =============================================================================
create table if not exists public.clients (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  phone text,
  address text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_clients_email on public.clients(email);

-- =============================================================================
-- 4. SERVICE REQUESTS (valuation, property mgmt, feasibility, etc.)
-- =============================================================================
create table if not exists public.requests (
  id uuid primary key default gen_random_uuid(),
  reference text unique not null default ('REQ-' || upper(substr(replace(gen_random_uuid()::text, '-', ''), 1, 10))),

  -- Client
  client_id uuid references public.clients(id) on delete set null,
  full_name text not null,
  email text not null,
  phone text,

  -- Service
  service_id uuid references public.services(id) on delete set null,
  service_name text,

  -- Property
  property_type text,
  property_address text,
  property_purpose text,
  property_size text,

  -- Extras
  notes text,
  documents jsonb not null default '[]'::jsonb,  -- [{ name, url, size, type }]

  -- Status workflow
  status text not null default 'new' check (status in (
    'new',
    'under_review',
    'quotation_sent',
    'payment_received',
    'inspection_scheduled',
    'in_progress',
    'report_ready',
    'completed',
    'cancelled'
  )),

  -- Pricing
  quoted_amount numeric(12,2),
  payment_link text,

  -- Payment
  payment_status text not null default 'unpaid' check (payment_status in (
    'unpaid', 'pending', 'paid', 'failed', 'refunded'
  )),
  paystack_reference text,
  amount_paid numeric(12,2),
  paid_at timestamptz,

  -- Report
  report_url text,
  report_uploaded_at timestamptz,

  -- Admin tracking
  assigned_to uuid references public.profiles(id) on delete set null,
  admin_notes text,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_requests_status on public.requests(status);
create index if not exists idx_requests_payment_status on public.requests(payment_status);
create index if not exists idx_requests_created_at on public.requests(created_at desc);
create index if not exists idx_requests_email on public.requests(email);

-- =============================================================================
-- 5. CONSULTATIONS
-- =============================================================================
create table if not exists public.consultations (
  id uuid primary key default gen_random_uuid(),
  reference text unique not null default ('CON-' || upper(substr(replace(gen_random_uuid()::text, '-', ''), 1, 10))),
  full_name text not null,
  email text not null,
  phone text,
  preferred_date date,
  preferred_time text,
  topic text,
  notes text,
  fee numeric(12,2) default 10000,
  payment_status text default 'unpaid' check (payment_status in ('unpaid', 'pending', 'paid', 'failed')),
  paystack_reference text,
  paid_at timestamptz,
  status text default 'pending' check (status in ('pending', 'confirmed', 'completed', 'cancelled')),
  meeting_link text,
  admin_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_consultations_status on public.consultations(status);
create index if not exists idx_consultations_created_at on public.consultations(created_at desc);

-- =============================================================================
-- 6. PAYMENTS (audit trail of all Paystack txns)
-- =============================================================================
create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  request_id uuid references public.requests(id) on delete set null,
  consultation_id uuid references public.consultations(id) on delete set null,
  amount numeric(12,2) not null,
  currency text default 'NGN',
  reference text unique not null,
  paystack_reference text unique,
  status text default 'pending' check (status in ('pending', 'success', 'failed', 'abandoned', 'refunded')),
  channel text,
  customer_email text,
  customer_name text,
  paid_at timestamptz,
  metadata jsonb,
  created_at timestamptz not null default now()
);

create index if not exists idx_payments_status on public.payments(status);
create index if not exists idx_payments_created_at on public.payments(created_at desc);

-- =============================================================================
-- 7. PROPERTIES (agency listings)
-- =============================================================================
create table if not exists public.properties (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  description text,
  price numeric(14,2),
  price_period text default 'sale' check (price_period in ('sale', 'monthly', 'yearly', 'negotiable')),
  location text,
  city text,
  state text,
  property_type text,
  bedrooms int,
  bathrooms int,
  toilets int,
  area_sqm numeric,
  features jsonb default '[]'::jsonb,
  images jsonb default '[]'::jsonb,
  status text default 'available' check (status in ('available', 'sold', 'rented', 'pending')),
  featured boolean default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_properties_status on public.properties(status);
create index if not exists idx_properties_featured on public.properties(featured);

-- =============================================================================
-- 8. CONTACT MESSAGES
-- =============================================================================
create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  phone text,
  subject text,
  message text not null,
  read boolean default false,
  created_at timestamptz not null default now()
);

-- =============================================================================
-- 9. SETTINGS (key-value store for site config)
-- =============================================================================
create table if not exists public.settings (
  key text primary key,
  value jsonb,
  updated_at timestamptz not null default now()
);

-- =============================================================================
-- 10. UPDATED-AT TRIGGER
-- =============================================================================
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists trg_profiles_updated on public.profiles;
create trigger trg_profiles_updated before update on public.profiles
  for each row execute function public.touch_updated_at();

drop trigger if exists trg_services_updated on public.services;
create trigger trg_services_updated before update on public.services
  for each row execute function public.touch_updated_at();

drop trigger if exists trg_requests_updated on public.requests;
create trigger trg_requests_updated before update on public.requests
  for each row execute function public.touch_updated_at();

drop trigger if exists trg_consultations_updated on public.consultations;
create trigger trg_consultations_updated before update on public.consultations
  for each row execute function public.touch_updated_at();

drop trigger if exists trg_properties_updated on public.properties;
create trigger trg_properties_updated before update on public.properties
  for each row execute function public.touch_updated_at();

drop trigger if exists trg_clients_updated on public.clients;
create trigger trg_clients_updated before update on public.clients
  for each row execute function public.touch_updated_at();

-- =============================================================================
-- 11. ROW LEVEL SECURITY
-- =============================================================================
alter table public.profiles enable row level security;
alter table public.services enable row level security;
alter table public.clients enable row level security;
alter table public.requests enable row level security;
alter table public.consultations enable row level security;
alter table public.payments enable row level security;
alter table public.properties enable row level security;
alter table public.messages enable row level security;
alter table public.settings enable row level security;

-- helper: is current user an admin?
create or replace function public.is_admin()
returns boolean language sql stable security definer as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role in ('admin', 'super_admin')
  )
$$;

-- profiles: user can read self, admins can read all
drop policy if exists "Profiles self read" on public.profiles;
create policy "Profiles self read" on public.profiles for select
  using (auth.uid() = id or public.is_admin());

drop policy if exists "Profiles admin all" on public.profiles;
create policy "Profiles admin all" on public.profiles for all
  using (public.is_admin()) with check (public.is_admin());

-- services: public can read active, admin can do all
drop policy if exists "Services public read" on public.services;
create policy "Services public read" on public.services for select
  using (active = true or public.is_admin());

drop policy if exists "Services admin write" on public.services;
create policy "Services admin write" on public.services for all
  using (public.is_admin()) with check (public.is_admin());

-- properties: public can read available
drop policy if exists "Properties public read" on public.properties;
create policy "Properties public read" on public.properties for select
  using (status in ('available', 'pending') or public.is_admin());

drop policy if exists "Properties admin write" on public.properties;
create policy "Properties admin write" on public.properties for all
  using (public.is_admin()) with check (public.is_admin());

-- requests: anyone can insert (public form), only admin reads/updates
drop policy if exists "Requests public insert" on public.requests;
create policy "Requests public insert" on public.requests for insert
  with check (true);

drop policy if exists "Requests admin all" on public.requests;
create policy "Requests admin all" on public.requests for all
  using (public.is_admin()) with check (public.is_admin());

-- consultations: anyone can insert
drop policy if exists "Consultations public insert" on public.consultations;
create policy "Consultations public insert" on public.consultations for insert
  with check (true);

drop policy if exists "Consultations admin all" on public.consultations;
create policy "Consultations admin all" on public.consultations for all
  using (public.is_admin()) with check (public.is_admin());

-- clients: only admin
drop policy if exists "Clients admin all" on public.clients;
create policy "Clients admin all" on public.clients for all
  using (public.is_admin()) with check (public.is_admin());

-- payments: only admin reads, server inserts (handled by service-role key)
drop policy if exists "Payments admin read" on public.payments;
create policy "Payments admin read" on public.payments for select
  using (public.is_admin());

-- messages: anyone can insert, admin can read
drop policy if exists "Messages public insert" on public.messages;
create policy "Messages public insert" on public.messages for insert
  with check (true);

drop policy if exists "Messages admin read" on public.messages;
create policy "Messages admin read" on public.messages for all
  using (public.is_admin()) with check (public.is_admin());

-- settings: public can read, only admin writes
drop policy if exists "Settings public read" on public.settings;
create policy "Settings public read" on public.settings for select using (true);

drop policy if exists "Settings admin write" on public.settings;
create policy "Settings admin write" on public.settings for all
  using (public.is_admin()) with check (public.is_admin());

-- =============================================================================
-- 12. STORAGE BUCKETS
-- =============================================================================
insert into storage.buckets (id, name, public)
values ('documents', 'documents', false)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('reports', 'reports', false)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('properties', 'properties', true)
on conflict (id) do nothing;

-- documents: public can upload, only admin can read
drop policy if exists "Documents public upload" on storage.objects;
create policy "Documents public upload" on storage.objects for insert
  with check (bucket_id = 'documents');

drop policy if exists "Documents admin read" on storage.objects;
create policy "Documents admin read" on storage.objects for select
  using (bucket_id = 'documents' and public.is_admin());

-- reports: only admin uploads, only admin reads (signed URLs for clients)
drop policy if exists "Reports admin all" on storage.objects;
create policy "Reports admin all" on storage.objects for all
  using (bucket_id = 'reports' and public.is_admin())
  with check (bucket_id = 'reports' and public.is_admin());

-- properties: public read, admin write
drop policy if exists "Properties public read storage" on storage.objects;
create policy "Properties public read storage" on storage.objects for select
  using (bucket_id = 'properties');

drop policy if exists "Properties admin write storage" on storage.objects;
create policy "Properties admin write storage" on storage.objects for all
  using (bucket_id = 'properties' and public.is_admin())
  with check (bucket_id = 'properties' and public.is_admin());

-- =============================================================================
-- 13. SEED DATA
-- =============================================================================
insert into public.services (name, slug, short_description, description, icon, base_fee, pricing_type, sort_order) values
  ('Valuation for All Purposes', 'valuation', 'Professional property valuation for sale, mortgage, insurance, taxation, and more.', 'We provide accurate, RICS- and NIESV-compliant property valuations for sale, purchase, mortgage, insurance, taxation, probate, partnership, financial reporting, and litigation purposes.', 'building', 0, 'quote', 1),
  ('Property Management', 'property-management', 'Hands-on management for landlords and property owners.', 'End-to-end property management: tenant sourcing, rent collection, maintenance, lease admin, and reporting — so your investment runs smoothly without you lifting a finger.', 'key', 0, 'quote', 2),
  ('Financial Reporting', 'financial-reporting', 'Property valuation aligned with IFRS and accounting standards.', 'Specialist valuations for financial reporting, IFRS-compliant fair value assessment, and audit support for corporate clients and institutions.', 'chart', 0, 'quote', 3),
  ('Facility Management', 'facility-management', 'Operational, technical, and soft facility management services.', 'Comprehensive FM covering maintenance, security, cleaning, energy, and space planning for commercial, residential, and mixed-use facilities.', 'cog', 0, 'quote', 4),
  ('Feasibility & Viability Studies', 'feasibility-studies', 'Make confident go/no-go decisions on real estate projects.', 'Market research, financial modelling, highest-and-best-use analysis, and risk assessment to validate your real estate investment before you commit capital.', 'trending-up', 0, 'quote', 5),
  ('Agency Services', 'agency', 'Buying, selling, and letting representation.', 'Sales and lettings agency for residential, commercial, and industrial property — backed by professional valuation insight.', 'home', 0, 'quote', 6),
  ('Real Estate Investment & Development Consulting', 'investment-consulting', 'Advisory for investors and developers.', 'Strategic advisory across acquisition, development, repositioning, and disposal — helping you maximise returns and manage risk.', 'briefcase', 0, 'quote', 7),
  ('Consultation Booking', 'consultation', 'Book a one-on-one session with our principal consultant.', 'A focused 60-minute paid consultation with our Principal Consultant on any aspect of valuation, property, or real estate strategy.', 'calendar', 15000, 'fixed', 8)
on conflict (slug) do nothing;

insert into public.settings (key, value) values
  ('company', '{"name":"Idoko C Idoko Consulting","tagline":"Estate Surveyors & Valuers | Property Managers | Facility Managers | Agency","phone":"08133988976","whatsapp":"2348133988976","email":"info@idokoconsulting.com","address":"No 75 Chime Avenue, New Heaven. Opp Mr Biggs bus stop","principal":"Idoko Chinelo Ifeyinwa","credentials":"ANIVS, RSV, MSC ESTATE MGT. (NIG), PhD Est.Mgt, Principal Consultant"}'::jsonb),
  ('consultation_fee', '15000'::jsonb),
  ('valuation_processing_fee', '20000'::jsonb)
on conflict (key) do update set value = excluded.value;
