'use client';

import { useEffect, useRef, useState } from 'react';
import { Upload, Film, X, CheckCircle2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import toast from 'react-hot-toast';

const MAX_BYTES = 250 * 1024 * 1024;

export default function VideoUploadField({
  bucket, folder, value, onChange, onUploadingChange, label = 'Upload property walkthrough',
}: {
  bucket: 'properties';
  folder: string;
  value: string;
  onChange: (url: string) => void;
  onUploadingChange?: (uploading: boolean) => void;
  label?: string;
}) {
  const [progress, setProgress] = useState<number | null>(null);
  const [error, setError] = useState('');
  const uploadRef = useRef<AbortController | null>(null);

  useEffect(() => () => uploadRef.current?.abort(), []);

  async function startUpload(file?: File) {
    if (!file) return;
    if (!['video/mp4', 'video/webm'].includes(file.type)) {
      toast.error('Please use an MP4 or WebM video.');
      return;
    }
    if (file.size === 0) {
      toast.error('The selected video is empty.');
      return;
    }
    if (file.size > MAX_BYTES) {
      toast.error('This upload is over the 250 MB limit. Compress the video first.');
      return;
    }
    const controller = new AbortController();
    uploadRef.current = controller;
    setError('');
    setProgress(0);
    onUploadingChange?.(true);
    try {
      const supabase = createClient();
      const { data: { session }, error: authError } = await supabase.auth.getSession();
      if (authError || !session?.access_token) throw new Error('Please sign in again before uploading.');
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
      if (!url) throw new Error('Supabase storage is not configured.');
      const extension = file.type === 'video/webm' ? 'webm' : 'mp4';
      const objectName = `${folder}/${crypto.randomUUID()}.${extension}`;
      const endpoint = `${url.replace(/\/$/, '')}/storage/v1/upload/resumable`;
      const headers = {
        authorization: `Bearer ${session.access_token}`,
        'Tus-Resumable': '1.0.0',
        'x-upsert': 'false',
      };
      // Supabase's TUS endpoint accepts 6 MB patches. All data goes directly
      // from the administrator's browser to Supabase, not through Vercel.
      const metadata = { bucketName: bucket, objectName, contentType: file.type, cacheControl: '3600' };
      const uploadMetadata = Object.entries(metadata)
        .map(([key, value]) => `${key} ${btoa(value)}`)
        .join(',');
      const created = await fetch(endpoint, {
        method: 'POST',
        headers: { ...headers, 'Upload-Length': String(file.size), 'Upload-Metadata': uploadMetadata },
        signal: controller.signal,
      });
      if (!created.ok) throw new Error(`Could not start upload (${created.status}). Check your Supabase file-size limit and storage permissions.`);
      const location = created.headers.get('Location');
      if (!location) throw new Error('Storage did not return a resumable upload URL.');
      const uploadUrl = new URL(location, endpoint).toString();
      let offset = 0;
      const chunkSize = 6 * 1024 * 1024;
      while (offset < file.size) {
        if (controller.signal.aborted) throw new DOMException('Upload cancelled', 'AbortError');
        const end = Math.min(offset + chunkSize, file.size);
        let retry = 0;
        while (true) {
          try {
            const response = await fetch(uploadUrl, {
              method: 'PATCH',
              headers: { ...headers, 'Upload-Offset': String(offset), 'Content-Type': 'application/offset+octet-stream' },
              body: file.slice(offset, end),
              signal: controller.signal,
            });
            if (!response.ok) throw new Error(`Storage upload returned ${response.status}`);
            const remote = Number(response.headers.get('Upload-Offset'));
            offset = Number.isFinite(remote) && remote > offset ? remote : end;
            setProgress(Math.round((offset / file.size) * 100));
            break;
          } catch (error) {
            if (controller.signal.aborted) throw error;
            if (++retry > 3) throw error;
            await new Promise((resolve) => setTimeout(resolve, retry * 800));
            // A timed-out PATCH may already have reached the server. Ask it
            // for the actual offset so bytes aren't duplicated on retry.
            const head = await fetch(uploadUrl, { method: 'HEAD', headers, signal: controller.signal });
            if (!head.ok) throw new Error('Unable to resume interrupted upload.');
            const remoteOffset = Number(head.headers.get('Upload-Offset'));
            if (!Number.isFinite(remoteOffset) || remoteOffset < 0) throw new Error('Invalid upload offset.');
            offset = remoteOffset;
            if (offset >= end) break;
          }
        }
      }
      const { data } = supabase.storage.from(bucket).getPublicUrl(objectName);
      onChange(data.publicUrl);
      toast.success('Video uploaded. Save to publish it.');
    } catch (e) {
      if (e instanceof Error && e.name !== 'AbortError') {
        setError(e.message);
        toast.error(e.message);
      }
    } finally {
      if (uploadRef.current === controller) uploadRef.current = null;
      setProgress(null);
      onUploadingChange?.(false);
    }
  }

  return (
    <div className="space-y-3">
      <label className="flex cursor-pointer flex-col items-center justify-center rounded-sm border border-dashed border-[#79b0e3] bg-[#f1f7ff] p-6 text-center transition hover:border-brand-700 hover:bg-white">
        <Upload className="h-6 w-6 text-brand-700" />
        <span className="mt-2 text-sm font-semibold text-ink-900">{progress !== null ? `Uploading · ${progress}%` : label}</span>
        <span className="mt-1 text-xs text-ink-500">MP4 / WebM · up to 250 MB · resumable upload</span>
        <input
          type="file"
          accept="video/mp4,video/webm,.mp4,.webm"
          className="sr-only"
          disabled={progress !== null}
          onChange={(e) => { void startUpload(e.target.files?.[0]); e.currentTarget.value = ''; }}
        />
      </label>
      {progress !== null && (
        <div className="flex items-center gap-3">
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-ink-100" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
            <div className="h-full rounded-full bg-brand-700 transition-[width]" style={{ width: `${progress}%` }} />
          </div>
          <span className="text-xs tabular-nums text-ink-700">{progress}%</span>
          <button type="button" aria-label="Cancel upload" className="text-rose-600" onClick={() => { uploadRef.current?.abort(); uploadRef.current = null; setProgress(null); onUploadingChange?.(false); }}><X size={17} /></button>
        </div>
      )}
      {error && <p role="alert" className="text-xs text-rose-600">{error}</p>}
      {value && (
        <div className="overflow-hidden rounded-xl border border-ink-100 bg-ink-900">
          <video src={value} controls preload="none" playsInline className="aspect-video w-full bg-black object-contain" />
          <div className="flex items-center justify-between gap-2 bg-white px-3 py-2 text-xs text-ink-700">
            <span className="inline-flex items-center gap-1.5"><CheckCircle2 size={14} className="text-emerald-600" /> Video selected</span>
            <button type="button" onClick={() => onChange('')} className="inline-flex items-center gap-1 text-rose-600 hover:text-rose-700"><X size={14} /> Remove</button>
          </div>
        </div>
      )}
      <p className="flex items-start gap-1.5 text-xs leading-relaxed text-ink-500"><Film size={14} className="mt-0.5 shrink-0" /> Visitors see a Watch walkthrough button on the property listing; video never autoplays in the background. For best playback, export H.264 MP4 at 720p or 1080p. Your Supabase project must permit the file size.</p>
    </div>
  );
}
