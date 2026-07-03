import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import BottomMenu from './index';
import { renderWithStore } from '@/tests/utils/renderWithStore';
import { enableRealDispatch, setMockPathname } from '@/tests/setup';
import type { RootState } from '@/store/rootReducer';

describe('BottomMenu integration', () => {
  beforeEach(() => {
    enableRealDispatch();
    Object.defineProperty(window, 'scrollY', { value: 200, writable: true });
    setMockPathname('/docs');
  });

  const baseState = {
    menu: { isTopMenuVisible: true, isBottomMenuVisible: true },
    bottomMenu: { currentPage: '/', activeSection: null, globalOverrides: [], activeDrawer: null },
    toc: {
      hasToc: true,
      links: [{ href: '#a', text: 'Section A', level: 'h2' }],
    },
    aiPrompts: {
      prompts: [{ id: 'p1', name: 'Prompt', text: 'Prompt text' }],
      activePromptId: 'p1',
    },
  } as Partial<RootState>;

  it('toggles TOC drawer and closes on route change', async () => {
    const { store, rerender } = renderWithStore(<BottomMenu />, { preloadedState: baseState });

    const tocButton = await screen.findByRole('button', { name: /open table of contents/i }, { timeout: 2000 });
    fireEvent.click(tocButton);

    expect(await screen.findByRole('region', { name: /table of contents/i })).toBeInTheDocument();
    expect(store.getState().bottomMenu.activeDrawer).toBe('toc');

    setMockPathname('/new-route');
    rerender(<BottomMenu />);
    expect(store.getState().bottomMenu.activeDrawer).toBeNull();
  });

  it('opens AI drawer and closes on outside click', async () => {
    const { store } = renderWithStore(<BottomMenu />, { preloadedState: baseState });

    const aiButton = await screen.findByRole('button', { name: /open ai assistant/i }, { timeout: 2000 });
    fireEvent.click(aiButton);
    expect(await screen.findByRole('region', { name: /ai assistant/i })).toBeInTheDocument();
    expect(store.getState().bottomMenu.activeDrawer).toBe('ai');

    fireEvent.mouseDown(document.body);
    expect(store.getState().bottomMenu.activeDrawer).toBeNull();
  });
});
