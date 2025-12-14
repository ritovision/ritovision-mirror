import type { Meta, StoryObj, StoryContext } from '@storybook/nextjs-vite';
import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import MainMenu from '../MainMenu';
import rootReducer, { RootState } from '@/store/rootReducer';

// Keep this list in sync with store/slices/navigation/ui/imageSlice.ts
const menuImages = [
  '/images/home/hero/rito-picture1.png',
  '/images/utilities/imageQuote/Impressions.jpg',
  '/images/utilities/imageQuote/MarketingUX.jpg',
  '/images/utilities/imageQuote/Product.jpg',
  '/images/utilities/imageQuote/Roadmap.jpg',
  '/images/pages/services/special.jpg',
  '/images/pages/services/CoreServices/mobile.jpg',
];

type ReduxState = Partial<RootState>;

const baseState: ReduxState = {
  mobileModal: { isOpen: true },
  randomImage: { currentImage: menuImages[0] },
};

const withRedux = (Story: React.ComponentType, context: StoryContext) => {
  const overrideState = (context.parameters?.reduxState ?? {}) as ReduxState;

  const store = configureStore({
    reducer: rootReducer,
    preloadedState: {
      ...baseState,
      ...overrideState,
    } as RootState,
  });

  return (
    <Provider store={store}>
      <Story />
    </Provider>
  );
};

const meta = {
  title: 'Navigation/MainMenu',
  component: MainMenu,
  decorators: [withRedux],
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
    reduxState: baseState,
  },
  tags: ['autodocs'],
} satisfies Meta<typeof MainMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const OpenWithHeroImage: Story = {
  name: 'Open (Hero image)',
};

export const OpenWithImpressionsBackdrop: Story = {
  parameters: {
    reduxState: {
      ...baseState,
      randomImage: { currentImage: menuImages[1] },
    } as ReduxState,
  },
};

export const OpenWithMarketingBackdrop: Story = {
  parameters: {
    reduxState: {
      ...baseState,
      randomImage: { currentImage: menuImages[2] },
    } as ReduxState,
  },
};

export const OpenWithProductBackdrop: Story = {
  parameters: {
    reduxState: {
      ...baseState,
      randomImage: { currentImage: menuImages[3] },
    } as ReduxState,
  },
};

export const OpenWithRoadmapBackdrop: Story = {
  parameters: {
    reduxState: {
      ...baseState,
      randomImage: { currentImage: menuImages[4] },
    } as ReduxState,
  },
};

export const OpenWithServicesBackdrop: Story = {
  parameters: {
    reduxState: {
      ...baseState,
      randomImage: { currentImage: menuImages[5] },
    } as ReduxState,
  },
};

export const OpenWithCoreServicesBackdrop: Story = {
  parameters: {
    reduxState: {
      ...baseState,
      randomImage: { currentImage: menuImages[6] },
    } as ReduxState,
  },
};
