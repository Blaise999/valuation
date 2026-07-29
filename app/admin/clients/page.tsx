import { createClient } from '@/lib/supabase/server';
import { formatDate } from '@/lib/utils';
import { Mail, Phone, FileText } from 'lucide-react';

export const metadata = { title: 'Clients' };
export const dynamic = 'force-dynamic';

export default async function AdminClientsPage() {
  const supabase = await createClient();

  // Aggregate clients from requests + consultations
  const { data: requests } = await supabase
    .from('requests')
    .select('full_name, email, phone, created_at')
    .order('created_at', { ascending: false });

  const map = new Map<string, { name: string; email: string; phone: string | null; first_seen: string; jobs: number }>();
  (requests || []).forEach((r: any) => {
    const key = r.email?.toLowerCase();
    if (!key) return;
    const existing = map.get(key);
    if (existing) {
      existing.jobs += 1;
      if (r.created_at < existing.first_seen) existing.first_seen = r.created_at;
    } else {
      map.set(key, { name: r.full_name, email: r.email, phone: r.phone, first_seen: r.created_at, jobs: 1 });
    }
  });

  const clients = Array.from(map.values()).sort((a, b) => b.first_seen.localeCompare(a.first_seen));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold text-ink-900">Clients</h1>
        <p className="mt-1 text-sm text-ink-500">Everyone who has submitted a request or booking.</p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-ink-100 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-ink-50/60 text-xs uppercase tracking-wider text-ink-500">
              <tr>
                <th className="px-5 py-3 text-left font-semibold">Client</th>
                <th className="px-5 py-3 text-left font-semibold">Email</th>
                <th className="px-5 py-3 text-left font-semibold">Phone</th>
                <th className="px-5 py-3 text-left font-semibold">Jobs</th>
                <th className="px-5 py-3 text-left font-semibold">First seen</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {clients.length > 0 ? (
                clients.map((c) => (
                  <tr key={c.email} className="transition hover:bg-ink-50/40">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full gradient-brand text-xs font-bold text-white">
                          {c.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                        </div>
                        <span className="font-medium text-ink-900">{c.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-ink-700"><a href={`mailto:${c.email}`} className="inline-flex items-center gap-1 hover:text-ink-900"><Mail size={12} className="text-ink-400" /> {c.email}</a></td>
                    <td className="px-5 py-3 text-ink-700">{c.phone ? <a href={`tel:${c.phone}`} className="inline-flex items-center gap-1 hover:text-ink-900"><Phone size={12} className="text-ink-400" /> {c.phone}</a> : '—'}</td>
                    <td className="px-5 py-3"><span className="inline-flex items-center gap-1 rounded-full bg-brand-50 px-2.5 py-1 text-[11px] font-semibold text-brand-700"><FileText size={11} /> {c.jobs}</span></td>
                    <td className="px-5 py-3 text-xs text-ink-500">{formatDate(c.first_seen)}</td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan={5} className="px-5 py-16 text-center text-sm text-ink-500">No clients yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
