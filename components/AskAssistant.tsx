'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Send, Mic, Paperclip, Loader2 } from 'lucide-react';

interface Source {
  source: string;
  title: string;
}
interface Message {
  role: 'user' | 'assistant';
  content: string;
  sources?: Source[];
}

const SUGGESTIONS = [
  'How long does a mortgage valuation take?',
  'What do I need for a probate valuation?',
  'Do you manage rental properties?',
];

export default function AskAssistant() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => setMounted(true), []);

  // Feature-detect browser speech recognition (Phase 2 groundwork, wired here).
  useEffect(() => {
    const SR =
      (typeof window !== 'undefined' &&
        ((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition)) ||
      null;
    if (!SR) return;
    setVoiceSupported(true);
    const rec = new SR();
    rec.continuous = false;
    rec.interimResults = false;
    rec.lang = 'en-NG';
    rec.onresult = (e: any) => {
      const transcript = e.results?.[0]?.[0]?.transcript ?? '';
      setInput((prev) => (prev ? `${prev} ${transcript}` : transcript));
    };
    rec.onend = () => setListening(false);
    rec.onerror = () => setListening(false);
    recognitionRef.current = rec;
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, loading]);

  const toggleMic = () => {
    const rec = recognitionRef.current;
    if (!rec) return;
    if (listening) {
      rec.stop();
      setListening(false);
    } else {
      try {
        rec.start();
        setListening(true);
      } catch {
        setListening(false);
      }
    }
  };

  const ask = async (question: string) => {
    const q = question.trim();
    if (!q || loading) return;

    setInput('');
    setMessages((m) => [...m, { role: 'user', content: q }, { role: 'assistant', content: '' }]);
    setLoading(true);

    try {
      const res = await fetch('/api/rag/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: q }),
      });

      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || 'Something went wrong.');
      }

      const header = res.headers.get('x-rag-sources');
      const sources: Source[] = header ? JSON.parse(decodeURIComponent(header)) : [];

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = '';
      // eslint-disable-next-line no-constant-condition
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMessages((m) => {
          const next = [...m];
          next[next.length - 1] = { role: 'assistant', content: acc };
          return next;
        });
      }

      setMessages((m) => {
        const next = [...m];
        next[next.length - 1] = { role: 'assistant', content: acc, sources };
        return next;
      });
    } catch (err: any) {
      setMessages((m) => {
        const next = [...m];
        next[next.length - 1] = {
          role: 'assistant',
          content: err?.message || 'Sorry — I could not answer that just now. Please try again.',
        };
        return next;
      });
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className="fixed bottom-5 left-5 z-50 sm:bottom-6 sm:left-6">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ type: 'spring', damping: 22, stiffness: 280 }}
            className="mb-3 flex h-[520px] w-[340px] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-ink-200 sm:w-[380px]"
          >
            {/* Header */}
            <div className="flex items-center justify-between bg-brand-900 px-4 py-3 text-white">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                <div>
                  <p className="text-sm font-semibold leading-tight">Ask the firm</p>
                  <p className="text-[11px] leading-tight text-brand-200">Answers from our services</p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} aria-label="Close" className="rounded-full p-1 hover:bg-white/10">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-ink-50 px-3 py-3">
              {messages.length === 0 && (
                <div className="space-y-3 pt-2">
                  <p className="px-1 text-xs text-ink-500">
                    Hi! Ask about our valuation, property management, or other services.
                  </p>
                  <div className="flex flex-col gap-2">
                    {SUGGESTIONS.map((s) => (
                      <button
                        key={s}
                        onClick={() => ask(s)}
                        className="rounded-xl border border-ink-200 bg-white px-3 py-2 text-left text-[13px] text-ink-700 hover:border-brand-300 hover:bg-brand-50"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((m, i) => (
                <div key={i} className={m.role === 'user' ? 'flex justify-end' : 'flex justify-start'}>
                  <div
                    className={
                      m.role === 'user'
                        ? 'max-w-[80%] rounded-2xl rounded-br-sm bg-brand-900 px-3 py-2 text-[13px] text-white'
                        : 'max-w-[85%] rounded-2xl rounded-bl-sm bg-white px-3 py-2 text-[13px] text-ink-800 ring-1 ring-ink-200'
                    }
                  >
                    {m.content ? (
                      <p className="whitespace-pre-wrap leading-relaxed">{m.content}</p>
                    ) : (
                      <Loader2 className="h-4 w-4 animate-spin text-ink-400" />
                    )}

                    {m.sources && m.sources.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1 border-t border-ink-100 pt-2">
                        {m.sources.slice(0, 4).map((s) => (
                          <span
                            key={s.source}
                            className="rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-medium text-brand-800"
                          >
                            {s.title}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Input bar */}
            <div className="border-t border-ink-200 bg-white p-2">
              <div className="flex items-end gap-1">
                {/* Attach — scaffolded for Phase 3 (images + files) */}
                <button
                  type="button"
                  disabled
                  title="Photo & file upload coming soon"
                  aria-label="Attach a file"
                  className="cursor-not-allowed rounded-lg p-2 text-ink-300"
                >
                  <Paperclip className="h-5 w-5" />
                </button>

                {/* Mic — wired via the browser Speech API when supported */}
                {voiceSupported && (
                  <button
                    type="button"
                    onClick={toggleMic}
                    aria-label="Speak"
                    className={`rounded-lg p-2 ${listening ? 'bg-accent/10 text-accent' : 'text-ink-500 hover:bg-ink-100'}`}
                  >
                    <Mic className={`h-5 w-5 ${listening ? 'animate-pulse' : ''}`} />
                  </button>
                )}

                <textarea
                  rows={1}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      ask(input);
                    }
                  }}
                  placeholder={listening ? 'Listening…' : 'Type your question…'}
                  className="max-h-24 flex-1 resize-none rounded-lg bg-ink-50 px-3 py-2 text-[13px] text-ink-900 outline-none ring-1 ring-transparent focus:ring-brand-300"
                />

                <button
                  type="button"
                  onClick={() => ask(input)}
                  disabled={loading || !input.trim()}
                  aria-label="Send"
                  className="rounded-lg bg-brand-900 p-2 text-white disabled:opacity-40"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
              <p className="px-1 pt-1 text-[10px] text-ink-400">
                Answers come from our published service information. Fees are confirmed by quotation.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Launcher */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Ask the firm"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-900 text-white shadow-lg ring-1 ring-brand-950/20 transition hover:bg-brand-800"
      >
        {open ? <X className="h-6 w-6" /> : <Sparkles className="h-6 w-6" />}
      </button>
    </div>
  );
}
