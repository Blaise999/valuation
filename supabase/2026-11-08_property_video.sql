-- Run in your existing Supabase SQL Editor once, before publishing video tours.
-- Additive: does not change any existing listing, storage bucket, or permission.
ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS video_url text;

-- The existing public "properties" storage bucket and admin-write/public-read
-- policies from supabase/schema.sql are reused for property videos.
-- Raise your Supabase project's maximum upload file size if required.
