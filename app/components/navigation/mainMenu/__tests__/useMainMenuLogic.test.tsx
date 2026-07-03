import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import useMainMenuLogic from '../useMainMenuLogic';
import { toggleMobileMenu } from '@/store/slices/navigation/mobileModalSlice';
import { setMenuTransition } from '@/store/slices/navigation/menuTransitionSlice';
import { randomizeImage } from '@/store/slices/navigation/ui/imageSlice';
import * as redux from 'react-redux';

// Mock the Redux hooks
const mockDispatch = vi.fn();
vi.mock('react-redux', async () => {
    const actual = await vi.importActual('react-redux');
    return {
        ...actual,
        useDispatch: () => mockDispatch,
        useSelector: vi.fn(),
    };
});

// Mock the useSwipeToClose hook since we test it separately
vi.mock('../useSwipeToClose', () => ({
    useSwipeToClose: vi.fn(),
}));

describe('useMainMenuLogic', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        // Default selector mock
        (redux.useSelector as unknown as Mock).mockImplementation(() => {
            // We can try to infer what the selector is looking for based on the state structure
            // But for simple tests, we can just return default values based on call order or logic
            // However, a more robust way for unit testing hooks with useSelector is to mock the return value
            // based on the selector function passed.
            // For this specific hook, we know it selects `isOpen` and `image`.

            // Let's assume a default state for simplicity in the mock implementation
            // or we can override it in specific tests.
            return false; // Default isOpen = false, image = undefined/null
        });
    });

    it('should initialize with default states', () => {
        const { result } = renderHook(() => useMainMenuLogic());

        expect(result.current.mounted).toBe(true); // It sets mounted to true in useEffect
        expect(result.current.showImage).toBe(false);
        expect(result.current.showButtonBackground).toBe(false);
        expect(result.current.clickedButton).toBe(null);
        expect(result.current.fadeOutButtons).toBe(false);
        expect(result.current.triggerClose).toBe(false);
    });

    it('should handle opening sequence correctly', () => {
        // Mock isOpen = true
        (redux.useSelector as unknown as Mock).mockImplementation(() => {
            // This is a bit hacky without a proper store, but sufficient for unit testing the hook logic
            // if we assume the selector function structure.
            // A better way is to use the wrapper with a real store, but here we are mocking hooks.
            // Let's stick to mocking return values for now.
            return true; // isOpen = true
        });

        vi.useFakeTimers();

        const { result } = renderHook(() => useMainMenuLogic());

        // Initial effects when isOpen becomes true
        expect(result.current.showImage).toBe(true);

        // Check button background delay
        act(() => {
            vi.advanceTimersByTime(300);
        });
        expect(result.current.showButtonBackground).toBe(true);

        vi.useRealTimers();
    });

    it('should randomize image when closed', () => {
        // Mock isOpen = false
        (redux.useSelector as unknown as Mock).mockReturnValue(false);

        renderHook(() => useMainMenuLogic());

        expect(mockDispatch).toHaveBeenCalledWith(randomizeImage());
    });

    it('should handle link click sequence', () => {
        (redux.useSelector as unknown as Mock).mockReturnValue(true); // Open
        vi.useFakeTimers();

        const { result } = renderHook(() => useMainMenuLogic());

        act(() => {
            result.current.handleLinkClick('About');
        });

        expect(result.current.clickedButton).toBe('About');
        expect(mockDispatch).toHaveBeenCalledWith(setMenuTransition(true));

        // After 500ms
        act(() => {
            vi.advanceTimersByTime(500);
        });
        expect(result.current.fadeOutButtons).toBe(true);
        expect(result.current.triggerClose).toBe(true);

        // After another 1000ms (total 1500ms from click start, but 1000ms from the inner timeout)
        act(() => {
            vi.advanceTimersByTime(1000);
        });
        expect(mockDispatch).toHaveBeenCalledWith(toggleMobileMenu(false));

        vi.useRealTimers();
    });

    it('should handle menu close click', () => {
        const { result } = renderHook(() => useMainMenuLogic());

        act(() => {
            result.current.handleMenuClick();
        });

        expect(mockDispatch).toHaveBeenCalledWith(setMenuTransition(true));
        expect(mockDispatch).toHaveBeenCalledWith(toggleMobileMenu(false));
    });

    it('should handle animation complete', () => {
        const { result } = renderHook(() => useMainMenuLogic());

        act(() => {
            result.current.onAnimationComplete('closed');
        });

        expect(mockDispatch).toHaveBeenCalledWith(setMenuTransition(false));
    });
});
