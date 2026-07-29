# RAG assistant — what was added

A retrieval-augmented Q&A layer over the firm's own content. A visitor can ask
"what does a probate valuation involve and how long does it take?" and get an
answer drawn from `lib/service-details.ts` — never invented.

## New files

| File | Role | AI-engineer box it ticks |
| --- | --- | --- |
| `supabase/rag.sql` | pgvector table + `match_knowledge()` search function | vector store |
| `lib/rag/embed.ts` | text → embedding (fetch, no new dep) | embeddings |
| `lib/rag/sources.ts` | firm content → knowledge docs (reuses existing copy) | ingestion |
| `lib/rag/retrieve.ts` | embed query → nearest chunks | retrieval |
| `lib/rag/generate.ts` | retrieve + Claude with a guardrail prompt | RAG + guardrails |
| `app/api/rag/ask/route.ts` | public `POST /api/rag/ask` | LLM API integration |
| `app/api/rag/reindex/route.ts` | secret-guarded rebuild of the index | ops |

Only `.env.example` was modified (three keys appended).

## Setup (4 steps)

1. **Run the SQL.** Paste `supabase/rag.sql` into the Supabase SQL editor and run
   it (after `schema.sql`). Enables `vector`, creates `knowledge_chunks`.
2. **Add env keys** (see the RAG block in `.env.example`): `OPENAI_API_KEY`,
   `ANTHROPIC_API_KEY`, `RAG_INGEST_SECRET`.
3. **Build the index:**
   ```bash
   curl -X POST http://localhost:3000/api/rag/reindex \
        -H "Authorization: Bearer $RAG_INGEST_SECRET"
   ```
   Re-run this whenever you edit service content. (If your host caps function
   time, run it against `npm run dev` locally — same result, no timeout.)
4. **Ask something:**
   ```bash
   curl -X POST http://localhost:3000/api/rag/ask \
        -H "Content-Type: application/json" \
        -d '{"question":"How long does a mortgage valuation take?"}'
   ```
   Response: `{ ok, answer, sources, grounded }`.

## Design notes (say these in your portfolio write-up)

- **One source of truth.** The knowledge base is generated from existing site
  copy, so the assistant can never drift from what the site says.
- **The guardrail is the point.** `generate.ts` forbids the model from inventing
  fees or figures and makes it defer to the team when the context is silent —
  which matters for a firm that issues court-admissible reports.
- **`grounded` + `sources`** are returned so the UI can show where an answer
  came from and detect "no relevant knowledge" cases.

## Next steps
- A small chat widget on the site (wire to `/api/rag/ask`).
- Reuse `retrieve()` inside the Quotation Drafter so quotes cite real service scope.
- Add an eval set: a JSON list of `{ question, mustMention / mustNotInvent }` run
  against `/api/rag/ask`.

---

## Phase 1 widget (added)

A floating assistant, bottom-left (so it doesn't clash with WhatsApp on the right).

New/changed:
- `components/AskAssistant.tsx` — streaming chat, source chips, suggestions.
- `app/api/rag/chat/route.ts` — streams the answer; sources in `x-rag-sources` header.
- `lib/rag/generate.ts` — added `answerStream()` (SSE → text stream).
- `app/layout.tsx` — mounts `<AskAssistant />`.

Multimodal scaffolding is already in the input bar:
- **Mic** — wired to the browser Speech API (shows only when supported). This is Phase 2, already working.
- **Attach** — visible but disabled, ready for Phase 3 (images + files sent as base64 blocks straight into the same Claude call).

Nothing else to configure — once the index is built (`/api/rag/reindex`), open any page and the assistant answers from your service content.

---

## Pipeline complete — the rest of the boxes

The remaining pipeline pieces are now built in.

New files:
- `lib/rag/claude.ts` — one logged Claude caller every non-streaming call goes through.
- `lib/rag/log.ts` + `supabase/observability.sql` — records every call (tokens, latency, cost).
- `lib/rag/drafters.ts` — three tools, each RAG-grounded, Zod-validated, and barred from stating a fee:
  - `intakeReview()` — the agent: reads a request + its documents, judges completeness, lists what's missing, flags issues, drafts a reply.
  - `draftQuotation()` — drafts the quotation email from the request + real service scope.
  - `draftReport()` — turns the valuer's raw inspection notes into draft report sections, with `[valuer to insert]` placeholders where figures belong.
- `app/api/admin/ai/route.ts` — admin-only endpoint for all three (same auth guard as send-quote).
- `components/admin/AiAssist.tsx` — the panel on each request page; every output is a draft the valuer copies/edits.
- `app/admin/ai-usage/page.tsx` — the observability dashboard (added to admin nav).
- `evals/cases.json` + `scripts/run-evals.mjs` — the eval harness.

Setup additions:
1. Run `supabase/observability.sql` in the SQL editor.
2. The AI panel appears on `/admin/requests/[id]`; AI Usage is in the admin sidebar.
3. Run the evals against a live server:
   ```bash
   node scripts/run-evals.mjs                       # localhost:3000
   EVAL_BASE_URL=https://your-site node scripts/run-evals.mjs
   ```

### Where each box lives now
- LLM API integration → `lib/rag/claude.ts`, all endpoints
- RAG → `embed/retrieve/sources/generate`
- Agent → `intakeReview()`
- Guardrails → Zod schemas in `drafters.ts` + "no fee" prompts + human-review UI (drafts only)
- Evals → `scripts/run-evals.mjs`
- Observability → `ai_logs` + `/admin/ai-usage`
