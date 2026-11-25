'use client';

import About from '@/components/home/About';
import News, { type NewsItem } from '@/components/home/News';
import Profile from '@/components/home/Profile';
import SelectedProjects from '@/components/home/SelectedProjects';
import type { SiteConfig } from '@/lib/config';
import { useLocaleStore } from '@/lib/stores/localeStore';
import type { CardItem } from '@/types/page';

export type HomeSection = { id: string; title?: string } & (
  | { type: 'markdown'; content: string }
  | { type: 'list'; items: NewsItem[] }
  | { type: 'cards'; items: CardItem[] }
);

export interface HomePageLocaleData {
  author: SiteConfig['author'];
  social: SiteConfig['social'];
  features: SiteConfig['features'];
  researchInterests?: string[];
  skills?: string[];
  sections: HomeSection[];
}

interface HomePageClientProps {
  dataByLocale: Record<string, HomePageLocaleData>;
  defaultLocale: string;
}

export default function HomePageClient({ dataByLocale, defaultLocale }: HomePageClientProps) {
  const locale = useLocaleStore((state) => state.locale);
  const data = dataByLocale[locale] || dataByLocale[defaultLocale];
  if (!data) return null;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-background min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-1">
          <Profile
            author={data.author}
            social={data.social}
            features={data.features}
            researchInterests={data.researchInterests}
            skills={data.skills}
          />
        </div>

        <div className="lg:col-span-2 space-y-8">
          <section id="about" className="scroll-mt-24 space-y-8">
            {data.sections.map(section => {
              switch (section.type) {
                case 'cards':
                  return <SelectedProjects key={section.id} items={section.items} title={section.title} />;
                case 'markdown':
                  return <About key={section.id} content={section.content} title={section.title} />;
                case 'list':
                  return <News key={section.id} items={section.items} title={section.title} />;
              }
            })}
          </section>
        </div>
      </div>
    </div>
  );
}
