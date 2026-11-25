'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useMessages } from '@/lib/i18n/useMessages';
import type { CardItem } from '@/types/page';

export default function SelectedProjects({ items, title }: { items: CardItem[]; title?: string }) {
  const messages = useMessages();
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-serif font-bold text-primary">{title || messages.home.selectedProjects}</h2>
        <Link
          href="/projects/"
          prefetch={true}
          className="text-accent hover:text-accent-dark text-sm font-medium transition-all duration-200 rounded hover:bg-accent/10 hover:shadow-sm"
        >
          {messages.home.viewAll}
        </Link>
      </div>
      <div className="space-y-4">
        {items.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 * index }}
            className="bg-neutral-50 dark:bg-neutral-800 p-4 rounded-lg shadow-sm border border-neutral-200 dark:border-[rgba(148,163,184,0.24)] hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
          >
            <h3 className="font-semibold text-primary mb-2 leading-tight">{item.title}</h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-500 mb-1">
              <span className="font-semibold text-accent">{item.byline || item.date}</span>
            </p>
            <p className="text-sm text-neutral-600 dark:text-neutral-500 mb-2">{item.tags?.join(' / ')}</p>
            {item.content && <p className="text-sm text-neutral-500 dark:text-neutral-500 line-clamp-2">{item.content}</p>}
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
