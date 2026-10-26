import { cp, mkdir, readFile, readdir, rm, stat, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const pages = new Map();
let anchors = 0;
for (const name of ['index.html', 'docs.html']) {
  const html = await readFile(join(root, name), 'utf8');
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  if (new Set(ids).size !== ids.length) throw new Error(`Duplicate HTML IDs in ${name}.`);
  pages.set(name, { html, ids });
  anchors += ids.length;
}
for (const [page, { html, ids }] of pages) {
  for (const [, target] of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
    if (/^[a-z][a-z\d+.-]*:/i.test(target) || target.startsWith('//')) continue;
    const url = new URL(target, `https://kimo.invalid/${page}`);
    const file = decodeURIComponent(url.pathname.slice(1)) || 'index.html';
    await stat(join(root, file));
    if (url.hash && pages.has(file) && !pages.get(file).ids.includes(decodeURIComponent(url.hash.slice(1)))) {
      throw new Error(`Missing anchor in ${page}: ${target}`);
    }
  }
  for (const [, target] of html.matchAll(/\b(?:data-copy|aria-controls)="([^"]+)"/g)) {
    if (!ids.includes(target)) throw new Error(`Missing control target in ${page}: ${target}`);
  }
  for (const [, name] of html.matchAll(/data-screen="([^"]+)"/g)) {
    for (const theme of ['', '-dark']) await stat(join(root, 'assets/screenshots', `${name}${theme}.png`));
  }
}
await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });
for (const entry of [...pages.keys(), 'css', 'js', 'assets', 'robots.txt', 'sitemap.xml']) {
  await cp(join(root, entry), join(dist, entry), { recursive: true });
}
await writeFile(join(dist, '.nojekyll'), '');
async function bytes(path) {
  const info = await stat(path);
  if (!info.isDirectory()) return info.size;
  return (await Promise.all((await readdir(path)).map(entry => bytes(join(path, entry))))).reduce((a, b) => a + b, 0);
}
console.log(`Built dist/ · ${pages.size} pages · ${anchors} anchors · all local references and control targets present · ${(await bytes(dist) / 1024 / 1024).toFixed(2)} MB`);
