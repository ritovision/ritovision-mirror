'use client';

import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import styles from './Domains.module.css';
import Civic from './domainsText/Civic';
import Cyber from './domainsText/Cyber';
import Business from './domainsText/Business';
import Solutions from './domainsText/Solutions';

export default function Domains() {
  const [, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 730);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const observerOptions = {
    threshold: 0,
    rootMargin: '0px 0px -30% 0px',
    triggerOnce: false
  };

  const { ref: ref1, inView: inView1 } = useInView(observerOptions);
  const { ref: ref2, inView: inView2 } = useInView(observerOptions);
  const { ref: ref3, inView: inView3 } = useInView(observerOptions);
  const { ref: ref4, inView: inView4 } = useInView(observerOptions);
  const { ref: ref5, inView: inView5 } = useInView(observerOptions);

  return (
    <div id="different-careers" className={styles.wrapper}>
      <div
        ref={ref1}
        className={`${styles.domainContainer} ${inView1 ? styles.dark : ''}`}
      >
        <h2 className={styles.firstTitle}>Enter Entriken</h2>
        <p className={styles.paragraph}>
          William Entriken’s professional identity spans four distinct yet interwoven domains: civic hacking, cybersecurity, business and finance, and solutions architecture.
          Each domain represents a different facet of his expertise — and each brings its own specialized audience expectations, cultural nuances, and branding challenges.
        </p>
        <p className={styles.paragraph}>
          This section examines how William’s visibility within each domain influences the broader optics of his brand identity, including the ways these identities may reinforce or offset one another.
          Through auditing the unique positioning opportunities and perception gaps within each field, critical insights emerge to better understand the risks and rewards of repositioning William for particular audiences, as well as the strategic considerations required to make his thought leadership accessible across multiple spheres simultaneously.
        </p>
      </div>
      <div
        ref={ref2}
        className={`${styles.domainContainer} ${inView2 ? styles.dark : ''}`}
      >
        <h3 className={styles.title}>Civic Hacker</h3>
        <Civic />
      </div>
      <div
        ref={ref3}
        className={`${styles.domainContainer} ${inView3 ? styles.dark : ''}`}
      >
        <h3 className={styles.title}>Cybersecurity</h3>
        <Cyber />
      </div>
      <div
        ref={ref4}
        className={`${styles.domainContainer} ${inView4 ? styles.dark : ''}`}
      >
        <h3 className={styles.title}>Business & Finance</h3>
        <Business />
      </div>
      <div
        ref={ref5}
        className={`${styles.domainContainer} ${styles.last} ${inView5 ? styles.dark : ''}`}
      >
        <h3 className={styles.title}>Solutions Architect</h3>
        <Solutions />
      </div>
    </div>
  );
}
