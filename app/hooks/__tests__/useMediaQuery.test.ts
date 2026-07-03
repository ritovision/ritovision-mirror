import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import useMediaQuery from '../useMediaQuery';

describe('useMediaQuery', () => {
    let mockMatchMedia: ReturnType<typeof vi.fn>;

    beforeEach(() => {
        mockMatchMedia = vi.fn((query: string) => {
            const mediaQueryList = {
                matches: false,
                media: query,
                onchange: null,
                addEventListener: vi.fn(),
                removeEventListener: vi.fn(),
                dispatchEvent: vi.fn(),
            };
            return mediaQueryList as unknown as MediaQueryList;
        });

        Object.defineProperty(window, 'matchMedia', {
            writable: true,
            configurable: true,
            value: mockMatchMedia,
        });
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    describe('initialization', () => {
        it('returns false initially when media query does not match', () => {
            const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'));
            expect(result.current).toBe(false);
        });

        it('returns true initially when media query matches', () => {
            mockMatchMedia.mockReturnValue({
                matches: true,
                media: '(min-width: 768px)',
                addEventListener: vi.fn(),
                removeEventListener: vi.fn(),
            } as unknown as MediaQueryList);

            const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'));
            expect(result.current).toBe(true);
        });
    });

    describe('media query changes', () => {
        it('updates state when media query match changes', async () => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            let storedListener: any = null;

            const mediaQueryList = {
                matches: false,
                media: '(min-width: 768px)',
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                addEventListener: vi.fn((event: string, listener: any) => {
                    storedListener = listener;
                }),
                removeEventListener: vi.fn(),
            } as unknown as MediaQueryList;

            mockMatchMedia.mockReturnValue(mediaQueryList);

            const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'));

            expect(result.current).toBe(false);

            // Update the mock's matches property and trigger the listener
            Object.defineProperty(mediaQueryList, 'matches', { value: true, writable: true });

            if (storedListener) {
                storedListener({ matches: true, media: '(min-width: 768px)' } as MediaQueryListEvent);
            }

            await waitFor(() => {
                expect(result.current).toBe(true);
            });
        });
    });
});
