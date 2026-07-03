'use client';

import React, { useEffect, useState } from 'react';
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
    rootMargin: isMobile ? '0px 0px -20% 0px' : '0px 0px -10% 0px',
  });

  return (
    <div
      ref={ref}
      className={`defaulttopspace darkglow ${styles.wrapper} ${
        inView ? styles.visible : styles.hidden
      }`}
    >
      <h2 id="overview" className={styles.title}>
        Overview
      </h2>

      <p className={styles.paragraph}>
        Rito has made <span className={styles.highlightRed}>high-visibility contributions</span> to
        the flagship websites of major Open Source Software (OSS) ecosystems used by millions of
        developers worldwide, including{' '}
        <strong>Kubernetes, Ethereum EIPs/ERCs, OWASP, ZAP, LangChain, and Storybook</strong>. 
        He's also contributed to Core Infrastructure like <strong>Git, Linux Kernel Docs,</strong> and the <strong>Linux Kernel Mailing List</strong> archive to improve
        web surfaces developers rely on to browse source code and track discussions.
      </p>

      <p className={styles.paragraph}>
        These span radically different domains—cloud infrastructure, cybersecurity, AI tooling, developer tooling,
        blockchain standards, and UI development—but share the same realities: large audiences, low
        tolerance for breakage, and a high bar for accepting changes.
      </p>

      <p className={styles.paragraph}>
        Rito’s volunteer contributions are on his own initiative and generally focus on enhancing usability and accessibility,
        reducing friction, and helping maintain trust in the projects’ primary documentation and community
        surfaces. <strong>The fixes are often site-wide, aligned to a mobile-first world and covered with comprehensive documentation and testing.</strong>
      </p>

      <p className={styles.paragraph}>
        This page highlights code contributions in the form of "Pull Requests" that were officially merged into the projects’ canonical
        code repositories and deployed to live websites. Not every change remains visible indefinitely as
        the sites evolve, but the contributions are permanently recorded on {' '}
        <a
          className={styles.githubLink}
          href="https://github.com/ritorhymes"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>{' '}
        under Rito’s
        handle, “ritorhymes.”
      </p>

      <p className={styles.paragraph}>
        Some contributions are also documented in the projects’ email-based mailing lists
        in what's known as a "Patch Series," similar to a Pull Request. 
        These are often the primary communication channels for these development communities
        to collaborate.
      </p>
    </div>
  );
}
