import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { formatDate } from '@/lib/utils';
import { FileText, Download, ArrowRight } from 'lucide-react';

export const metadata = { title: 'Reports' };
export const dynamic = 'force-dynamic';

export default async function AdminReportsPage() {
  const supabase = await createClient();
  const { data: requests } = await supabase
    .from('requests')
    .select('id, reference, full_name, email, service_name, report_url, report_uploaded_at, status')
    .not('report_url', 'is', null)
    .order('report_uploaded_at', { ascending: false });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold text-ink-900">Reports</h1>
        <p className="mt-1 text-sm text-ink-500">Final valuation reports uploaded to client requests.</p>
      </div>

      <div className="rounded-2xl border border-ink-100 bg-white">
        {requests && requests.length > 0 ? (
          <ul className="divide-y divide-ink-100">
            {requests.map((r: any) => (
              <li key={r.id} className="flex items-center gap-4 p-5">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-brand-50">
                  <FileText size={20} className="text-brand-700" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-mono text-xs font-semibold text-brand-700">{r.reference}</div>
                  <div className="font-medium text-ink-900">{r.full_name} · {r.service_name}</div>
                  <div className="text-xs text-ink-500">{r.email} · uploaded {formatDate(r.report_uploaded_at)}</div>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  {r.report_url && (
                    <a href={r.report_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 rounded-full bg-emerald-700 px-4 py-2 text-xs font-semibold text-white">
                      <Download size={12} /> Open
                    </a>
                  )}
                  <Link href={`/admin/requests/${r.id}`} className="inline-flex items-center gap-1 text-xs font-semibold text-brand-700">
                    Manage <ArrowRight size={12} />
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="p-16 text-center">
            <FileText size={36} className="mx-auto text-ink-300" />
            <h3 className="mt-4 font-display text-lg font-bold text-ink-900">No reports yet</h3>
            <p className="mt-1 text-sm text-ink-500">Reports you upload via the request page will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
}
