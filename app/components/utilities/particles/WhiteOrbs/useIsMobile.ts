// components/utilities/particles/WhiteOrbs/useIsMobile.ts
import { useState, useEffect } from 'react';

export function useIsMobile() {
  const [isMobile, setMobile] = useState(
    () => typeof window !== 'undefined' && window.innerWidth <= 730
  );

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 730px)');
    const update = () => setMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return isMobile;
}
