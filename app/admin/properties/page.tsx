import Link from 'next/link';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/server';
import { formatNaira, statusColor, statusLabel } from '@/lib/utils';
import { Plus, MapPin } from 'lucide-react';
import DeletePropertyButton from '@/components/admin/DeletePropertyButton';

export const metadata = { title: 'Properties' };
export const dynamic = 'force-dynamic';

export default async function AdminPropertiesPage() {
  const supabase = await createClient();
  const { data: properties } = await supabase
    .from('properties')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-ink-900">Properties</h1>
          <p className="mt-1 text-sm text-ink-500">Listings shown on the public Properties page.</p>
        </div>
        <Link href="/admin/properties/new" className="inline-flex items-center gap-1.5 rounded-full bg-brand-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-800">
          <Plus size={14} /> Add Property
        </Link>
      </div>

      {properties && properties.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {properties.map((p: any) => (
            <article key={p.id} className="overflow-hidden rounded-2xl border border-ink-100 bg-white">
              <div className="relative aspect-[4/3] overflow-hidden bg-ink-100">
                {p.images?.[0] ? (
                  <Image src={p.images[0]} alt={p.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                ) : (
                  <div className="grid h-full place-items-center text-xs text-ink-400">No image</div>
                )}
                <span className={`absolute right-3 top-3 inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold ring-1 ring-inset ${statusColor(p.status)}`}>
                  {statusLabel(p.status)}
                </span>
              </div>
              <div className="p-5">
                <div className="font-display text-lg font-bold text-brand-900">{formatNaira(p.price)}</div>
                <h3 className="mt-1 font-display text-base font-semibold text-ink-900">{p.title}</h3>
                <div className="mt-1 flex items-center gap-1 text-xs text-ink-500"><MapPin size={11} /> {p.location || '—'}</div>
                <div className="mt-4 flex items-center gap-2">
                  <Link href={`/admin/properties/new?id=${p.id}`} className="flex-1 rounded-full border border-ink-200 px-3 py-2 text-center text-xs font-semibold text-ink-800 hover:bg-ink-50">Edit</Link>
                  <DeletePropertyButton id={p.id} />
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-ink-200 bg-white p-16 text-center">
          <h3 className="font-display text-lg font-bold text-ink-900">No properties yet</h3>
          <p className="mt-1 text-sm text-ink-500">Add your first listing to see it on the public site.</p>
          <Link href="/admin/properties/new" className="mt-6 inline-flex items-center gap-1 rounded-full bg-brand-700 px-5 py-2.5 text-sm font-semibold text-white"><Plus size={14} /> Add Property</Link>
        </div>
      )}
    </div>
  );
}
