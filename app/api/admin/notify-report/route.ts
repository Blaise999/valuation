import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { sendEmail } from '@/lib/email';
import { clientReportReady } from '@/lib/email-templates';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * POST /api/admin/notify-report
 * Body: { request_id }
 * Emails the client that their report is ready.
 */
export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ ok: false, error: 'Not authenticated' }, { status: 401 });
  }
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();
  if (!profile || !['admin', 'super_admin'].includes(profile.role)) {
    return NextResponse.json({ ok: false, error: 'Not authorised' }, { status: 403 });
  }

  try {
    const { request_id } = await req.json();
    const admin = createAdminClient();
    const { data: r } = await admin.from('requests').select('*').eq('id', request_id).single();
    if (!r || !r.report_url) {
      return NextResponse.json({ ok: false, error: 'No report on this request' }, { status: 400 });
    }

    const tmpl = clientReportReady({
      full_name: r.full_name,
      reference: r.reference,
      report_url: r.report_url,
    });

    const result = await sendEmail({
      to: r.email,
      subject: tmpl.subject,
      html: tmpl.html,
    });

    return NextResponse.json({ ok: true, email: result });
  } catch (err: any) {
    console.error('[admin/notify-report]', err);
    return NextResponse.json({ ok: false, error: err?.message }, { status: 500 });
  }
}
