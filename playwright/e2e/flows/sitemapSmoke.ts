import { expect, type Page, type TestInfo } from '@playwright/test';
import { getSitemapUrls, urlsToRoutePaths, type SitemapFilter } from '../helpers/sitemap';
import { visitPath } from '../helpers/nav';
import type { ConsoleCaptureOpts } from '../helpers/console';

export type SitemapSmokeOptions = {
  sitemapPath?: string;
  waitUntil?: 'load' | 'domcontentloaded' | 'networkidle';
  screenshot?: boolean;
  console?: ConsoleCaptureOpts;
  filter?: SitemapFilter;
  onVisit?: (page: Page, path: string) => Promise<void> | void;
};

export async function runSitemapSmokeFlow(page: Page, testInfo: TestInfo, opts: SitemapSmokeOptions = {}) {
  const baseURL = testInfo.project.use?.baseURL as string | undefined;
  if (!baseURL) throw new Error('baseURL is required (configure it in playwright.config.ts).');

  const urls = await getSitemapUrls(baseURL, opts.sitemapPath ?? '/sitemap.xml');
  const paths = urlsToRoutePaths(urls, baseURL, opts.filter);

  await testInfo.attach('sitemap-paths.json', {
    body: Buffer.from(JSON.stringify({ count: paths.length, paths }, null, 2)),
    contentType: 'application/json'
  });

  for (const p of paths) {
    await visitPath(page, p, testInfo, {
      waitUntil: opts.waitUntil ?? 'domcontentloaded',
      expectPathname: p,
      screenshotName: opts.screenshot ? `sitemap-${p === '/' ? 'root' : p.slice(1).replace(/\W+/g, '-')}` : undefined,
      screenshotOptions: opts.screenshot ? { animations: 'disabled' } : undefined,
      console: opts.console
    });
    if (opts.onVisit) await opts.onVisit(page, p);
  }

  expect(paths.length, 'No page paths discovered from sitemap').toBeGreaterThan(0);
  return paths;
}
