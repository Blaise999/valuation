import type { Metadata, Viewport } from 'next';
import { Inter, Fraunces } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import WhatsAppWidget from '@/components/WhatsAppWidget';

const sans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const display = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  axes: ['SOFT', 'opsz'],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'Idoko C Idoko Consulting — Estate Surveyors & Valuers',
    template: '%s · Idoko C Idoko Consulting',
  },
  description:
    'Professional valuation, property management, facility management, feasibility studies, and real estate advisory across Nigeria.',
  keywords: [
    'estate surveyor', 'valuation', 'property management', 
    'Enugu', 'Nigeria', 'feasibility study', 'facility management',
  ],
  openGraph: {
    title: 'Idoko C Idoko Consulting',
    description: 'Estate Surveyors & Valuers · Property Managers · Facility Managers · Agency',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#1e3568',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable}`}>
      <body className="min-h-screen bg-white font-sans text-ink-900 antialiased">
        {children}
        <WhatsAppWidget />
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: '#0b1020',
              color: '#fff',
              borderRadius: '12px',
              fontSize: '14px',
            },
          }}
        />
      </body>
    </html>
  );
}
