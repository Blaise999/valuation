/**
 * Retrieval half of RAG: embed the query, then ask Postgres/pgvector for the
 * closest firm-knowledge chunks via the match_knowledge() function.
 *
 * SERVER ONLY.
 */

import { createAdminClient } from '@/lib/supabase/admin';
import { embed } from './embed';

export interface KnowledgeMatch {
  source: string;
  title: string;
  content: string;
  similarity: number;
}

export async function retrieve(query: string, matchCount = 6): Promise<KnowledgeMatch[]> {
  const query_embedding = await embed(query);
  const supabase = createAdminClient();

  const { data, error } = await supabase.rpc('match_knowledge', {
    query_embedding,
    match_count: matchCount,
  });

  if (error) throw error;
  return (data ?? []) as KnowledgeMatch[];
}
