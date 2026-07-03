import type { Meta, StoryObj, StoryContext } from '@storybook/nextjs-vite';
import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import TopMenu from '../TopMenuServer';
import MainMenu from '../../mainMenu/MainMenu';
import rootReducer, { RootState } from '@/store/rootReducer';

type ReduxState = Partial<RootState>;

const baseState: ReduxState = {
  menu: { isTopMenuVisible: true, isBottomMenuVisible: false },
  mobileModal: { isOpen: false },
  randomImage: { currentImage: '/images/home/hero/rito-picture1.png' },
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

const IntegrationCanvas = () => (
  <div
    style={{
      minHeight: '160vh',
      background: 'linear-gradient(180deg, #03182a 0%, #021018 60%, #010b12 100%)',
      color: 'white',
    }}
  >
    <TopMenu />

    <div
      style={{
        padding: '104px 24px 200px',
        maxWidth: 1040,
        margin: '0 auto',
        display: 'grid',
        gap: 20,
      }}
    >
      <h1 style={{ marginBottom: 4 }}>Top menu + Main menu overlay</h1>
      <p style={{ margin: 0, lineHeight: 1.6 }}>
        Click the hamburger (mobile) or the desktop &ldquo;More...&rdquo; button to launch the fullscreen main
        menu. Use the viewport toolbar to swap between breakpoints; escape or the close button should dismiss the overlay.
      </p>

      <section
        style={{
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: 12,
          padding: '24px 20px',
        }}
      >
        <h2 style={{ marginTop: 0 }}>Interaction notes</h2>
        <ul style={{ marginTop: 8, marginBottom: 0, paddingLeft: 20, lineHeight: 1.5 }}>
          <li>The top bar stays fixed; scroll to confirm it stays pinned.</li>
          <li>Hamburger/More dispatches `toggleMobileMenu(true)` and should reveal the overlay.</li>
          <li>ESC, the close button, or the Menu button inside the overlay should close it.</li>
        </ul>
      </section>

      {[1, 2, 3].map((idx) => (
        <section
          key={idx}
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 12,
            padding: '26px 22px',
          }}
        >
          <h3 style={{ marginTop: 0 }}>Content block {idx}</h3>
          <p style={{ marginBottom: 0 }}>
            Dummy content to give the menu some scrollable context. Trigger the overlay and verify focus trapping and
            background scroll locking while it is open.
          </p>
        </section>
      ))}
    </div>

    <MainMenu />
  </div>
);

const meta = {
  title: 'Navigation/TopMenu/Integration',
  component: IntegrationCanvas,
  decorators: [withRedux],
  parameters: {
    layout: 'fullscreen',
    nextjs: { appDirectory: true },
    reduxState: baseState,
    viewport: {
      viewports: customViewports,
    },
  },
} satisfies Meta<typeof IntegrationCanvas>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithMainMenuOverlay: Story = {
  name: 'Top bar + Main menu overlay',
};
