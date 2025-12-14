'use client';
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const MobileOrbs = dynamic(() => import('./NotFoundOrbsMobile'), {
  ssr: false,
  loading: () => <div style={{ height: '100vh' }} />,
});
const DesktopOrbs = dynamic(() => import('./NotFoundOrbsDesktop'), {
  ssr: false,
  loading: () => <div style={{ height: '100vh' }} />,
});

export default function NotFoundOrbsWrapper() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const check = () => setIsDesktop(window.innerWidth >= 730);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  if (!mounted) {
    return <div style={{ height: '100vh' }} />;
  }

  return <div style={{ height: '100vh' }}>{isDesktop ? <DesktopOrbs /> : <MobileOrbs />}</div>;
}
