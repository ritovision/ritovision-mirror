// components/utilities/performance/usePerformanceTier.ts

import { useState, useEffect } from 'react';
import { getPerfTier } from './performanceUtils';

export function usePerformanceTier(): 'none' | 'low' | 'high' {
  const [tier, setTier] = useState<'none' | 'low' | 'high'>('high');

  useEffect(() => {
    let isMounted = true;
    getPerfTier().then((result: 'none' | 'low' | 'high') => {
      if (isMounted) {
        setTier(result);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  return tier;
}
