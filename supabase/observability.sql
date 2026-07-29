-- =============================================================================
-- AI observability — one row per model call
-- Run in the Supabase SQL editor after schema.sql + rag.sql. Safe to re-run.
-- =============================================================================

create table if not exists public.ai_logs (
  id            uuid primary key default gen_random_uuid(),
  endpoint      text not null,        -- 'ask', 'intake', 'draft-quote', 'draft-report'
  model         text,
  input_tokens  int,
  output_tokens int,
  cost_usd      numeric(10,6),
  latency_ms    int,
  ok            boolean default true,
  error         text,
  created_at    timestamptz not null default now()
);

create index if not exists ai_logs_created_at_idx on public.ai_logs (created_at desc);

alter table public.ai_logs enable row level security;

-- Rows are written with the service-role key (bypasses RLS). Admins can read.
drop policy if exists "AI logs admin read" on public.ai_logs;
create policy "AI logs admin read" on public.ai_logs for select
  using (public.is_admin());
