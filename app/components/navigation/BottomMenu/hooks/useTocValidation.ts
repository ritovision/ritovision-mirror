import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { clearToc } from '@/store/slices/navigation/tocSlice';

const VALIDATION_DELAY = 500;

interface UseTocValidationReturn {
  isValidated: boolean;
  shouldShowToc: boolean;
}

export function useTocValidation(
  hasToc: boolean,
  tocLinksCount: number,
  mounted: boolean
): UseTocValidationReturn {
  const [isValidated, setIsValidated] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (mounted && !isValidated) {
      // Small delay to allow actual TOC components to register
      const validationTimeout = setTimeout(() => {
        // If no TOC component has registered within the delay,
        // clear any phantom TOC state
        if (hasToc && tocLinksCount === 0) {
          dispatch(clearToc());
        }
        setIsValidated(true);
      }, VALIDATION_DELAY);

      return () => clearTimeout(validationTimeout);
    }
  }, [mounted, isValidated, hasToc, tocLinksCount, dispatch]);

  // Reset validation when route changes or mount state changes
  useEffect(() => {
    if (!mounted) {
      setIsValidated(false);
    }
  }, [mounted]);

  const shouldShowToc = hasToc && tocLinksCount > 0 && isValidated;

  return {
    isValidated,
    shouldShowToc,
  };
}
