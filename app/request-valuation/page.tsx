'use client';

import { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { Upload, X, Check, FileText, ArrowRight, ArrowLeft, ShieldCheck, Clock } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import RevealOnScroll from '@/components/RevealOnScroll';
import { Button, Input, Label, Select, Textarea, FieldError } from '@/components/ui/Form';
import { createClient } from '@/lib/supabase/client';

const SERVICES = [
  'Valuation for All Purposes',
  'Property Management',
  'Financial Reporting',
  'Facility Management',
  'Feasibility & Viability Studies',
  'Agency Services',
  'Investment & Development Consulting',
];

const PROPERTY_TYPES = [
  'Residential — Bungalow', 'Residential — Duplex', 'Residential — Block of Flats',
  'Commercial — Office', 'Commercial — Retail', 'Commercial — Hotel',
  'Industrial — Warehouse', 'Industrial — Factory',
  'Land — Bare', 'Mixed-Use', 'Other',
];

const PURPOSES = [
  'Sale or Purchase', 'Mortgage', 'Insurance', 'Taxation', 'Probate',
  'Financial Reporting (IFRS)', 'Partnership / Dissolution', 'Litigation',
  'Asset Reorganisation', 'Other',
];

function FormInner() {
  const router = useRouter();
  const params = useSearchParams();
  const supabase = createClient();

  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const initialService = params.get('service');
  const matchedService = initialService
    ? SERVICES.find(s => s.toLowerCase().includes(initialService.toLowerCase().split('-')[0]))
    : null;

  const [form, setForm] = useState({
    full_name: '',
    email: '',
    phone: '',
    service_name: matchedService || SERVICES[0],
    property_type: '',
    property_address: '',
    property_purpose: '',
    property_size: '',
    notes: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm({ ...form, [key]: value });
    setErrors({ ...errors, [key]: '' });
  }

  function validateStep1() {
    const e: Record<string, string> = {};
    if (!form.full_name.trim()) e.full_name = 'Required';
    if (!form.email.trim() || !/.+@.+\..+/.test(form.email)) e.email = 'Valid email required';
    if (!form.phone.trim()) e.phone = 'Required';
    if (!form.service_name) e.service_name = 'Required';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function validateStep2() {
    const e: Record<string, string> = {};
    if (!form.property_type) e.property_type = 'Required';
    if (!form.property_address.trim()) e.property_address = 'Required';
    if (!form.property_purpose) e.property_purpose = 'Required';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function onFiles(list: FileList | null) {
    if (!list) return;
    const arr = Array.from(list).filter((f) => f.size <= 10 * 1024 * 1024);
    setFiles((prev) => [...prev, ...arr].slice(0, 8));
  }

  async function uploadDocs(requestRef: string) {
    const uploaded: { name: string; url: string; size: number; type: string }[] = [];
    for (const file of files) {
      const path = `${requestRef}/${Date.now()}-${file.name.replace(/[^\w.\-]+/g, '_')}`;
      const { error } = await supabase.storage.from('documents').upload(path, file, { upsert: false });
      if (error) {
        console.error('upload error', error);
        continue;
      }
      uploaded.push({ name: file.name, url: path, size: file.size, type: file.type });
    }
    return uploaded;
  }

  async function submit() {
    if (!validateStep2()) return;
    setSubmitting(true);
    try {
      // Upload docs first (using browser supabase client because server doesn't have file blobs)
      const tmpRef = `temp-${Date.now()}`;
      const docs = files.length > 0 ? await uploadDocs(tmpRef) : [];

      // Submit to server API (which inserts row + sends emails)
      const res = await fetch('/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, documents: docs }),
      });

      const data = await res.json();
      if (!data.ok) throw new Error(data.error || 'Submission failed');

      toast.success('Request submitted!');
      router.push(`/thank-you?ref=${data.reference}`);
    } catch (err: any) {
      console.error(err);
      toast.error(err?.message || 'Submission failed');
      setSubmitting(false);
    }
  }

  const stepLabels = ['Your Details', 'Property', 'Documents'];

  return (
    <main>
      <section className="relative overflow-hidden bg-white pt-12">
        <div className="absolute inset-0 bg-grid opacity-50" />
        <div className="pointer-events-none absolute -right-40 -top-20 h-[420px] w-[420px] rounded-full bg-brand-200/40 blur-3xl" />

        <div className="relative mx-auto max-w-4xl px-6 py-12 lg:py-16">
          <RevealOnScroll>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-700">Request a Service</span>
            <h1 className="mt-3 font-display text-4xl font-bold leading-tight tracking-tight text-ink-900 sm:text-5xl">
              Tell us about your <span className="gradient-text">property.</span>
            </h1>
            <p className="mt-4 max-w-xl text-base text-ink-600">
              Submit your details and our team will review and send a tailored quotation within 24 hours.
            </p>

            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs text-ink-500">
              <div className="flex items-center gap-1.5"><Clock size={12} className="text-brand-700" /> Response in 24 hours</div>
              <div className="flex items-center gap-1.5"><ShieldCheck size={12} className="text-brand-700" /> Secure document upload</div>
              <div className="flex items-center gap-1.5"><Check size={12} className="text-brand-700" /> Pay only after quote</div>
            </div>
          </RevealOnScroll>

          <div className="mt-10 flex items-center gap-3">
            {stepLabels.map((label, i) => {
              const num = i + 1;
              const active = step === num;
              const done = step > num;
              return (
                <div key={label} className="flex flex-1 items-center gap-3">
                  <div className={`grid h-9 w-9 shrink-0 place-items-center rounded-full text-xs font-semibold ring-2 ring-offset-2 ring-offset-white transition ${
                    done ? 'bg-emerald-600 text-white ring-emerald-600' : active ? 'bg-brand-700 text-white ring-brand-700' : 'bg-white text-ink-400 ring-ink-200'
                  }`}>
                    {done ? <Check size={14} /> : num}
                  </div>
                  <div className="hidden text-xs font-medium sm:block">
                    <div className={active || done ? 'text-ink-900' : 'text-ink-500'}>{label}</div>
                  </div>
                  {i < stepLabels.length - 1 && (
                    <div className={`h-px flex-1 ${done ? 'bg-emerald-500' : 'bg-ink-200'}`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-3xl px-6">
          <div className="rounded-3xl border border-ink-100 bg-white p-7 shadow-sm lg:p-10">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                  <h2 className="font-display text-2xl font-bold text-ink-900">Your details</h2>
                  <p className="mt-1 text-sm text-ink-500">We&apos;ll use these to follow up with you.</p>

                  <div className="mt-8 grid gap-5 sm:grid-cols-2">
                    <div>
                      <Label required>Full name</Label>
                      <Input value={form.full_name} onChange={(e) => update('full_name', e.target.value)} placeholder="Mr. Chinedu Okeke" />
                      <FieldError message={errors.full_name} />
                    </div>
                    <div>
                      <Label required>Phone</Label>
                      <Input value={form.phone} onChange={(e) => update('phone', e.target.value)} placeholder="+234 803 000 0000" />
                      <FieldError message={errors.phone} />
                    </div>
                    <div className="sm:col-span-2">
                      <Label required>Email</Label>
                      <Input type="email" value={form.email} onChange={(e) => update('email', e.target.value)} placeholder="you@example.com" />
                      <FieldError message={errors.email} />
                    </div>
                    <div className="sm:col-span-2">
                      <Label required>Service needed</Label>
                      <Select value={form.service_name} onChange={(e) => update('service_name', e.target.value)}>
                        {SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
                      </Select>
                      <FieldError message={errors.service_name} />
                    </div>
                  </div>

                  <div className="mt-10 flex justify-end">
                    <Button onClick={() => validateStep1() && setStep(2)} size="lg">
                      Continue <ArrowRight size={14} />
                    </Button>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                  <h2 className="font-display text-2xl font-bold text-ink-900">Property details</h2>
                  <p className="mt-1 text-sm text-ink-500">Help us understand the property and the purpose.</p>

                  <div className="mt-8 grid gap-5 sm:grid-cols-2">
                    <div>
                      <Label required>Property type</Label>
                      <Select value={form.property_type} onChange={(e) => update('property_type', e.target.value)}>
                        <option value="">Select a type</option>
                        {PROPERTY_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                      </Select>
                      <FieldError message={errors.property_type} />
                    </div>
                    <div>
                      <Label required>Purpose of valuation</Label>
                      <Select value={form.property_purpose} onChange={(e) => update('property_purpose', e.target.value)}>
                        <option value="">Select a purpose</option>
                        {PURPOSES.map((p) => <option key={p} value={p}>{p}</option>)}
                      </Select>
                      <FieldError message={errors.property_purpose} />
                    </div>
                    <div className="sm:col-span-2">
                      <Label required>Property address / location</Label>
                      <Input value={form.property_address} onChange={(e) => update('property_address', e.target.value)} placeholder="Plot 12, GRA, Enugu" />
                      <FieldError message={errors.property_address} />
                    </div>
                    <div className="sm:col-span-2">
                      <Label>Approximate size / dimensions</Label>
                      <Input value={form.property_size} onChange={(e) => update('property_size', e.target.value)} placeholder="e.g. 600 sqm or 100 ft x 60 ft" />
                    </div>
                    <div className="sm:col-span-2">
                      <Label>Additional notes</Label>
                      <Textarea rows={4} value={form.notes} onChange={(e) => update('notes', e.target.value)} placeholder="Anything else we should know about the property…" />
                    </div>
                  </div>

                  <div className="mt-10 flex items-center justify-between">
                    <Button variant="ghost" onClick={() => setStep(1)}>
                      <ArrowLeft size={14} /> Back
                    </Button>
                    <Button onClick={() => validateStep2() && setStep(3)} size="lg">
                      Continue <ArrowRight size={14} />
                    </Button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                  <h2 className="font-display text-2xl font-bold text-ink-900">Upload documents</h2>
                  <p className="mt-1 text-sm text-ink-500">
                    Optional — but speeds up our review. C of O, deed of assignment, survey plan, building plan, photos, etc.
                  </p>

                  <label
                    htmlFor="docs"
                    className="mt-6 flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-ink-200 bg-ink-50/50 p-10 text-center transition hover:border-brand-400 hover:bg-brand-50/50"
                  >
                    <div className="grid h-14 w-14 place-items-center rounded-full bg-white ring-1 ring-ink-100">
                      <Upload size={20} className="text-brand-700" />
                    </div>
                    <div className="mt-4 text-sm font-semibold text-ink-900">
                      Click to upload, or drag and drop
                    </div>
                    <div className="mt-1 text-xs text-ink-500">
                      PDF, JPG, PNG, DOCX up to 10 MB each (max 8 files)
                    </div>
                    <input
                      id="docs"
                      type="file"
                      multiple
                      hidden
                      accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                      onChange={(e) => onFiles(e.target.files)}
                    />
                  </label>

                  {files.length > 0 && (
                    <ul className="mt-5 space-y-2">
                      {files.map((f, i) => (
                        <li key={i} className="flex items-center gap-3 rounded-xl border border-ink-100 bg-white p-3 text-sm">
                          <FileText size={16} className="shrink-0 text-brand-700" />
                          <span className="flex-1 truncate text-ink-800">{f.name}</span>
                          <span className="shrink-0 text-xs text-ink-500">{(f.size / 1024 / 1024).toFixed(2)} MB</span>
                          <button onClick={() => setFiles(files.filter((_, j) => j !== i))} className="grid h-7 w-7 place-items-center rounded-full text-ink-500 hover:bg-rose-50 hover:text-rose-600">
                            <X size={14} />
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="mt-8 rounded-2xl bg-brand-50 p-5 ring-1 ring-brand-100">
                    <h4 className="font-display text-sm font-bold text-brand-900">What happens next?</h4>
                    <ol className="mt-2 space-y-1 text-xs text-brand-900/80">
                      <li>1. Our team reviews your request within 24 hours.</li>
                      <li>2. We email you a written quotation with a secure payment link.</li>
                      <li>3. You pay via Paystack (card, bank transfer, USSD).</li>
                      <li>4. We schedule the inspection and deliver the report.</li>
                    </ol>
                  </div>

                  <div className="mt-10 flex items-center justify-between">
                    <Button variant="ghost" onClick={() => setStep(2)}>
                      <ArrowLeft size={14} /> Back
                    </Button>
                    <Button onClick={submit} disabled={submitting} size="lg">
                      {submitting ? 'Submitting…' : 'Submit Request'} {!submitting && <Check size={14} />}
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function RequestValuationPage() {
  return (
    <>
      <Navigation />
      <Suspense fallback={<div className="p-12 text-center text-sm text-ink-500">Loading…</div>}>
        <FormInner />
      </Suspense>
      <Footer />
    </>
  );
}
