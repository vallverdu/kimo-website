# kimo website

The independent, one-page website for [kimo](https://github.com/vallverdu/kimo), a mobile-first agent development environment in Rust.

**Website:** https://vallverdu.github.io/kimo-website/

This repository stays separate from the application. It has no runtime dependencies, build framework, analytics or external font requests. GitHub Pages serves static HTML, CSS, JavaScript and public assets.

## Local preview

Requires Node.js 20+ and Python 3.

```sh
npm run build
npm run serve
```

Open http://127.0.0.1:17892/. Rebuild after changes; the server reads `dist/`.

The build checks JavaScript syntax, duplicate IDs, internal anchors, local asset references and the light/dark screenshot pairs. Only `index.html`, `css/`, `js/`, `assets/`, `robots.txt` and `sitemap.xml` are published.

## Publishing

Push to `main`. `.github/workflows/pages.yml` builds and deploys `dist/` to GitHub Pages. In repository Settings → Pages, the source is **GitHub Actions**. There are no deployment secrets to maintain.

All local URLs are relative so the site works under `/kimo-website/`. If the repository name or domain changes, also update the canonical URL, Open Graph URLs, `robots.txt` and `sitemap.xml`.

## Design and content

- Adapted from the supplied `jordivallverdu.com/web` Sartre template: Roboto Mono, light typography, whitespace, fine rules and coral accent. `css/template.css` retains its Timber grid; the unminified source in `jordivallverdu.com/HTML/css/timber.css` identifies the framework as MIT. The app and mobile template sections informed the layout. Legacy jQuery, sliders and unused template assets are omitted.
- `css/tokens.css` is copied from kimo. Site-specific sizes, theme values and layouts live in `css/skin.css`.
- Copy follows kimo’s `docs/product-direction.md`, README and TODO. Describe remaining setup and acceptance work honestly. Do not add performance numbers, provider guarantees, testimonials or full mobile acceptance claims without evidence.
- The four gallery views, install selector, keyboard navigation, clipboard controls and stored light/dark preference use plain JavaScript. Main content, links and the default installation command remain usable without JavaScript.

## Public assets

The logo belongs to kimo. Static logo variants, the 4.2-second hair-to-bun splash and the 4.8-second eye loop are copied from `kimo/assets/brand/`. The animations remain self-contained, honour reduced motion and follow the embedding theme. No brand source is edited by this site.

Screenshots come from `kimo/docs/screenshots/`: v0.1.8, captured 2026-10-26 using demonstration data and browser phone emulation. Captions retain that version independently of the latest release link. The images demonstrate the UI; they do not establish real-device, real-provider, peer-routing or performance acceptance. See the application’s screenshot README for capture conditions.

To refresh assets after the logo agent or application changes:

```sh
node scripts/sync-assets.mjs ../kimo
npm run build
```

Review both themes, screenshot versions/captions and the social image after syncing. Roboto Mono is self-hosted in `assets/fonts/` with its SIL Open Font License. `assets/social.png` is the 1200 × 630 share image; its browser-rendered source is `scripts/social.html`.

## Verification

2026-10-26: checked in headless Google Chrome on macOS at 320, 375, 390, 430, 560, 768, 800, 1024 and 1440 CSS-pixel widths. Checked light/dark layouts, persistent theme choice, system theme, reduced motion, navigation and Escape, all gallery panels, keyboard tabs, both installation commands, actual clipboard copying and content with JavaScript disabled. No horizontal page overflow, missing assets or JavaScript errors were observed. Screenshots were visually inspected at phone and desktop sizes.

These are browser checks of the marketing website. Safari and real phones were not tested; no application API, SDK or host-routing code changed.

## License

Website code and the retained Timber grid: MIT, see `LICENSE`. kimo artwork and screenshots retain the application’s MIT OR Apache-2.0 license. Roboto Mono uses the license in `assets/fonts/OFL.txt`.
