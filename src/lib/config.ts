import type { I18nConfig } from '@/types/i18n';
import { readSiteContent } from './siteContent';

export interface SiteConfig {
  site: {
    title: string;
    signature?: string;
    description: string;
    favicon: string;
    last_updated?: string;
  };
  author: {
    name: string;
    title: string;
    institution: string;
    avatar: string;
  };
  social: {
    email?: string;
    location?: string;
    location_url?: string;
    location_details?: string[];
    github?: string;
  };
  features: {
    enable_likes: boolean;
  };
  navigation: Array<{
    title: string;
    type: 'section' | 'page' | 'link';
    target: string;
    href: string;
  }>;
  i18n?: I18nConfig;
}

export function getConfig(locale?: string): SiteConfig {
  return readSiteContent(locale) as unknown as SiteConfig;
}
