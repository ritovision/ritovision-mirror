import { expect } from '@playwright/test';
import type { Page } from '@playwright/test';

export interface BreadcrumbList {
  '@context': string;
  '@type': 'BreadcrumbList';
  itemListElement: Array<{
    '@type': 'ListItem';
    position: number;
    name: string;
    item: string;
  }>;
}

export interface SiteNavigationElement {
  '@type': 'SiteNavigationElement';
  position: number;
  name: string;
  description: string;
  url: string;
}

export interface SiteNavigationItemList {
  '@context': string;
  '@type': 'ItemList';
  itemListElement: SiteNavigationElement[];
}

export type JsonLdScript = BreadcrumbList | SiteNavigationItemList | SiteNavigationElement | Record<string, unknown>;

export async function extractJsonLdScripts(page: Page): Promise<JsonLdScript[]> {
  const scripts = await page.locator('script[type="application/ld+json"]').all();
  const jsonLdData: JsonLdScript[] = [];

  for (const script of scripts) {
    const content = await script.textContent();
    if (content) {
      try {
        jsonLdData.push(JSON.parse(content));
      } catch (error) {
        throw new Error(`Failed to parse JSON-LD script: ${error}`);
      }
    }
  }

  return jsonLdData;
}

export async function findJsonLdByType<T extends JsonLdScript>(
  page: Page,
  type: string
): Promise<T | null> {
  const scripts = await extractJsonLdScripts(page);
  return (scripts.find((script) => script['@type'] === type) as T) || null;
}

export async function assertBreadcrumbExists(
  page: Page,
  expectedMinItems = 1
): Promise<BreadcrumbList> {
  const breadcrumb = await findJsonLdByType<BreadcrumbList>(page, 'BreadcrumbList');

  expect(breadcrumb, 'BreadcrumbList JSON-LD should exist').not.toBeNull();
  expect(breadcrumb!['@context']).toBe('https://schema.org');
  expect(breadcrumb!['@type']).toBe('BreadcrumbList');
  expect(breadcrumb!.itemListElement).toBeDefined();
  expect(breadcrumb!.itemListElement.length).toBeGreaterThanOrEqual(expectedMinItems);

  breadcrumb!.itemListElement.forEach((item, idx) => {
    expect(item['@type'], `Breadcrumb item ${idx} should be ListItem`).toBe('ListItem');
    expect(item.position, `Breadcrumb item ${idx} should have position`).toBe(idx + 1);
    expect(item.name, `Breadcrumb item ${idx} should have name`).toBeTruthy();
    expect(item.item, `Breadcrumb item ${idx} should have item URL`).toBeTruthy();
  });

  return breadcrumb!;
}

export async function assertSiteNavigationExists(page: Page): Promise<SiteNavigationItemList> {
  const siteNavList = await findJsonLdByType<SiteNavigationItemList>(page, 'ItemList');

  expect(siteNavList, 'SiteNavigation ItemList JSON-LD should exist').not.toBeNull();
  expect(siteNavList!['@context']).toBe('https://schema.org');
  expect(siteNavList!['@type']).toBe('ItemList');
  expect(siteNavList!.itemListElement).toBeDefined();
  expect(siteNavList!.itemListElement.length).toBeGreaterThan(0);

  siteNavList!.itemListElement.forEach((item, idx) => {
    expect(item['@type'], `SiteNav item ${idx} should be SiteNavigationElement`).toBe('SiteNavigationElement');
    expect(item.position, `SiteNav item ${idx} should have position`).toBe(idx + 1);
    expect(item.name, `SiteNav item ${idx} should have name`).toBeTruthy();
    expect(item.description, `SiteNav item ${idx} should have description`).toBeTruthy();
    expect(item.url, `SiteNav item ${idx} should have url`).toBeTruthy();
  });

  return siteNavList!;
}
