// \test\app\projects\jumptag\sections\intro\components\Overview.tsx
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
      ref={ref}
      className={`defaulttopspace darkglow ${styles.wrapper} ${
        inView ? styles.visible : styles.hidden
      }`}
    >
      <h2 id="overview" className={styles.title}>Overview</h2>

      <p className={styles.paragraph}>
        Jumptag Club was a limited-run wearable tech pilot designed to bridge digital identity and physical experience—using fashion as the medium and a QR-enabled backend as the engine. Led by Rito, the project brought together a team of 6 collaborators to execute across product, UX, engineering, and fashion.
      </p>

      <p className={styles.paragraph}>
        At its core, Jumptag Club wasn’t about inventing new technology—it was about reframing existing tools like dynamic QR codes into a stylized, user-friendly, and culturally resonant experience. With a focus on aesthetics, usability, and modularity, the product was positioned as a sleek, real-world interface for connecting people to whatever mattered most—be it wallets, portfolios, or social links.
      </p>

      <p className={styles.paragraph}>
        The platform went through multiple development stages and culminated in a hybrid mobile app (Android) paired with physical accessories. The tags were deployed in a live, high-profile fashion context—merging utility and style in a way that was forward-thinking but grounded in real-world use.
      </p>

      <p className={styles.paragraph}>
        <strong>Key project highlights:</strong>
      </p>
      <ul className={styles.resultsList}>
        <li>Led end-to-end product strategy and execution, from ideation to deployment, collaborating with developers, designers, and assistants</li>
        <li>Developed a full-stack QR platform over multiple iterations (Django, SvelteKit, PostgreSQL, Prisma) and released a hybrid mobile app on Android</li>
        <li>Integrated into the NYC fashion scene, with Jumptag Club featured at the Future Forward fashion show alongside designers like Pamela Dennis and Romeo Hunte</li>
        <li>Worn by elite models, including those featured in Vogue and Harper’s Bazaar, during an immersive, interactive show experience</li>
        <li>Built and branded a fully custom Shopify storefront, with front-end enhancements and curated product visuals</li>
        <li>Directed original photoshoots across NYC and NJ to support launch visuals, executed with published talent</li>
      </ul>

      <div className={styles.rolesSection}>
        <h3 className={styles.rolesTitle}>Roles by Rito</h3>
        <div className={styles.rolesList}>
          <p>Product Manager</p>
          <p>Brand Strategist</p>
          <p>Creative Director</p>
          <p>UX Strategist, Architect &amp; Designer</p>
          <p>Photographer</p>
        </div>
      </div>
    </div>
  );
}
