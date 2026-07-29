import { createClient } from '@/lib/supabase/server';
import { formatDate } from '@/lib/utils';

export const dynamic = 'force-dynamic';

interface AiLog {
  id: string;
  endpoint: string;
  model: string | null;
  input_tokens: number | null;
  output_tokens: number | null;
  cost_usd: number | null;
  latency_ms: number | null;
  ok: boolean;
  error: string | null;
  created_at: string;
}

export default async function AiUsagePage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from('ai_logs')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(100);

  const logs = (data as AiLog[]) || [];

  const calls = logs.length;
  const tokens = logs.reduce((s, l) => s + (l.input_tokens || 0) + (l.output_tokens || 0), 0);
  const cost = logs.reduce((s, l) => s + (l.cost_usd || 0), 0);
  const avgLatency = calls ? Math.round(logs.reduce((s, l) => s + (l.latency_ms || 0), 0) / calls) : 0;
  const failures = logs.filter((l) => !l.ok).length;

  const stats = [
    { label: 'Calls (last 100)', value: calls.toString() },
    { label: 'Tokens', value: tokens.toLocaleString() },
    { label: 'Est. cost', value: `$${cost.toFixed(4)}` },
    { label: 'Avg latency', value: `${avgLatency} ms` },
    { label: 'Failures', value: failures.toString() },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold text-ink-900">AI Usage</h1>
        <p className="mt-1 text-sm text-ink-500">
          Every model call the site makes — quotations, intake reviews, report drafts, and the site assistant.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-ink-100 bg-white p-5">
            <div className="text-xs uppercase tracking-wider text-ink-500">{s.label}</div>
            <div className="mt-2 font-display text-2xl font-bold text-ink-900">{s.value}</div>
          </div>
        ))}
      </div>

      <div className="overflow-hidden rounded-2xl border border-ink-100 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-ink-100 bg-ink-50 text-xs uppercase tracking-wider text-ink-500">
            <tr>
              <th className="px-4 py-3">When</th>
              <th className="px-4 py-3">Endpoint</th>
              <th className="px-4 py-3">Model</th>
              <th className="px-4 py-3">Tokens</th>
              <th className="px-4 py-3">Latency</th>
              <th className="px-4 py-3">Cost</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {logs.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-ink-500">
                  No AI calls logged yet.
                </td>
              </tr>
            )}
            {logs.map((l) => (
              <tr key={l.id} className="border-b border-ink-50 last:border-0">
                <td className="px-4 py-3 text-ink-600">{formatDate(l.created_at)}</td>
                <td className="px-4 py-3">
                  <span className="rounded-full bg-brand-50 px-2 py-0.5 text-xs font-medium text-brand-800">
                    {l.endpoint}
                  </span>
                </td>
                <td className="px-4 py-3 text-ink-600">{l.model || '—'}</td>
                <td className="px-4 py-3 text-ink-800">
                  {(l.input_tokens || 0) + (l.output_tokens || 0) || '—'}
                </td>
                <td className="px-4 py-3 text-ink-600">{l.latency_ms ? `${l.latency_ms} ms` : '—'}</td>
                <td className="px-4 py-3 text-ink-600">{l.cost_usd != null ? `$${l.cost_usd.toFixed(5)}` : '—'}</td>
                <td className="px-4 py-3">
                  {l.ok ? (
                    <span className="text-emerald-700">ok</span>
                  ) : (
                    <span className="text-rose-700" title={l.error || ''}>error</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
