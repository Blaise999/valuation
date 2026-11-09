# Content-Preserving Cinematic Upgrade

This version corrects V3. It restores the original website homepage copy, all original homepage service and property-type images, original property listings copy and layout, original footer copy, and original main menu labels. The first hero image collage is replaced by the two user-supplied optimized drone videos, which use static posters on slow connections.

Existing text, images, routes and admin data have not been intentionally rewritten. Video uploads remain in Admin → Properties, and property walkthroughs remain opt-in. Performance changes (deferred widgets, responsive hero video, lighter scroll effects) remain. The original uploaded project included potentially unsafe scripts and an .env; those are NOT restored.

Before deploying: Keep your existing .env.local on your own computer. Review `git status` and `git diff` before pushing; do not use a blanket `git add -A` without reviewing the files. The property video upload database SQL must be run only if you have not already applied it.

To apply the content-preserving version to a Git working tree, copy changed files into that tree without deleting `.git` or the existing `.env.local`. Build with `npm ci` and `npm run build`, then check the site visually.
