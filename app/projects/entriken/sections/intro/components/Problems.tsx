'use client';

import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import styles from './Problems.module.css';

export default function Problems() {
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
      id="problems-objectives"
      ref={ref}
      className={`defaulttopspace darkglow ${styles.wrapper} ${
        inView ? styles.visible : styles.hidden
      }`}
    >
      <h2 className={styles.title}>
        <span className={styles.problems}>Problems</span>
        <span className={styles.separator} />
        <span className={styles.opportunities}>Opportunities</span>
      </h2>
      <ul className={styles.list}>
        <li>His legacy was overly associated with NFTs, limiting perception.</li>
        <li>His expertise is broad, but esoteric domains create messaging challenges.</li>
        <li>Existing online identity lacked accessibility for press, collaborators, or generalists.</li>
        <li>Needed a professional, centralized presence that could support PR, SEO, and future public appearances.</li>
      </ul>
      <h2 className={styles.objTitle}>Strategic Objectives</h2>
      <ul className={styles.list}>
        <li>Escape the "NFT Guy" pigeonhole</li>
        <li>Create a public-facing, press-friendly brand</li>
        <li>Communicate multidisciplinarity without confusion</li>
        <li>SEO + AI future-proofing</li>
        <li>Easy maintenance &amp; updates by non-technical users</li>
      </ul>
    </div>
  );
}
