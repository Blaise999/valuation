'use client';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Save } from 'lucide-react';
import { Button, Input, Label, Textarea } from '@/components/ui/Form';
import { createClient } from '@/lib/supabase/client';

export default function AdminSettingsPage() {
  const supabase = createClient();
  const [busy, setBusy] = useState(false);
  const [company, setCompany] = useState({
    name: 'Idoko C Idoko Consulting',
    tagline: 'Estate Surveyors & Valuers | Property Managers | Facility Managers | Agency',
    phone: '08133988976',
    whatsapp: '2348133988976',
    email: 'info@idokoconsulting.com',
    address: 'No 75 Chime Avenue, New Heaven. Opp Mr Biggs bus stop',
    principal: 'Idoko Chinelo Ifeyinwa',
    credentials: 'Principal Valuer',
  });
  const [consultationFee, setConsultationFee] = useState('15000');
  const [valuationFee, setValuationFee] = useState('20000');

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from('settings').select('*');
      data?.forEach((s: any) => {
        if (s.key === 'company') setCompany((c) => ({ ...c, ...s.value }));
        if (s.key === 'consultation_fee') setConsultationFee(String(s.value));
        if (s.key === 'valuation_processing_fee') setValuationFee(String(s.value));
      });
    })();
  }, []);

  async function save() {
    setBusy(true);
    try {
      const ops = [
        supabase.from('settings').upsert({ key: 'company', value: company }),
        supabase.from('settings').upsert({ key: 'consultation_fee', value: Number(consultationFee) }),
        supabase.from('settings').upsert({ key: 'valuation_processing_fee', value: Number(valuationFee) }),
      ];
      const results = await Promise.all(ops);
      const err = results.find((r) => r.error);
      if (err?.error) throw err.error;
      toast.success('Settings saved');
    } catch (err: any) {
      toast.error(err?.message || 'Save failed');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold text-ink-900">Settings</h1>
        <p className="mt-1 text-sm text-ink-500">Manage company information and service fees.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-ink-100 bg-white p-6">
          <h2 className="font-display text-base font-bold text-ink-900">Company Information</h2>
          <div className="mt-5 grid gap-5">
            <div><Label>Company name</Label><Input value={company.name} onChange={(e) => setCompany({ ...company, name: e.target.value })} /></div>
            <div><Label>Tagline</Label><Input value={company.tagline} onChange={(e) => setCompany({ ...company, tagline: e.target.value })} /></div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div><Label>Phone</Label><Input value={company.phone} onChange={(e) => setCompany({ ...company, phone: e.target.value })} /></div>
              <div><Label>WhatsApp (with country code)</Label><Input value={company.whatsapp} onChange={(e) => setCompany({ ...company, whatsapp: e.target.value })} /></div>
            </div>
            <div><Label>Email</Label><Input value={company.email} onChange={(e) => setCompany({ ...company, email: e.target.value })} /></div>
            <div><Label>Address</Label><Textarea rows={2} value={company.address} onChange={(e) => setCompany({ ...company, address: e.target.value })} /></div>
            <div><Label>Principal Valuer</Label><Input value={company.principal} onChange={(e) => setCompany({ ...company, principal: e.target.value })} /></div>
            <div><Label>Credentials</Label><Input value={company.credentials} onChange={(e) => setCompany({ ...company, credentials: e.target.value })} /></div>
          </div>
        </div>

        <div className="rounded-2xl border border-ink-100 bg-white p-6">
          <h2 className="font-display text-base font-bold text-ink-900">Service Fees</h2>
          <p className="mt-1 text-xs text-ink-500">Default fixed fees in Naira. Custom valuation prices are quoted per request.</p>
          <div className="mt-5 grid gap-5">
            <div><Label>Consultation fee (₦)</Label><Input type="number" value={consultationFee} onChange={(e) => setConsultationFee(e.target.value)} /></div>
            <div><Label>Valuation processing fee (₦)</Label><Input type="number" value={valuationFee} onChange={(e) => setValuationFee(e.target.value)} /></div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={save} disabled={busy} size="lg">
          <Save size={14} /> {busy ? 'Saving…' : 'Save Settings'}
        </Button>
      </div>
    </div>
  );
}
