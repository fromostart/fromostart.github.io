'use client';

import { motion } from 'framer-motion';
import type { GalleryPageConfig, MomentPhoto } from '@/types/page';
import { useMessages } from '@/lib/i18n/useMessages';

export default function MomentsPage({ config, photos }: { config: GalleryPageConfig; photos: MomentPhoto[] }) {
  const messages = useMessages();
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
      <h1 className="text-4xl font-serif font-bold text-primary mb-10">{config.title}</h1>
      {photos.length ? (
        <div className="columns-2 lg:columns-3 gap-6">
          {photos.map((photo, index) => (
            <figure key={photo.src} className="break-inside-avoid mb-6">
              <img src={photo.src} width={photo.width} height={photo.height} alt={photo.caption || config.title} loading={index < 3 ? 'eager' : 'lazy'} decoding="async" className="block w-full h-auto rounded-xl" />
              {photo.caption && <figcaption className="mt-3 text-sm text-neutral-500">{photo.caption}</figcaption>}
            </figure>
          ))}
        </div>
      ) : (
        <div className="border-y border-neutral-200 py-24 text-center">
          <p className="text-neutral-500">{config.empty_message || messages.moments.empty}</p>
        </div>
      )}
    </motion.div>
  );
}
