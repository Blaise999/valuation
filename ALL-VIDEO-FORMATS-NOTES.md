# All-format property video upload update (V5)

Changed only these V4 application components:
- `components/admin/VideoUploadField.tsx`
- `app/admin/properties/new/page.tsx`
- `components/VideoLightbox.tsx`

Added the migration `supabase/2026-11-09_all_property_video_formats.sql`.

Run that migration in your existing Supabase SQL Editor, after any earlier property-video SQL. It allows the `video/*` wildcard while preserving image permissions and all existing listings.

The admin selector accepts `video/*` and common extra extensions (MOV, AVI, MKV, WMV, FLV, M4V, 3GP, MPEG, etc.). If the browser leaves the MIME type empty, the uploader infers it from a known video extension and stores that true extension rather than changing it to `.mp4`. File validation and the 250 MB UI limit remain in place. Uploads are resumable.

**Important:** Accepting an upload does not magically give browser playback support. Many browsers cannot directly play AVI/MKV/WMV/MOV. The video player now offers an original-file link when playback fails. For reliable cross-browser playback and fast loading, convert property videos to H.264/AAC MP4 at 720p or 1080p. Automatic server transcoding requires additional infrastructure and is not part of this patch. Supabase plan-wide and bucket upload limits also apply.

No homepage writeups, images, colours, property texts, or page content were changed.
