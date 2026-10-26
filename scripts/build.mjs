import { cp, mkdir, readFile, readdir, rm, stat, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const html = await readFile(join(root, 'index.html'), 'utf8');
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
if (new Set(ids).size !== ids.length) throw new Error('Duplicate HTML IDs.');
for (const [, target] of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
  if (/^(?:https?:|data:)/.test(target)) continue;
  if (target.startsWith('#')) {
    if (!ids.includes(target.slice(1))) throw new Error(`Missing anchor: ${target}`);
  } else {
    await stat(join(root, target));
  }
}
for (const [, name] of html.matchAll(/data-screen="([^"]+)"/g)) {
  for (const theme of ['', '-dark']) await stat(join(root, 'assets/screenshots', `${name}${theme}.png`));
}
await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });
for (const entry of ['index.html', 'css', 'js', 'assets', 'robots.txt', 'sitemap.xml']) {
  await cp(join(root, entry), join(dist, entry), { recursive: true });
}
await writeFile(join(dist, '.nojekyll'), '');
async function bytes(path) {
  const info = await stat(path);
  if (!info.isDirectory()) return info.size;
  return (await Promise.all((await readdir(path)).map(entry => bytes(join(path, entry))))).reduce((a, b) => a + b, 0);
}
console.log(`Built dist/ · ${ids.length} unique anchors · all local references present · ${(await bytes(dist) / 1024 / 1024).toFixed(2)} MB`);
