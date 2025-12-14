import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useTocValidation } from './useTocValidation';
import { mockDispatch } from '@/tests/setup';

describe('useTocValidation', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    mockDispatch.mockClear();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('enables TOC after validation delay when links exist', () => {
    const { result, rerender } = renderHook(
      ({ hasToc, count, mounted }) => useTocValidation(hasToc, count, mounted),
      { initialProps: { hasToc: true, count: 2, mounted: true } }
    );

    expect(result.current.shouldShowToc).toBe(false);
    act(() => {
      vi.advanceTimersByTime(500);
    });
    rerender({ hasToc: true, count: 2, mounted: true });
    expect(result.current.shouldShowToc).toBe(true);
  });

  it('clears phantom TOC when there are no links', () => {
    renderHook(() => useTocValidation(true, 0, true));
    act(() => {
      vi.advanceTimersByTime(500);
    });
    expect(mockDispatch).toHaveBeenCalled();
  });
});
