'use client';

import React from 'react';
import styles from './Discontinue.module.css';

export default function Discontinue() {
  return (
    <div className={`${styles.wrapper} defaulttopspace`}>
      <h3 className={styles.title}>Decision to Discontinue</h3>

      <p className={styles.text}>
        Following the success of the fashion show activation and internal testing of the mobile application, Rito and the Jumptag Club team faced a critical inflection point: whether to invest further into scaling the platform or to pause and reassess long-term viability.
      </p>

      <p className={styles.text}>
        While the pilot demonstrated clear potential—technically and creatively—the decision was ultimately made to discontinue active development. This was not due to failure since an effort for serious expansion had not yet been pursued, but to a strategic evaluation of the market landscape, available resources, and personal life circumstances of the team.
      </p>
    </div>
  );
}
