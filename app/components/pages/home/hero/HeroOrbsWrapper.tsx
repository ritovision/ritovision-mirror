// c:/…/HeroOrbsWrapper.tsx
'use client';
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import HeroOrbs from './HeroOrbs';                   // ← static import
const DesktopHeroOrbs = dynamic(
  () => import('./HeroOrbsDesktop'),
  { ssr: false }
);

export default function HeroOrbsWrapper() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 730);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <div style={{ height: '100vh' }}>
      {isDesktop ? <DesktopHeroOrbs /> : <HeroOrbs />}
    </div>
  );
}
