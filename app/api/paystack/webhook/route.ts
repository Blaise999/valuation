import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { createAdminClient } from '@/lib/supabase/admin';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * POST /api/paystack/webhook
 *
 * Paystack POSTs every transaction event here.
 * Configure the webhook URL in your Paystack Dashboard:
 *   Settings → API Keys & Webhooks → Webhook URL
 *   https://YOUR_DOMAIN.com/api/paystack/webhook
 *
 * We verify the signature with HMAC SHA-512 of the raw body using your
 * PAYSTACK_SECRET_KEY. If it doesn't match — reject.
 */
export async function POST(req: NextRequest) {
  try {
    const raw = await req.text();
    const sig = req.headers.get('x-paystack-signature');

    const expected = crypto
      .createHmac('sha512', process.env.PAYSTACK_SECRET_KEY || '')
      .update(raw)
      .digest('hex');

    if (!sig || sig !== expected) {
      console.warn('[paystack/webhook] invalid signature');
      return NextResponse.json({ ok: false, error: 'invalid signature' }, { status: 401 });
    }

    const event = JSON.parse(raw);
    const supabase = createAdminClient();

    if (event?.event === 'charge.success') {
      const data = event.data;
      const amountNaira = (data.amount || 0) / 100;

      let meta: any = data?.metadata || {};
      if (typeof meta === 'string') {
        try { meta = JSON.parse(meta); } catch { meta = {}; }
      }

      // Update payments
      await supabase
        .from('payments')
        .update({
          status: 'success',
          paystack_reference: data.reference,
          paid_at: data.paid_at,
          channel: data.channel,
        })
        .eq('reference', data.reference);

      // Update related entity (idempotent — verify route may also have run)
      const type = meta?.type;
      if (type === 'consultation') {
        await supabase
          .from('consultations')
          .update({
            payment_status: 'paid',
            paid_at: data.paid_at,
            paystack_reference: data.reference,
            status: 'confirmed',
          })
          .eq('reference', data.reference);
      } else if (type === 'request_quote' && meta.request_id) {
        await supabase
          .from('requests')
          .update({
            payment_status: 'paid',
            paid_at: data.paid_at,
            paystack_reference: data.reference,
            amount_paid: amountNaira,
            status: 'payment_received',
          })
          .eq('id', meta.request_id);
      }
    }

    // Always 200 OK so Paystack stops retrying
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error('[paystack/webhook]', err);
    return NextResponse.json({ ok: false, error: err?.message }, { status: 500 });
  }
}
