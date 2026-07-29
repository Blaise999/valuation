import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { answerFromKnowledge } from '@/lib/rag/generate';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * POST /api/rag/ask
 * Public endpoint. Body: { question: string }
 * Returns: { ok, answer, sources, grounded }
 */

const Body = z.object({
  question: z.string().min(3).max(1000),
});

export async function POST(req: NextRequest) {
  try {
    const parsed = Body.safeParse(await req.json());
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: 'Please ask a question (3–1000 characters).' },
        { status: 400 }
      );
    }

    const result = await answerFromKnowledge(parsed.data.question);
    return NextResponse.json({ ok: true, ...result });
  } catch (err: any) {
    console.error('[rag/ask]', err);
    return NextResponse.json(
      { ok: false, error: err?.message || 'Could not answer right now.' },
      { status: 500 }
    );
  }
}
