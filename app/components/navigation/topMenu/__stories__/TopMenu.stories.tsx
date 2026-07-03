import type { Meta, StoryObj, StoryContext } from '@storybook/nextjs-vite';
import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import TopMenu from '../TopMenuServer';
import rootReducer, { RootState } from '@/store/rootReducer';

type ReduxState = Partial<RootState>;

const baseState: ReduxState = {
  menu: { isTopMenuVisible: true, isBottomMenuVisible: false },
  mobileModal: { isOpen: false },
};

const customViewports = {
  mobile: {
    name: 'Mobile (375px)',
    styles: { width: '375px', height: '812px' },
    type: 'mobile',
  },
  desktop: {
    name: 'Desktop (1280px)',
    styles: { width: '1280px', height: '900px' },
    type: 'desktop',
  },
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

const TopMenuCanvas = () => (
  <div
    style={{
      minHeight: '140vh',
      background: 'linear-gradient(180deg, #03182a 0%, #021018 60%, #010b12 100%)',
      color: 'white',
    }}
  >
    <TopMenu />

    <div
      style={{
        padding: '104px 24px 160px',
        maxWidth: 1040,
        margin: '0 auto',
        display: 'grid',
        gap: 24,
      }}
    >
      <h1 style={{ marginBottom: 0 }}>Top navigation bar</h1>
      <p style={{ margin: 0, lineHeight: 1.6 }}>
        Use the viewport toolbar to flip between mobile (under 800px) and desktop (800px+) breakpoints.
        The bar is fixed to the top; scroll to confirm it stays pinned.
      </p>

      {[1, 2, 3].map((idx) => (
        <section
          key={idx}
          style={{
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: 12,
            padding: '28px 24px',
            backdropFilter: 'blur(4px)',
          }}
        >
          <h2 style={{ marginTop: 0 }}>Section {idx}</h2>
          <p style={{ marginBottom: 0 }}>
            Placeholder copy to give the menu some scrollable context. Adjust the viewport width to see the
            menu swap between the mobile wordmark + hamburger and the desktop button row.
          </p>
        </section>
      ))}
    </div>
  </div>
);

const meta = {
  title: 'Navigation/TopMenu',
  component: TopMenuCanvas,
  decorators: [withRedux],
  parameters: {
    layout: 'fullscreen',
    nextjs: { appDirectory: true },
    reduxState: baseState,
    viewport: {
      viewports: customViewports,
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TopMenuCanvas>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TopMenuDefault: Story = {
  name: 'Top menu',
};

export const Hidden: Story = {
  name: 'Hidden (slides up)',
  parameters: {
    reduxState: {
      ...baseState,
      menu: { isTopMenuVisible: false, isBottomMenuVisible: false },
    } as ReduxState,
  },
};
