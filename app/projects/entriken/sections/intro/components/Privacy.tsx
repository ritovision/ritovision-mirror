'use client';

import React from 'react';
import styles from './Privacy.module.css';

export default function Privacy() {
  return (
    <div id="privacy-disclaimer" className={styles.wrapper}>
      <h3 className={styles.title}>*Privacy Disclaimer*</h3>
      <p className={styles.text}>
        In alignment with the client's preference for confidentiality, specific performance metrics and sensitive data are withheld from this case study. Instead, this overview focuses on the strategic decisions, implementation processes, and the high-level impact of the brand repositioning.
      </p>
    </div>
  );
}
