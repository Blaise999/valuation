'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Lock, Mail, ArrowRight } from 'lucide-react';
import { LogoLockup } from '@/components/Logo';
import { Button, Input, Label } from '@/components/ui/Form';
import { createClient } from '@/lib/supabase/client';

export default function AdminLoginPage() {
  const router = useRouter();
  const supabase = createClient();
  const [submitting, setSubmitting] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function login(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      toast.error(error.message);
      setSubmitting(false);
      return;
    }
    toast.success('Welcome back!');
    router.push('/admin');
    router.refresh();
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-5">
      {/* Left — branding */}
      <div className="relative hidden overflow-hidden gradient-brand lg:col-span-3 lg:block">
        <div className="absolute inset-0 bg-grid-dark opacity-40" />
        <div className="pointer-events-none absolute -top-40 left-0 h-[500px] w-[500px] rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-brand-300/20 blur-3xl" />

        <div className="relative flex h-full flex-col justify-between p-12 text-white">
          <Link href="/">
            <LogoLockup variant="light" />
          </Link>

          <div>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="font-display text-5xl font-bold leading-tight"
            >
              Welcome back to your <br /> back-office.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-4 max-w-md text-base text-brand-100"
            >
              Manage requests, payments, reports and properties — all in one place.
            </motion.p>

            <div className="mt-12 grid grid-cols-3 gap-4 text-xs">
              {['Requests', 'Payments', 'Reports'].map((t, i) => (
                <motion.div
                  key={t}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.08 }}
                  className="rounded-xl border border-white/15 bg-white/5 p-4 backdrop-blur"
                >
                  <div className="text-[10px] uppercase tracking-wider text-brand-200">{t}</div>
                  <div className="mt-1 font-display text-2xl font-bold">—</div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="text-xs text-brand-100/60">
            © {new Date().getFullYear()} Idoko C Idoko Consulting
          </div>
        </div>
      </div>

      {/* Right — form */}
      <div className="flex items-center justify-center bg-white px-6 py-12 lg:col-span-2 lg:px-10">
        <div className="w-full max-w-sm">
          <div className="lg:hidden">
            <LogoLockup />
          </div>

          <h2 className="mt-10 font-display text-3xl font-bold text-ink-900 lg:mt-0">Admin sign in</h2>
          <p className="mt-2 text-sm text-ink-500">Enter your credentials to access the dashboard.</p>

          <form onSubmit={login} className="mt-8 space-y-5">
            <div>
              <Label required>Email</Label>
              <div className="relative">
                <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
                <Input className="pl-9" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@idokoconsulting.com" />
              </div>
            </div>
            <div>
              <Label required>Password</Label>
              <div className="relative">
                <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
                <Input className="pl-9" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
              </div>
            </div>

            <Button type="submit" disabled={submitting} size="lg" className="w-full">
              {submitting ? 'Signing in…' : 'Sign In'} {!submitting && <ArrowRight size={14} />}
            </Button>
          </form>

          <p className="mt-8 text-center text-xs text-ink-500">
            <Link href="/" className="hover:text-ink-800">← Back to website</Link>
          </p>

          <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50/50 p-4 text-[11px] text-amber-900">
            <b>First time?</b> Create a user in Supabase Auth, then run this SQL to grant admin:
            <code className="mt-2 block rounded bg-white p-2 font-mono text-[10px] text-amber-900">
              insert into profiles (id, email, full_name, role) <br />
              values (&apos;USER_UUID&apos;, &apos;your@email.com&apos;, &apos;Your Name&apos;, &apos;super_admin&apos;);
            </code>
          </div>
        </div>
      </div>
    </div>
  );
}
