import HomePageClient, { type HomePageLocaleData, type HomeSection } from '@/components/home/HomePageClient';
import type { NewsItem } from '@/components/home/News';
import { getConfig } from '@/lib/config';
import { getContentSection } from '@/lib/content';
import { getRuntimeI18nConfig } from '@/lib/i18n/config';
import type { CardPageConfig } from '@/types/page';

type SectionConfig = Pick<HomeSection, 'id' | 'type' | 'title'> & {
  limit?: number;
};

interface AboutConfig {
  content?: string;
  profile?: { research_interests?: string[]; skills?: string[] };
  sections?: SectionConfig[];
}

function loadSections(about: AboutConfig | null, locale: string): HomeSection[] {
  return (about?.sections || []).map(({ id, type, title, limit }) => {
    switch (type) {
      case 'markdown':
        return { id, title, type, content: about?.content || '' };
      case 'cards': {
        const projects = getContentSection<CardPageConfig>('projects', locale);
        return { id, title, type, items: (projects?.items || []).slice(0, limit || 3) };
      }
      case 'list': {
        const news = getContentSection<{ news: NewsItem[] }>('news', locale);
        return { id, title, type, items: news?.news || [] };
      }
    }
  });
}

function loadHome(locale: string): HomePageLocaleData {
  const { author, social, features } = getConfig(locale);
  const about = getContentSection<AboutConfig>('about', locale);
  return {
    author,
    social,
    features,
    researchInterests: about?.profile?.research_interests,
    skills: about?.profile?.skills,
    sections: loadSections(about, locale),
  };
}

export default function Home() {
  const { enabled, locales, defaultLocale } = getRuntimeI18nConfig(getConfig().i18n);
  const dataByLocale = Object.fromEntries((enabled ? locales : [defaultLocale]).map(locale => [locale, loadHome(locale)]));
  return <HomePageClient dataByLocale={dataByLocale} defaultLocale={defaultLocale} />;
}
