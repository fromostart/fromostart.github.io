import fs from 'node:fs';
import path from 'node:path';
import { parse } from 'smol-toml';

export function readSiteContent(locale?: string): Record<string, unknown> {
  const file = path.join(process.cwd(), 'content', '主页文字.toml');
  const base = parse(fs.readFileSync(file, 'utf8')) as Record<string, unknown>;
  if (!locale) return base;

  // Use the default content when no locale-specific file exists.
  const normalized = locale.trim().replace('_', '-').toLowerCase();
  if (!/^[a-z]{2}(?:-[a-z0-9]+)*$/.test(normalized)) return base;
  const localizedFile = path.join(process.cwd(), `content_${normalized}`, '主页文字.toml');
  if (!fs.existsSync(localizedFile)) return base;
  const localized = parse(fs.readFileSync(localizedFile, 'utf8')) as Record<string, unknown>;
  return {
    ...base,
    ...localized,
    site: { ...(base.site as object), ...(localized.site as object || {}) },
    author: { ...(base.author as object), ...(localized.author as object || {}) },
    social: { ...(base.social as object), ...(localized.social as object || {}) },
    // Runtime settings are shared across locales.
    features: base.features,
    i18n: base.i18n,
  };
}
