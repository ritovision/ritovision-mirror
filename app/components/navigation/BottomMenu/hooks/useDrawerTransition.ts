import { useState, useEffect, useRef } from 'react';
import { DrawerType } from '@/store/slices/navigation/bottomMenuSlice';

interface DrawerConfig {
  height: number;
}

const DRAWER_CONFIGS: Record<Exclude<DrawerType, null>, DrawerConfig> = {
  toc: { height: 220 },
  ai: { height: 400 }, // AI drawer is taller for chat interface
};

// Visual timing
const FADE_OUT_DURATION = 0;     // instant hide when switching/closing
const RESIZE_DURATION = 300;     // container height animation (matches CSS height transition)
const FADE_IN_DURATION = 750;    // requested 0.75s fade-in

type TransitionState = 'idle' | 'fading-out' | 'resizing' | 'fading-in';

interface UseDrawerTransitionReturn {
  containerHeight: number;
  contentOpacity: number;
  contentFadeDuration: number;   // ms: 0 during fade-out, 750 during fade-in
  isTransitioning: boolean;
  currentDrawer: DrawerType;
}

export function useDrawerTransition(
  activeDrawer: DrawerType,
  topBarHeight: number = 60
): UseDrawerTransitionReturn {
  const [transitionState, setTransitionState] = useState<TransitionState>('idle');
  const [currentDrawer, setCurrentDrawer] = useState<DrawerType>(activeDrawer);
  const [containerHeight, setContainerHeight] = useState(
    activeDrawer ? topBarHeight + DRAWER_CONFIGS[activeDrawer].height : topBarHeight
  );
  const [contentOpacity, setContentOpacity] = useState(1);
  const [contentFadeDuration, setContentFadeDuration] = useState<number>(0);

  const previousDrawerRef = useRef<DrawerType>(activeDrawer);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const previousDrawer = previousDrawerRef.current;

    // No drawer change
    if (previousDrawer === activeDrawer) {
      return;
    }

    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Case 1: Opening a drawer from closed state
    if (previousDrawer === null && activeDrawer !== null) {
      setCurrentDrawer(activeDrawer);
      setTransitionState('fading-in');

      // Prepare for fade-in after resize
      setContentOpacity(0);
      setContentFadeDuration(0); // keep content invisible instantly while resizing

      // Resize container first
      setContainerHeight(topBarHeight + DRAWER_CONFIGS[activeDrawer].height);

      // After resize, fade in new content over 0.75s
      timeoutRef.current = setTimeout(() => {
        setContentFadeDuration(FADE_IN_DURATION);
        setContentOpacity(1);

        // End transition after fade-in completes
        const endTimeout = setTimeout(() => {
          setTransitionState('idle');
        }, FADE_IN_DURATION);
        timeoutRef.current = endTimeout;
      }, RESIZE_DURATION);
    }

    // Case 2: Closing the drawer
    else if (previousDrawer !== null && activeDrawer === null) {
      setTransitionState('fading-out');

      // Instantly hide content, then collapse container
      setContentFadeDuration(0);
      setContentOpacity(0);

      timeoutRef.current = setTimeout(() => {
        setContainerHeight(topBarHeight);
        setCurrentDrawer(null);
        setTransitionState('idle');
      }, FADE_OUT_DURATION);
    }

    // Case 3: Switching between drawers
    else if (previousDrawer !== null && activeDrawer !== null) {
      // Step 1: Instantly hide current content
      setTransitionState('fading-out');
      setContentFadeDuration(0);
      setContentOpacity(0);

      // Step 2: After (instant) fade-out, resize container and swap drawer
      timeoutRef.current = setTimeout(() => {
        setTransitionState('resizing');
        setContainerHeight(topBarHeight + DRAWER_CONFIGS[activeDrawer].height);
        setCurrentDrawer(activeDrawer);

        // Step 3: After resize, fade in new content over 0.75s
        const resizeTimeout = setTimeout(() => {
          setTransitionState('fading-in');
          setContentFadeDuration(FADE_IN_DURATION);
          setContentOpacity(1);

          // Step 4: Transition complete
          const fadeInTimeout = setTimeout(() => {
            setTransitionState('idle');
          }, FADE_IN_DURATION);

          timeoutRef.current = fadeInTimeout;
        }, RESIZE_DURATION);

        timeoutRef.current = resizeTimeout;
      }, FADE_OUT_DURATION);
    }

    previousDrawerRef.current = activeDrawer;

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [activeDrawer, topBarHeight]);

  return {
    containerHeight,
    contentOpacity,
    contentFadeDuration,
    isTransitioning: transitionState !== 'idle',
    currentDrawer,
  };
}
