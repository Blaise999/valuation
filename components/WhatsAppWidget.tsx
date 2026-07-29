'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send } from 'lucide-react';

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '2348133988976';
const PRESETS = [
  'Hello, I would like to request a property valuation.',
  'I want to book a consultation with the principal consultant.',
  'I have a question about your property management service.',
  'Please send me a quotation for my property.',
];

export default function WhatsAppWidget() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const send = (msg: string) => {
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ type: 'spring', damping: 22, stiffness: 280 }}
            className="mb-3 w-[300px] overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-ink-200 sm:w-[340px]"
          >
            {/* Header */}
            <div className="bg-[#075E54] px-4 py-4 text-white">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-white/20 ring-2 ring-white/30">
                  <span className="font-display text-base font-bold">IC</span>
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold">Idoko Consulting</div>
                  <div className="flex items-center gap-1.5 text-[11px] text-emerald-200">
                    <span className="block h-1.5 w-1.5 rounded-full bg-emerald-300" />
                    Typically replies within an hour
                  </div>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="grid h-8 w-8 place-items-center rounded-full text-white/80 transition hover:bg-white/10"
                  aria-label="Close"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="bg-[#ECE5DD] p-4">
              <div className="rounded-lg rounded-tl-none bg-white px-3 py-2.5 text-sm text-ink-900 shadow-sm">
                Hello! 👋 How can we help you today? Pick a quick reply or send a custom message.
              </div>

              <div className="mt-3 space-y-1.5">
                {PRESETS.map((p) => (
                  <button
                    key={p}
                    onClick={() => send(p)}
                    className="flex w-full items-center justify-between gap-2 rounded-lg bg-white px-3 py-2 text-left text-xs text-ink-800 shadow-sm transition hover:bg-emerald-50"
                  >
                    <span className="line-clamp-2">{p}</span>
                    <Send size={12} className="shrink-0 text-emerald-700" />
                  </button>
                ))}
              </div>

              <button
                onClick={() => send('Hello, I would like to make an enquiry.')}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-[#25D366] px-3 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1faa55]"
              >
                <MessageCircle size={16} /> Open WhatsApp Chat
              </button>

              <p className="mt-2 text-center text-[10px] text-ink-500">
                +234 813 398 8976
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', delay: 1, damping: 12 }}
        onClick={() => setOpen((v) => !v)}
        className="group relative grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-2xl shadow-emerald-500/40 transition hover:scale-105"
        aria-label="WhatsApp chat"
      >
        {/* Pulse */}
        {!open && (
          <>
            <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-40" />
            <span className="absolute -right-0.5 -top-0.5 grid h-5 w-5 place-items-center rounded-full bg-red-500 text-[10px] font-bold ring-2 ring-white">
              1
            </span>
          </>
        )}
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X size={24} />
            </motion.span>
          ) : (
            <motion.span key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              {/* WhatsApp glyph */}
              <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor">
                <path d="M17.5 14.4c-.3-.2-1.7-.8-2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.6 0-.4-.2-1.1-.4-2.1-1.3-.8-.7-1.3-1.6-1.4-1.8-.2-.3 0-.4.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.2-.5.1-.2 0-.4 0-.5 0-.2-.7-1.6-.9-2.2-.2-.5-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.3 0 1.4 1 2.7 1.2 2.9.2.2 2.1 3.2 5.1 4.4 1.8.7 2.5.7 3.4.6.5-.1 1.7-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.3M12 21.5c-1.7 0-3.4-.5-4.8-1.3l-.3-.2-3.6.9.9-3.5-.2-.4c-.9-1.5-1.4-3.2-1.4-4.9 0-5.2 4.2-9.5 9.4-9.5 2.5 0 4.9 1 6.7 2.7 1.8 1.8 2.8 4.2 2.8 6.7 0 5.3-4.2 9.5-9.5 9.5M20.5 3.5C18.2 1.2 15.2 0 12 0 5.4 0 0 5.4 0 12c0 2.1.5 4.1 1.6 5.9L0 24l6.3-1.7c1.7.9 3.7 1.4 5.7 1.4 6.6 0 12-5.4 12-12 0-3.2-1.2-6.2-3.5-8.2"/>
              </svg>
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
