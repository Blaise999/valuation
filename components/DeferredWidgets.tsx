'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';
import { MessageCircle, Sparkles } from 'lucide-react';

const WhatsAppWidget = dynamic(() => import('./WhatsAppWidget'), { ssr: false });
const AskAssistant = dynamic(() => import('./AskAssistant'), { ssr: false });

/** Expensive messaging UI and Framer Motion load ONLY if the visitor requests them. */
export default function DeferredWidgets() {
  const pathname = usePathname();
  const [whatsAppLoaded, setWhatsAppLoaded] = useState(false);
  const [assistantLoaded, setAssistantLoaded] = useState(false);

  if (pathname.startsWith('/admin')) return null;
  return (
    <>
      {whatsAppLoaded ? <WhatsAppWidget initialOpen /> : (
        <button type="button" onClick={() => setWhatsAppLoaded(true)} aria-label="Open WhatsApp chat"
          className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-xl transition hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#075e54] sm:bottom-6 sm:right-6">
          <MessageCircle size={27} />
        </button>
      )}
      {assistantLoaded ? <AskAssistant initialOpen /> : (
        <button type="button" onClick={() => setAssistantLoaded(true)} aria-label="Ask the firm"
          className="fixed bottom-5 left-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-[#0b5dbb] text-white shadow-xl transition hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0b5dbb] sm:bottom-6 sm:left-6">
          <Sparkles size={25} />
        </button>
      )}
    </>
  );
}
