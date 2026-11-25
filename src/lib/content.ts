import { readSiteContent } from './siteContent';
import fs from 'node:fs';
import path from 'node:path';
type TextSection = { content?: string };

function readMarkdownFile(filename: string, locale?: string): string | null {
  if (path.basename(filename) !== filename || !filename.endsWith('.md')) return null;
  const normalized = locale?.trim().replace('_', '-').toLowerCase();
  const directories = normalized && /^[a-z]{2}(?:-[a-z0-9]+)*$/.test(normalized)
    ? [`content_${normalized}`, 'content'] : ['content'];
  for (const directory of directories) {
    const file = path.join(process.cwd(), directory, filename);
    if (fs.existsSync(file)) return fs.readFileSync(file, 'utf8').replace(/^\uFEFF/, '');
  }
  return null;
}

export function getMarkdownContent(filename: string, locale?: string): string {
  const markdown = readMarkdownFile(filename, locale);
  if (markdown !== null) return markdown.replace(/^#\s+[^\r\n]+\r?\n*/, '');
  const data = readSiteContent(locale);
  const key = filename.replace(/\.md$/, '') === 'bio' ? 'about' : filename.replace(/\.md$/, '');
  const section = data[key] as TextSection | undefined;
  return section?.content || '';
}

export function getTomlContent<T>(filename: string, locale?: string): T | null {
  const data = readSiteContent(locale);
  const key = filename.replace(/\.toml$/, '');
  return (key === 'config' ? data : data[key]) as T ?? null;
}

export function getPageConfig<T = unknown>(pageName: string, locale?: string): T | null {
  const config = getTomlContent<T>(`${pageName}.toml`, locale);
  if (config && typeof config === 'object' && 'type' in config && config.type === 'text' && 'source' in config && typeof config.source === 'string') {
    const title = readMarkdownFile(config.source, locale)?.match(/^#\s+([^\r\n]+)/)?.[1];
    if (title) return { ...config, title };
  }
  return config;
}
