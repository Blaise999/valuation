import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { sendEmail } from '@/lib/email';
import { clientRequestReceived, adminNewRequest } from '@/lib/email-templates';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * POST /api/requests
 *
 * Public endpoint for the multi-step Request Valuation form.
 * Saves to DB, emails the client (confirmation) and admin (new request notification).
 *
 * Body shape: matches the "requests" table columns + a `documents` array.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      full_name, email, phone, service_name,
      property_type, property_address, property_purpose,
      property_size, notes, documents = [],
    } = body;

    if (!full_name?.trim() || !email?.trim() || !service_name) {
      return NextResponse.json(
        { ok: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();
    const reference = `REQ-${Date.now().toString(36).toUpperCase()}`;

    const { data: row, error } = await supabase.from('requests').insert({
      reference,
      full_name, email, phone, service_name,
      property_type, property_address, property_purpose, property_size,
      notes, documents,
      status: 'new',
      payment_status: 'unpaid',
    }).select().single();

    if (error) throw error;

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || new URL(req.url).origin;
    const adminEmail = process.env.NEXT_PUBLIC_COMPANY_EMAIL || 'info@idokoconsulting.com';

    // Fire-and-forget emails
    const clientTmpl = clientRequestReceived({
      reference, full_name, email, phone, service_name,
      property_type, property_address, property_purpose, notes,
    });
    sendEmail({ to: email, subject: clientTmpl.subject, html: clientTmpl.html });

    const adminTmpl = adminNewRequest({
      reference, full_name, email, phone, service_name,
      property_type, property_address, property_purpose, notes,
      admin_url: `${siteUrl}/admin/requests/${row.id}`,
    });
    sendEmail({ to: adminEmail, subject: adminTmpl.subject, html: adminTmpl.html, replyTo: email });

    return NextResponse.json({ ok: true, reference, id: row.id });
  } catch (err: any) {
    console.error('[requests]', err);
    return NextResponse.json(
      { ok: false, error: err?.message || 'Could not submit request' },
      { status: 500 }
    );
  }
}
