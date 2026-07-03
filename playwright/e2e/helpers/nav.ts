import { expect } from '@playwright/test';
import type { Page, TestInfo } from '@playwright/test';
import { withConsoleCapture, type ConsoleCaptureOpts } from './console';

export type VisitOptions = {
  waitUntil?: 'load' | 'domcontentloaded' | 'networkidle';
  expectPathname?: string;
  screenshotName?: string;
  screenshotOptions?: Parameters<Page['screenshot']>[0];
  console?: ConsoleCaptureOpts;
};

function labelFromPath(path: string) {
  const cleaned = path === '/' ? 'root' : path.replace(/^\//, '');
  return cleaned.replace(/[^a-z0-9-_]+/gi, '-');
}

async function attachPageScreenshot(
  page: Page,
  testInfo: TestInfo,
  name: string,
  options?: Parameters<Page['screenshot']>[0]
) {
  const buffer = await page.screenshot({ fullPage: false, ...options });
  await testInfo.attach(name, { body: buffer, contentType: 'image/png' });
}

export async function visitPath(
  page: Page,
  path: string,
  testInfo?: TestInfo,
  opts: VisitOptions = {}
) {
  const waitUntil = opts.waitUntil ?? 'domcontentloaded';

  const { result: resp } = await withConsoleCapture(page, testInfo, async () => {
    const response = await page.goto(path, { waitUntil });
    await expect(page.locator('body')).toBeVisible();

    if (opts.expectPathname) {
      await expect.poll(() => new URL(page.url()).pathname).toBe(opts.expectPathname);
    }

    if (testInfo && opts.screenshotName) {
      const name = opts.screenshotName ?? `page-${labelFromPath(opts.expectPathname ?? path)}`;
      await attachPageScreenshot(page, testInfo, name, opts.screenshotOptions);
    }
    return response;
  }, opts.console);

  return resp;
}

export async function visitPathsAndAssertSamePathname(
  page: Page,
  paths: string[],
  testInfo: TestInfo,
  screenshotOptions?: Parameters<Page['screenshot']>[0],
  consoleOpts?: ConsoleCaptureOpts
) {
  for (const p of paths) {
    const resp = await visitPath(page, p, testInfo, {
      expectPathname: p,
      screenshotOptions,
      console: consoleOpts
    });
    if (resp) expect(resp.ok(), `GET ${p} -> ${resp.status()}`).toBe(true);
  }
}

export async function assertRedirectsTo(
  page: Page,
  fromPath: string,
  toPathname: string,
  testInfo?: TestInfo,
  screenshotOptions?: Parameters<Page['screenshot']>[0],
  consoleOpts?: ConsoleCaptureOpts
) {
  await visitPath(page, fromPath, testInfo, {
    expectPathname: toPathname,
    screenshotName: `redirected-to-${labelFromPath(toPathname)}-from-${labelFromPath(fromPath)}`,
    screenshotOptions,
    console: consoleOpts
  });
}
