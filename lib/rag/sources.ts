/**
 * Turns the firm's existing structured content into RAG documents.
 *
 * The whole point: the site already holds real, accurate copy in
 * lib/service-details.ts (overviews, process, what-you-get, pricing notes,
 * FAQs). We reuse it as the knowledge base so the assistant answers from the
 * firm's actual words — and there is only ever one source of truth to update.
 */

import { SERVICE_DETAILS } from '@/lib/service-details';

export interface KnowledgeDoc {
  source: string;
  title: string;
  content: string;
}

export function buildKnowledgeDocs(): KnowledgeDoc[] {
  const docs: KnowledgeDoc[] = [];

  for (const s of Object.values(SERVICE_DETAILS)) {
    const base = `service/${s.slug}`;

    docs.push({
      source: `${base}/overview`,
      title: `${s.name} — overview`,
      content: [s.tagline, s.intro, ...(s.longDescription ?? [])]
        .filter(Boolean)
        .join('\n\n'),
    });

    if (s.whenYouNeed?.length) {
      docs.push({
        source: `${base}/when-you-need`,
        title: `${s.name} — when you need it`,
        content: s.whenYouNeed.map((w) => `${w.title}: ${w.desc}`).join('\n'),
      });
    }

    if (s.process?.length) {
      docs.push({
        source: `${base}/process`,
        title: `${s.name} — how it works`,
        content: s.process.map((p) => `${p.step} ${p.title}: ${p.desc}`).join('\n'),
      });
    }

    if (s.whatYouGet?.length) {
      docs.push({
        source: `${base}/what-you-get`,
        title: `${s.name} — what you get`,
        content: s.whatYouGet.map((w) => `${w.title}: ${w.desc}`).join('\n'),
      });
    }

    if (s.pricingNote) {
      docs.push({
        source: `${base}/pricing`,
        title: `${s.name} — pricing note`,
        content: s.pricingNote,
      });
    }

    (s.faqs ?? []).forEach((f, i) => {
      docs.push({
        source: `${base}/faq-${i + 1}`,
        title: `${s.name} — FAQ: ${f.q}`,
        content: `Q: ${f.q}\nA: ${f.a}`,
      });
    });
  }

  return docs;
}
