import { z } from 'zod';
import { retrieve } from './retrieve';
import { callClaude } from './claude';
import type { RequestRow } from '@/types/db';

/**
 * The three back-office AI tools. Each retrieves real service context, calls
 * Claude for structured JSON, and validates the shape with Zod (the guardrail).
 * None of them send or save anything — they return DRAFTS for the valuer to
 * review, edit, and approve. And none may state a fee or figure.
 */

// ---------------------------------------------------------------------------
// 1. Quotation draft
// ---------------------------------------------------------------------------
const QuoteSchema = z.object({
  subject: z.string(),
  body: z.string(),
  suggested_scope: z.array(z.string()),
  assumptions: z.array(z.string()),
});
export type QuoteDraft = z.infer<typeof QuoteSchema>;

export async function draftQuotation(request: RequestRow): Promise<QuoteDraft> {
  const query = [request.service_name, request.property_type, request.property_purpose]
    .filter(Boolean)
    .join(' ');
  const context = (await retrieve(query, 5)).map((m) => `(${m.title}) ${m.content}`).join('\n\n');

  const system = `You draft quotation emails for Idoko C Idoko Consulting, Estate Surveyors & Valuers, Enugu, Nigeria.
Use ONLY the SERVICE CONTEXT below to describe scope.
NEVER state a fee, price, or naira figure — the valuer sets the fee separately. If cost is relevant, say a fixed written quotation will be confirmed.
Return ONLY JSON: {"subject":string,"body":string,"suggested_scope":string[],"assumptions":string[]}.
"body": warm, professional, under 200 words, addressed to the client, no fee, mentions secure payment via Paystack; do not fabricate specifics that are not in the context.

SERVICE CONTEXT:
${context || '(none found)'}`;

  const user = `Draft a quotation email for this request:
Client: ${request.full_name} (${request.email})
Service: ${request.service_name ?? '—'}
Property type: ${request.property_type ?? '—'}
Purpose: ${request.property_purpose ?? '—'}
Address: ${request.property_address ?? '—'}
Size: ${request.property_size ?? '—'}
Client notes: ${request.notes ?? '—'}`;

  const { text } = await callClaude({
    system,
    messages: [{ role: 'user', content: user }],
    maxTokens: 900,
    endpoint: 'draft-quote',
  });
  return QuoteSchema.parse(extractJson(text));
}

// ---------------------------------------------------------------------------
// 2. Report sections draft (from the valuer's raw inspection notes)
// ---------------------------------------------------------------------------
const ReportSchema = z.object({
  sections: z.array(z.object({ heading: z.string(), content: z.string() })),
  caveats: z.array(z.string()),
});
export type ReportDraft = z.infer<typeof ReportSchema>;

export async function draftReport(request: RequestRow, inspectionNotes: string): Promise<ReportDraft> {
  const context = (await retrieve(`${request.service_name} report`, 4)).map((m) => m.content).join('\n\n');

  const system = `You draft NON-BINDING report section text for a valuation firm, working ONLY from the valuer's raw inspection notes.
Rules:
- NEVER invent a value, figure, measurement, or opinion of value. Wherever a figure belongs, insert a clearly marked placeholder like "[valuer to insert]".
- Only reorganise and professionalise what the valuer actually wrote; do not add facts.
Return ONLY JSON: {"sections":[{"heading":string,"content":string}],"caveats":string[]}.`;

  const user = `Service: ${request.service_name}
Property: ${request.property_type ?? '—'} at ${request.property_address ?? '—'}
Purpose: ${request.property_purpose ?? '—'}

VALUER INSPECTION NOTES:
${inspectionNotes}`;

  const { text } = await callClaude({
    system,
    messages: [{ role: 'user', content: user }],
    maxTokens: 1500,
    endpoint: 'draft-report',
  });
  return ReportSchema.parse(extractJson(text));
}

// ---------------------------------------------------------------------------
// 3. Intake review (the agent): assess completeness and route
// ---------------------------------------------------------------------------
const IntakeSchema = z.object({
  completeness: z.enum(['complete', 'partial', 'insufficient']),
  summary: z.string(),
  missing: z.array(z.string()),
  red_flags: z.array(z.string()),
  suggested_status: z.string(),
  suggested_reply: z.string(),
});
export type IntakeReview = z.infer<typeof IntakeSchema>;

export async function intakeReview(request: RequestRow): Promise<IntakeReview> {
  const docList = (request.documents ?? []).map((d) => d.name).join(', ') || 'none';
  const context = (await retrieve(`${request.service_name} ${request.property_purpose} required documents`, 5))
    .map((m) => `(${m.title}) ${m.content}`)
    .join('\n\n');

  const system = `You are the intake officer for Idoko C Idoko Consulting, a valuation firm. Assess an incoming request for completeness and route it.
Use SERVICE CONTEXT to judge what a request of this type typically needs. Do not invent firm policy that isn't implied by the context.
Return ONLY JSON: {"completeness":"complete"|"partial"|"insufficient","summary":string,"missing":string[],"red_flags":string[],"suggested_status":string,"suggested_reply":string}.
- "missing": concrete items still needed (documents or details) given the stated purpose.
- "suggested_status": one of new, under_review, quotation_sent (usually under_review).
- "suggested_reply": a short courteous message to the client requesting anything missing. No fee.

SERVICE CONTEXT:
${context || '(none)'}`;

  const user = `Assess this request:
Service: ${request.service_name ?? '—'}
Property type: ${request.property_type ?? '—'}
Purpose: ${request.property_purpose ?? '—'}
Address: ${request.property_address ?? '—'}
Size: ${request.property_size ?? '—'}
Notes: ${request.notes ?? '—'}
Uploaded documents: ${docList}`;

  const { text } = await callClaude({
    system,
    messages: [{ role: 'user', content: user }],
    maxTokens: 900,
    endpoint: 'intake',
  });
  return IntakeSchema.parse(extractJson(text));
}

// ---------------------------------------------------------------------------
// Tolerant JSON extraction (handles code fences / stray prose around the JSON)
// ---------------------------------------------------------------------------
function extractJson(text: string): unknown {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const raw = fenced ? fenced[1] : text;
  const start = raw.indexOf('{');
  const end = raw.lastIndexOf('}');
  const slice = start >= 0 && end > start ? raw.slice(start, end + 1) : raw;
  return JSON.parse(slice);
}
