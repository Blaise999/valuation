# IDOKO C IDOKO — WHITE & BLUE CINEMATIC REBRAND (V3)

## What's included

A complete Next.js source project, based on the previous secure V2 source and retaining the firm's existing services, admin area, property listings, Supabase backend and payment/request workflows. The homepage has been redesigned as a white-and-blue architectural editorial experience, including a cinematic video hero and new services, property discovery, practice approach, company perspective and conversion sections.

**The two videos provided by the client have assigned roles:**

| Usage | Original provided | Delivered optimized media | Resolution | Frame rate | Size |
| --- | --- | --- | --- | --- | --- |
| Desktop hero | `1109.mp4` | `/public/media/idoko-hero-desktop.mp4` | 1600×900 | 30 fps | ~4.2 MiB |
| Mobile hero | `1109 2026-11-09-12-02-36.mp4` | `/public/media/idoko-hero-mobile.mp4` | 720×1280 | 30 fps | ~2.9 MiB |

The original inputs were approximately 39 MiB and 36 MiB respectively. Original 4K files are **not** included in the deployment ZIP; they are in the user's uploaded media. The original audio is removed from the website versions. H.264 MP4 with `+faststart` supports broad browsers and quick initial playback. Both images (`.webp`) are captured from the supplied footage and serve as fast-loading hero posters.

## Speed / playback behavior

- **One video element:** desktop and mobile are selected client-side by viewport, so the browser does not fetch both video sizes.
- **Fast paint first:** responsive local WebP hero poster displays before JavaScript hydration. A video source is assigned after a short delay so it doesn't compete with critical paint.
- **No autoplay on unsuitable connections:** Save Data, reduced-motion and very slow mobile network detection preserve the poster without downloading the video.
- **No stuttering loop reset:** the 14.6-second drone film plays once and holds its closing frame. The viewer may replay with the small control. This prevents a hard scene jump from the last frame to the first, which otherwise looks like a video glitch. A visitor can pause the motion at any point.
- **No simultaneous audio or 4K decode:** muted, audio-free 30fps desktop 1600×900, mobile 720×1280.
- **Deferred assistant UI:** the WhatsApp and Ask-the-Firm widgets now load their larger chat/animation modules only when clicked. First click opens the chosen widget.
- **Reduced design weight:** homepage services and most other visual sections use CSS and SVG icons, rather than downloading multiple extra hero images or motion frameworks; one below-fold property image remains lazily loaded.
- Videos and posters get CDN caching via `next.config.js`.

## How to deploy

1. Back up the current deployment. Extract this ZIP into your local VS Code folder, then bring over your existing environment variables from your own secure source or Vercel. **Do not commit your `.env` file.**
2. Run `npm ci`, `npm run typecheck`, then `npm run build` with a supported Node 20/22 environment. Deploy using your existing Vercel project and its existing environment variables. The new home video files do **not** require Supabase configuration.
3. If you have not yet installed the existing property-video database migration from V2, run `supabase/2026-11-08_property_video.sql` in Supabase SQL Editor. If it was already run, don't create a duplicate migration.
4. Test the home page on a wide screen and an actual phone. Check that the requested desktop/mobile clips are selected, click pause/replay, test mobile data saver, and ensure menu links and `/admin` sign-in work. Validate a property video upload/edit and public video watch, if the property-video feature is in use.
5. Run a Lighthouse mobile audit and Web Vitals in production. **No production Lighthouse score is claimed by this handoff.**

## Editing the videos later

- Replace `public/media/idoko-hero-desktop.mp4`, `public/media/idoko-hero-mobile.mp4` and their corresponding `.webp` posters. Keep the same paths or update `components/CinematicBackdrop.tsx` if filenames change.
- Re-encode future desktop versions at 1600×900 / 30fps and mobile at 720×1280 / 30fps, H.264 MP4, `-movflags +faststart`, without audio. Target 3–5 MB desktop and 2–3 MB mobile, considering image quality.
- The hero media files are developer-controlled site assets. Admin-uploaded property walkthroughs remain a separate feature under Admin → Properties; they are not repurposed as the homepage video.

## Verification & security

- All TypeScript/TSX application files were parsed with the TypeScript compiler's source transpilation without syntax errors.
- Both compressed videos were probed and decoded successfully and retain 30fps playback.
- A **full dependency installation, Next production build and browser end-to-end test could not be completed** in this container; `npm ci` failed due to incomplete package access. Validate locally or on Vercel before release. TypeScript parsing alone does not prove that the production build passes.
- The earlier source ZIP contained obfuscated startup/task code; the V2 base package used here does not include it. The original `.env` and credentials were not put into this ZIP. If you ever executed those earlier suspicious tasks, rotate credentials as advised in the previous handoff.
