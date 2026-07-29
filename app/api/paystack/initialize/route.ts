import { NextRequest, NextResponse } from 'next/server';
import { paystackInit, generateReference, nairaToKobo } from '@/lib/paystack';
import { createAdminClient } from '@/lib/supabase/admin';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * POST /api/paystack/initialize
 *
 * Body shape:
 * {
 *   type: 'consultation' | 'request_quote',
 *   amount: number,           // in NAIRA
 *   email: string,
 *   metadata: { full_name, phone, ... type-specific fields }
 * }
 *
 * Returns: { ok, authorization_url, reference }
 *
 * The customer is redirected to authorization_url to complete payment.
 * After payment, Paystack redirects them back to /api/paystack/verify?reference=...
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, amount, email, metadata = {} } = body;

    if (!type || !amount || !email) {
      return NextResponse.json(
        { ok: false, error: 'Missing required fields: type, amount, email' },
        { status: 400 }
      );
    }

    if (!['consultation', 'request_quote'].includes(type)) {
      return NextResponse.json(
        { ok: false, error: `Invalid type: ${type}` },
        { status: 400 }
      );
    }

    if (typeof amount !== 'number' || amount < 100) {
      return NextResponse.json(
        { ok: false, error: 'Amount must be a number >= 100' },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();
    const reference = generateReference(type === 'consultation' ? 'CON' : 'REQ');

    if (type === 'consultation') {
      // Create the consultation row in pending state
      const { error } = await supabase.from('consultations').insert({
        reference,
        full_name: metadata.full_name,
        email,
        phone: metadata.phone,
        preferred_date: metadata.preferred_date || null,
        preferred_time: metadata.preferred_time || null,
        topic: metadata.topic,
        notes: metadata.notes,
        fee: amount,
        payment_status: 'pending',
        status: 'pending',
      });
      if (error) throw error;
    } else if (type === 'request_quote') {
      // Validate the request_id exists and update it to pending
      if (!metadata.request_id) {
        return NextResponse.json(
          { ok: false, error: 'request_id is required for request_quote' },
          { status: 400 }
        );
      }
      const { error } = await supabase
        .from('requests')
        .update({ payment_status: 'pending' })
        .eq('id', metadata.request_id);
      if (error) throw error;
    }

    // Insert payment record (pending)
    const { error: payErr } = await supabase.from('payments').insert({
      amount,
      reference,
      status: 'pending',
      customer_email: email,
      customer_name: metadata.full_name,
      metadata: { type, ...metadata },
    });
    if (payErr) throw payErr;

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || new URL(req.url).origin;
    const callback_url = `${siteUrl}/api/paystack/verify?reference=${reference}`;

    const init = await paystackInit({
      email,
      amount: nairaToKobo(amount),
      reference,
      callback_url,
      metadata: { type, ...metadata },
    });

    return NextResponse.json({
      ok: true,
      authorization_url: init.data.authorization_url,
      reference: init.data.reference,
    });
  } catch (err: any) {
    console.error('[paystack/initialize]', err);
    return NextResponse.json(
      { ok: false, error: err?.message || 'Could not initialize payment' },
      { status: 500 }
    );
  }
}
