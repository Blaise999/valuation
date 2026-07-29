import { createAdminClient } from '@/lib/supabase/admin';

/**
 * Rough per-token pricing (USD). Set these to your plan's actual rates —
 * they're only used to estimate spend on the AI usage dashboard.
 */
const PRICE_PER_TOKEN = {
  input: 1 / 1_000_000,
  output: 5 / 1_000_000,
};

export interface AiLogEntry {
  endpoint: string;
  model: string;
  input_tokens: number | null;
  output_tokens: number | null;
  latency_ms: number;
  ok: boolean;
  error: string | null;
}

/** Fire-and-forget: never let logging break the actual request. */
export async function logAiCall(entry: AiLogEntry): Promise<void> {
  try {
    const cost =
      (entry.input_tokens ?? 0) * PRICE_PER_TOKEN.input +
      (entry.output_tokens ?? 0) * PRICE_PER_TOKEN.output;

    const admin = createAdminClient();
    await admin.from('ai_logs').insert({
      ...entry,
      cost_usd: Number(cost.toFixed(6)),
    });
  } catch {
    // swallow — observability must not affect the user path
  }
}
