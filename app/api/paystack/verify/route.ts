import { NextRequest, NextResponse } from 'next/server';
import { paystackVerify } from '@/lib/paystack';
import { createAdminClient } from '@/lib/supabase/admin';
import { sendEmail } from '@/lib/email';
import {
  clientConsultationConfirmed,
  adminConsultationPaid,
} from '@/lib/email-templates';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * GET /api/paystack/verify?reference=XXX
 *
 * Paystack redirects users back here after payment.
 * We verify the transaction with Paystack, update DB, send confirmation
 * emails, and redirect the user to /thank-you.
 */
export async function GET(req: NextRequest) {
  const reference = req.nextUrl.searchParams.get('reference');
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || new URL(req.url).origin;
  const adminEmail = process.env.NEXT_PUBLIC_COMPANY_EMAIL || 'info@idokoconsulting.com';

  if (!reference) {
    return NextResponse.redirect(`${siteUrl}/thank-you?error=missing-reference`);
  }

  try {
    const result = await paystackVerify(reference);
    const supabase = createAdminClient();

    const data = result.data;
    const success = data?.status === 'success';
    const amountNaira = (data?.amount || 0) / 100;

    // Parse metadata (Paystack sometimes returns it as a JSON string)
    let meta: any = data?.metadata || {};
    if (typeof meta === 'string') {
      try {
        meta = JSON.parse(meta);
      } catch {
        meta = {};
      }
    }

    // Always update payments row
    await supabase
      .from('payments')
      .update({
        status: success ? 'success' : (data?.status as any) || 'failed',
        paystack_reference: data?.reference,
        paid_at: data?.paid_at || new Date().toISOString(),
        channel: data?.channel,
      })
      .eq('reference', reference);

    if (success) {
      const type = meta.type;

      if (type === 'consultation') {
        await supabase
          .from('consultations')
          .update({
            payment_status: 'paid',
            paystack_reference: reference,
            paid_at: new Date().toISOString(),
            status: 'confirmed',
          })
          .eq('reference', reference);

        // Email client
        const clientEmail = clientConsultationConfirmed({
          full_name: meta.full_name || 'Client',
          reference,
          preferred_date: meta.preferred_date,
          preferred_time: meta.preferred_time,
          topic: meta.topic,
          amount: amountNaira,
        });
        await sendEmail({
          to: data.customer.email,
          subject: clientEmail.subject,
          html: clientEmail.html,
        });

        // Email admin
        const adminMail = adminConsultationPaid({
          full_name: meta.full_name || 'Client',
          email: data.customer.email,
          phone: meta.phone,
          reference,
          preferred_date: meta.preferred_date,
          preferred_time: meta.preferred_time,
          topic: meta.topic,
          amount: amountNaira,
          admin_url: `${siteUrl}/admin/requests`,
        });
        await sendEmail({
          to: adminEmail,
          subject: adminMail.subject,
          html: adminMail.html,
        });
      } else if (type === 'request_quote' && meta.request_id) {
        await supabase
          .from('requests')
          .update({
            payment_status: 'paid',
            paystack_reference: reference,
            amount_paid: amountNaira,
            paid_at: new Date().toISOString(),
            status: 'payment_received',
          })
          .eq('id', meta.request_id);
      }
    }

    return NextResponse.redirect(
      `${siteUrl}/thank-you?ref=${reference}&type=${success ? 'payment' : 'failed'}`
    );
  } catch (err: any) {
    console.error('[paystack/verify]', err);
    return NextResponse.redirect(
      `${siteUrl}/thank-you?ref=${reference}&type=failed&error=${encodeURIComponent(err?.message || '')}`
    );
  }
}
