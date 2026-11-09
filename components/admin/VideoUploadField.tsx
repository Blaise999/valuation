'use client';

import { useEffect, useRef, useState } from 'react';
import { Upload, Film, X, CheckCircle2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import toast from 'react-hot-toast';

const MAX_BYTES = 250 * 1024 * 1024;

// Some browsers report MOV/MKV/AVI files as an empty or generic MIME type.
// Keep a conservative extension fallback, without accepting arbitrary documents.
const VIDEO_MIME_BY_EXTENSION: Record<string, string> = {
  mp4: 'video/mp4', m4v: 'video/mp4', webm: 'video/webm',
  mov: 'video/quicktime', qt: 'video/quicktime',
  avi: 'video/x-msvideo', mkv: 'video/x-matroska',
  wmv: 'video/x-ms-wmv', flv: 'video/x-flv',
  mpg: 'video/mpeg', mpeg: 'video/mpeg', mpe: 'video/mpeg',
  ogv: 'video/ogg', '3gp': 'video/3gpp', '3g2': 'video/3gpp2',
  mts: 'video/mp2t', m2ts: 'video/mp2t', ts: 'video/mp2t',
  vob: 'video/dvd', asf: 'video/x-ms-asf', mxf: 'application/mxf',
};
const VIDEO_FILE_ACCEPT = 'video/*,.mov,.qt,.avi,.mkv,.wmv,.flv,.m4v,.3gp,.3g2,.mts,.m2ts,.ts,.vob,.asf,.mxf';

function getVideoDetails(file: File): { extension: string; contentType: string } | null {
  const extension = file.name.split('.').pop()?.toLowerCase() || '';
  const guessedMime = VIDEO_MIME_BY_EXTENSION[extension];
  const browserMime = file.type.toLowerCase();
  if (!browserMime.startsWith('video/') && !guessedMime) return null;
  // Supabase's video/* storage rule requires a video MIME even when the
  // browser reports application/octet-stream or no type for a known video.
  const contentType = browserMime.startsWith('video/') ? browserMime : guessedMime;
  if (!contentType) return null;
  const safeExtension = /^[a-z0-9]{1,8}$/.test(extension)
    ? extension
    : (contentType.split('/')[1] || 'video').replace(/^x-/, '').replace(/[^a-z0-9]/g, '').slice(0, 8);
  return { extension: safeExtension || 'video', contentType };
}

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
  const [previewError, setPreviewError] = useState(false);
  const uploadRef = useRef<AbortController | null>(null);

  useEffect(() => () => uploadRef.current?.abort(), []);
  useEffect(() => setPreviewError(false), [value]);

  async function startUpload(file?: File) {
    if (!file) return;
    const details = getVideoDetails(file);
    if (!details) {
      toast.error('Choose a video file (MOV, MP4, MKV, AVI, WebM, WMV and other video formats).');
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
      const objectName = `${folder}/${crypto.randomUUID()}.${details.extension}`;
      const endpoint = `${url.replace(/\/$/, '')}/storage/v1/upload/resumable`;
      const headers = {
        authorization: `Bearer ${session.access_token}`,
        'Tus-Resumable': '1.0.0',
        'x-upsert': 'false',
      };
      // Supabase's TUS endpoint accepts 6 MB patches. All data goes directly
      // from the administrator's browser to Supabase, not through Vercel.
      const metadata = { bucketName: bucket, objectName, contentType: details.contentType, cacheControl: '3600' };
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
        <span className="mt-1 text-xs text-ink-500">MOV, MP4, MKV, AVI, WebM & other videos · up to 250 MB</span>
        <input
          type="file"
          accept={VIDEO_FILE_ACCEPT}
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
          {previewError ? (
            <div className="space-y-2 p-4 text-sm text-white">
              <p>The video was uploaded, but this browser cannot preview its format.</p>
              <a href={value} target="_blank" rel="noopener noreferrer" className="text-blue-200 underline">Open original file</a>
            </div>
          ) : (
            <video src={value} controls preload="none" playsInline onError={() => setPreviewError(true)} className="aspect-video w-full bg-black object-contain" />
          )}
          <div className="flex items-center justify-between gap-2 bg-white px-3 py-2 text-xs text-ink-700">
            <span className="inline-flex items-center gap-1.5"><CheckCircle2 size={14} className="text-emerald-600" /> Video selected</span>
            <button type="button" onClick={() => onChange('')} className="inline-flex items-center gap-1 text-rose-600 hover:text-rose-700"><X size={14} /> Remove</button>
          </div>
        </div>
      )}
      <p className="flex items-start gap-1.5 text-xs leading-relaxed text-ink-500"><Film size={14} className="mt-0.5 shrink-0" /> Visitors see a Watch walkthrough button on the property listing; video never autoplays in the background. All common video formats can be uploaded, but some (such as AVI or MKV) do not play in every browser. For reliable visitor playback, use H.264 MP4 at 720p or 1080p. Your Supabase project must permit the file size.</p>
    </div>
  );
}
