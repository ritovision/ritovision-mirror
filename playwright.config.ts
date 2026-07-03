import * as dotenv from 'dotenv';
import { defineConfig, devices, type Project } from '@playwright/test';

/**
 * Playwright configuration for e2e tests
 * Tests the built Next.js application on port 3000
 * For component tests, see playwright.component.config.ts
 */
dotenv.config({ quiet: true });
dotenv.config({ path: '.env.local', override: true, quiet: true });

const BASE_URL = process.env.BASE_URL?.trim() || 'http://localhost:3000';

// boolean env helper
const envBool = (name: string, defaultValue = true): boolean => {
  const raw = process.env[name];
  if (raw === undefined) return defaultValue;
  return !/^(false|0|no|off)$/i.test(raw.trim());
};

const ENABLE_CHROME = envBool('ENABLE_CHROME', true);
const ENABLE_FIREFOX = envBool('ENABLE_FIREFOX', true);

const ENABLE_CHROME_DESKTOP = envBool('ENABLE_CHROME_DESKTOP', true);
const ENABLE_CHROME_MOBILE = envBool('ENABLE_CHROME_MOBILE', true);
const ENABLE_FIREFOX_DESKTOP = envBool('ENABLE_FIREFOX_DESKTOP', true);
const ENABLE_FIREFOX_MOBILE = envBool('ENABLE_FIREFOX_MOBILE', true);

const projects: Project[] = [
  ...(ENABLE_CHROME && ENABLE_CHROME_DESKTOP ? [{
    name: 'chrome-desktop',
    use: { ...devices['Desktop Chrome'], viewport: { width: 1280, height: 800 } },
  }] : []),
  ...(ENABLE_CHROME && ENABLE_CHROME_MOBILE ? [{
    name: 'chrome-mobile',
    use: { ...devices['Pixel 7'] },
  }] : []),

  ...(ENABLE_FIREFOX && ENABLE_FIREFOX_DESKTOP ? [{
    name: 'firefox-desktop',
    use: { ...devices['Desktop Firefox'], viewport: { width: 1280, height: 800 } },
  }] : []),
  ...(ENABLE_FIREFOX && ENABLE_FIREFOX_MOBILE ? [{
    name: 'firefox-mobile',
    use: { ...devices['Desktop Firefox'], viewport: { width: 412, height: 915 } },
  }] : []),
];

export default defineConfig({
  testDir: 'playwright/e2e/tests',
  retries: 1,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: BASE_URL,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },
  webServer: {
    command: 'cross-env NODE_ENV=test NEXT_TELEMETRY_DISABLED=1 pnpm build && pnpm start -p 3000',
    port: 3000,
    reuseExistingServer: true,
    timeout: 120_000,
  },
  projects,
});
