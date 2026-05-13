import Link from 'next/link';
import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { formatDate, formatNaira, statusColor, statusLabel } from '@/lib/utils';
import { ArrowLeft, FileText, Download, Mail, Phone } from 'lucide-react';
import RequestActions from '@/components/admin/RequestActions';

export const dynamic = 'force-dynamic';

export default async function AdminRequestDetailPage({ params }: { params: { id: string } }) {
  const supabase = await createClient();
  const { data: r } = await supabase.from('requests').select('*').eq('id', params.id).single();
  if (!r) notFound();

  // Build signed URLs for documents
  const docs = await Promise.all(
    (r.documents || []).map(async (d: any) => {
      const { data } = await supabase.storage.from('documents').createSignedUrl(d.url, 3600);
      return { ...d, signed: data?.signedUrl };
    })
  );

  return (
    <div className="space-y-6">
      <Link href="/admin/requests" className="inline-flex items-center gap-1 text-sm text-ink-500 hover:text-ink-900">
        <ArrowLeft size={14} /> All Requests
      </Link>

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="font-mono text-xs font-semibold text-brand-700">{r.reference}</div>
          <h1 className="mt-1 font-display text-3xl font-bold text-ink-900">{r.full_name}</h1>
          <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-ink-500">
            <a href={`mailto:${r.email}`} className="inline-flex items-center gap-1 hover:text-ink-800"><Mail size={12} /> {r.email}</a>
            <a href={`tel:${r.phone}`} className="inline-flex items-center gap-1 hover:text-ink-800"><Phone size={12} /> {r.phone}</a>
            <span>·</span>
            <span>{formatDate(r.created_at)}</span>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className={`inline-flex rounded-full px-3 py-1.5 text-xs font-semibold ring-1 ring-inset ${statusColor(r.status)}`}>{statusLabel(r.status)}</span>
          <span className={`inline-flex rounded-full px-3 py-1.5 text-xs font-semibold ring-1 ring-inset ${statusColor(r.payment_status)}`}>Payment: {statusLabel(r.payment_status)}</span>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="rounded-2xl border border-ink-100 bg-white p-6">
            <h2 className="font-display text-base font-bold text-ink-900">Service & Property</h2>
            <dl className="mt-5 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
              <div>
                <dt className="text-xs uppercase tracking-wider text-ink-500">Service</dt>
                <dd className="mt-1 text-sm text-ink-900">{r.service_name || '—'}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-ink-500">Property type</dt>
                <dd className="mt-1 text-sm text-ink-900">{r.property_type || '—'}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-xs uppercase tracking-wider text-ink-500">Address</dt>
                <dd className="mt-1 text-sm text-ink-900">{r.property_address || '—'}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-ink-500">Purpose</dt>
                <dd className="mt-1 text-sm text-ink-900">{r.property_purpose || '—'}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-ink-500">Size</dt>
                <dd className="mt-1 text-sm text-ink-900">{r.property_size || '—'}</dd>
              </div>
              {r.notes && (
                <div className="sm:col-span-2">
                  <dt className="text-xs uppercase tracking-wider text-ink-500">Client notes</dt>
                  <dd className="mt-1 whitespace-pre-line text-sm text-ink-900">{r.notes}</dd>
                </div>
              )}
            </dl>
          </div>

          <div className="rounded-2xl border border-ink-100 bg-white p-6">
            <h2 className="font-display text-base font-bold text-ink-900">Uploaded Documents</h2>
            {docs.length === 0 ? (
              <p className="mt-3 text-sm text-ink-500">No documents uploaded.</p>
            ) : (
              <ul className="mt-4 space-y-2">
                {docs.map((d, i) => (
                  <li key={i} className="flex items-center gap-3 rounded-xl border border-ink-100 p-3 text-sm">
                    <FileText size={16} className="shrink-0 text-brand-700" />
                    <span className="flex-1 truncate text-ink-800">{d.name}</span>
                    <span className="text-xs text-ink-500">{(d.size / 1024 / 1024).toFixed(2)} MB</span>
                    {d.signed && (
                      <a href={d.signed} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 rounded-lg bg-brand-50 px-3 py-1.5 text-xs font-semibold text-brand-700">
                        <Download size={12} /> Open
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {r.report_url && (
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-6">
              <h2 className="font-display text-base font-bold text-emerald-900">Final Report</h2>
              <p className="mt-1 text-sm text-emerald-800">Uploaded {r.report_uploaded_at && formatDate(r.report_uploaded_at)}</p>
              <a href={r.report_url} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 rounded-full bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white">
                <Download size={14} /> Open Report
              </a>
            </div>
          )}
        </div>

        <RequestActions request={r as any} />
      </div>
    </div>
  );
}
