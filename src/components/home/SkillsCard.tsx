'use client';

import { Braces, Code2, ChartNoAxesCombined, Sigma, Terminal, Smartphone, Languages, Mic, Monitor, type LucideIcon } from 'lucide-react';
import { useMessages } from '@/lib/i18n/useMessages';

const icons: Record<string, { icon: LucideIcon; color: string }> = {
  'c++': { icon: Code2, color: 'text-blue-600 dark:text-blue-400' },
  python: { icon: Braces, color: 'text-sky-600 dark:text-sky-400' },
  matlab: { icon: ChartNoAxesCombined, color: 'text-orange-600 dark:text-orange-400' },
  latex: { icon: Sigma, color: 'text-emerald-700 dark:text-emerald-400' },
  linux: { icon: Terminal, color: 'text-neutral-600' },
  android: { icon: Smartphone, color: 'text-green-600 dark:text-green-400' },
  'cet-6': { icon: Languages, color: 'text-blue-600 dark:text-blue-400' },
  '英语六级': { icon: Languages, color: 'text-blue-600 dark:text-blue-400' },
  'mandarin level 1-b': { icon: Mic, color: 'text-teal-600 dark:text-teal-400' },
  '普通话一级乙等': { icon: Mic, color: 'text-teal-600 dark:text-teal-400' },
  'virtual machines': { icon: Monitor, color: 'text-neutral-600' },
  '虚拟机': { icon: Monitor, color: 'text-neutral-600' },
};

export default function SkillsCard({ skills }: { skills: string[] }) {
  const messages = useMessages();
  if (!skills.length) return null;
  return (
    <section aria-label={messages.profile.skillsAndLanguages} className="bg-neutral-100 dark:bg-neutral-800 rounded-lg p-4 mb-6">
      <h3 className="font-semibold text-primary mb-3">{messages.profile.skillsAndLanguages}</h3>
      <ul className="flex flex-wrap gap-2">
        {skills.map(skill => {
          const entry = icons[skill.toLowerCase()] || { icon: Code2, color: 'text-accent' };
          const Icon = entry.icon;
          return (
            <li key={skill} className="inline-flex items-center gap-2 rounded-md border border-neutral-200 bg-background px-3 py-2 text-xs font-medium text-primary transition-colors hover:border-accent/50">
              <Icon aria-hidden="true" strokeWidth={1.7} className={`h-[18px] w-[18px] shrink-0 ${entry.color}`} />
              <span>{skill}</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
