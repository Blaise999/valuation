'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { Sparkles, Copy, ClipboardCheck, FileSearch, FileText } from 'lucide-react';
import { Button, Textarea } from '@/components/ui/Form';
import type { RequestRow } from '@/types/db';

type IntakeResult = {
  completeness: 'complete' | 'partial' | 'insufficient';
  summary: string;
  missing: string[];
  red_flags: string[];
  suggested_status: string;
  suggested_reply: string;
};
type QuoteResult = { subject: string; body: string; suggested_scope: string[]; assumptions: string[] };
type ReportResult = { sections: { heading: string; content: string }[]; caveats: string[] };

async function runAction(body: object) {
  const res = await fetch('/api/admin/ai', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!data.ok) throw new Error(data.error || 'AI request failed');
  return data.result;
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={async () => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }}
      className="inline-flex items-center gap-1 rounded-lg bg-ink-50 px-2.5 py-1 text-xs font-medium text-ink-700 hover:bg-ink-100"
    >
      {copied ? <ClipboardCheck size={12} /> : <Copy size={12} />} {copied ? 'Copied' : 'Copy'}
    </button>
  );
}

const completenessTone: Record<string, string> = {
  complete: 'bg-emerald-50 text-emerald-800 ring-emerald-200',
  partial: 'bg-amber-50 text-amber-800 ring-amber-200',
  insufficient: 'bg-rose-50 text-rose-800 ring-rose-200',
};

export default function AiAssist({ request }: { request: RequestRow }) {
  const [loading, setLoading] = useState<string | null>(null);
  const [intake, setIntake] = useState<IntakeResult | null>(null);
  const [quote, setQuote] = useState<QuoteResult | null>(null);
  const [report, setReport] = useState<ReportResult | null>(null);
  const [notes, setNotes] = useState('');

  async function run(action: string, extra: object = {}) {
    setLoading(action);
    try {
      const result = await runAction({ action, request_id: request.id, ...extra });
      if (action === 'intake') setIntake(result);
      if (action === 'draft-quote') setQuote(result);
      if (action === 'draft-report') setReport(result);
    } catch (err: any) {
      toast.error(err?.message || 'Failed');
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="rounded-2xl border border-brand-200 bg-white p-6">
      <div className="flex items-center gap-2">
        <Sparkles size={18} className="text-brand-700" />
        <h2 className="font-display text-base font-bold text-ink-900">AI Assist</h2>
      </div>
      <p className="mt-1 text-xs text-ink-500">
        Drafts only — review and edit before anything is sent. The model never sets a fee.
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        <Button onClick={() => run('intake')} disabled={!!loading} variant="secondary" size="md">
          <FileSearch size={14} /> {loading === 'intake' ? 'Reviewing…' : 'Intake review'}
        </Button>
        <Button onClick={() => run('draft-quote')} disabled={!!loading} variant="secondary" size="md">
          <FileText size={14} /> {loading === 'draft-quote' ? 'Drafting…' : 'Draft quotation'}
        </Button>
      </div>

      {/* Intake review */}
      {intake && (
        <div className="mt-5 space-y-3 rounded-xl border border-ink-100 bg-ink-50/50 p-4">
          <div className="flex items-center justify-between">
            <span
              className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wide ring-1 ring-inset ${
                completenessTone[intake.completeness] || ''
              }`}
            >
              {intake.completeness}
            </span>
            <span className="text-xs text-ink-500">Suggested: {intake.suggested_status}</span>
          </div>
          <p className="text-sm text-ink-800">{intake.summary}</p>
          {intake.missing.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-ink-700">Missing</p>
              <ul className="mt-1 list-inside list-disc text-sm text-ink-700">
                {intake.missing.map((m, i) => (
                  <li key={i}>{m}</li>
                ))}
              </ul>
            </div>
          )}
          {intake.red_flags.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-rose-700">Red flags</p>
              <ul className="mt-1 list-inside list-disc text-sm text-rose-700">
                {intake.red_flags.map((m, i) => (
                  <li key={i}>{m}</li>
                ))}
              </ul>
            </div>
          )}
          <div className="rounded-lg bg-white p-3">
            <div className="mb-1 flex items-center justify-between">
              <p className="text-xs font-semibold text-ink-700">Suggested reply to client</p>
              <CopyButton text={intake.suggested_reply} />
            </div>
            <p className="whitespace-pre-wrap text-sm text-ink-800">{intake.suggested_reply}</p>
          </div>
        </div>
      )}

      {/* Quotation draft */}
      {quote && (
        <div className="mt-5 space-y-2 rounded-xl border border-ink-100 bg-ink-50/50 p-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-ink-700">Draft quotation</p>
            <CopyButton text={`${quote.subject}\n\n${quote.body}`} />
          </div>
          <p className="text-sm font-semibold text-ink-900">{quote.subject}</p>
          <p className="whitespace-pre-wrap text-sm text-ink-800">{quote.body}</p>
          {quote.suggested_scope.length > 0 && (
            <div className="pt-1">
              <p className="text-xs font-semibold text-ink-700">Suggested scope</p>
              <ul className="mt-1 list-inside list-disc text-sm text-ink-700">
                {quote.suggested_scope.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Report drafter */}
      <div className="mt-6 border-t border-ink-100 pt-5">
        <p className="text-sm font-semibold text-ink-900">Draft report from inspection notes</p>
        <Textarea
          rows={4}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Paste your raw site-inspection notes here…"
          className="mt-2"
        />
        <Button
          onClick={() => run('draft-report', { inspection_notes: notes })}
          disabled={!!loading || !notes.trim()}
          variant="secondary"
          size="md"
          className="mt-3"
        >
          <FileText size={14} /> {loading === 'draft-report' ? 'Drafting…' : 'Draft report sections'}
        </Button>

        {report && (
          <div className="mt-4 space-y-3">
            {report.sections.map((s, i) => (
              <div key={i} className="rounded-xl border border-ink-100 bg-ink-50/50 p-4">
                <div className="mb-1 flex items-center justify-between">
                  <p className="text-sm font-semibold text-ink-900">{s.heading}</p>
                  <CopyButton text={`${s.heading}\n${s.content}`} />
                </div>
                <p className="whitespace-pre-wrap text-sm text-ink-800">{s.content}</p>
              </div>
            ))}
            {report.caveats.length > 0 && (
              <p className="text-xs text-ink-500">
                Caveats: {report.caveats.join(' · ')}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
