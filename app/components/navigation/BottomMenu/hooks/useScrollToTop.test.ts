import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useScrollToTop } from './useScrollToTop';

describe('useScrollToTop', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('smooth scrolls to top and resets animation', () => {
    const scrollSpy = vi.spyOn(window, 'scrollTo');
    const { result } = renderHook(() => useScrollToTop());

    act(() => result.current.scrollToTop());
    expect(scrollSpy).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
    expect(result.current.isAnimating).toBe(true);

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(result.current.isAnimating).toBe(false);
  });
});
