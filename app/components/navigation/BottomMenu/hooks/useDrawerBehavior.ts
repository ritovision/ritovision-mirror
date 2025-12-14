import { useEffect, RefObject, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { closeDrawer, DrawerType } from '@/store/slices/navigation/bottomMenuSlice';

interface UseDrawerBehaviorProps {
  isOpen: boolean;
  drawerRef: RefObject<HTMLElement>;
}

/**
 * Hook to manage drawer behaviors:
 * - Click outside to close (but ignore clicks inside modals/overlays/dialogs)
 */
export function useDrawerBehavior({ isOpen, drawerRef }: UseDrawerBehaviorProps) {
  const dispatch = useDispatch();

  useEffect(() => {
    const shouldIgnoreForModals = (target: EventTarget | null): boolean => {
      if (!(target instanceof Element)) return false;
      // Ignore if the click is inside any modal/overlay or element explicitly marked to be ignored.
      return Boolean(
        target.closest(
          '[data-stop-drawer-close="true"], [role="dialog"], [aria-modal="true"]'
        )
      );
    };

    const handlePointerDown = (event: MouseEvent) => {
      if (!isOpen) return;

      // If click is within any modal/overlay/dialog, do NOT close the drawer.
      if (shouldIgnoreForModals(event.target)) return;

      const drawerEl = drawerRef.current;
      if (drawerEl && !drawerEl.contains(event.target as Node)) {
        dispatch(closeDrawer());
      }
    };

    if (isOpen) {
      // 'mousedown' keeps behavior consistent with previous code
      document.addEventListener('mousedown', handlePointerDown);
      return () => document.removeEventListener('mousedown', handlePointerDown);
    }
  }, [isOpen, drawerRef, dispatch]);
}

interface UseDrawerScrollResetProps {
  isOpen: boolean;
  contentRef: RefObject<HTMLElement>;
}

/**
 * Hook to reset scroll position when drawer closes
 */
export function useDrawerScrollReset({ isOpen, contentRef }: UseDrawerScrollResetProps) {
  useEffect(() => {
    if (!isOpen && contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }, [isOpen, contentRef]);
}

interface UseDrawerFocusManagementProps {
  activeDrawer: DrawerType;
  drawerName: Exclude<DrawerType, null>;
  contentRef: RefObject<HTMLElement>;
  buttonRef: RefObject<HTMLButtonElement>;
}

/**
 * Hook to manage focus when drawer opens/closes.
 *
 * Rules:
 * - When this drawer becomes active → move focus into its content.
 * - When this drawer closes to NULL:
 *     • If last input was KEYBOARD → return focus to its button (accessibility).
 *     • If last input was POINTER/TOUCH → do NOT refocus the button (and blur if it had focus),
 *       so the visible ring disappears as requested.
 *
 * This also prevents the "focus tug-of-war" during drawer switches.
 */
export function useDrawerFocusManagement({
  activeDrawer,
  drawerName,
  contentRef,
  buttonRef,
}: UseDrawerFocusManagementProps) {
  const prevRef = useRef<DrawerType>(activeDrawer);
  const modalityRef = useRef<'keyboard' | 'pointer'>('pointer');

  // Track last input modality (global-ish for this hook instance)
  useEffect(() => {
    const onKeyDown = () => {
      modalityRef.current = 'keyboard';
    };
    const onPointerDown = () => {
      modalityRef.current = 'pointer';
    };

    document.addEventListener('keydown', onKeyDown, true);
    document.addEventListener('pointerdown', onPointerDown, true);
    return () => {
      document.removeEventListener('keydown', onKeyDown, true);
      document.removeEventListener('pointerdown', onPointerDown, true);
    };
  }, []);

  useEffect(() => {
    const prev = prevRef.current;
    const next = activeDrawer;

    // Opened this drawer → move focus into its content
    if (next === drawerName) {
      contentRef.current?.focus();
    }

    // Closed this drawer to NULL
    if (prev === drawerName && next === null) {
      if (modalityRef.current === 'keyboard') {
        // Keyboard close → return to the trigger for accessibility
        buttonRef.current?.focus();
      } else {
        // Pointer/touch close → don't keep focus on the trigger
        if (document.activeElement === buttonRef.current) {
          buttonRef.current?.blur();
        }
        // Let focus fall back naturally (typically to <body>)
      }
    }

    prevRef.current = next;
  }, [activeDrawer, drawerName, contentRef, buttonRef]);
}
