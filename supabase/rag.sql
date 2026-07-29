-- =============================================================================
-- RAG knowledge base for the site assistant
-- Run this in the Supabase SQL editor AFTER schema.sql. Safe to re-run.
-- =============================================================================

create extension if not exists "vector";

create table if not exists public.knowledge_chunks (
  id          uuid primary key default gen_random_uuid(),
  source      text not null,            -- e.g. 'service/valuation/faq-2'
  title       text not null,            -- human-readable label for citations
  content     text not null,            -- one chunk of firm text
  embedding   vector(1536),             -- text-embedding-3-small dimension
  created_at  timestamptz not null default now()
);

-- Approximate-nearest-neighbour index for fast cosine search
create index if not exists knowledge_chunks_embedding_idx
  on public.knowledge_chunks using hnsw (embedding vector_cosine_ops);

alter table public.knowledge_chunks enable row level security;

-- All reads/writes from the app use the service-role key (server only), which
-- bypasses RLS. This policy only makes the table manageable from the dashboard.
drop policy if exists "Knowledge admin all" on public.knowledge_chunks;
create policy "Knowledge admin all" on public.knowledge_chunks for all
  using (public.is_admin()) with check (public.is_admin());

-- Similarity search. Returns the closest chunks to a query embedding.
create or replace function public.match_knowledge(
  query_embedding vector(1536),
  match_count int default 6
)
returns table (source text, title text, content text, similarity float)
language sql stable as $$
  select
    kc.source,
    kc.title,
    kc.content,
    1 - (kc.embedding <=> query_embedding) as similarity
  from public.knowledge_chunks kc
  where kc.embedding is not null
  order by kc.embedding <=> query_embedding
  limit match_count;
$$;
