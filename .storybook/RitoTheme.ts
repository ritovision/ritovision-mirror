// .storybook/RitoTheme.ts
import { create } from 'storybook/theming';

const RitoTheme = create({
  base: 'dark',

  // Branding
  brandTitle: 'RitoVision Storybook',
  brandUrl: 'https://ritovision.com',
  brandTarget: '_self',

  // Hook into your token
  colorPrimary: '#012035',
  colorSecondary: '#012035',

  // App chrome (sidebar / top bar / background)
  appBg: '#012035',
  appContentBg: '#020617',
  appBorderColor: '#020617',
  appBorderRadius: 12,

  // Typography
  fontBase: 'var(--font-body, system-ui, sans-serif)',
  fontCode: 'Menlo, Monaco, "SF Mono", monospace',

  // Toolbar
  barBg: '#020617',
  barTextColor: '#e5e7eb',
  barSelectedColor: '#012035',
  barHoverColor: '#38bdf8',

  // Forms
  inputBg: '#020617',
  inputBorder: '#334155',
  inputTextColor: '#e5e7eb',
  inputBorderRadius: 8,
});

export default RitoTheme;
