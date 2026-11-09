-- Idoko Consulting: allow all video/* MIME types in the existing properties bucket.
-- Run in Supabase Dashboard > SQL Editor after your existing property-video setup.
-- This preserves the current public/admin access policies and listing content.

ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS video_url text;

-- Preserve the bucket's current MIME rules (including allowed image types).
-- NULL already means unrestricted uploads; otherwise append video/* and
-- application/mxf (a standards-based MIME that isn't in video/*).
UPDATE storage.buckets
SET allowed_mime_types = CASE
  WHEN allowed_mime_types IS NULL THEN NULL
  ELSE (SELECT ARRAY(SELECT DISTINCT mime FROM unnest(
    allowed_mime_types || ARRAY['video/*', 'application/mxf']::text[]
  ) AS mime))
END
WHERE id = 'properties';

-- This does NOT increase the project/bucket upload size limit.
-- The admin uploader still limits selections to 250 MB.
