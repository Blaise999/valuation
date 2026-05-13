import { NextRequest, NextResponse } from 'next/server';
import { paystackInit, generateReference, nairaToKobo } from '@/lib/paystack';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { sendEmail } from '@/lib/email';
import { clientQuotationSent } from '@/lib/email-templates';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * POST /api/admin/send-quote
 *
 * Admin-only. Generates a Paystack payment link for a request that has
 * been reviewed and quoted, and emails it to the client.
 *
 * Body: { request_id: string }
 * The request must already have `quoted_amount` set.
 */
export async function POST(req: NextRequest) {
  // Auth — must be a logged-in admin
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
    if (!request_id) {
      return NextResponse.json({ ok: false, error: 'request_id required' }, { status: 400 });
    }

    const admin = createAdminClient();
    const { data: request, error } = await admin
      .from('requests')
      .select('*')
      .eq('id', request_id)
      .single();

    if (error || !request) {
      return NextResponse.json({ ok: false, error: 'Request not found' }, { status: 404 });
    }

    if (!request.quoted_amount || request.quoted_amount <= 0) {
      return NextResponse.json(
        { ok: false, error: 'Set a quoted_amount on the request before sending the quote.' },
        { status: 400 }
      );
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || new URL(req.url).origin;
    const reference = generateReference('REQ');
    const callback_url = `${siteUrl}/api/paystack/verify?reference=${reference}`;

    const init = await paystackInit({
      email: request.email,
      amount: nairaToKobo(Number(request.quoted_amount)),
      reference,
      callback_url,
      metadata: {
        type: 'request_quote',
        request_id: request.id,
        full_name: request.full_name,
        phone: request.phone,
        service: request.service_name,
      },
    });

    // Save payment record + payment_link on the request
    await admin.from('payments').insert({
      request_id: request.id,
      amount: Number(request.quoted_amount),
      reference,
      status: 'pending',
      customer_email: request.email,
      customer_name: request.full_name,
      metadata: { type: 'request_quote', request_id: request.id },
    });

    await admin
      .from('requests')
      .update({
        status: 'quotation_sent',
        payment_link: init.data.authorization_url,
        payment_status: 'pending',
      })
      .eq('id', request.id);

    // Email the client
    const tmpl = clientQuotationSent({
      full_name: request.full_name,
      reference: request.reference,
      service_name: request.service_name || 'Professional Service',
      quoted_amount: Number(request.quoted_amount),
      payment_url: init.data.authorization_url,
      admin_notes: request.admin_notes || undefined,
    });

    await sendEmail({
      to: request.email,
      subject: tmpl.subject,
      html: tmpl.html,
    });

    return NextResponse.json({
      ok: true,
      payment_url: init.data.authorization_url,
      reference,
    });
  } catch (err: any) {
    console.error('[admin/send-quote]', err);
    return NextResponse.json(
      { ok: false, error: err?.message || 'Could not send quote' },
      { status: 500 }
    );
  }
}
