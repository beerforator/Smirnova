import { copyFile, mkdir } from 'node:fs/promises';

// Real entry files allow direct navigation on static hosts without SPA rewrites.
for (const route of ['editorial', 'architecture', 'dossier']) {
  const directory = new URL(`../dist/${route}/`, import.meta.url);
  await mkdir(directory, { recursive: true });
  await copyFile(new URL('../dist/index.html', import.meta.url), new URL('index.html', directory));
}
