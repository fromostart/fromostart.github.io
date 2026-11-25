'use client';

import type { CardItem, CardSection } from '@/types/page';
import { useMessages } from '@/lib/i18n/useMessages';

export function AwardsTable({ items }: { items: CardItem[] }) {
    const { tables } = useMessages();
    return (
        <div className="overflow-x-auto rounded-xl border border-neutral-200 dark:border-neutral-800">
            <table className="w-full text-left text-sm">
                <thead className="bg-neutral-50 dark:bg-neutral-800 text-neutral-500">
                    <tr>{[tables.year, tables.event, tables.result, tables.rank].map(label => <th key={label} className="px-5 py-4 font-medium whitespace-nowrap">{label}</th>)}</tr>
                </thead>
                <tbody>
                    {items.map((item, index) => (
                        <tr key={`${item.title}-${index}`} className="border-t border-neutral-200 dark:border-neutral-800">
                            <td className="px-5 py-5 text-neutral-500 whitespace-nowrap tabular-nums">{item.date}</td>
                            <td className="px-5 py-5 text-primary font-medium">{item.title}</td>
                            <td className="px-5 py-5 text-neutral-600 dark:text-neutral-500 whitespace-nowrap">{item.award}</td>
                            <td className="px-5 py-5 text-accent font-medium whitespace-nowrap tabular-nums">{item.rank}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export function ExperienceSections({ sections }: { sections: CardSection[] }) {
    return (
        <div className="space-y-10">
            {sections.map(section => (
                <section key={section.title}>
                    <h2 className="text-2xl font-serif font-bold text-primary mb-4">{section.title}</h2>
                    {section.layout === 'list' ? (
                        <ul className="divide-y divide-neutral-200 border-y border-neutral-200">
                            {section.items.map((item, index) => (
                                <li key={index} className="py-4 flex items-baseline justify-between gap-6">
                                    <div><p className="font-medium text-primary">{item.title}</p>{item.content && <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-500">{item.content}</p>}</div>
                                    {item.date && <time className="shrink-0 text-sm text-neutral-500 tabular-nums">{item.date}</time>}
                                </li>
                            ))}
                        </ul>
                    ) : section.columns ? (
                        <table className="w-full table-fixed text-left text-sm border-y border-neutral-200 dark:border-neutral-800">
                            <thead><tr>{section.columns.map(column => <th key={column} className="font-medium py-3 text-neutral-500">{column}</th>)}</tr></thead>
                            <tbody>{section.items.map((item, index) => <tr key={index} className="border-t border-neutral-200 dark:border-neutral-800"><td className="py-5 pr-5 h-16 text-primary">{item.title}{item.content && <p className="mt-1 text-xs text-neutral-500 leading-relaxed">{item.content}</p>}</td><td className="py-5 pr-5 text-neutral-600 dark:text-neutral-500">{item.organization || item.field}</td><td className="py-5 text-neutral-500 tabular-nums">{item.date}</td></tr>)}</tbody>
                        </table>
                    ) : (
                        <div className="space-y-4">{section.items.map((item, index) => (
                            <article key={index} className="flex items-center gap-6 p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm">
                                {item.image && <a href={item.image_source} target="_blank" rel="noopener noreferrer" className="shrink-0 rounded-lg overflow-hidden focus-visible:outline-2 focus-visible:outline-accent"><img src={item.image} alt={item.image_alt || item.title} width={112} height={75} className="w-28 h-auto" /></a>}
                                <div className="flex-1"><h3 className="text-lg font-semibold text-primary">{item.title}</h3>{item.byline && <p className="text-sm text-accent mt-2">{item.byline}</p>}{item.content && <p className="text-sm text-neutral-600 dark:text-neutral-500 mt-2">{item.content}</p>}</div>
                                <time className="text-sm text-neutral-500 tabular-nums">{item.date}</time>
                            </article>
                        ))}</div>
                    )}
                </section>
            ))}
        </div>
    );
}
