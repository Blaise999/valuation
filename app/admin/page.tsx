import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { ClipboardList, CreditCard, CheckCircle2, Clock, ArrowRight, TrendingUp } from 'lucide-react';
import { formatNaira, formatDate, statusColor, statusLabel } from '@/lib/utils';

export const metadata = { title: 'Admin Dashboard' };
export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  const [{ count: total }, { count: pending }, { count: completed }, { data: payments }, { data: recent }] = await Promise.all([
    supabase.from('requests').select('id', { count: 'exact', head: true }),
    supabase.from('requests').select('id', { count: 'exact', head: true }).in('status', ['new', 'under_review', 'quotation_sent']),
    supabase.from('requests').select('id', { count: 'exact', head: true }).eq('status', 'completed'),
    supabase.from('payments').select('amount').eq('status', 'success'),
    supabase.from('requests').select('*').order('created_at', { ascending: false }).limit(8),
  ]);

  const revenue = (payments || []).reduce((s, p: any) => s + (Number(p.amount) || 0), 0);

  const stats = [
    { label: 'Total Requests', value: total ?? 0, icon: ClipboardList, color: 'bg-brand-50 text-brand-700' },
    { label: 'Pending Review', value: pending ?? 0, icon: Clock, color: 'bg-amber-50 text-amber-700' },
    { label: 'Completed Jobs', value: completed ?? 0, icon: CheckCircle2, color: 'bg-emerald-50 text-emerald-700' },
    { label: 'Revenue (Paid)', value: formatNaira(revenue), icon: TrendingUp, color: 'bg-violet-50 text-violet-700' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold text-ink-900">Dashboard</h1>
        <p className="mt-1 text-sm text-ink-500">Overview of requests, payments, and recent activity.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-ink-100 bg-white p-5">
            <div className="flex items-center justify-between">
              <div className={`grid h-10 w-10 place-items-center rounded-xl ${s.color}`}>
                <s.icon size={18} />
              </div>
            </div>
            <div className="mt-5 font-display text-2xl font-bold text-ink-900">{s.value}</div>
            <div className="mt-1 text-xs text-ink-500">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-ink-100 bg-white">
        <div className="flex items-center justify-between border-b border-ink-100 px-6 py-4">
          <div>
            <h2 className="font-display text-lg font-bold text-ink-900">Recent Requests</h2>
            <p className="text-xs text-ink-500">Latest 8 submissions</p>
          </div>
          <Link href="/admin/requests" className="inline-flex items-center gap-1 text-sm font-semibold text-brand-700 hover:text-brand-900">
            View all <ArrowRight size={14} />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-ink-50/60 text-xs uppercase tracking-wider text-ink-500">
              <tr>
                <th className="px-6 py-3 text-left font-semibold">Reference</th>
                <th className="px-6 py-3 text-left font-semibold">Client</th>
                <th className="px-6 py-3 text-left font-semibold">Service</th>
                <th className="px-6 py-3 text-left font-semibold">Status</th>
                <th className="px-6 py-3 text-left font-semibold">Payment</th>
                <th className="px-6 py-3 text-left font-semibold">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {recent && recent.length > 0 ? (
                recent.map((r: any) => (
                  <tr key={r.id} className="transition hover:bg-ink-50/40">
                    <td className="px-6 py-3">
                      <Link href={`/admin/requests/${r.id}`} className="font-mono text-xs font-semibold text-brand-700 hover:underline">
                        {r.reference}
                      </Link>
                    </td>
                    <td className="px-6 py-3">
                      <div className="font-medium text-ink-900">{r.full_name}</div>
                      <div className="text-xs text-ink-500">{r.email}</div>
                    </td>
                    <td className="px-6 py-3 text-ink-700">{r.service_name || '—'}</td>
                    <td className="px-6 py-3">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ring-inset ${statusColor(r.status)}`}>
                        {statusLabel(r.status)}
                      </span>
                    </td>
                    <td className="px-6 py-3">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ring-inset ${statusColor(r.payment_status)}`}>
                        {statusLabel(r.payment_status)}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-xs text-ink-500">{formatDate(r.created_at)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-sm text-ink-500">
                    No requests yet. They&apos;ll appear here once clients start submitting.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
