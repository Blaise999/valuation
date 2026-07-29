import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { draftQuotation, draftReport, intakeReview } from '@/lib/rag/drafters';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

/**
 * POST /api/admin/ai   (admin only)
 * Body: { action: 'intake' | 'draft-quote' | 'draft-report', request_id, inspection_notes? }
 * Returns a DRAFT for the valuer to review — never sends or saves anything.
 */
const Body = z.object({
  action: z.enum(['intake', 'draft-quote', 'draft-report']),
  request_id: z.string(),
  inspection_notes: z.string().optional(),
});

export async function POST(req: NextRequest) {
  // Auth — logged-in admin only (same guard as send-quote)
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ ok: false, error: 'Not authenticated' }, { status: 401 });

  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
  if (!profile || !['admin', 'super_admin'].includes(profile.role)) {
    return NextResponse.json({ ok: false, error: 'Not authorised' }, { status: 403 });
  }

  try {
    const parsed = Body.safeParse(await req.json());
    if (!parsed.success) {
      return NextResponse.json({ ok: false, error: 'Bad request' }, { status: 400 });
    }
    const { action, request_id, inspection_notes } = parsed.data;

    const admin = createAdminClient();
    const { data: request, error } = await admin
      .from('requests')
      .select('*')
      .eq('id', request_id)
      .single();
    if (error || !request) {
      return NextResponse.json({ ok: false, error: 'Request not found' }, { status: 404 });
    }

    if (action === 'intake') {
      return NextResponse.json({ ok: true, result: await intakeReview(request) });
    }
    if (action === 'draft-quote') {
      return NextResponse.json({ ok: true, result: await draftQuotation(request) });
    }
    if (action === 'draft-report') {
      if (!inspection_notes?.trim()) {
        return NextResponse.json({ ok: false, error: 'Add inspection notes first.' }, { status: 400 });
      }
      return NextResponse.json({ ok: true, result: await draftReport(request, inspection_notes) });
    }

    return NextResponse.json({ ok: false, error: 'Unknown action' }, { status: 400 });
  } catch (err: any) {
    console.error('[admin/ai]', err);
    return NextResponse.json({ ok: false, error: err?.message || 'AI request failed' }, { status: 500 });
  }
}
