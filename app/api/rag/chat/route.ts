import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { answerStream } from '@/lib/rag/generate';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * POST /api/rag/chat
 * Body: { question: string }
 * Streams the answer text as plain text. Citation sources are sent up front in
 * the `x-rag-sources` response header (URL-encoded JSON).
 */

const Body = z.object({
  question: z.string().min(2).max(2000),
});

export async function POST(req: NextRequest) {
  try {
    const parsed = Body.safeParse(await req.json());
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: 'Please ask a question.' },
        { status: 400 }
      );
    }

    const { sources, stream } = await answerStream(parsed.data.question);

    return new Response(stream, {
      headers: {
        'content-type': 'text/plain; charset=utf-8',
        'cache-control': 'no-store',
        'x-rag-sources': encodeURIComponent(JSON.stringify(sources)),
      },
    });
  } catch (err: any) {
    console.error('[rag/chat]', err);
    return NextResponse.json(
      { ok: false, error: err?.message || 'Could not answer right now.' },
      { status: 500 }
    );
  }
}
