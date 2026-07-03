// app\projects\uas\sections\intro\components\Overview.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import styles from './Overview.module.css';

export default function Overview() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 730);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: isMobile ? '0px 0px -20% 0px' : '0px 0px -10% 0px'
  });

  return (
    <div
      id="overview"
      ref={ref}
      className={`defaulttopspace ${styles.wrapper} ${inView ? styles.visible : styles.hidden}`}
    >
      <h2 className={styles.title}>Overview</h2>
      <p className={styles.paragraph}>
        Over a six-month collaboration with William Entriken—lead author of the original NFT standard (ERC-721)—Rito co-authored and positioned a new Ethereum application-layer standard aimed at ecosystem-wide adoption, called Universal Asset Signing.
      </p>
      <p className={styles.paragraph}>
        Entriken’s work on ERC-721 laid the foundation for the multi-billion dollar NFT ecosystem and established him as one of Ethereum’s most influential standard-setters—making this a rare opportunity for Rito to contribute, lead, and learn alongside a true pioneer.
      </p>
    </div>
  );
}
