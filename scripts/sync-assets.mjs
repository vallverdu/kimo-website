// Explicitly refresh public assets from a local kimo checkout. No source files are changed.
import { cp, mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const source = resolve(process.argv[2] || join(root, '../kimo'));
await readFile(join(source, 'docs/product-direction.md'), 'utf8');
for (const folder of ['assets/brand', 'assets/screenshots', 'js/map', 'js/vendor/three']) await mkdir(join(root, folder), { recursive: true });
for (const name of ['kimo-light.svg', 'kimo-dark.svg', 'kimo-splash.svg', 'kimo-eyes.svg']) {
  await cp(join(source, 'assets/brand', name), join(root, 'assets/brand', name));
}
const screens = ['phone-projects', 'phone-terminal', 'phone-accounts', 'phone-usage', 'phone-fleet', 'phone-map', 'phone-history', 'app-claude', 'app-changes'];
for (const name of screens) {
  for (const theme of ['', '-dark']) await cp(join(source, 'docs/screenshots', `${name}${theme}.png`), join(root, 'assets/screenshots', `${name}${theme}.png`));
}
await cp(join(source, 'web/css/tokens.css'), join(root, 'css/tokens.css'));

// The 3D map, unchanged, running on the demo kit's invented world (no kimo behind it).
for (const name of ['map.js', 'map-data.js', 'map-models.js', 'map-demo.js', 'ui.js']) {
  await cp(join(source, 'web/js', name), join(root, 'js/map', name));
}
await cp(join(source, 'scripts/demo/world.mjs'), join(root, 'js/map/world.js'));
for (const name of ['three.module.min.js', 'OrbitControls.js', 'CSS2DRenderer.js', 'LICENSE']) {
  await cp(join(source, 'web/vendor/three', name), join(root, 'js/vendor/three', name));
}
// The map's own styles: the block of kimo.css from its heading to the panel's last rule.
const css = await readFile(join(source, 'web/css/kimo.css'), 'utf8');
const start = css.indexOf('/* Map: the tailnet in 3D.');
const end = css.indexOf('\n', css.indexOf('.k-map-dl dd'));
if (start < 0 || end < 0) throw new Error('The map styles were not found in kimo.css.');
await writeFile(join(root, 'css/map.css'), `/* Copied from kimo's web/css/kimo.css by scripts/sync-assets.mjs; do not edit here. */\n${css.slice(start, end + 1)}`);

console.log('Updated brand, design tokens, screenshot pairs and the 3D map. Review capture versions, captions and social image before publishing.');
