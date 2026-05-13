'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Calendar, Clock, ArrowRight, Lock, Check, Sparkles, ShieldCheck, MessageCircle } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import RevealOnScroll from '@/components/RevealOnScroll';
import { Button, Input, Label, Textarea, FieldError } from '@/components/ui/Form';
import { formatNaira } from '@/lib/utils';

const FEE = 15000;

const BENEFITS = [
  '45-minute one-on-one (in-person or video call)',
  'Pre-call review of any documents you send',
  'Written summary of recommendations after the call',
  'Secure online payment via Paystack',
  'Credit toward a fuller engagement if you proceed',
];

export default function BookConsultationPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState({
    full_name: '',
    email: '',
    phone: '',
    preferred_date: '',
    preferred_time: '',
    topic: '',
    notes: '',
  });

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm({ ...form, [key]: value });
    setErrors({ ...errors, [key]: '' });
  }

  function validate() {
    const e: Record<string, string> = {};
    if (!form.full_name.trim()) e.full_name = 'Required';
    if (!form.email.trim() || !/.+@.+\..+/.test(form.email)) e.email = 'Valid email required';
    if (!form.phone.trim()) e.phone = 'Required';
    if (!form.preferred_date) e.preferred_date = 'Required';
    if (!form.topic.trim()) e.topic = 'Tell us briefly what you want to discuss';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      const res = await fetch('/api/paystack/initialize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'consultation',
          amount: FEE,
          email: form.email,
          metadata: form,
        }),
      });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error || 'Could not start payment');
      window.location.href = data.authorization_url;
    } catch (err: any) {
      toast.error(err?.message || 'Payment init failed');
      setSubmitting(false);
    }
  }

  return (
    <>
      <Navigation />
      <main>
        {/* HERO */}
        <section className="relative overflow-hidden bg-white pt-12">
          <div className="absolute inset-0 bg-grid opacity-50" />
          <div className="pointer-events-none absolute -right-40 -top-20 h-[480px] w-[480px] rounded-full bg-brand-200/40 blur-3xl" />
          <div className="pointer-events-none absolute -left-32 top-40 h-80 w-80 rounded-full bg-brand-300/25 blur-3xl" />

          <div className="relative mx-auto max-w-7xl px-6 py-16 lg:py-20">
            <div className="grid items-end gap-12 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <RevealOnScroll>
                  <div className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white/60 px-3 py-1.5 text-xs font-medium text-brand-800 backdrop-blur-sm">
                    <Sparkles size={12} className="text-brand-700" /> Consultation Booking
                  </div>
                </RevealOnScroll>
                <RevealOnScroll delay={0.1}>
                  <h1 className="mt-6 font-display text-5xl font-bold leading-[1.05] tracking-tight text-ink-900 sm:text-6xl lg:text-7xl">
                    45 minutes with the <br />
                    <span className="gradient-text">Principal Valuer.</span>
                  </h1>
                </RevealOnScroll>
                <RevealOnScroll delay={0.2}>
                  <p className="mt-6 max-w-xl text-lg text-ink-600">
                    Bring your property questions, investment thesis, or development idea. You&apos;ll leave the call with clear direction and a written summary.
                  </p>
                </RevealOnScroll>

                <RevealOnScroll delay={0.3}>
                  <ul className="mt-8 space-y-2.5 text-sm text-ink-700">
                    {BENEFITS.map((b) => (
                      <li key={b} className="flex items-start gap-2.5">
                        <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-700 text-white">
                          <Check size={11} strokeWidth={3} />
                        </span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </RevealOnScroll>
              </div>

              <RevealOnScroll delay={0.2} className="lg:col-span-5">
                <div className="relative">
                  <div className="relative ml-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-3xl shadow-2xl shadow-brand-900/15 ring-4 ring-white">
                    <Image
                      src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=75"
                      alt="Consultation"
                      fill
                      priority
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 400px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-900/70 via-transparent to-transparent" />

                    {/* Floating fee card */}
                    <div className="absolute inset-x-5 bottom-5 rounded-2xl bg-white/95 p-4 backdrop-blur">
                      <div className="flex items-center gap-3">
                        <div className="grid h-11 w-11 place-items-center rounded-xl gradient-brand text-white">
                          <Calendar size={18} />
                        </div>
                        <div>
                          <div className="text-[10px] font-semibold uppercase tracking-wider text-brand-700">Consultation fee</div>
                          <div className="font-display text-xl font-bold text-ink-900">{formatNaira(FEE)}</div>
                        </div>
                      </div>
                    </div>

                    {/* Secure badge */}
                    <div className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-emerald-500 px-3 py-1.5 text-[10px] font-bold text-white shadow-lg">
                      <ShieldCheck size={11} /> SECURE
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </section>

        {/* BOOKING FORM */}
        <section className="pb-24">
          <div className="mx-auto max-w-4xl px-6">
            <RevealOnScroll>
              <form onSubmit={submit} className="rounded-3xl border border-ink-100 bg-white p-7 shadow-lg shadow-brand-900/5 lg:p-10">
                <div className="mb-7 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-brand-50 px-5 py-4 ring-1 ring-brand-100">
                  <div className="flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-xl gradient-brand text-white">
                      <Calendar size={18} />
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-wider text-brand-700">Pay upfront</div>
                      <div className="font-display text-xl font-bold text-ink-900">{formatNaira(FEE)}</div>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-brand-700">
                    <Lock size={11} /> Secured by Paystack
                  </span>
                </div>

                <h2 className="font-display text-2xl font-bold text-ink-900 sm:text-3xl">Reserve your slot</h2>
                <p className="mt-1 text-sm text-ink-500">We confirm by email immediately after payment.</p>

                <div className="mt-8 grid gap-5 sm:grid-cols-2">
                  <div>
                    <Label required>Full name</Label>
                    <Input value={form.full_name} onChange={(e) => update('full_name', e.target.value)} placeholder="Your full name" />
                    <FieldError message={errors.full_name} />
                  </div>
                  <div>
                    <Label required>Phone</Label>
                    <Input value={form.phone} onChange={(e) => update('phone', e.target.value)} placeholder="+234 813 000 0000" />
                    <FieldError message={errors.phone} />
                  </div>
                  <div className="sm:col-span-2">
                    <Label required>Email</Label>
                    <Input type="email" value={form.email} onChange={(e) => update('email', e.target.value)} placeholder="you@example.com" />
                    <FieldError message={errors.email} />
                  </div>
                  <div>
                    <Label required>Preferred date</Label>
                    <Input
                      type="date"
                      value={form.preferred_date}
                      onChange={(e) => update('preferred_date', e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                    />
                    <FieldError message={errors.preferred_date} />
                  </div>
                  <div>
                    <Label>Preferred time</Label>
                    <Input type="time" value={form.preferred_time} onChange={(e) => update('preferred_time', e.target.value)} />
                  </div>
                  <div className="sm:col-span-2">
                    <Label required>Topic — what do you want to discuss?</Label>
                    <Input value={form.topic} onChange={(e) => update('topic', e.target.value)} placeholder="e.g. Valuation of family land in Awka for partition" />
                    <FieldError message={errors.topic} />
                  </div>
                  <div className="sm:col-span-2">
                    <Label>Additional notes</Label>
                    <Textarea rows={4} value={form.notes} onChange={(e) => update('notes', e.target.value)} placeholder="Anything we should review before the call…" />
                  </div>
                </div>

                <Button type="submit" disabled={submitting} size="lg" className="mt-8 w-full">
                  <Lock size={14} />
                  {submitting ? 'Redirecting to Paystack…' : `Pay ${formatNaira(FEE)} to Confirm`}
                  {!submitting && <ArrowRight size={14} />}
                </Button>
                <p className="mt-3 text-center text-[11px] text-ink-500">
                  Payment is secured by Paystack. We&apos;ll send a confirmation email after payment.
                </p>
              </form>
            </RevealOnScroll>

            {/* Help row */}
            <RevealOnScroll>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <a href="https://wa.me/2348133988976" target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-2xl border border-ink-100 bg-white p-4 transition hover:border-brand-200 hover:shadow-md">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#25D366] text-white">
                    <MessageCircle size={16} />
                  </span>
                  <div>
                    <div className="text-sm font-semibold text-ink-900">Have a quick question?</div>
                    <div className="text-xs text-ink-500">Message us on WhatsApp first</div>
                  </div>
                </a>
                <a href="tel:08133988976" className="flex items-center gap-3 rounded-2xl border border-ink-100 bg-white p-4 transition hover:border-brand-200 hover:shadow-md">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl gradient-brand text-white">
                    <Clock size={16} />
                  </span>
                  <div>
                    <div className="text-sm font-semibold text-ink-900">Need a different time?</div>
                    <div className="text-xs text-ink-500">Call us at 0813 398 8976</div>
                  </div>
                </a>
              </div>
            </RevealOnScroll>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
