// Optimize images in /public to modern formats using Sharp
// Usage:
//   1) npm i -D sharp
//   2) node scripts/optimize-images.mjs
//
// This will create .webp and .avif next to each .png/.jpg/.jpeg file.

import fs from 'fs';
import path from 'path';
import url from 'url';
import sharp from 'sharp';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const publicDir = path.resolve(__dirname, '../public');

const exts = new Set(['.png', '.jpg', '.jpeg']);

async function convertOne(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (!exts.has(ext)) return;

  const base = filePath.slice(0, -ext.length);
  const webpPath = `${base}.webp`;
  const avifPath = `${base}.avif`;

  const input = sharp(filePath, { failOn: 'none' });
  const { width } = await input.metadata();

  async function ensure(outputPath, pipeline) {
    if (fs.existsSync(outputPath)) return false;
    await pipeline.toFile(outputPath);
    return true;
  }

  const webpMade = await ensure(webpPath, input.clone().webp({ quality: 82, effort: 4 }));
  const avifMade = await ensure(avifPath, input.clone().avif({ quality: 60, effort: 4 }));

  return { filePath, width, webpMade, avifMade };
}

async function walk(dir) {
  const entries = await fs.promises.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) await walk(p);
    else await convertOne(p).catch(e => console.warn('Convert failed:', p, e.message));
  }
}

(async () => {
  console.log('🔧 Optimizing images in', publicDir);
  await walk(publicDir);
  console.log('✅ Done. Created WebP/AVIF where missing.');
})();
