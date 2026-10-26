# kimo website

This is the independent GitHub Pages marketing site for `../kimo`.

- Read kimo’s `docs/product-direction.md` before changing product claims. The phone-to-host journey is the main story. Keep prerequisites and unfinished acceptance checks honest.
- Preserve the supplied jordivallverdu.com template’s Roboto Mono typography, fine rules, spacing and kimo design tokens. Use inline SVG line icons.
- Keep the site static and dependency-free. Run `npm run build` after edits. Browser-check affected layouts and interactions at phone and desktop sizes, in both themes. Honour reduced motion and keyboard access.
- Copy public assets using `scripts/sync-assets.mjs`; do not modify the other repository’s brand masters or add website code to the application.
- Update screenshot versions and documentation when replacing captures. Demo images do not prove provider, host-routing or real-phone acceptance.
- Deploy through `.github/workflows/pages.yml` on `main`. Update canonical, social and sitemap URLs together if hosting changes.
