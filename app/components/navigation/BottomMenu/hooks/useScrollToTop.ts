import { useState, useRef, useCallback } from 'react';

const ANIMATION_DURATION = 1000; // 1 second

interface UseScrollToTopReturn {
  isAnimating: boolean;
  scrollToTop: () => void;
}

export function useScrollToTop(): UseScrollToTopReturn {
  const [isAnimating, setIsAnimating] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Trigger animation
    setIsAnimating(true);

    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Reset animation after duration
    timeoutRef.current = setTimeout(() => {
      setIsAnimating(false);
    }, ANIMATION_DURATION);
  }, []);

  return {
    isAnimating,
    scrollToTop,
  };
}
