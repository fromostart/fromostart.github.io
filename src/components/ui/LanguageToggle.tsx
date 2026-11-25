'use client';

import { motion } from 'framer-motion';
import { LanguageIcon } from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils';
import { useLocaleStore } from '@/lib/stores/localeStore';
import type { I18nRuntimeConfig } from '@/types/i18n';

interface LanguageToggleProps {
  i18n: I18nRuntimeConfig;
}

export default function LanguageToggle({ i18n }: LanguageToggleProps) {
  const { locale, setLocale, isReady } = useLocaleStore();

  if (!i18n.enabled || !i18n.switcher || i18n.locales.length <= 1) {
    return null;
  }

  const currentLocale = isReady && i18n.locales.includes(locale) ? locale : i18n.defaultLocale;
  const nextIndex = (i18n.locales.indexOf(currentLocale) + 1) % i18n.locales.length;
  const nextLocale = i18n.locales[nextIndex];
  const nextLabel = i18n.labels[nextLocale] || nextLocale;

  return (
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        type="button"
        disabled={!isReady}
        onClick={() => setLocale(nextLocale)}
        className={cn(
          'flex items-center justify-center gap-1 px-2 h-10 rounded-lg',
          'border border-neutral-200 bg-background hover:bg-neutral-50',
          'dark:border-[rgba(148,163,184,0.24)] dark:bg-neutral-800 dark:hover:bg-neutral-700',
          'transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50',
          'text-neutral-600 hover:text-primary dark:text-neutral-400 dark:hover:text-white'
        )}
        lang={nextLocale}
      >
        <LanguageIcon aria-hidden="true" className="h-4 w-4" />
        <span className="text-xs font-medium">{nextLabel}</span>
      </motion.button>
  );
}
