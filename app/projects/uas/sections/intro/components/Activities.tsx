// app\projects\uas\sections\intro\components\Activities.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import styles from './Activities.module.css';

export default function Activities() {
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
      id="responsibilities-activities"
      ref={ref}
      className={`defaulttopspace ${styles.wrapper} ${inView ? styles.visible : styles.hidden}`}
    >
      <h2 className={styles.title}>
        Strategic Responsibilities &amp; Key Activities
      </h2>
      <ul className={styles.list}>
        <li>
          Pitched a new ERC co-authored with William Entriken, designed for broad NFT ecosystem adoption
        </li>
        <li>
          Guided branding and strategy for the ERC, including a name, logo and terminologies
        </li>
        <li>
         Shaped product roadmap and pivoted according to community feedback and stakeholder needs
        </li>
        <li>
          Navigated DAO and governance politics to align stakeholders around standard adoption
        </li>
        <li>
          Engaged directly with major blockchain firms (including CTOs, protocol leaders, and foundation heads)
        </li>
        <li>
          Negotiated with executives, including Rarible’s Chief Strategy Officer, LeewayHertz’s CTO and Emblem Vault leadership
        </li>
        <li>
          Planned a Public Relations campaign for ERC visibility with an agency onboarded
        </li>
      </ul>
    </div>
  );
}
