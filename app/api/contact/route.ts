import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { sendEmail } from '@/lib/email';
import { adminContactMessage } from '@/lib/email-templates';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * POST /api/contact
 * Public endpoint for the contact form. Saves to DB + emails admin.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { full_name, email, phone, subject, message } = body;

    if (!full_name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { ok: false, error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }
    if (!/.+@.+\..+/.test(email)) {
      return NextResponse.json(
        { ok: false, error: 'Please provide a valid email' },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();
    const { error } = await supabase.from('messages').insert({
      full_name, email, phone, subject, message,
    });
    if (error) throw error;

    const adminEmail = process.env.NEXT_PUBLIC_COMPANY_EMAIL || 'info@idokoconsulting.com';
    const tmpl = adminContactMessage({ full_name, email, phone, subject, message });
    await sendEmail({
      to: adminEmail,
      subject: tmpl.subject,
      html: tmpl.html,
      replyTo: email,
    });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error('[contact]', err);
    return NextResponse.json(
      { ok: false, error: err?.message || 'Could not send message' },
      { status: 500 }
    );
  }
}
