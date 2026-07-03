import { test, expect } from '@playwright/test';
import { runSitemapSmokeFlow } from '../flows/sitemapSmoke';
import { extractJsonLdScripts, assertBreadcrumbExists, assertSiteNavigationExists } from '../helpers/jsonld';

const bool = (name: string, def = false) => {
  const v = process.env[name];
  if (v === undefined) return def;
  return !/^(false|0|no|off)$/i.test(v);
};

test('JSON-LD renders and is valid on sitemap routes', async ({ page }, testInfo) => {
  test.setTimeout(60000);

  const requireBreadcrumb = bool('JSONLD_REQUIRE_BREADCRUMB', false);
  const requireSiteNav = bool('JSONLD_REQUIRE_SITE_NAV', false);

  await runSitemapSmokeFlow(page, testInfo, {
    sitemapPath: process.env.SITEMAP_PATH || '/sitemap.xml',
    console: { attachIfEmpty: false },
    onVisit: async (page, path) => {
      const scripts = await extractJsonLdScripts(page);

      if (requireBreadcrumb) await assertBreadcrumbExists(page, 1);
      if (requireSiteNav) await assertSiteNavigationExists(page);

      await testInfo.attach(`jsonld-${path === '/' ? 'root' : path.slice(1).replace(/\W+/g, '-')}.json`, {
        body: Buffer.from(JSON.stringify(scripts, null, 2), 'utf-8'),
        contentType: 'application/json'
      });

      if (!scripts.length && (requireBreadcrumb || requireSiteNav)) {
        expect(scripts.length, `No JSON-LD found on ${path} while JSONLD_REQUIRE_* is set`).toBeGreaterThan(0);
      }
    }
  });
});
