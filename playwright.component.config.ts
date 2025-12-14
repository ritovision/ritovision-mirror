import * as dotenv from 'dotenv';
import { defineConfig, devices, type Project } from '@playwright/test';

dotenv.config({ quiet: true });
dotenv.config({ path: '.env.local', override: true, quiet: true });

const STORYBOOK_URL = process.env.STORYBOOK_URL?.trim() || 'http://localhost:6006';

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

/**
 * Playwright configuration for Storybook component tests
 * Uses Storybook dev server on port 6006 to test isolated components
 */
export default defineConfig({
    testDir: 'playwright/component-tests/tests',
    retries: 1,
    reporter: [['list'], ['html', { open: 'never', outputFolder: 'playwright-report/component' }]],
    use: {
        baseURL: STORYBOOK_URL,
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'on-first-retry',
    },
    webServer: {
        command: 'pnpm sb',
        port: 6006,
        reuseExistingServer: true,
        timeout: 120_000,
    },
    projects,
});
