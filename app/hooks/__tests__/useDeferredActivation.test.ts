import React from 'react';
import { renderHook, waitFor, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { useDeferredActivation } from '../useDeferredActivation';
import rootReducer from '@/store/rootReducer';
import { setMenuTransition } from '@/store/slices/navigation/menuTransitionSlice';
import { PropsWithChildren } from 'react';

// Mock console.log to prevent test output pollution
vi.spyOn(console, 'log').mockImplementation(() => { });

// Helper functions defined outside describe block
const createMockStore = (isTransitioning: boolean) => {
    return configureStore({
        reducer: rootReducer,
        preloadedState: {
            menuTransition: { isTransitioning },
        } as ReturnType<typeof rootReducer>,
    });
};

const createWrapper = (store: ReturnType<typeof createMockStore>) => {
    return function Wrapper({ children }: PropsWithChildren) {
        return React.createElement(Provider, { store } as unknown as React.ComponentProps<typeof Provider>, children);
    };
};

describe('useDeferredActivation', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('initial state - no transition', () => {
        it('returns true immediately when shouldActivate is true and no transition is happening', () => {
            const store = createMockStore(false);
            const { result } = renderHook(() => useDeferredActivation(true), {
                wrapper: createWrapper(store),
            });

            expect(result.current).toBe(true);
        });

        it('returns false when shouldActivate is false and no transition is happening', () => {
            const store = createMockStore(false);
            const { result } = renderHook(() => useDeferredActivation(false), {
                wrapper: createWrapper(store),
            });

            expect(result.current).toBe(false);
        });
    });

    describe('transition handling', () => {
        it('returns false when menu is currently transitioning', () => {
            const store = createMockStore(true);
            const { result } = renderHook(() => useDeferredActivation(true), {
                wrapper: createWrapper(store),
            });

            expect(result.current).toBe(false);
        });

        it('returns true after transition completes', async () => {
            const store = createMockStore(true);
            const { result, rerender } = renderHook(() => useDeferredActivation(true), {
                wrapper: createWrapper(store),
            });

            expect(result.current).toBe(false);

            // Use act to ensure state updates are processed
            await act(async () => {
                store.dispatch(setMenuTransition(false));
            });

            // Manually trigger a rerender to process the store update
            rerender();

            // Wait for the hook to process the state change
            await waitFor(() => {
                expect(result.current).toBe(true);
            }, { timeout: 2000 });
        });
    });
});
