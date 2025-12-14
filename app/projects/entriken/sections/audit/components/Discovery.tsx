'use client';

import React from 'react';
import RedHeader from '@/components/utilities/sections/RedHeader';
import styles from './Discovery.module.css';

export default function Discovery() {
  return (
    <>
      <RedHeader id="brand-discovery-audit">Brand Discovery &amp; Audit</RedHeader>
      <div id="context-goals" className={styles.wrapper}>
        <h3 className={styles.subheading}>Context &amp; Goals</h3>
        <p className={styles.text}>
          Before embarking on repositioning William Entriken’s personal brand, I conducted a comprehensive audit of his existing brand assets, public presence, and reputation within key technical and non-technical communities.
        </p>
        <p className={styles.text}>
          The purpose of this discovery was twofold:
        </p>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            To inventory the full breadth of William’s professional identity across multiple domains.
          </li>
          <li className={styles.listItem}>
            To uncover branding challenges and opportunities created by his existing audience perceptions, platform presence, and prior associations.
          </li>
        </ul>
        <p className={styles.text}>
          This audit shaped the strategic approach, highlighting critical areas where nuanced brand repositioning was necessary to make William’s expertise more accessible, multifaceted, and future-proof.
        </p>
        <p className={styles.text}>
          This section explores:
        </p>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            Key aspects of William’s identity across civic hacking, cybersecurity, finance, and blockchain innovation.
          </li>
          <li className={styles.listItem}>
            The specific challenges each niche presented for broader brand communication.
          </li>
          <li className={styles.listItem}>
            Branding opportunities discovered within his digital assets, public appearances, and past projects.
          </li>
        </ul>
      </div>
    </>
  );
}
