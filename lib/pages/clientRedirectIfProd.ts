// utils/clientRedirectIfProd.ts
import { useEffect } from 'react';

export function useClientRedirectIfProd() {
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      window.location.href = 'https://ritovision.com';
    }
  }, []);
}
