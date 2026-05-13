import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { CheckCircle2, ArrowRight, MessageCircle } from 'lucide-react';

export default function ThankYouPage({ searchParams }: { searchParams: { ref?: string; type?: string } }) {
  const ref = searchParams.ref;
  const isPayment = searchParams.type === 'payment';

  return (
    <>
      <Navigation />
      <main className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-grid opacity-50" />
        <div className="pointer-events-none absolute -right-40 -top-20 h-[420px] w-[420px] rounded-full bg-emerald-200/40 blur-3xl" />
        <div className="pointer-events-none absolute -left-40 bottom-0 h-[420px] w-[420px] rounded-full bg-brand-200/40 blur-3xl" />

        <div className="relative mx-auto max-w-3xl px-6 py-20 text-center lg:py-32">
          <div className="mx-auto grid h-20 w-20 place-items-center rounded-full gradient-brand text-white shadow-xl shadow-brand-700/30">
            <CheckCircle2 size={40} />
          </div>

          <h1 className="mt-8 font-display text-5xl font-bold tracking-tight text-ink-900 sm:text-6xl">
            {isPayment ? 'Payment Received' : 'Request Received'}
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base text-ink-600">
            {isPayment
              ? 'Thank you. Your payment has been confirmed and our team will be in touch shortly.'
              : 'Thank you. Your request has been received. Our team will review the details and contact you with a quotation within 24 hours.'}
          </p>

          {ref && (
            <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-5 py-2.5 text-sm">
              <span className="text-ink-500">Reference:</span>
              <span className="font-mono font-semibold text-ink-900">{ref}</span>
            </div>
          )}

          <div className="mt-12 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-ink-100 bg-ink-50/50 p-5 text-left">
              <div className="text-xs font-semibold uppercase tracking-wider text-brand-700">What happens next</div>
              <ol className="mt-3 space-y-2 text-sm text-ink-700">
                <li>1. We review your submission</li>
                <li>2. We email you a quotation</li>
                <li>3. You pay securely with Paystack</li>
                <li>4. We schedule the inspection</li>
                <li>5. Report delivered to your email</li>
              </ol>
            </div>
            <div className="rounded-2xl border border-ink-100 bg-ink-50/50 p-5 text-left">
              <div className="text-xs font-semibold uppercase tracking-wider text-brand-700">Need to reach us?</div>
              <p className="mt-3 text-sm text-ink-700">
                Reply to the confirmation email, call us, or message us on WhatsApp for the fastest reply.
              </p>
              <a href="https://wa.me/2348133988976" target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700">
                <MessageCircle size={14} /> Chat on WhatsApp
              </a>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link href="/" className="inline-flex items-center gap-2 rounded-full bg-brand-700 px-6 py-3 text-sm font-semibold text-white">
              Back to Home <ArrowRight size={14} />
            </Link>
            <Link href="/services" className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-6 py-3 text-sm font-semibold text-ink-800">
              Explore Services
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
