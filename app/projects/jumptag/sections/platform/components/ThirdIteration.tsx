// \test\app\projects\jumptag\sections\platform\components\ThirdIteration.tsx
'use client';

import React from 'react';
import styles from './ThirdIteration.module.css';

export default function ThirdIteration() {
  return (
    <div className={`${styles.wrapper} defaulttopspace`}>
      <h3 id="third-iteration" className={styles.title}>Third Iteration</h3>
      <h4 className={styles.subheading}>Mobile Hybrid App</h4>

      <p className={styles.text}>
        The third iteration of Jumptag Club marked a major leap forward in functionality and platform integration. Building on earlier prototypes, the team expanded the capabilities of the web app to support a wider range of URI schemes—including streamlined redirects for major platforms and messaging services, cryptocurrency wallets (Dogecoin, Bitcoin, and others), location-sharing payloads, and even payment apps.
      </p>

      <p className={styles.text}>
        This broadened the utility of Jumptags significantly. Whether someone wanted to share their portfolio, phone number, Cash App link, or a live map location, the platform made it fast, scannable, and centralized through a single wearable link. The backend was optimized for reliability and speed, while the user experience became more fluid and intuitive for end users across use cases.
      </p>

      <p className={styles.text}>
        To complement this, the web app was wrapped into a hybrid Android application using React Native with WebView, providing a more seamless, app-like experience. The mobile app emulated native performance while still pulling from the live web platform, allowing faster iteration and consistent feature parity across interfaces. This version was formally reviewed and approved for launch in the Google Play Store, signaling a major milestone in product maturity and accessibility.
      </p>
    </div>
  );
}
