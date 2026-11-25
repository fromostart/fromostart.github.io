import HomePageClient, { type HomePageLocaleData, type HomeSection } from '@/components/home/HomePageClient';
import type { NewsItem } from '@/components/home/News';
import { getConfig } from '@/lib/config';
import { getMarkdownContent, getTomlContent } from '@/lib/content';
import { getRuntimeI18nConfig } from '@/lib/i18n/config';
import type { CardPageConfig } from '@/types/page';

type SectionConfig = Pick<HomeSection, 'id' | 'type' | 'title'> & {
  source?: string;
  limit?: number;
};

interface AboutConfig {
  profile?: { research_interests?: string[]; skills?: string[] };
  sections?: SectionConfig[];
}

function loadSections(sections: SectionConfig[], locale: string): HomeSection[] {
  return sections.map(({ id, type, title, source, limit }) => {
    switch (type) {
      case 'markdown':
        return { id, title, type, content: source ? getMarkdownContent(source, locale) : '' };
      case 'cards': {
        const projects = source ? getTomlContent<CardPageConfig>(source, locale) : null;
        return { id, title, type, items: (projects?.items || []).slice(0, limit || 3) };
      }
      case 'list': {
        const news = source ? getTomlContent<{ news: NewsItem[] }>(source, locale) : null;
        return { id, title, type, items: news?.news || [] };
      }
    }
  });
}

function loadHome(locale: string): HomePageLocaleData {
  const { author, social, features } = getConfig(locale);
  const about = getTomlContent<AboutConfig>('about.toml', locale);
  return {
    author,
    social,
    features,
    researchInterests: about?.profile?.research_interests,
    skills: about?.profile?.skills,
    sections: loadSections(about?.sections || [], locale),
  };
}

export default function Home() {
  const { enabled, locales, defaultLocale } = getRuntimeI18nConfig(getConfig().i18n);
  const dataByLocale = Object.fromEntries((enabled ? locales : [defaultLocale]).map(locale => [locale, loadHome(locale)]));
  return <HomePageClient dataByLocale={dataByLocale} defaultLocale={defaultLocale} />;
}
