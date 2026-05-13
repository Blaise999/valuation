'use client';

import { useState } from 'react';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { Phone, Mail, MapPin, MessageCircle, Send, Clock, Sparkles } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import RevealOnScroll from '@/components/RevealOnScroll';
import { Button, Input, Label, Textarea, FieldError } from '@/components/ui/Form';

const CONTACT_OPTIONS = [
  { icon: MapPin, t: 'Visit our office', d: 'No 75 Chime Avenue, New Heaven\nOpp Mr Biggs bus stop, Enugu', href: null, accent: 'navy' },
  { icon: Phone, t: 'Call us', d: '0813 398 8976', href: 'tel:08133988976', accent: 'navy' },
  { icon: MessageCircle, t: 'WhatsApp', d: '+234 813 398 8976', href: 'https://wa.me/2348133988976', accent: 'green' },
  { icon: Mail, t: 'Email', d: 'info@idokoconsulting.com', href: 'mailto:info@idokoconsulting.com', accent: 'navy' },
];

export default function ContactPage() {
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState({ full_name: '', email: '', phone: '', subject: '', message: '' });

  function update<K extends keyof typeof form>(k: K, v: string) {
    setForm({ ...form, [k]: v });
    setErrors({ ...errors, [k]: '' });
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!form.full_name.trim()) errs.full_name = 'Required';
    if (!form.email.trim() || !/.+@.+\..+/.test(form.email)) errs.email = 'Valid email required';
    if (!form.message.trim()) errs.message = 'Required';
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error || 'Send failed');
      toast.success('Message sent — we\'ll be in touch soon!');
      setForm({ full_name: '', email: '', phone: '', subject: '', message: '' });
    } catch (err: any) {
      toast.error(err?.message || 'Send failed');
    } finally {
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
          <div className="pointer-events-none absolute -right-40 -top-20 h-[500px] w-[500px] rounded-full bg-brand-200/40 blur-3xl" />
          <div className="pointer-events-none absolute -left-32 top-40 h-80 w-80 rounded-full bg-brand-300/25 blur-3xl" />

          <div className="relative mx-auto max-w-7xl px-6 py-16 lg:py-24">
            <div className="grid items-end gap-12 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <RevealOnScroll>
                  <div className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white/60 px-3 py-1.5 text-xs font-medium text-brand-800 backdrop-blur-sm">
                    <Sparkles size={12} className="text-brand-700" /> Get in touch
                  </div>
                </RevealOnScroll>
                <RevealOnScroll delay={0.1}>
                  <h1 className="mt-6 font-display text-5xl font-bold leading-[1.05] tracking-tight text-ink-900 sm:text-6xl lg:text-7xl">
                    Let&apos;s talk about <br />
                    <span className="gradient-text">your property.</span>
                  </h1>
                </RevealOnScroll>
                <RevealOnScroll delay={0.2}>
                  <p className="mt-6 max-w-xl text-lg text-ink-600">
                    Reach us by phone, WhatsApp, or the form below. We respond within one business day.
                  </p>
                </RevealOnScroll>

                <RevealOnScroll delay={0.3}>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <a href="tel:08133988976" className="inline-flex items-center gap-2 rounded-full bg-brand-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-800">
                      <Phone size={14} /> 0813 398 8976
                    </a>
                    <a href="https://wa.me/2348133988976" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#1faa53]">
                      <MessageCircle size={14} /> WhatsApp
                    </a>
                  </div>
                </RevealOnScroll>
              </div>

              <RevealOnScroll delay={0.2} className="lg:col-span-5">
                <div className="relative">
                  <div className="relative ml-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-3xl shadow-2xl shadow-brand-900/15 ring-4 ring-white">
                    <Image
                      src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=75"
                      alt="Our office"
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 400px"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-900/60 via-transparent to-transparent" />
                    <div className="absolute inset-x-5 bottom-5 rounded-2xl bg-white/95 p-4 backdrop-blur">
                      <div className="text-[10px] font-semibold uppercase tracking-wider text-brand-700">Our Office</div>
                      <div className="mt-1 font-display text-sm font-bold text-ink-900">75 Chime Avenue, Enugu</div>
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </section>

        {/* CONTACT GRID + FORM */}
        <section className="pb-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
              {/* LEFT: contact cards in 2x2 grid */}
              <div className="lg:col-span-5">
                <div className="grid gap-3 sm:grid-cols-2">
                  {CONTACT_OPTIONS.map((item, i) => {
                    const isExternal = item.href?.startsWith('http');
                    const cardClass = "group flex h-full flex-col gap-3 rounded-2xl border border-ink-100 bg-white p-5 transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-md hover:shadow-brand-900/5";
                    const Inner = (
                      <>
                        <div className={`grid h-11 w-11 place-items-center rounded-xl text-white shadow-md ${
                          item.accent === 'green' ? 'bg-[#25D366] shadow-[#25D366]/30' : 'gradient-brand shadow-brand-700/30'
                        }`}>
                          <item.icon size={18} />
                        </div>
                        <div>
                          <div className="text-[10px] font-semibold uppercase tracking-wider text-brand-700">{item.t}</div>
                          <div className="mt-1 whitespace-pre-line text-sm font-semibold text-ink-900">{item.d}</div>
                        </div>
                      </>
                    );

                    return (
                      <RevealOnScroll key={item.t} delay={i * 0.05}>
                        {item.href ? (
                          <a
                            href={item.href}
                            target={isExternal ? '_blank' : undefined}
                            rel="noreferrer"
                            className={cardClass}
                          >
                            {Inner}
                          </a>
                        ) : (
                          <div className={cardClass}>{Inner}</div>
                        )}
                      </RevealOnScroll>
                    );
                  })}
                </div>

                <RevealOnScroll delay={0.25}>
                  <div className="mt-3 rounded-2xl border border-ink-100 bg-gradient-to-br from-brand-50 to-white p-5">
                    <div className="flex items-center gap-2">
                      <span className="grid h-8 w-8 place-items-center rounded-lg bg-white text-brand-700 ring-1 ring-brand-100">
                        <Clock size={14} />
                      </span>
                      <div className="text-xs font-semibold uppercase tracking-wider text-brand-700">Office Hours</div>
                    </div>
                    <dl className="mt-4 space-y-1.5 text-sm">
                      <div className="flex items-center justify-between">
                        <dt className="text-ink-600">Monday – Friday</dt>
                        <dd className="font-semibold text-ink-900">9:00 AM – 5:00 PM</dd>
                      </div>
                      <div className="flex items-center justify-between">
                        <dt className="text-ink-600">Saturday</dt>
                        <dd className="font-semibold text-ink-900">10:00 AM – 2:00 PM</dd>
                      </div>
                      <div className="flex items-center justify-between">
                        <dt className="text-ink-600">Sunday</dt>
                        <dd className="font-semibold text-ink-500">Closed</dd>
                      </div>
                    </dl>
                  </div>
                </RevealOnScroll>
              </div>

              {/* RIGHT: form */}
              <div className="lg:col-span-7">
                <RevealOnScroll delay={0.1}>
                  <form onSubmit={submit} className="rounded-3xl border border-ink-100 bg-white p-7 shadow-sm lg:p-10">
                    <h2 className="font-display text-2xl font-bold text-ink-900 sm:text-3xl">Send a message</h2>
                    <p className="mt-1 text-sm text-ink-500">We&apos;ll reply by email within one business day.</p>

                    <div className="mt-8 grid gap-5 sm:grid-cols-2">
                      <div>
                        <Label required>Full name</Label>
                        <Input value={form.full_name} onChange={(e) => update('full_name', e.target.value)} placeholder="Your name" />
                        <FieldError message={errors.full_name} />
                      </div>
                      <div>
                        <Label>Phone</Label>
                        <Input value={form.phone} onChange={(e) => update('phone', e.target.value)} placeholder="+234 813 000 0000" />
                      </div>
                      <div className="sm:col-span-2">
                        <Label required>Email</Label>
                        <Input type="email" value={form.email} onChange={(e) => update('email', e.target.value)} placeholder="you@example.com" />
                        <FieldError message={errors.email} />
                      </div>
                      <div className="sm:col-span-2">
                        <Label>Subject</Label>
                        <Input value={form.subject} onChange={(e) => update('subject', e.target.value)} placeholder="What can we help with?" />
                      </div>
                      <div className="sm:col-span-2">
                        <Label required>Message</Label>
                        <Textarea rows={6} value={form.message} onChange={(e) => update('message', e.target.value)} placeholder="Tell us about your property or question…" />
                        <FieldError message={errors.message} />
                      </div>
                    </div>

                    <div className="mt-8 flex flex-col-reverse items-start justify-between gap-4 border-t border-ink-100 pt-6 sm:flex-row sm:items-center">
                      <p className="text-xs text-ink-500">
                        By sending, you agree we&apos;ll respond by email or phone.
                      </p>
                      <Button type="submit" disabled={submitting} size="lg" className="w-full sm:w-auto">
                        {submitting ? 'Sending…' : 'Send Message'} {!submitting && <Send size={14} />}
                      </Button>
                    </div>
                  </form>
                </RevealOnScroll>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
