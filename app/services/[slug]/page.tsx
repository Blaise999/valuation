import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import RevealOnScroll from '@/components/RevealOnScroll';
import {
  ArrowRight, Check, ChevronRight, Sparkles, Quote,
  ShoppingCart, Building2, ShieldCheck, FileText, Receipt, BarChart3, Scale, Users,
  MapPin, TrendingUp, Calendar, Briefcase, Home, Clock, Tag, Key, Search, MessageCircle,
} from 'lucide-react';
import { SERVICE_DETAILS, SERVICE_SLUGS } from '@/lib/service-details';

export function generateStaticParams() {
  return SERVICE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = SERVICE_DETAILS[slug];
  if (!s) return { title: 'Service' };
  return {
    title: `${s.name} — Idoko C Idoko Consulting`,
    description: s.tagline,
  };
}

const ICON_MAP: Record<string, any> = {
  ShoppingCart, Building2, ShieldCheck, FileText, Receipt, BarChart3, Scale, Users,
  MapPin, TrendingUp, Calendar, Briefcase, Home, Clock, Tag, Key, Search, MessageCircle,
};

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = SERVICE_DETAILS[slug];
  if (!service) notFound();

  return (
    <>
      <Navigation />
      <main>
        {/* HERO — full-bleed image with overlaid copy */}
        <section className="relative">
          <div className="relative h-[68vh] min-h-[520px] w-full overflow-hidden">
            <Image
              src={service.hero}
              alt={service.name}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-ink-950/85 via-ink-950/60 to-ink-950/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950/40 via-transparent to-transparent" />

            <div className="relative mx-auto flex h-full max-w-7xl items-end px-6 pb-16 lg:items-center lg:pb-0">
              <div className="max-w-3xl text-white">
                <RevealOnScroll>
                  <div className="flex items-center gap-2 text-xs text-brand-200">
                    <Link href="/" className="hover:text-white">Home</Link>
                    <ChevronRight size={12} />
                    <Link href="/services" className="hover:text-white">Services</Link>
                    <ChevronRight size={12} />
                    <span className="text-white/80">{service.name}</span>
                  </div>
                </RevealOnScroll>

                <RevealOnScroll delay={0.1}>
                  <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[11px] font-medium backdrop-blur">
                    <Sparkles size={12} /> {service.category}
                  </div>
                </RevealOnScroll>

                <RevealOnScroll delay={0.15}>
                  <h1 className="mt-5 font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
                    {service.name}
                  </h1>
                </RevealOnScroll>

                <RevealOnScroll delay={0.25}>
                  <p className="mt-5 max-w-2xl text-lg text-brand-100/90 sm:text-xl">
                    {service.tagline}
                  </p>
                </RevealOnScroll>

                <RevealOnScroll delay={0.35}>
                  <div className="mt-9 flex flex-wrap gap-3">
                    <Link
                      href={service.slug === 'consultation' ? '/book-consultation' : `/request-valuation?service=${service.slug}`}
                      className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-ink-900 transition hover:bg-brand-50"
                    >
                      {service.cta} <ArrowRight size={14} />
                    </Link>
                    <a
                      href="https://wa.me/2348133988976"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
                    >
                      Ask on WhatsApp
                    </a>
                  </div>
                </RevealOnScroll>
              </div>
            </div>
          </div>
        </section>

        {/* INTRO + GALLERY */}
        <section className="py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-7">
                <RevealOnScroll>
                  <span className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-700">
                    Overview
                  </span>
                  <h2 className="mt-3 font-display text-4xl font-bold leading-tight tracking-tight text-ink-900 sm:text-5xl">
                    {service.intro}
                  </h2>
                </RevealOnScroll>

                <div className="mt-10 space-y-5">
                  {service.longDescription.map((para, i) => (
                    <RevealOnScroll key={i} delay={i * 0.05}>
                      <p className="text-base leading-relaxed text-ink-700 sm:text-lg">{para}</p>
                    </RevealOnScroll>
                  ))}
                </div>
              </div>

              {/* Asymmetric gallery */}
              <div className="lg:col-span-5">
                <RevealOnScroll>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-3">
                      <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-ink-100 shadow-md">
                        <div className="relative h-full">
                          <Image src={service.gallery[0]} alt="" fill className="object-cover" sizes="240px" />
                        </div>
                      </div>
                      <div className="aspect-square overflow-hidden rounded-2xl bg-ink-100 shadow-md">
                        <div className="relative h-full">
                          <Image src={service.gallery[1]} alt="" fill className="object-cover" sizes="240px" />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3 pt-8">
                      <div className="aspect-square overflow-hidden rounded-2xl bg-ink-100 shadow-md">
                        <div className="relative h-full">
                          <Image src={service.gallery[2]} alt="" fill className="object-cover" sizes="240px" />
                        </div>
                      </div>
                      <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-ink-100 shadow-md">
                        <div className="relative h-full">
                          <Image src={service.gallery[3]} alt="" fill className="object-cover" sizes="240px" />
                        </div>
                      </div>
                    </div>
                  </div>
                </RevealOnScroll>
              </div>
            </div>
          </div>
        </section>

        {/* WHEN YOU NEED IT */}
        <section className="bg-ink-50/50 py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6">
            <RevealOnScroll>
              <div className="mx-auto max-w-2xl text-center">
                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-700">
                  When you need it
                </span>
                <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-ink-900 sm:text-5xl">
                  Common situations <span className="gradient-text">we handle.</span>
                </h2>
              </div>
            </RevealOnScroll>

            <div className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {service.whenYouNeed.map((w, i) => {
                const Icon = ICON_MAP[w.icon] || ShieldCheck;
                return (
                  <RevealOnScroll key={w.title} delay={(i % 4) * 0.05}>
                    <div className="group h-full rounded-3xl bg-white p-6 ring-1 ring-ink-100 transition hover:-translate-y-1 hover:shadow-lg hover:shadow-brand-900/5">
                      <div className="grid h-11 w-11 place-items-center rounded-xl gradient-brand text-white shadow-md shadow-brand-700/30">
                        <Icon size={18} />
                      </div>
                      <h3 className="mt-5 font-display text-base font-bold text-ink-900">{w.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-ink-600">{w.desc}</p>
                    </div>
                  </RevealOnScroll>
                );
              })}
            </div>
          </div>
        </section>

        {/* PROCESS — image-led, alternating */}
        <section className="py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6">
            <RevealOnScroll>
              <div className="mx-auto max-w-2xl text-center">
                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-700">
                  How we work
                </span>
                <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-ink-900 sm:text-5xl">
                  Our four-step process
                </h2>
                <p className="mt-4 text-base text-ink-600">
                  Same disciplined process for every engagement — large or small.
                </p>
              </div>
            </RevealOnScroll>

            <div className="mt-20 space-y-24">
              {service.process.map((p, i) => {
                const reverse = i % 2 === 1;
                return (
                  <RevealOnScroll key={p.step} delay={i * 0.05}>
                    <div className={`grid items-center gap-10 lg:grid-cols-12 lg:gap-16 ${reverse ? '[&>*:first-child]:lg:order-2' : ''}`}>
                      <div className="lg:col-span-7">
                        <div className="relative aspect-[5/3] overflow-hidden rounded-3xl bg-ink-100 shadow-2xl shadow-brand-900/15">
                          <Image src={p.img} alt={p.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 700px" />
                          <div className="absolute left-5 top-5 grid h-14 w-14 place-items-center rounded-2xl bg-white/95 font-display text-xl font-bold text-brand-700 shadow-md backdrop-blur">
                            {p.step}
                          </div>
                        </div>
                      </div>
                      <div className="lg:col-span-5">
                        <div className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-brand-700">
                          Step {p.step}
                        </div>
                        <h3 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight text-ink-900 sm:text-4xl">
                          {p.title}
                        </h3>
                        <p className="mt-4 text-base leading-relaxed text-ink-700 sm:text-lg">{p.desc}</p>
                      </div>
                    </div>
                  </RevealOnScroll>
                );
              })}
            </div>
          </div>
        </section>

        {/* WHAT YOU GET */}
        <section className="relative overflow-hidden bg-brand-950 py-24 text-white lg:py-32">
          <div className="absolute inset-0 bg-grid-dark opacity-30" />
          <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-brand-500/30 blur-3xl" />
          <div className="pointer-events-none absolute -right-20 bottom-20 h-80 w-80 rounded-full bg-brand-400/20 blur-3xl" />

          <div className="relative mx-auto max-w-7xl px-6">
            <RevealOnScroll>
              <div className="grid items-end gap-8 lg:grid-cols-12">
                <div className="lg:col-span-7">
                  <span className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-300">
                    Deliverables
                  </span>
                  <h2 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
                    What you actually <br />
                    <span className="text-brand-300">walk away with.</span>
                  </h2>
                </div>
                <div className="lg:col-span-5">
                  <p className="text-base leading-relaxed text-brand-100/70">
                    Clear, tangible outputs at the end of every engagement.
                  </p>
                </div>
              </div>
            </RevealOnScroll>

            <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {service.whatYouGet.map((g, i) => (
                <RevealOnScroll key={g.title} delay={(i % 3) * 0.06}>
                  <div className="h-full rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur transition hover:bg-white/10">
                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-brand-300 text-brand-950">
                      <Check size={16} strokeWidth={3} />
                    </div>
                    <h3 className="mt-5 font-display text-lg font-bold">{g.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-brand-100/80">{g.desc}</p>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-24 lg:py-32">
          <div className="mx-auto max-w-4xl px-6">
            <RevealOnScroll>
              <div className="text-center">
                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-700">
                  FAQs
                </span>
                <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-ink-900 sm:text-5xl">
                  Questions clients ask
                </h2>
              </div>
            </RevealOnScroll>

            <div className="mt-14 space-y-3">
              {service.faqs.map((f, i) => (
                <RevealOnScroll key={f.q} delay={i * 0.04}>
                  <details className="group rounded-2xl border border-ink-100 bg-white p-5 transition hover:border-brand-200 open:border-brand-200 open:shadow-md open:shadow-brand-900/5">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-display text-base font-bold text-ink-900">
                      <span>{f.q}</span>
                      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-700 transition group-open:rotate-45 group-open:bg-brand-700 group-open:text-white">
                        +
                      </span>
                    </summary>
                    <p className="mt-4 text-sm leading-relaxed text-ink-700">{f.a}</p>
                  </details>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* PRICING NOTE + CTA */}
        <section className="py-24">
          <div className="mx-auto max-w-5xl px-6">
            <RevealOnScroll>
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-700 via-brand-800 to-brand-950 p-10 text-white lg:p-16">
                <div className="absolute inset-0 bg-grid-dark opacity-20" />
                <div className="pointer-events-none absolute -right-20 -top-10 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

                <div className="relative grid gap-8 lg:grid-cols-2 lg:items-center">
                  <div>
                    <Quote size={36} className="text-brand-300" />
                    <h3 className="mt-5 font-display text-3xl font-bold leading-tight lg:text-4xl">
                      About fees
                    </h3>
                    <p className="mt-4 text-base text-brand-100/90">{service.pricingNote}</p>
                  </div>
                  <div className="flex flex-col gap-3 lg:items-end">
                    <Link
                      href={service.slug === 'consultation' ? '/book-consultation' : `/request-valuation?service=${service.slug}`}
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-ink-900 transition hover:bg-brand-50"
                    >
                      {service.cta} <ArrowRight size={14} />
                    </Link>
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
                    >
                      Ask a Question
                    </Link>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </section>

        {/* OTHER SERVICES */}
        <section className="border-t border-ink-100 py-20">
          <div className="mx-auto max-w-7xl px-6">
            <RevealOnScroll>
              <div className="flex items-end justify-between gap-6">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-700">
                    Explore more
                  </span>
                  <h3 className="mt-2 font-display text-2xl font-bold text-ink-900 sm:text-3xl">
                    Other services we offer
                  </h3>
                </div>
                <Link href="/services" className="hidden text-sm font-semibold text-brand-700 hover:underline sm:inline-flex">
                  View all <ArrowRight size={14} className="ml-1 inline" />
                </Link>
              </div>
            </RevealOnScroll>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {SERVICE_SLUGS.filter((s) => s !== service.slug).slice(0, 3).map((s, i) => {
                const other = SERVICE_DETAILS[s];
                return (
                  <RevealOnScroll key={s} delay={i * 0.06}>
                    <Link
                      href={`/services/${s}`}
                      className="group block overflow-hidden rounded-2xl border border-ink-100 bg-white transition hover:-translate-y-1 hover:shadow-lg hover:shadow-brand-900/10"
                    >
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <Image src={other.gallery[0]} alt={other.name} fill className="object-cover transition group-hover:scale-105" sizes="(max-width: 768px) 100vw, 33vw" />
                        <div className="absolute inset-0 bg-gradient-to-t from-ink-900/60 to-transparent" />
                      </div>
                      <div className="p-5">
                        <h4 className="font-display text-base font-bold text-ink-900">{other.name}</h4>
                        <p className="mt-1 line-clamp-2 text-xs text-ink-600">{other.tagline}</p>
                      </div>
                    </Link>
                  </RevealOnScroll>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
