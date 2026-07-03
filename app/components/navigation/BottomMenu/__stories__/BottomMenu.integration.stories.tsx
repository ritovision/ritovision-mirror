import type { Meta, StoryObj, StoryContext } from '@storybook/nextjs-vite';
import React, { useLayoutEffect } from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer, { RootState } from '@/store/rootReducer';
import BottomMenu from '../index';
import MainMenu from '../../mainMenu/MainMenu';

const baseState: Partial<RootState> = {
  menu: { isTopMenuVisible: true, isBottomMenuVisible: true },
  mobileModal: { isOpen: false },
  randomImage: { currentImage: '/images/home/hero/rito-picture1.png' },
};

const withRedux = (Story: React.ComponentType, context: StoryContext) => {
  const overrideState = (context.parameters?.reduxState ?? {}) as Partial<RootState>;

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

const IntegrationCanvas = () => {
  useLayoutEffect(() => {
    window.scrollTo(0, 150);
  }, []);

  return (
    <div
      style={{
        minHeight: '140vh',
        background: 'linear-gradient(180deg, #03182a 0%, #021018 60%, #010b12 100%)',
        color: 'white',
        boxSizing: 'border-box',
      }}
    >
      <h1 style={{ marginBottom: 12 }}>Bottom menu + Main menu integration</h1>
      <p style={{ marginBottom: 24, maxWidth: 540 }}>
        The bottom bar stays fixed at the bottom. Click the hamburger icon on the right to open the
        main menu overlay. The Redux store matches the production slices, but uses a mocked
        preloaded state.
      </p>
      <p style={{ marginBottom: 60, maxWidth: 640 }}>
        Scroll a bit if you want; the bottom bar remains visible. Tap the AI/TOC buttons to validate
        drawers, then hit the hamburger to launch the fullscreen menu.
      </p>

      <MainMenu />
      <BottomMenu />
    </div>
  );
};

const meta = {
  title: 'Navigation/BottomMenu/Integration',
  component: IntegrationCanvas,
  decorators: [withRedux],
  parameters: {
    layout: 'fullscreen',
    nextjs: { appDirectory: true },
    reduxState: baseState,
  },
} satisfies Meta<typeof IntegrationCanvas>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithMainMenuToggle: Story = {
  name: 'Bottom bar + Main menu overlay',
};
