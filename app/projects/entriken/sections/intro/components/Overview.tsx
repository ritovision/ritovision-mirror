'use client';

import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import Button from '@/components/utilities/buttons/Button';
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
      className={`defaulttopspace darkglow ${styles.wrapper} ${
        inView ? styles.visible : styles.hidden
      }`}
    >
      <h2 className={styles.title}>Overview</h2>

      <p className={styles.paragraph}>
        Rito delivered a full-scale strategic brand repositioning for William Entriken, a
        multi-disciplinary businessman, thought leader &amp; software pioneer best known
        for his role in building the foundations of the multi-billion dollar NFT
        eco-system including formalizing the term "NFT" in the paper{' '}
        <i>ERC-721: The NFT Standard</i>.
      </p>

      <p className={styles.paragraph}>
        Through brand discovery, technical architecture, content, and multi-disciplinary
        UX strategy, he engineered a personal brand platform that reframed Entriken's
        legacy from the narrow label of "the NFT Guy" into a broader picture: civic
        hacker, businessman, and software pioneer. The v2 platform was rebuilt in
        Astro to support a more structured editorial system, with stronger machine
        readability and long-term maintainability.
      </p>

      <p className={styles.paragraph}>
        <strong>Results:</strong>
      </p>
      <ul className={styles.resultsList}>
        <li>
          Launched WilliamEntriken.net - consistently ranking top 5 across Google,
          Bing, and DuckDuckGo for his name and achievements.
        </li>
        <li>
          Established a scalable, accessible, PR-ready brand identity bridging
          finance, cybersecurity, civic tech, and blockchain.
        </li>
        <li>
          Architected cross-site content synchronization with legacy assets while
          preserving SEO resilience and AI-readiness for emerging discovery systems.
        </li>
      </ul>

      <div className={styles.rolesSection}>
        <h3 className={styles.rolesTitle}>Roles by Rito</h3>
        <div className={styles.rolesList}>
          <p>Product Manager</p>
          <p>Brand Strategist</p>
          <p>Creative Director</p>
          <p>UX Strategist, Architect &amp; Designer</p>
          <p>Full-Stack Developer</p>
        </div>
      </div>

      <div className={styles.buttonWrapper}>
        <Button
          text="WilliamEntriken.net"
          href="https://WilliamEntriken.net"
          variant="blueAccentButton"
        />
        <Button
          text="GitHub Repo"
          href="https://github.com/ritovision/william-entriken.net"
          variant="blueAccentButton"
        />
      </div>
    </div>
  );
}
