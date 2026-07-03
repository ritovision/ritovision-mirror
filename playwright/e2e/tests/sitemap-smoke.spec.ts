import { test } from '@playwright/test';
import { runSitemapSmokeFlow } from '../flows/sitemapSmoke';

function parseList(name: string): (string|RegExp)[] {
  const raw = process.env[name];
  if (!raw) return [];
  return raw.split(',')
    .map(s => s.trim())
    .filter(Boolean)
    .map(p => (p.startsWith('/') && p.endsWith('/')) ? new RegExp(p.slice(1, -1)) : p);
}

const bool = (name: string, def = true) => {
  const v = process.env[name];
  if (v === undefined) return def;
  return !/^(false|0|no|off)$/i.test(v);
};

test('every sitemap route renders (optional console checks)', async ({ page }, testInfo) => {
  await runSitemapSmokeFlow(page, testInfo, {
    sitemapPath: process.env.SITEMAP_PATH || '/sitemap.xml',
    waitUntil: (process.env.NAV_WAIT_UNTIL as any) || 'domcontentloaded',
    screenshot: bool('SMOKE_SCREENSHOTS', false),
    console: {
      ignore: parseList('CONSOLE_IGNORE'),
      attachIfEmpty: false
      // fail policy is env-driven in helpers/console.ts:
      // strict_mode_errors=1 strict_mode_warning=1
    },
    filter: {
      include: parseList('SITEMAP_INCLUDE'),
      exclude: parseList('SITEMAP_EXCLUDE'),
      includeRoot: bool('SITEMAP_INCLUDE_ROOT', true),
    },
  });
});
