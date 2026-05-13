'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  ClipboardList,
  CreditCard,
  FileText,
  Users,
  Building2,
  Settings,
  LogOut,
  Menu,
  X,
  Calendar,
  ChevronDown,
} from 'lucide-react';
import { LogoLockup, LogoMark } from '@/components/Logo';
import { createClient } from '@/lib/supabase/client';
import { cn } from '@/lib/utils';
import type { User } from '@supabase/supabase-js';

const NAV = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/requests', label: 'Requests', icon: ClipboardList },
  { href: '/admin/payments', label: 'Payments', icon: CreditCard },
  { href: '/admin/reports', label: 'Reports', icon: FileText },
  { href: '/admin/clients', label: 'Clients', icon: Users },
  { href: '/admin/properties', label: 'Properties', icon: Building2 },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
];

export default function AdminShell({ children, user }: { children: React.ReactNode; user: User }) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();
  const [sidebar, setSidebar] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  async function logout() {
    await supabase.auth.signOut();
    router.push('/admin/login');
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar — desktop */}
      <aside className="hidden w-64 shrink-0 flex-col border-r border-ink-100 bg-white lg:flex">
        <div className="flex h-16 items-center border-b border-ink-100 px-5">
          <Link href="/admin" className="focus-ring rounded-md">
            <LogoLockup />
          </Link>
        </div>
        <nav className="flex-1 space-y-0.5 p-4">
          {NAV.map((item) => {
            const active = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition',
                  active ? 'bg-brand-50 text-brand-800' : 'text-ink-700 hover:bg-ink-50'
                )}
              >
                <item.icon size={16} className={active ? 'text-brand-700' : 'text-ink-500'} />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-ink-100 p-4">
          <button onClick={logout} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-rose-600 transition hover:bg-rose-50">
            <LogOut size={16} /> Sign out
          </button>
        </div>
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {sidebar && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSidebar(false)} className="fixed inset-0 z-40 bg-ink-900/50 lg:hidden" />
            <motion.aside initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ type: 'spring', damping: 25, stiffness: 220 }} className="fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-white lg:hidden">
              <div className="flex h-16 items-center justify-between border-b border-ink-100 px-5">
                <LogoLockup />
                <button onClick={() => setSidebar(false)} className="grid h-9 w-9 place-items-center rounded-md text-ink-700">
                  <X size={20} />
                </button>
              </div>
              <nav className="flex-1 space-y-0.5 p-4">
                {NAV.map((item) => {
                  const active = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
                  return (
                    <Link key={item.href} href={item.href} onClick={() => setSidebar(false)} className={cn('flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium', active ? 'bg-brand-50 text-brand-800' : 'text-ink-700 hover:bg-ink-50')}>
                      <item.icon size={16} className={active ? 'text-brand-700' : 'text-ink-500'} />
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
              <div className="border-t border-ink-100 p-4">
                <button onClick={logout} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-rose-600 hover:bg-rose-50">
                  <LogOut size={16} /> Sign out
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Topbar */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-ink-100 bg-white/85 px-4 backdrop-blur-xl lg:px-8">
          <button onClick={() => setSidebar(true)} className="grid h-10 w-10 place-items-center rounded-md text-ink-700 lg:hidden">
            <Menu size={20} />
          </button>
          <Link href="/" className="lg:hidden">
            <LogoMark size={32} />
          </Link>

          <div className="hidden flex-1 lg:block" />

          <div className="relative">
            <button onClick={() => setProfileOpen(!profileOpen)} className="flex items-center gap-2 rounded-full bg-ink-50 py-1.5 pl-1.5 pr-3">
              <div className="grid h-7 w-7 place-items-center rounded-full bg-brand-700 text-xs font-bold text-white">
                {(user.email || 'A').slice(0, 1).toUpperCase()}
              </div>
              <span className="max-w-[140px] truncate text-xs font-semibold text-ink-800">{user.email}</span>
              <ChevronDown size={12} className="text-ink-500" />
            </button>
            {profileOpen && (
              <div className="absolute right-0 top-full mt-2 w-44 overflow-hidden rounded-xl border border-ink-100 bg-white shadow-lg">
                <Link href="/" className="block px-4 py-2.5 text-sm text-ink-800 hover:bg-ink-50">View site</Link>
                <button onClick={logout} className="block w-full px-4 py-2.5 text-left text-sm text-rose-600 hover:bg-rose-50">Sign out</button>
              </div>
            )}
          </div>
        </header>

        <main className="flex-1 px-4 py-6 lg:px-8 lg:py-8">{children}</main>
      </div>
    </div>
  );
}
