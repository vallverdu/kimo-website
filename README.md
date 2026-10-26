# kimo website

The independent website and extended documentation for [kimo](https://github.com/vallverdu/kimo), a mobile-first agent development environment in Rust.

**Website:** https://vallverdu.github.io/kimo-website/

**Documentation:** https://vallverdu.github.io/kimo-website/docs.html

This repository stays separate from the application. It has no runtime dependencies, build framework, analytics or external font requests. GitHub Pages serves static HTML, CSS, JavaScript and public assets.

## Local preview

Requires Node.js 20+ and Python 3.

```sh
npm run build
npm run serve
```

Open http://127.0.0.1:17892/. Rebuild after changes; the server reads `dist/`.

The build checks JavaScript syntax, duplicate IDs per page, links and anchors across both pages, copy/control targets, local asset references and the light/dark screenshot pairs. Only `index.html`, `docs.html`, `css/`, `js/`, `assets/`, `robots.txt` and `sitemap.xml` are published.

## Publishing

Push to `main`. `.github/workflows/pages.yml` builds and deploys `dist/` to GitHub Pages. In repository Settings → Pages, the source is **GitHub Actions**. There are no deployment secrets to maintain.

All local URLs are relative so the site works under `/kimo-website/`. If the repository name or domain changes, also update the canonical URL, Open Graph URLs, `robots.txt` and `sitemap.xml`.

## Design and content

- Adapted from the supplied `jordivallverdu.com/web` Sartre template: Roboto Mono, light typography, whitespace, fine rules and coral accent. `css/template.css` retains its Timber grid; the unminified source in `jordivallverdu.com/HTML/css/timber.css` identifies the framework as MIT. The app and mobile template sections informed the layout. Legacy jQuery, sliders and unused template assets are omitted.
- `css/tokens.css` is copied from kimo. Site-specific sizes, theme values and layouts live in `css/skin.css`.
- Copy follows kimo’s `docs/product-direction.md`, README and TODO. Describe remaining setup and acceptance work honestly. Do not add performance numbers, provider guarantees, testimonials or full mobile acceptance claims without evidence.
- The four gallery views, install selector, keyboard navigation, clipboard controls and stored light/dark preference use plain JavaScript. Main content, links and the default installation command remain usable without JavaScript.
- `docs.html` is the second page: 15 sections covering setup, the phone journey, projects/worktrees, sessions, peers, accounts, resources, settings, custom apps, grouped API routes, CLI commands, configuration/services, troubleshooting and current limitations. It has a sticky contents list, native mobile disclosures, current-section tracking and copyable examples. It shares the header/theme/clipboard code with the landing page, with its own `css/docs.css` and `js/docs.js`.

## Maintaining documentation

Review the application’s `README.md`, `docs/product-direction.md`, `TODO.md`, `docs/api.md`, `src/config.rs`, `src/core/access.rs`, `web/sdk/`, `install.sh` and `contrib/` when updating the guide. These files establish behavior, defaults, access boundaries and installation differences. Update the review date in `docs.html` after a source review; do not replace unperformed device/provider checks with claims of completion.

Examples on the documentation page are inert text. Copy buttons do not run installers, connect to hosts or launch agents. Developer examples use explicit host/key placeholders. Keep cross-page anchor destinations and the sitemap current when moving sections.

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

The extended documentation was also checked at ten widths (320, 375, 390, 430, 560, 768, 800, 801, 1024 and 1440). Verified all 15 section destinations, mobile contents and reading focus, current-section tracking, keyboard/Escape controls, copyable SDK text, API/FAQ disclosures, links between both pages, persistent theme, reduced motion and reading without JavaScript. The build validates links and anchors across both pages. Phone and desktop screenshots were visually inspected in light and dark.

These are browser checks of the website and documentation. Safari and real phones were not tested; no application API, SDK or host-routing code changed. Installers, provider authentication, commands and SDK examples were reviewed against source; they were not executed against real accounts or hosts as part of this website task.

## License

Website code and the retained Timber grid: MIT, see `LICENSE`. kimo artwork and screenshots retain the application’s MIT OR Apache-2.0 license. Roboto Mono uses the license in `assets/fonts/OFL.txt`.
