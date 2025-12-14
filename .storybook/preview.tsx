// .storybook/preview.tsx
import React from 'react';
import type { Preview } from '@storybook/nextjs-vite';
import ReduxProvider from '@/providers/ReduxProvider';
import './fonts.css';
import '../styles/globals.css';
import RitoTheme from './RitoTheme';

const preview: Preview = {
  decorators: [
    (Story) => (
      <ReduxProvider>
        <Story />
      </ReduxProvider>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    // App Router projects should enable this so next/navigation is mocked correctly
    nextjs: {
      appDirectory: true,
    },
    // Make Docs use the same theme as the manager UI
    docs: {
      theme: RitoTheme,
    },
  },
  tags: ['autodocs'],
};

export default preview;
