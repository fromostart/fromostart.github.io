'use client';

import { useEffect } from 'react';
import TextPage from '@/components/pages/TextPage';
import CardPage from '@/components/pages/CardPage';
import MomentsPage from '@/components/pages/MomentsPage';
import {
  TextPageConfig,
  CardPageConfig,
  GalleryPageConfig,
  MomentPhoto,
} from '@/types/page';
import { useLocaleStore } from '@/lib/stores/localeStore';

export type DynamicPageLocaleData =
  | { type: 'text'; config: TextPageConfig; content: string }
  | { type: 'card'; config: CardPageConfig }
  | { type: 'gallery'; config: GalleryPageConfig; photos: MomentPhoto[] };

interface DynamicPageClientProps {
  dataByLocale: Record<string, DynamicPageLocaleData>;
  defaultLocale: string;
  siteTitle: string;
}

export default function DynamicPageClient({ dataByLocale, defaultLocale, siteTitle }: DynamicPageClientProps) {
  const locale = useLocaleStore((state) => state.locale);
  const fallback = dataByLocale[defaultLocale] || Object.values(dataByLocale)[0];
  const pageData = dataByLocale[locale] || fallback;
  useEffect(() => {
    if (pageData) document.title = `${pageData.config.title} | ${siteTitle}`;
  }, [pageData, siteTitle]);

  if (!pageData) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {pageData.type === 'text' && (
        <TextPage config={pageData.config} content={pageData.content} />
      )}
      {pageData.type === 'card' && (
        <CardPage config={pageData.config} />
      )}
      {pageData.type === 'gallery' && (
        <MomentsPage config={pageData.config} photos={pageData.photos} />
      )}
    </div>
  );
}
