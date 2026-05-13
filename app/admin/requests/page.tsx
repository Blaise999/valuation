import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { formatDate, formatNaira, statusColor, statusLabel } from '@/lib/utils';
import { Search } from 'lucide-react';

export const metadata = { title: 'Requests' };
export const dynamic = 'force-dynamic';

export default async function AdminRequestsPage({ searchParams }: { searchParams: { status?: string; q?: string } }) {
  const supabase = await createClient();
  let query = supabase.from('requests').select('*').order('created_at', { ascending: false });

  if (searchParams.status) query = query.eq('status', searchParams.status);
  if (searchParams.q) query = query.or(`full_name.ilike.%${searchParams.q}%,email.ilike.%${searchParams.q}%,reference.ilike.%${searchParams.q}%`);

  const { data: requests } = await query;

  const filters = [
    { v: '', l: 'All' },
    { v: 'new', l: 'New' },
    { v: 'under_review', l: 'Under Review' },
    { v: 'quotation_sent', l: 'Quote Sent' },
    { v: 'payment_received', l: 'Paid' },
    { v: 'in_progress', l: 'In Progress' },
    { v: 'report_ready', l: 'Report Ready' },
    { v: 'completed', l: 'Completed' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold text-ink-900">Service Requests</h1>
        <p className="mt-1 text-sm text-ink-500">All valuation, property, and consulting requests submitted via the website.</p>
      </div>

      <form className="flex flex-wrap items-center gap-3" action="">
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
          <input
            name="q"
            defaultValue={searchParams.q}
            placeholder="Search by name, email, reference…"
            className="block w-full rounded-xl border border-ink-200 bg-white py-2 pl-9 pr-4 text-sm focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-100"
          />
        </div>
        <input type="hidden" name="status" value={searchParams.status || ''} />
        <button type="submit" className="rounded-xl bg-brand-700 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-800">Search</button>
      </form>

      <div className="flex flex-wrap gap-2">
        {filters.map((f) => {
          const active = (searchParams.status || '') === f.v;
          const href = f.v ? `/admin/requests?status=${f.v}` : '/admin/requests';
          return (
            <Link
              key={f.v || 'all'}
              href={href}
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold ring-1 ring-inset transition ${
                active ? 'bg-brand-700 text-white ring-brand-700' : 'bg-white text-ink-700 ring-ink-200 hover:bg-ink-50'
              }`}
            >
              {f.l}
            </Link>
          );
        })}
      </div>

      <div className="overflow-hidden rounded-2xl border border-ink-100 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-ink-50/60 text-xs uppercase tracking-wider text-ink-500">
              <tr>
                <th className="px-5 py-3 text-left font-semibold">Reference</th>
                <th className="px-5 py-3 text-left font-semibold">Client</th>
                <th className="px-5 py-3 text-left font-semibold">Service</th>
                <th className="px-5 py-3 text-left font-semibold">Status</th>
                <th className="px-5 py-3 text-left font-semibold">Payment</th>
                <th className="px-5 py-3 text-left font-semibold">Quoted</th>
                <th className="px-5 py-3 text-left font-semibold">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {requests && requests.length > 0 ? (
                requests.map((r: any) => (
                  <tr key={r.id} className="transition hover:bg-ink-50/40">
                    <td className="px-5 py-3">
                      <Link href={`/admin/requests/${r.id}`} className="font-mono text-xs font-semibold text-brand-700 hover:underline">
                        {r.reference}
                      </Link>
                    </td>
                    <td className="px-5 py-3">
                      <div className="font-medium text-ink-900">{r.full_name}</div>
                      <div className="text-xs text-ink-500">{r.email}</div>
                      <div className="text-xs text-ink-500">{r.phone}</div>
                    </td>
                    <td className="px-5 py-3 text-ink-700">{r.service_name || '—'}</td>
                    <td className="px-5 py-3">
                      <span className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ring-inset ${statusColor(r.status)}`}>
                        {statusLabel(r.status)}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <span className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ring-inset ${statusColor(r.payment_status)}`}>
                        {statusLabel(r.payment_status)}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-ink-700">{r.quoted_amount ? formatNaira(r.quoted_amount) : '—'}</td>
                    <td className="px-5 py-3 text-xs text-ink-500">{formatDate(r.created_at)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-5 py-16 text-center text-sm text-ink-500">No requests match these filters.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
