import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { buildKnowledgeDocs } from '@/lib/rag/sources';
import { embedBatch } from '@/lib/rag/embed';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 300; // reindexing embeds many chunks

/**
 * POST /api/rag/reindex
 * Rebuilds the knowledge base from lib/service-details.ts.
 * Protected by a bearer secret so it can't be triggered publicly.
 *
 *   curl -X POST https://your-site/api/rag/reindex \
 *        -H "Authorization: Bearer $RAG_INGEST_SECRET"
 *
 * Run it once after seeding, and again whenever you edit service content.
 */

function chunk(text: string, size = 1200, overlap = 150): string[] {
  if (text.length <= size) return [text];
  const out: string[] = [];
  for (let i = 0; i < text.length; i += size - overlap) {
    out.push(text.slice(i, i + size));
  }
  return out;
}

export async function POST(req: NextRequest) {
  try {
    const secret = process.env.RAG_INGEST_SECRET;
    const auth = req.headers.get('authorization');
    if (!secret || auth !== `Bearer ${secret}`) {
      return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = createAdminClient();

    // 1. Build docs from firm content, then split into chunks.
    const rows: { source: string; title: string; content: string }[] = [];
    for (const doc of buildKnowledgeDocs()) {
      for (const piece of chunk(doc.content)) {
        rows.push({ source: doc.source, title: doc.title, content: piece });
      }
    }

    // 2. Embed in batches.
    const embeddings: number[][] = [];
    const BATCH = 64;
    for (let i = 0; i < rows.length; i += BATCH) {
      const part = await embedBatch(rows.slice(i, i + BATCH).map((r) => r.content));
      embeddings.push(...part);
    }

    // 3. Replace the table contents (clean rebuild).
    await supabase
      .from('knowledge_chunks')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000');

    const insertRows = rows.map((r, i) => ({ ...r, embedding: embeddings[i] }));
    for (let i = 0; i < insertRows.length; i += 100) {
      const { error } = await supabase
        .from('knowledge_chunks')
        .insert(insertRows.slice(i, i + 100));
      if (error) throw error;
    }

    return NextResponse.json({ ok: true, chunks: rows.length });
  } catch (err: any) {
    console.error('[rag/reindex]', err);
    return NextResponse.json(
      { ok: false, error: err?.message || 'Reindex failed' },
      { status: 500 }
    );
  }
}
