import { createClient } from '@/lib/supabase/server';
import { formatDate, formatNaira, statusColor, statusLabel } from '@/lib/utils';

export const metadata = { title: 'Payments' };
export const dynamic = 'force-dynamic';

export default async function AdminPaymentsPage() {
  const supabase = await createClient();
  const { data: payments } = await supabase
    .from('payments')
    .select('*')
    .order('created_at', { ascending: false });

  const total = (payments || []).filter((p: any) => p.status === 'success').reduce((s: number, p: any) => s + Number(p.amount || 0), 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold text-ink-900">Payments</h1>
        <p className="mt-1 text-sm text-ink-500">All Paystack transactions, success or failed.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-ink-100 bg-white p-5">
          <div className="text-xs uppercase tracking-wider text-ink-500">Total Received</div>
          <div className="mt-2 font-display text-2xl font-bold text-emerald-700">{formatNaira(total)}</div>
        </div>
        <div className="rounded-2xl border border-ink-100 bg-white p-5">
          <div className="text-xs uppercase tracking-wider text-ink-500">Total Transactions</div>
          <div className="mt-2 font-display text-2xl font-bold text-ink-900">{payments?.length ?? 0}</div>
        </div>
        <div className="rounded-2xl border border-ink-100 bg-white p-5">
          <div className="text-xs uppercase tracking-wider text-ink-500">Successful</div>
          <div className="mt-2 font-display text-2xl font-bold text-ink-900">
            {(payments || []).filter((p: any) => p.status === 'success').length}
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-ink-100 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-ink-50/60 text-xs uppercase tracking-wider text-ink-500">
              <tr>
                <th className="px-5 py-3 text-left font-semibold">Reference</th>
                <th className="px-5 py-3 text-left font-semibold">Customer</th>
                <th className="px-5 py-3 text-left font-semibold">Amount</th>
                <th className="px-5 py-3 text-left font-semibold">Status</th>
                <th className="px-5 py-3 text-left font-semibold">Channel</th>
                <th className="px-5 py-3 text-left font-semibold">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {payments && payments.length > 0 ? (
                payments.map((p: any) => (
                  <tr key={p.id} className="transition hover:bg-ink-50/40">
                    <td className="px-5 py-3 font-mono text-xs font-semibold text-ink-700">{p.reference}</td>
                    <td className="px-5 py-3">
                      <div className="font-medium text-ink-900">{p.customer_name || '—'}</div>
                      <div className="text-xs text-ink-500">{p.customer_email}</div>
                    </td>
                    <td className="px-5 py-3 font-semibold text-ink-900">{formatNaira(p.amount)}</td>
                    <td className="px-5 py-3">
                      <span className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ring-inset ${statusColor(p.status === 'success' ? 'paid' : p.status)}`}>
                        {statusLabel(p.status)}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-xs text-ink-700">{p.channel || '—'}</td>
                    <td className="px-5 py-3 text-xs text-ink-500">{p.paid_at ? formatDate(p.paid_at) : formatDate(p.created_at)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-5 py-16 text-center text-sm text-ink-500">No payments recorded yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
