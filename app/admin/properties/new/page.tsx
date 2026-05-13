'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { ArrowLeft, Upload, X, Save } from 'lucide-react';
import { Button, Input, Label, Select, Textarea } from '@/components/ui/Form';
import { createClient } from '@/lib/supabase/client';

function PropertyForm() {
  const router = useRouter();
  const params = useSearchParams();
  const editingId = params.get('id');
  const supabase = createClient();
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [form, setForm] = useState({
    title: '', slug: '', description: '', price: '',
    price_period: 'sale', location: '', city: '', state: '',
    property_type: '', bedrooms: '', bathrooms: '', toilets: '',
    area_sqm: '', features: '', status: 'available', featured: false,
  });

  useEffect(() => {
    if (!editingId) return;
    (async () => {
      const { data } = await supabase.from('properties').select('*').eq('id', editingId).single();
      if (data) {
        setForm({
          title: data.title || '',
          slug: data.slug || '',
          description: data.description || '',
          price: data.price?.toString() || '',
          price_period: data.price_period || 'sale',
          location: data.location || '',
          city: data.city || '',
          state: data.state || '',
          property_type: data.property_type || '',
          bedrooms: data.bedrooms?.toString() || '',
          bathrooms: data.bathrooms?.toString() || '',
          toilets: data.toilets?.toString() || '',
          area_sqm: data.area_sqm?.toString() || '',
          features: (data.features || []).join(', '),
          status: data.status || 'available',
          featured: data.featured || false,
        });
        setImages(data.images || []);
      }
    })();
  }, [editingId]);

  async function uploadImages(e: React.ChangeEvent<HTMLInputElement>) {
    const list = e.target.files;
    if (!list) return;
    setUploading(true);
    try {
      const newUrls: string[] = [];
      for (const file of Array.from(list)) {
        const path = `${Date.now()}-${file.name.replace(/[^\w.\-]+/g, '_')}`;
        const { error: upErr } = await supabase.storage.from('properties').upload(path, file, { upsert: false });
        if (upErr) throw upErr;
        const { data } = supabase.storage.from('properties').getPublicUrl(path);
        if (data?.publicUrl) newUrls.push(data.publicUrl);
      }
      setImages([...images, ...newUrls]);
      toast.success('Images uploaded');
    } catch (err: any) {
      toast.error(err?.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  }

  async function save() {
    if (!form.title.trim()) return toast.error('Title is required');
    setBusy(true);
    try {
      const slug = (form.slug || form.title).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      const payload: any = {
        title: form.title,
        slug,
        description: form.description,
        price: form.price ? Number(form.price) : null,
        price_period: form.price_period,
        location: form.location,
        city: form.city,
        state: form.state,
        property_type: form.property_type,
        bedrooms: form.bedrooms ? Number(form.bedrooms) : null,
        bathrooms: form.bathrooms ? Number(form.bathrooms) : null,
        toilets: form.toilets ? Number(form.toilets) : null,
        area_sqm: form.area_sqm ? Number(form.area_sqm) : null,
        features: form.features.split(',').map((s) => s.trim()).filter(Boolean),
        images,
        status: form.status,
        featured: form.featured,
      };
      const res = editingId
        ? await supabase.from('properties').update(payload).eq('id', editingId)
        : await supabase.from('properties').insert(payload);
      if (res.error) throw res.error;
      toast.success(editingId ? 'Property updated' : 'Property added');
      router.push('/admin/properties');
    } catch (err: any) {
      toast.error(err?.message || 'Save failed');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-6">
      <Link href="/admin/properties" className="inline-flex items-center gap-1 text-sm text-ink-500 hover:text-ink-900">
        <ArrowLeft size={14} /> Properties
      </Link>

      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl font-bold text-ink-900">{editingId ? 'Edit Property' : 'New Property'}</h1>
        <Button onClick={save} disabled={busy} size="md"><Save size={14} /> {busy ? 'Saving…' : 'Save'}</Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="rounded-2xl border border-ink-100 bg-white p-6">
            <h2 className="font-display text-base font-bold text-ink-900">Basics</h2>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2"><Label required>Title</Label><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="4-Bedroom Duplex with BQ in GRA" /></div>
              <div className="sm:col-span-2"><Label>Description</Label><Textarea rows={4} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Spacious, modern duplex on 600sqm…" /></div>
              <div><Label>Price (₦)</Label><Input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="250000000" /></div>
              <div><Label>Pricing</Label>
                <Select value={form.price_period} onChange={(e) => setForm({ ...form, price_period: e.target.value })}>
                  <option value="sale">For Sale</option>
                  <option value="monthly">Monthly Rent</option>
                  <option value="yearly">Yearly Rent</option>
                  <option value="negotiable">Negotiable</option>
                </Select>
              </div>
              <div><Label>Property type</Label><Input value={form.property_type} onChange={(e) => setForm({ ...form, property_type: e.target.value })} placeholder="Duplex, Bungalow, Office…" /></div>
              <div><Label>Status</Label>
                <Select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                  <option value="available">Available</option>
                  <option value="pending">Pending</option>
                  <option value="sold">Sold</option>
                  <option value="rented">Rented</option>
                </Select>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-ink-100 bg-white p-6">
            <h2 className="font-display text-base font-bold text-ink-900">Location</h2>
            <div className="mt-5 grid gap-5 sm:grid-cols-3">
              <div className="sm:col-span-3"><Label>Address / Locality</Label><Input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="Plot 12, GRA" /></div>
              <div><Label>City</Label><Input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} placeholder="Enugu" /></div>
              <div><Label>State</Label><Input value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} placeholder="Enugu" /></div>
            </div>
          </div>

          <div className="rounded-2xl border border-ink-100 bg-white p-6">
            <h2 className="font-display text-base font-bold text-ink-900">Specs & Features</h2>
            <div className="mt-5 grid gap-5 sm:grid-cols-4">
              <div><Label>Bedrooms</Label><Input type="number" value={form.bedrooms} onChange={(e) => setForm({ ...form, bedrooms: e.target.value })} /></div>
              <div><Label>Bathrooms</Label><Input type="number" value={form.bathrooms} onChange={(e) => setForm({ ...form, bathrooms: e.target.value })} /></div>
              <div><Label>Toilets</Label><Input type="number" value={form.toilets} onChange={(e) => setForm({ ...form, toilets: e.target.value })} /></div>
              <div><Label>Area (sqm)</Label><Input type="number" value={form.area_sqm} onChange={(e) => setForm({ ...form, area_sqm: e.target.value })} /></div>
              <div className="sm:col-span-4"><Label>Features (comma separated)</Label><Input value={form.features} onChange={(e) => setForm({ ...form, features: e.target.value })} placeholder="POP ceiling, Borehole, Fitted kitchen, BQ" /></div>
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-2xl border border-ink-100 bg-white p-6">
            <h2 className="font-display text-base font-bold text-ink-900">Images</h2>
            <label className="mt-4 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-ink-200 bg-ink-50/40 p-6 text-center hover:border-brand-400">
              <Upload size={20} className="text-brand-700" />
              <span className="mt-2 text-sm font-semibold text-ink-900">{uploading ? 'Uploading…' : 'Upload images'}</span>
              <input type="file" multiple accept="image/*" hidden onChange={uploadImages} disabled={uploading} />
            </label>
            {images.length > 0 && (
              <div className="mt-4 grid grid-cols-2 gap-2">
                {images.map((u, i) => (
                  <div key={i} className="relative aspect-square overflow-hidden rounded-lg ring-1 ring-ink-100">
                    <img src={u} alt={`image-${i}`} className="h-full w-full object-cover" />
                    <button onClick={() => setImages(images.filter((_, j) => j !== i))} className="absolute right-1.5 top-1.5 grid h-6 w-6 place-items-center rounded-full bg-white/90 text-rose-600">
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-ink-100 bg-white p-6">
            <h2 className="font-display text-base font-bold text-ink-900">Visibility</h2>
            <label className="mt-4 flex cursor-pointer items-center gap-2 text-sm">
              <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} className="h-4 w-4 rounded text-brand-700" />
              Mark as featured
            </label>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default function NewPropertyPage() {
  return (
    <Suspense fallback={<div className="p-8 text-sm text-ink-500">Loading…</div>}>
      <PropertyForm />
    </Suspense>
  );
}
