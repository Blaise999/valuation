'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Trash2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function DeletePropertyButton({ id }: { id: string }) {
  const router = useRouter();
  const supabase = createClient();
  const [busy, setBusy] = useState(false);

  async function del() {
    if (!confirm('Delete this property?')) return;
    setBusy(true);
    const { error } = await supabase.from('properties').delete().eq('id', id);
    if (error) toast.error(error.message);
    else {
      toast.success('Deleted');
      router.refresh();
    }
    setBusy(false);
  }

  return (
    <button onClick={del} disabled={busy} className="grid h-9 w-9 place-items-center rounded-full border border-rose-200 text-rose-600 hover:bg-rose-50">
      <Trash2 size={14} />
    </button>
  );
}
