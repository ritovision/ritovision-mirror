import { describe, it, expect, vi, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useDrawerTransition } from './useDrawerTransition';
import { DrawerType } from '@/store/slices/navigation/bottomMenuSlice';

const TOP_BAR_HEIGHT = 60;

describe('useDrawerTransition', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('opens a drawer with resize then fade-in', () => {
    const { result, rerender } = renderHook(
      ({ drawer }: { drawer: DrawerType }) => useDrawerTransition(drawer, TOP_BAR_HEIGHT),
      { initialProps: { drawer: null as DrawerType } }
    );

    rerender({ drawer: 'toc' });
    expect(result.current.containerHeight).toBe(TOP_BAR_HEIGHT + 220);
    expect(result.current.contentOpacity).toBe(0);

    act(() => {
      vi.advanceTimersByTime(300); // resize duration
    });
    expect(result.current.contentFadeDuration).toBe(750);

    act(() => {
      vi.advanceTimersByTime(750);
    });
    expect(result.current.contentOpacity).toBe(1);
  });

  it('closes a drawer by collapsing container', () => {
    const { result, rerender } = renderHook(
      ({ drawer }: { drawer: DrawerType }) => useDrawerTransition(drawer, TOP_BAR_HEIGHT),
      { initialProps: { drawer: 'toc' as DrawerType } }
    );

    rerender({ drawer: null });
    expect(result.current.contentOpacity).toBe(0);

    act(() => {
      vi.runAllTimers();
    });
    expect(result.current.containerHeight).toBe(TOP_BAR_HEIGHT);
    expect(result.current.currentDrawer).toBeNull();
  });

  it('switches between drawers and updates height', () => {
    const { result, rerender } = renderHook(
      ({ drawer }: { drawer: DrawerType }) => useDrawerTransition(drawer, TOP_BAR_HEIGHT),
      { initialProps: { drawer: 'ai' as DrawerType } }
    );

    rerender({ drawer: 'toc' });
    act(() => {
      vi.advanceTimersByTime(300); // resize completes
      vi.advanceTimersByTime(750); // fade-in completes
    });

    expect(result.current.containerHeight).toBe(TOP_BAR_HEIGHT + 220);
    expect(result.current.currentDrawer).toBe('toc');
    expect(result.current.contentOpacity).toBe(1);
  });
});
