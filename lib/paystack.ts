/**
 * Paystack server-side helpers.
 *
 * IMPORTANT: this file uses PAYSTACK_SECRET_KEY which must NEVER be exposed
 * to the browser. Only import this file from API routes (app/api/**).
 */

const PAYSTACK_BASE = 'https://api.paystack.co';

function authHeaders() {
  const key = process.env.PAYSTACK_SECRET_KEY;
  if (!key) {
    throw new Error(
      'PAYSTACK_SECRET_KEY is not set. Add it to your .env.local file. ' +
        'Get it from https://dashboard.paystack.com/#/settings/developer'
    );
  }
  return {
    Authorization: `Bearer ${key}`,
    'Content-Type': 'application/json',
  };
}

export interface PaystackInitInput {
  email: string;
  amount: number; // in KOBO (₦1 = 100 kobo). Multiply naira by 100.
  reference: string;
  callback_url: string;
  metadata?: Record<string, any>;
}

export interface PaystackInitResponse {
  status: boolean;
  message: string;
  data: {
    authorization_url: string;
    access_code: string;
    reference: string;
  };
}

export interface PaystackVerifyResponse {
  status: boolean;
  message: string;
  data: {
    status: 'success' | 'failed' | 'abandoned' | 'pending';
    reference: string;
    amount: number; // kobo
    paid_at: string | null;
    channel: string;
    currency: string;
    customer: { email: string; first_name?: string; last_name?: string };
    metadata: Record<string, any> | string;
    gateway_response: string;
  };
}

/**
 * Initialize a Paystack transaction. Returns the authorization_url
 * which you should redirect the customer to.
 */
export async function paystackInit(payload: PaystackInitInput): Promise<PaystackInitResponse> {
  const res = await fetch(`${PAYSTACK_BASE}/transaction/initialize`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(payload),
    cache: 'no-store',
  });
  const data = await res.json();
  if (!res.ok || !data?.status) {
    throw new Error(data?.message || `Paystack init failed (${res.status})`);
  }
  return data;
}

/**
 * Verify a Paystack transaction by reference.
 * Use this in your callback route after the customer is redirected back.
 */
export async function paystackVerify(reference: string): Promise<PaystackVerifyResponse> {
  const res = await fetch(`${PAYSTACK_BASE}/transaction/verify/${encodeURIComponent(reference)}`, {
    headers: authHeaders(),
    cache: 'no-store',
  });
  const data = await res.json();
  if (!res.ok || !data?.status) {
    throw new Error(data?.message || `Paystack verify failed (${res.status})`);
  }
  return data;
}

/**
 * Generate a unique reference. Pattern: {prefix}-{timestamp}-{random}.
 */
export function generateReference(prefix = 'IDK') {
  const ts = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `${prefix}-${ts}-${rand}`;
}

/**
 * Convert naira to kobo for Paystack API.
 * Always Math.round to avoid floating-point cents.
 */
export function nairaToKobo(naira: number) {
  return Math.round(naira * 100);
}
