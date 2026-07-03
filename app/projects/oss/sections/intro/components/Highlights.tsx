'use client';

import React from 'react';
import PlainContainer from '@/projects/components/PlainContainer';
import styles from './Highlights.module.css';

export default function Highlights() {
  return (
    <PlainContainer id="quick-highlights" title="Quick Highlights" className="blueglow" titleClassName="redText">
      <div className={styles.list}>
        <p className={styles.item}>
          <strong>Git:</strong> made gitweb - Git&#39;s built-in browser-based source tree viewer - fully mobile
          responsive, supporting legacy infrastructure projects like FFmpeg that depend on it for repo hosting.
        </p>
        <p className={styles.item}>
          <strong>VWAD (OWASP):</strong> sustained impact across two generations of the VWAD platform. First, rescued
          the legacy directory table&apos;s mobile responsiveness and added Advanced Search. Then helped establish the
          product foundations of the ground-up rebuilt vwad.owasp.org platform through sustained front-end, UX, and
          publishing architecture work as it transitioned into a production-tier OWASP project.
        </p>
        <p className={styles.item}>
          <strong>Ethereum EIPs:</strong> shipped a site-wide mobile UX rescue across the EIPs standards site
          impacting all the main pages and historical ones like ERC-721.
        </p>
        <p className={styles.item}>
          <strong>OWASP:</strong> shipped a site-wide mobile-centric UX rescue in a shared theme powering the owasp.org
          multi-repo ecosystem.
        </p>
        <p className={styles.item}>
          <strong>Linux Kernel Mailing List:</strong> Made the entire Linux Kernel mailing list archive mobile responsive and shipped foundational layout fixes and branding to the kernel repo's internal documentation platform.
        </p>
        <p className={styles.item}>
          <strong>Kubernetes / ZAP / LangChain / Storybook / systemd:</strong> shipped targeted site-wide UX and layout fixes
          on high-traffic developer documentation surfaces.
        </p>
      </div>
    </PlainContainer>
  );
}
