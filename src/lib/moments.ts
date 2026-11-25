import fs from 'node:fs';
import path from 'node:path';
import type { MomentPhoto } from '@/types/page';

export function getMomentPhotos(): MomentPhoto[] {
  const manifest = path.join(process.cwd(), 'public', 'images', 'moments', 'index.json');
  if (!fs.existsSync(manifest)) return [];
  const photos: MomentPhoto[] = JSON.parse(fs.readFileSync(manifest, 'utf8'));
  return photos.filter(photo => /^\/images\/moments\/[a-f0-9]{16}\.webp$/.test(photo.src) && photo.width > 0 && photo.height > 0);
}
