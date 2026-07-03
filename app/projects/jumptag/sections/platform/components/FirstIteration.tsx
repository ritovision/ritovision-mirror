// \test\app\projects\jumptag\sections\platform\components\FirstIteration.tsx
'use client';

import React from 'react';
import styles from './FirstIteration.module.css';

export default function FirstIteration() {
  return (
    <div className={`${styles.wrapper}`}>
      <h3 id="first-iteration" className={styles.title}>First Iteration</h3>

      <p className={styles.text}>
        The initial development phase of Jumptag Club began with a lightweight prototype built to test the core idea in a real-world setting. A family member stepped in to help stand up a simple Django-based web application—just enough infrastructure to enable Rito to validate the product experience and functionality with a live system.
      </p>

      <p className={styles.text}>
        Using the domain jumptag.app, Rito launched the first batch of Jumptags, each encoded with a unique UUID that mapped to a corresponding QR code destination. These early tags were engraved with static codes, but the linked platform provided a foundational layer of redirect logic that could be expanded later.
      </p>

      <p className={styles.text}>
        Despite its modest architecture, the first iteration performed reliably in the field. The tags were successfully scanned in a range of physical environments, and the redirect speeds were fast and consistent. Importantly, this early success confirmed that the core concept—using QR-tagged jewelry to bridge physical interaction with digital destinations—could operate smoothly in real-world conditions.
      </p>

      <p className={styles.text}>
        This prototype marked a turning point. With functional proof in hand, the path was now open to build out more advanced features, explore dynamic personalization, and begin developing the Jumptag Club experience with a broader audience in mind.
      </p>
    </div>
  );
}
