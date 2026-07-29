/**
 * Text embeddings for RAG. Uses OpenAI's embeddings endpoint via fetch so no
 * extra npm dependency is needed. Swap the URL/model/env var if you prefer
 * Voyage or another provider — just keep the vector dimension in sync with
 * supabase/rag.sql (currently 1536 for text-embedding-3-small).
 *
 * SERVER ONLY — never import this into client components (it reads a secret key).
 */

const OPENAI_EMBED_URL = 'https://api.openai.com/v1/embeddings';
export const EMBED_MODEL = 'text-embedding-3-small'; // 1536 dimensions
export const EMBED_DIM = 1536;

async function callEmbeddings(input: string | string[]): Promise<number[][]> {
  const key = process.env.OPENAI_API_KEY;
  if (!key) throw new Error('OPENAI_API_KEY is not set');

  const res = await fetch(OPENAI_EMBED_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({ model: EMBED_MODEL, input }),
  });

  if (!res.ok) {
    throw new Error(`Embedding request failed: ${res.status} ${await res.text()}`);
  }

  const json = await res.json();
  // Preserve request order (OpenAI returns an `index` on each item).
  return (json.data as { index: number; embedding: number[] }[])
    .sort((a, b) => a.index - b.index)
    .map((d) => d.embedding);
}

/** Embed a single string. */
export async function embed(text: string): Promise<number[]> {
  const [vec] = await callEmbeddings(text);
  return vec;
}

/** Embed many strings in one request (used by the reindex job). */
export async function embedBatch(texts: string[]): Promise<number[][]> {
  if (texts.length === 0) return [];
  return callEmbeddings(texts);
}
