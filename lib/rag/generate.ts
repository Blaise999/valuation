/**
 * Generation half of RAG: retrieve firm knowledge, then have Claude answer
 * using ONLY that context. Calls the Anthropic Messages API via fetch (no SDK
 * dependency). SERVER ONLY.
 *
 * The system prompt is the guardrail: the model may not invent fees or figures,
 * and must defer to the team when the answer isn't in the retrieved context.
 */

import { retrieve, type KnowledgeMatch } from './retrieve';
import { callClaude } from './claude';

const ANTHROPIC_URL = 'https://api.anthropic.com/v1/messages';
// Haiku is cheap and fast and plenty capable once RAG supplies the facts.
// Swap to 'claude-sonnet-5' if you want richer phrasing on client-facing replies.
const MODEL = 'claude-haiku-4-5-20251001';

export interface RagAnswer {
  answer: string;
  sources: { source: string; title: string }[];
  grounded: boolean;
}

function buildSystemPrompt(context: string): string {
  return `You are the assistant for Idoko C Idoko Consulting, a registered firm of Estate Surveyors & Valuers in Enugu, Nigeria (services: valuation, property management, facility management, feasibility studies, agency, investment consulting).

Answer the client's question using ONLY the CONTEXT below.

Rules:
- NEVER invent or estimate a fee, price, or figure. If asked about cost, explain that the firm sends a written quotation within 24 hours after a request is submitted, and point them to the "Request a Valuation" page.
- If the answer is not in the CONTEXT, say the team will follow up and suggest booking a consultation. Do not guess.
- Be warm, concise, and professional — 3 to 6 sentences.
- Never give legal guarantees about outcomes.

CONTEXT:
${context || '(no relevant firm documents were found for this question)'}`;
}

export async function answerFromKnowledge(question: string): Promise<RagAnswer> {
  const matches: KnowledgeMatch[] = await retrieve(question, 6);

  const context = matches
    .map((m, i) => `[${i + 1}] (${m.title})\n${m.content}`)
    .join('\n\n');

  const { text: answer } = await callClaude({
    system: buildSystemPrompt(context),
    messages: [{ role: 'user', content: question }],
    maxTokens: 600,
    endpoint: 'ask',
  });

  // Unique sources, in retrieval order, for citations in the UI.
  const seen = new Set<string>();
  const sources = matches
    .filter((m) => (seen.has(m.source) ? false : (seen.add(m.source), true)))
    .map((m) => ({ source: m.source, title: m.title }));

  return { answer, sources, grounded: matches.length > 0 };
}

// ---------------------------------------------------------------------------
// Streaming variant (used by the chat widget). Returns citation sources up
// front, plus a ReadableStream of the answer text as Claude generates it.
// ---------------------------------------------------------------------------

function parseAnthropicSSE(body: ReadableStream<Uint8Array>): ReadableStream<Uint8Array> {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  let buffer = '';

  return new ReadableStream<Uint8Array>({
    async pull(controller) {
      const { done, value } = await reader.read();
      if (done) {
        controller.close();
        return;
      }
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() ?? '';
      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed.startsWith('data:')) continue;
        const payload = trimmed.slice(5).trim();
        if (!payload || payload === '[DONE]') continue;
        try {
          const evt = JSON.parse(payload);
          if (evt.type === 'content_block_delta' && evt.delta?.type === 'text_delta') {
            controller.enqueue(encoder.encode(evt.delta.text));
          }
        } catch {
          // keep-alive or partial line — ignore
        }
      }
    },
    cancel() {
      reader.cancel().catch(() => {});
    },
  });
}

export async function answerStream(
  question: string
): Promise<{ sources: { source: string; title: string }[]; stream: ReadableStream<Uint8Array> }> {
  const matches: KnowledgeMatch[] = await retrieve(question, 6);
  const context = matches
    .map((m, i) => `[${i + 1}] (${m.title})\n${m.content}`)
    .join('\n\n');

  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) throw new Error('ANTHROPIC_API_KEY is not set');

  const upstream = await fetch(ANTHROPIC_URL, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': key,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 600,
      system: buildSystemPrompt(context),
      stream: true,
      messages: [{ role: 'user', content: question }],
    }),
  });

  if (!upstream.ok || !upstream.body) {
    throw new Error(`Anthropic request failed: ${upstream.status} ${await upstream.text()}`);
  }

  const seen = new Set<string>();
  const sources = matches
    .filter((m) => (seen.has(m.source) ? false : (seen.add(m.source), true)))
    .map((m) => ({ source: m.source, title: m.title }));

  return { sources, stream: parseAnthropicSSE(upstream.body) };
}
