import { logAiCall } from './log';

const ANTHROPIC_URL = 'https://api.anthropic.com/v1/messages';
export const DEFAULT_MODEL = 'claude-haiku-4-5-20251001';

export interface ClaudeResult {
  text: string;
  usage: { input_tokens: number; output_tokens: number } | null;
}

/**
 * One place all non-streaming Claude calls go through, so every call is
 * automatically logged (tokens, latency, cost, success). SERVER ONLY.
 */
export async function callClaude(opts: {
  system: string;
  messages: { role: 'user' | 'assistant'; content: any }[];
  maxTokens?: number;
  model?: string;
  endpoint: string; // label for the usage log
}): Promise<ClaudeResult> {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) throw new Error('ANTHROPIC_API_KEY is not set');

  const model = opts.model || DEFAULT_MODEL;
  const started = Date.now();
  let ok = false;
  let error: string | null = null;
  let usage: ClaudeResult['usage'] = null;

  try {
    const res = await fetch(ANTHROPIC_URL, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': key,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model,
        max_tokens: opts.maxTokens ?? 800,
        system: opts.system,
        messages: opts.messages,
      }),
    });

    if (!res.ok) throw new Error(`Anthropic ${res.status}: ${await res.text()}`);

    const json = await res.json();
    const text: string = (json.content ?? [])
      .filter((b: { type: string }) => b.type === 'text')
      .map((b: { text: string }) => b.text)
      .join('\n')
      .trim();

    usage = json.usage ?? null;
    ok = true;
    return { text, usage };
  } catch (e: any) {
    error = e?.message || 'error';
    throw e;
  } finally {
    logAiCall({
      endpoint: opts.endpoint,
      model,
      input_tokens: usage?.input_tokens ?? null,
      output_tokens: usage?.output_tokens ?? null,
      latency_ms: Date.now() - started,
      ok,
      error,
    });
  }
}
