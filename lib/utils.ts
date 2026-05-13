import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNaira(amount: number | string | null | undefined) {
  if (amount === null || amount === undefined || amount === '') return '—';
  const n = typeof amount === 'string' ? parseFloat(amount) : amount;
  if (isNaN(n)) return '—';
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0,
  }).format(n);
}

export function formatDate(date: string | Date) {
  return new Intl.DateTimeFormat('en-NG', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date));
}

export function statusColor(status: string) {
  const map: Record<string, string> = {
    new: 'bg-blue-50 text-blue-700 ring-blue-600/20',
    under_review: 'bg-amber-50 text-amber-800 ring-amber-600/20',
    quotation_sent: 'bg-purple-50 text-purple-700 ring-purple-600/20',
    payment_received: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
    inspection_scheduled: 'bg-indigo-50 text-indigo-700 ring-indigo-600/20',
    in_progress: 'bg-cyan-50 text-cyan-700 ring-cyan-600/20',
    report_ready: 'bg-teal-50 text-teal-700 ring-teal-600/20',
    completed: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
    cancelled: 'bg-rose-50 text-rose-700 ring-rose-600/20',
    paid: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
    unpaid: 'bg-slate-100 text-slate-700 ring-slate-600/20',
    pending: 'bg-amber-50 text-amber-800 ring-amber-600/20',
    failed: 'bg-rose-50 text-rose-700 ring-rose-600/20',
  };
  return map[status] || 'bg-slate-100 text-slate-700 ring-slate-600/20';
}

export function statusLabel(status: string) {
  return status.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}
