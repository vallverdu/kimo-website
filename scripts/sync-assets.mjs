// Explicitly refresh public assets from a local kimo checkout. No source files are changed.
import { cp, mkdir, readFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const source = resolve(process.argv[2] || join(root, '../kimo'));
await readFile(join(source, 'docs/product-direction.md'), 'utf8');
for (const folder of ['brand', 'screenshots']) await mkdir(join(root, 'assets', folder), { recursive: true });
for (const name of ['kimo-light.svg', 'kimo-dark.svg', 'kimo-splash.svg', 'kimo-eyes.svg']) {
  await cp(join(source, 'assets/brand', name), join(root, 'assets/brand', name));
}
for (const name of ['phone-projects', 'phone-terminal', 'phone-accounts', 'phone-usage', 'app-claude']) {
  for (const theme of ['', '-dark']) await cp(join(source, 'docs/screenshots', `${name}${theme}.png`), join(root, 'assets/screenshots', `${name}${theme}.png`));
}
await cp(join(source, 'web/css/tokens.css'), join(root, 'css/tokens.css'));
console.log('Updated brand, design tokens and screenshot pairs. Review capture versions, captions and social image before publishing.');
