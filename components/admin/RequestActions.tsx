'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Upload, Save, Send, FileText, Bell } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { Button, Input, Label, Select, Textarea } from '@/components/ui/Form';
import { formatNaira } from '@/lib/utils';
import type { RequestRow } from '@/types/db';

const STATUSES = [
  'new', 'under_review', 'quotation_sent', 'payment_received',
  'inspection_scheduled', 'in_progress', 'report_ready', 'completed', 'cancelled',
];

const PAYMENT_STATUSES = ['unpaid', 'pending', 'paid', 'failed', 'refunded'];

export default function RequestActions({ request }: { request: RequestRow }) {
  const router = useRouter();
  const supabase = createClient();
  const [busy, setBusy] = useState(false);
  const [sendingQuote, setSendingQuote] = useState(false);
  const [notifying, setNotifying] = useState(false);

  const [status, setStatus] = useState(request.status);
  const [paymentStatus, setPaymentStatus] = useState(request.payment_status);
  const [quoted, setQuoted] = useState<string>(request.quoted_amount?.toString() || '');
  const [adminNotes, setAdminNotes] = useState(request.admin_notes || '');

  async function save() {
    setBusy(true);
    try {
      const { error } = await supabase.from('requests').update({
        status,
        payment_status: paymentStatus,
        quoted_amount: quoted ? Number(quoted) : null,
        admin_notes: adminNotes,
      }).eq('id', request.id);
      if (error) throw error;
      toast.success('Saved');
      router.refresh();
    } catch (err: any) {
      toast.error(err?.message || 'Save failed');
    } finally {
      setBusy(false);
    }
  }

  async function sendQuote() {
    if (!quoted || Number(quoted) <= 0) {
      toast.error('Enter a quoted amount first, then save.');
      return;
    }
    setSendingQuote(true);
    try {
      // Save the quoted amount first
      await supabase.from('requests').update({
        quoted_amount: Number(quoted),
        admin_notes: adminNotes,
      }).eq('id', request.id);

      const res = await fetch('/api/admin/send-quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ request_id: request.id }),
      });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error || 'Failed');
      toast.success('Quote sent — client emailed!');
      router.refresh();
    } catch (err: any) {
      toast.error(err?.message || 'Could not send quote');
    } finally {
      setSendingQuote(false);
    }
  }

  async function notifyReportReady() {
    setNotifying(true);
    try {
      const res = await fetch('/api/admin/notify-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ request_id: request.id }),
      });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error || 'Failed');
      toast.success('Client notified by email');
    } catch (err: any) {
      toast.error(err?.message || 'Could not send notification');
    } finally {
      setNotifying(false);
    }
  }

  async function uploadReport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    try {
      const path = `${request.reference}/${Date.now()}-${file.name.replace(/[^\w.\-]+/g, '_')}`;
      const { error: upErr } = await supabase.storage.from('reports').upload(path, file, { upsert: true });
      if (upErr) throw upErr;
      const { data } = await supabase.storage.from('reports').createSignedUrl(path, 60 * 60 * 24 * 365);
      const url = data?.signedUrl;
      const { error: dbErr } = await supabase.from('requests').update({
        report_url: url,
        report_uploaded_at: new Date().toISOString(),
        status: 'report_ready',
      }).eq('id', request.id);
      if (dbErr) throw dbErr;
      toast.success('Report uploaded');
      router.refresh();
    } catch (err: any) {
      toast.error(err?.message || 'Upload failed');
    } finally {
      setBusy(false);
    }
  }

  return (
    <aside className="space-y-6">
      <div className="rounded-2xl border border-ink-100 bg-white p-6">
        <h3 className="font-display text-base font-bold text-ink-900">Manage</h3>

        <div className="mt-5 space-y-4">
          <div>
            <Label>Request status</Label>
            <Select value={status} onChange={(e) => setStatus(e.target.value as any)}>
              {STATUSES.map((s) => (
                <option key={s} value={s}>{s.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}</option>
              ))}
            </Select>
          </div>
          <div>
            <Label>Payment status</Label>
            <Select value={paymentStatus} onChange={(e) => setPaymentStatus(e.target.value as any)}>
              {PAYMENT_STATUSES.map((s) => (
                <option key={s} value={s}>{s.replace(/\b\w/g, (c) => c.toUpperCase())}</option>
              ))}
            </Select>
          </div>
          <div>
            <Label>Quoted amount (₦)</Label>
            <Input type="number" value={quoted} onChange={(e) => setQuoted(e.target.value)} placeholder="0" />
            {quoted && <p className="mt-1 text-xs text-ink-500">{formatNaira(Number(quoted))}</p>}
          </div>
          <div>
            <Label>Admin notes (visible to client in quote email)</Label>
            <Textarea rows={3} value={adminNotes} onChange={(e) => setAdminNotes(e.target.value)} placeholder="Notes about scope, timeline, anything you want the client to see…" />
          </div>

          <Button onClick={save} disabled={busy} size="md" className="w-full">
            <Save size={14} /> {busy ? 'Saving…' : 'Save Changes'}
          </Button>
        </div>
      </div>

      <div className="rounded-2xl border border-brand-200 bg-brand-50/40 p-6">
        <h3 className="font-display text-base font-bold text-brand-900">Send Quote & Payment Link</h3>
        <p className="mt-1 text-xs text-brand-900/70">
          Generates a Paystack payment link, emails the client, and marks the request as &quot;Quotation Sent&quot;.
        </p>
        <Button onClick={sendQuote} disabled={sendingQuote || !quoted} size="md" className="mt-4 w-full">
          <Send size={14} /> {sendingQuote ? 'Sending…' : 'Send Quote to Client'}
        </Button>

        {request.payment_link && (
          <div className="mt-4 rounded-lg bg-white p-3 text-xs">
            <div className="font-semibold text-ink-900">Active payment link:</div>
            <a href={request.payment_link} target="_blank" rel="noreferrer" className="mt-1 block break-all text-brand-700 underline">
              {request.payment_link}
            </a>
          </div>
        )}
      </div>

      <div className="rounded-2xl border border-ink-100 bg-white p-6">
        <h3 className="font-display text-base font-bold text-ink-900">Upload Final Report</h3>
        <p className="mt-1 text-xs text-ink-500">PDF only, up to 25 MB.</p>

        <label htmlFor="report-upload" className="mt-4 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-ink-200 bg-ink-50/40 p-6 text-center transition hover:border-brand-400 hover:bg-brand-50/40">
          <Upload size={20} className="text-brand-700" />
          <span className="mt-2 text-sm font-semibold text-ink-900">Upload PDF</span>
          <input id="report-upload" type="file" accept=".pdf" hidden onChange={uploadReport} />
        </label>

        {request.report_url && (
          <Button onClick={notifyReportReady} disabled={notifying} variant="secondary" size="md" className="mt-4 w-full">
            <Bell size={14} /> {notifying ? 'Notifying…' : 'Email Client: Report Ready'}
          </Button>
        )}
      </div>
    </aside>
  );
}
