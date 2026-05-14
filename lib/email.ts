/**
 * Email service using Resend (https://resend.com).
 *
 * Setup:
 * 1. Sign up at https://resend.com (free tier: 3,000 emails/month)
 * 2. Verify a sending domain (or use the test sender for development)
 * 3. Add to .env.local:
 *    RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxx
 *    RESEND_FROM=Idoko Consulting <hello@yourdomain.com>
 *
 * If RESEND_API_KEY is not set, emails are logged to console (safe for dev).
 */

import { Resend } from 'resend';

let _resend: Resend | null = null;

function getResend() {
  if (_resend) return _resend;
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  _resend = new Resend(key);
  return _resend;
}

export async function sendEmail({
  to,
  subject,
  html,
  replyTo,
}: {
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
}) {
  const resend = getResend();
  const from = process.env.RESEND_FROM || 'Idoko Consulting <onboarding@resend.dev>';

  if (!resend) {
    console.log('📧 [email skipped — RESEND_API_KEY not set]', { to, subject });
    return { ok: false, skipped: true };
  }

  try {
    const result = await resend.emails.send({
      from,
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
      replyTo,
    });
    if (result.error) {
      console.error('📧 [Resend error]', result.error);
      return { ok: false, error: result.error.message };
    }
    return { ok: true, id: result.data?.id };
  } catch (err: any) {
    console.error('📧 [Resend threw]', err);
    return { ok: false, error: err?.message || 'Unknown error' };
  }
}

