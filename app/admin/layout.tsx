import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import AdminShell from '@/components/admin/AdminShell';

export const metadata = { title: 'Admin' };

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Login page handles its own layout
  return (
    <div className="min-h-screen bg-ink-50/40">
      {user ? <AdminShell user={user}>{children}</AdminShell> : children}
    </div>
  );
}
