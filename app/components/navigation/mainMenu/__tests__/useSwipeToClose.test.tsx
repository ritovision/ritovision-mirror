import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, fireEvent } from '@testing-library/react';
import { useSwipeToClose } from '../useSwipeToClose';
import { toggleMobileMenu } from '@/store/slices/navigation/mobileModalSlice';

// Mock useDispatch
const mockDispatch = vi.fn();
vi.mock('react-redux', () => ({
    useDispatch: () => mockDispatch,
}));

describe('useSwipeToClose', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should not listen to events when isOpen is false', () => {
        const addEventListenerSpy = vi.spyOn(window, 'addEventListener');
        const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');

        const { unmount } = renderHook(() => useSwipeToClose(false));

        expect(addEventListenerSpy).not.toHaveBeenCalled();

        unmount();
        expect(removeEventListenerSpy).not.toHaveBeenCalled();
    });

    it('should listen to events when isOpen is true', () => {
        const addEventListenerSpy = vi.spyOn(window, 'addEventListener');
        const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');

        const { unmount } = renderHook(() => useSwipeToClose(true));

        expect(addEventListenerSpy).toHaveBeenCalledWith('touchstart', expect.any(Function));
        expect(addEventListenerSpy).toHaveBeenCalledWith('touchend', expect.any(Function));

        unmount();
        expect(removeEventListenerSpy).toHaveBeenCalledWith('touchstart', expect.any(Function));
        expect(removeEventListenerSpy).toHaveBeenCalledWith('touchend', expect.any(Function));
    });

    it('should dispatch toggleMobileMenu(false) on swipe down', () => {
        renderHook(() => useSwipeToClose(true));

        // Simulate Swipe Down
        // Start at (100, 100)
        fireEvent.touchStart(window, {
            touches: [{ clientX: 100, clientY: 100 }],
        });

        // End at (100, 200) -> DeltaY = 100 (> 50 threshold)
        fireEvent.touchEnd(window, {
            changedTouches: [{ clientX: 100, clientY: 200 }],
        });

        expect(mockDispatch).toHaveBeenCalledWith(toggleMobileMenu(false));
    });

    it('should dispatch toggleMobileMenu(false) on swipe left', () => {
        renderHook(() => useSwipeToClose(true));

        // Simulate Swipe Left
        // Start at (200, 100)
        fireEvent.touchStart(window, {
            touches: [{ clientX: 200, clientY: 100 }],
        });

        // End at (100, 100) -> DeltaX = -100 (< -50 threshold)
        fireEvent.touchEnd(window, {
            changedTouches: [{ clientX: 100, clientY: 100 }],
        });

        expect(mockDispatch).toHaveBeenCalledWith(toggleMobileMenu(false));
    });

    it('should NOT dispatch on small swipes', () => {
        renderHook(() => useSwipeToClose(true));

        // Small swipe down
        fireEvent.touchStart(window, {
            touches: [{ clientX: 100, clientY: 100 }],
        });

        fireEvent.touchEnd(window, {
            changedTouches: [{ clientX: 100, clientY: 140 }], // DeltaY = 40 (< 50)
        });

        expect(mockDispatch).not.toHaveBeenCalled();
    });

    it('should NOT dispatch on swipe right', () => {
        renderHook(() => useSwipeToClose(true));

        // Swipe Right
        fireEvent.touchStart(window, {
            touches: [{ clientX: 100, clientY: 100 }],
        });

        fireEvent.touchEnd(window, {
            changedTouches: [{ clientX: 200, clientY: 100 }], // DeltaX = 100 (Not < -50)
        });

        expect(mockDispatch).not.toHaveBeenCalled();
    });

    it('should NOT dispatch on swipe up', () => {
        renderHook(() => useSwipeToClose(true));

        // Swipe Up
        fireEvent.touchStart(window, {
            touches: [{ clientX: 100, clientY: 200 }],
        });

        fireEvent.touchEnd(window, {
            changedTouches: [{ clientX: 100, clientY: 100 }], // DeltaY = -100 (Not > 50)
        });

        expect(mockDispatch).not.toHaveBeenCalled();
    });
});
