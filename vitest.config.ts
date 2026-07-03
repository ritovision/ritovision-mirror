// vitest.config.ts
import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    tsconfigPaths(),
  ],
  esbuild: {
    jsxInject: `import React from 'react'`,
  },
  css: {
    modules: {
      // Keep CSS module class names predictable for assertions/snapshots
      generateScopedName: '[name]__[local]___[hash:base64:5]',
    },
  },
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: ['./tests/setup.ts'],
    reporters: process.env.VITEST_REPORTER
      ? process.env.VITEST_REPORTER.split(',')
          .map((r) => r.trim())
          .filter(Boolean)
      : ['verbose'],
    include: [
      '**/*.{test,spec}.{js,ts,jsx,tsx}',
    ],
    exclude: [
      'node_modules',
      'dist',
      '.next',
      'coverage',
      'playwright/**',
      'tests/playwright/**',
      'out',
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        // core junk
        'node_modules/**',
        'dist/**',
        '.next/**',
        'out/**',
        'coverage/**',

        // Storybook build + config
        'storybook-static/**',
        '.storybook/**',
        '**/__stories__/**',
        '**/*.stories.{js,ts,jsx,tsx}',

        // Playwright artefacts
        'playwright/**',
        'tests/playwright/**',
        'playwright-report/**',

        // test harness / helpers
        '**/__tests__/**',
        '**/__mocks__/**',
        'tests/**',
        '**/e2e/**',
        '**/*.e2e.*',

        // configs / types / scripts
        '*.config.{js,ts,mjs,mts,cjs}',
        'next.config.*',
        'vitest.config.*',
        '**/*.d.ts',
        '**/types/**',
        '**/scripts/**',

        // one-off junk you listed
        'ignore-test-folder.*',
        'instrumentation-client.*',
      ],
    },
  },
});
