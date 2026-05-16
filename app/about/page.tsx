import Image from 'next/image';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import RevealOnScroll from '@/components/RevealOnScroll';
import { LogoMark } from '@/components/Logo';
import {
  Award, Building2, Users, Shield, ArrowRight, CheckCircle2,
  Mail, Phone, MapPin, Sparkles,
} from 'lucide-react';

export const metadata = { title: 'About — Idoko C Idoko Consulting' };

const VALUES = [
  { icon: Shield, t: 'Integrity', d: 'Independent, evidence-based opinions — never influenced by who is paying for the report.' },
  { icon: Award, t: 'Standards', d: 'Strict adherence to professional valuation standards on every assignment.' },
  { icon: Users, t: 'Client Focus', d: 'Clear scope, fixed pricing, and constant communication from start to finish.' },
  { icon: Building2, t: 'Expertise', d: 'Deep specialisation across residential, commercial and industrial property.' },
];

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <main>
        {/* HERO */}
        <section className="relative overflow-hidden bg-white pt-12 lg:pt-20">
          <div className="absolute inset-0 bg-grid opacity-50" />
          <div className="pointer-events-none absolute -right-40 -top-20 h-[500px] w-[500px] rounded-full bg-brand-200/40 blur-3xl" />

          <div className="relative mx-auto max-w-7xl px-6 py-16 lg:py-24">
            <div className="grid items-end gap-12 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <RevealOnScroll>
                  <div className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white/60 px-3 py-1.5 text-xs font-medium text-brand-800 backdrop-blur-sm">
                    <Sparkles size={12} className="text-brand-700" /> About the Firm
                  </div>
                </RevealOnScroll>
                <RevealOnScroll delay={0.1}>
                  <h1 className="mt-6 font-display text-5xl font-bold leading-[1.05] tracking-tight text-ink-900 sm:text-6xl lg:text-7xl">
                    Property valuation, <br />
                    <span className="gradient-text">done with care.</span>
                  </h1>
                </RevealOnScroll>
                <RevealOnScroll delay={0.2}>
                  <p className="mt-7 max-w-2xl text-lg leading-relaxed text-ink-600">
                    Idoko C Idoko Consulting is a firm of Estate Surveyors and Valuers offering professional valuation, property management, facility management, agency, and real estate advisory services across Nigeria.
                  </p>
                </RevealOnScroll>
              </div>
              <RevealOnScroll delay={0.3} className="lg:col-span-5">
                <div className="relative">
                  <div className="grid h-56 w-56 place-items-center rounded-full bg-white shadow-2xl ring-1 ring-ink-100 lg:ml-auto">
                    <LogoMark size={170} />
                  </div>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </section>

        {/* PRINCIPAL VALUER — with real photo */}
        <section className="py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid items-center gap-16 lg:grid-cols-12">
              <RevealOnScroll className="lg:col-span-5">
                <div className="relative">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-ink-100 shadow-2xl shadow-brand-900/20 ring-1 ring-ink-100">
                    <Image
                      src="/principal.jpg"
                      alt="Idoko Chinelo Ifeyinwa — Principal Valuer"
                      fill
                      priority
                      className="object-cover object-top"
                      sizes="(max-width: 1024px) 100vw, 500px"
                    />
                  </div>

                  {/* Floating name card */}
                  <div className="absolute -bottom-6 -right-4 max-w-xs rounded-2xl bg-white p-5 shadow-xl ring-1 ring-ink-100 lg:-right-10">
                    <div className="text-xs font-semibold uppercase tracking-wider text-brand-700">Principal Valuer</div>
                    <div className="mt-1 font-display text-base font-bold text-ink-900">Idoko Chinelo Ifeyinwa</div>
                  </div>

                  {/* Decorative logo backdrop */}
                  <div className="pointer-events-none absolute -left-6 -top-6 -z-10 opacity-10">
                    <LogoMark size={140} />
                  </div>
                </div>
              </RevealOnScroll>

              <div className="lg:col-span-7">
                <RevealOnScroll>
                  <span className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-700">Meet the Valuer</span>
                  <h2 className="mt-3 font-display text-4xl font-bold leading-tight tracking-tight text-ink-900 sm:text-5xl">
                    Idoko Chinelo Ifeyinwa
                  </h2>
                </RevealOnScroll>

                <RevealOnScroll delay={0.1}>
                  <div className="mt-8 space-y-5 text-base leading-relaxed text-ink-700">
                    <p>
                      Idoko Chinelo Ifeyinwa is the Principal Valuer at Idoko C Idoko Consulting. She leads every engagement personally — from the first conversation to the final signed report.
                    </p>
                    <p>
                      Her practice spans the full spectrum of real estate: from valuation of single residential plots to commercial portfolio assessments, property management, feasibility studies, and ongoing real estate advisory work.
                    </p>
                    <p>
                      Every report carries one signature commitment — <strong className="text-ink-900">accuracy that holds up before banks, courts, and regulators.</strong>
                    </p>
                  </div>

                  <div className="mt-8 flex flex-wrap gap-2">
                    <a href="mailto:info@idokoconsulting.com" className="inline-flex items-center gap-1.5 rounded-full border border-ink-200 bg-white px-4 py-2 text-xs font-semibold text-ink-800 hover:bg-ink-50">
                      <Mail size={12} /> info@idokoconsulting.com
                    </a>
                    <a href="tel:08133988976" className="inline-flex items-center gap-1.5 rounded-full border border-ink-200 bg-white px-4 py-2 text-xs font-semibold text-ink-800 hover:bg-ink-50">
                      <Phone size={12} /> 0813 398 8976
                    </a>
                  </div>
                </RevealOnScroll>
              </div>
            </div>
          </div>
        </section>

        {/* NIESV REGISTRATION STRIP */}
        <section className="border-y border-ink-100 bg-gradient-to-br from-brand-50 via-white to-brand-50 py-16">
          <div className="mx-auto max-w-7xl px-6">
            <RevealOnScroll>
              <div className="grid items-center gap-10 lg:grid-cols-12">
                <div className="lg:col-span-4">
                  <div className="flex items-center justify-center gap-5 lg:justify-start">
                    <div className="relative grid aspect-square w-32 place-items-center rounded-2xl bg-white p-4 shadow-md ring-1 ring-brand-100 sm:w-36">
                      <Image
                        src="/niesv-logo.png"
                        alt="Nigerian Institution of Estate Surveyors and Valuers (NIESV)"
                        fill
                        sizes="144px"
                        className="object-contain p-3"
                      />
                    </div>
                    <div className="relative grid aspect-square w-32 place-items-center rounded-2xl bg-white p-4 shadow-md ring-1 ring-brand-100 sm:w-36">
                      <Image
                        src="/esvarbon-logo.png"
                        alt="Estate Surveyors and Valuers Registration Board of Nigeria (ESVARBON)"
                        fill
                        sizes="144px"
                        className="object-contain p-3"
                      />
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-8">
                  <span className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-700">Professional Affiliation</span>
                  <h3 className="mt-3 font-display text-2xl font-bold leading-tight text-ink-900 sm:text-3xl">
                    A registered firm with the Nigerian Institution of <br className="hidden lg:block" />
                    Estate Surveyors and Valuers (NIESV).
                  </h3>
                  <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-600">
                    Every valuation report we issue carries the signature and stamp of an Estate Surveyor and Valuer registered with the Estate Surveyors and Valuers Registration Board of Nigeria (ESVARBON) — the standard banks, courts and regulators require.
                  </p>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </section>

        {/* WHAT WE DO STRIP */}
        <section className="bg-ink-50/40 py-20">
          <div className="mx-auto max-w-7xl px-6">
            <RevealOnScroll>
              <div className="mx-auto max-w-3xl text-center">
                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-700">What we offer</span>
                <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
                  A complete real estate practice
                </h2>
                <p className="mt-4 text-base text-ink-600">
                  Seven service lines, one practice, one signature.
                </p>
              </div>
            </RevealOnScroll>

            <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4">
              {[
                'Valuation',
                'Property Management',
                'Financial Reporting',
                'Facility Management',
                'Feasibility Studies',
                'Agency Services',
                'Investment Advisory',
                'Consultations',
              ].map((s, i) => (
                <RevealOnScroll key={s} delay={(i % 4) * 0.04}>
                  <div className="flex items-center gap-2 rounded-2xl bg-white px-4 py-3 ring-1 ring-ink-100">
                    <span className="grid h-6 w-6 place-items-center rounded-full bg-brand-50 text-brand-700">
                      <CheckCircle2 size={12} />
                    </span>
                    <span className="text-sm font-semibold text-ink-900">{s}</span>
                  </div>
                </RevealOnScroll>
              ))}
            </div>

            <RevealOnScroll>
              <div className="mt-10 text-center">
                <Link href="/services" className="inline-flex items-center gap-2 rounded-full bg-brand-700 px-6 py-3 text-sm font-semibold text-white">
                  Explore Services <ArrowRight size={14} />
                </Link>
              </div>
            </RevealOnScroll>
          </div>
        </section>

        {/* VALUES */}
        <section className="py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6">
            <RevealOnScroll>
              <div className="mx-auto max-w-2xl text-center">
                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-700">Our Values</span>
                <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-ink-900 sm:text-5xl">
                  What guides our practice
                </h2>
              </div>
            </RevealOnScroll>

            <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {VALUES.map((v, i) => (
                <RevealOnScroll key={v.t} delay={i * 0.06}>
                  <div className="h-full rounded-3xl bg-white p-7 ring-1 ring-ink-100 transition hover:-translate-y-1 hover:shadow-md">
                    <div className="grid h-12 w-12 place-items-center rounded-2xl gradient-brand text-white shadow-md shadow-brand-700/30">
                      <v.icon size={20} />
                    </div>
                    <h3 className="mt-6 font-display text-xl font-bold text-ink-900">{v.t}</h3>
                    <p className="mt-2 text-sm text-ink-600">{v.d}</p>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* OFFICE */}
        <section className="bg-ink-50/40 py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <RevealOnScroll>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-700">Visit us</span>
                  <h2 className="mt-3 font-display text-4xl font-bold leading-tight tracking-tight text-ink-900 sm:text-5xl">
                    Right in the heart of Enugu.
                  </h2>
                  <p className="mt-5 text-base text-ink-600">
                    Our office is open during the week. Clients are welcome to drop in for a brief conversation, or schedule a longer paid consultation below.
                  </p>

                  <div className="mt-8 space-y-3 text-sm">
                    <div className="flex items-start gap-3 rounded-2xl border border-ink-100 bg-white p-4">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-700">
                        <MapPin size={14} />
                      </span>
                      <div>
                        <div className="font-semibold text-ink-900">Office</div>
                        <div className="text-ink-600">No 75 Chime Avenue, New Heaven, Enugu<br />Opp Mr Biggs bus stop</div>
                      </div>
                    </div>
                    <a href="tel:08133988976" className="flex items-center gap-3 rounded-2xl border border-ink-100 bg-white p-4 transition hover:bg-ink-50">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-700">
                        <Phone size={14} />
                      </span>
                      <div>
                        <div className="font-semibold text-ink-900">Phone</div>
                        <div className="text-ink-600">0813 398 8976</div>
                      </div>
                    </a>
                    <a href="mailto:info@idokoconsulting.com" className="flex items-center gap-3 rounded-2xl border border-ink-100 bg-white p-4 transition hover:bg-ink-50">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-700">
                        <Mail size={14} />
                      </span>
                      <div>
                        <div className="font-semibold text-ink-900">Email</div>
                        <div className="text-ink-600">info@idokoconsulting.com</div>
                      </div>
                    </a>
                  </div>

                  <Link href="/book-consultation" className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-700 px-6 py-3 text-sm font-semibold text-white">
                    Book a Consultation <ArrowRight size={14} />
                  </Link>
                </div>
              </RevealOnScroll>

              <RevealOnScroll>
                <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl shadow-brand-900/10 ring-1 ring-white">
                  <Image
                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=75"
                    alt="Office building"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 600px"
                    loading="lazy"
                  />
                  <div className="absolute inset-x-5 bottom-5 rounded-2xl bg-white/95 p-4 backdrop-blur ring-1 ring-white/40">
                    <div className="flex items-center gap-3">
                      <div className="grid h-10 w-10 place-items-center rounded-xl gradient-brand text-white">
                        <MapPin size={16} />
                      </div>
                      <div>
                        <div className="text-xs uppercase tracking-wider text-brand-700">Our Office</div>
                        <div className="text-sm font-bold text-ink-900">75 Chime Avenue, Enugu</div>
                      </div>
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24">
          <div className="mx-auto max-w-5xl px-6">
            <div className="overflow-hidden rounded-3xl bg-ink-900 p-10 text-white lg:p-16">
              <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
                <div>
                  <h3 className="font-display text-3xl font-bold lg:text-4xl">Let&apos;s discuss your property.</h3>
                  <p className="mt-3 text-sm text-ink-300">A short conversation often saves weeks. Book a paid consultation or request a free assessment.</p>
                </div>
                <div className="flex flex-wrap gap-3 lg:justify-end">
                  <Link href="/request-valuation" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink-900">
                    Request Valuation <ArrowRight size={14} />
                  </Link>
                  <Link href="/book-consultation" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold">
                    Book a Call
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
