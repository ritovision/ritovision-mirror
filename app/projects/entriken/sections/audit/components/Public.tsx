'use client';

import React from 'react';
import styles from './Public.module.css';
import CSH from './publicText/CSH';
import Stack from './publicText/Stack';
import Zeppelin from './publicText/Zeppelin';
import EIP from './publicText/EIP';
import Git from './publicText/Git';
import Twitter from './publicText/Twitter';

export default function Public() {
  return (
    <div id="public-platforms" className={`${styles.wrapper} defaulttopspace`}>

      {/* Intro section */}
      <div className={styles.publicContainer}>
        <h2 className={styles.firstTitle}>Public Platforms</h2>
        <p className={styles.leftText}>
          In addition to controlled brand assets like personal websites, William Entriken maintains a visible and active presence across a range of third-party public platforms — including podcasts, social media, open-source communities, and developer ecosystems.
        </p>
        <p className={styles.leftText}>
          This section examines how William’s ongoing contributions, voice, and persona are expressed across these platforms — where the degree of narrative control varies, and content unfolds organically rather than through formal brand curation.
        </p>
        <p className={styles.leftText}>
          The audit assesses how these external presences may contribute to a unified current public identity in view of particular audiences and serve as foundational elements for potential future brand evolution.
        </p>
        <p className={styles.leftText}>
          Understanding the role and resonance of each platform provides critical insight into how William’s multifaceted expertise is perceived today, and how it might be strategically aligned into a more integrated, accessible thought leadership profile moving forward.
        </p>
      </div>

      {/* Modular sections */}
      <CSH />
      <Stack />
      <Zeppelin />
      <EIP />
      <Git />
      <Twitter />

    </div>
  );
}
