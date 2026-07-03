'use client';

import React from 'react';
import styles from './Identity.module.css';

export default function Identity() {
  return (
    <div className={styles.wrapper}>
      <h3 id="identity-and-voice" className={styles.title}>
        Identity and Voice
      </h3>

      <p className={styles.text}>
        The branding of Jumptag Club was conceived from the start to bridge functionality and lifestyle—designed to feel more like a personal accessory than a piece of tech. Rito developed the foundational identity of the brand, including early concepts for the visual system, product naming, domain strategy, and initial messaging. His goal was to establish a tone that was modular, modern, and broadly accessible, while still grounded in cultural awareness and visual impact.
      </p>

      <p className={styles.text}>
        With the foundational brand architecture in place, Rito later brought in a virtual executive assistant with a background in creative direction to help further refine the aesthetic direction and brand voice. This collaborative partnership helped polish and elevate the identity, ensuring that every aspect—from the logo to the language—aligned with the forward-facing goals of Jumptag Club.
      </p>

      <div className={styles.logoComparisonContainer}>
        <div className={styles.logoItem}>
          <img
            src="/images/pages/projects/jumptag/brand/original-logo.jpg"
            alt="Original fully scannable logo"
            className={styles.originalLogo}
          />
          <p className={styles.logoCaption}>Original fully scannable logo</p>
        </div>
        <div className={styles.logoItem}>
          <img
            src="/images/pages/projects/jumptag/brand/latest-logo.png"
            alt="Second iteration logo"
            className={styles.latestLogo}
          />
          <p className={styles.logoCaption}>Second iteration logo</p>
        </div>
      </div>

      <p className={styles.text}>
        Key elements of the branding included:
      </p>
      <p className={styles.bullet}>
        • A tagline system that emphasized clarity, rhythm, and action: One Jump. Many Destinations.; Set it. Scan it. JUMP.; SIMPLE. COOL. CONVENIENT.
      </p>
      <p className={styles.bullet}>
        • A visual evolution of the logo: minimalistic, modern, and copyrighted to enhance legibility across print and digital.
      </p>
      <p className={styles.bullet}>
        • Refined color and typography treatments, chosen for clarity, contrast, and vibrancy—positioning Jumptag Club closer to lifestyle brands than utilitarian link platforms.
      </p>
      <p className={styles.bullet}>
        • Lifestyle and portrait photography that brought emotional resonance—featuring diverse models in vibrant, real-world contexts to reflect accessibility and versatility.
      </p>

      <div className={styles.videoContainer}>
        <video
          src="\video\Jumptag-tagline-smoke.webm"
          autoPlay
          loop
          muted
          playsInline
          className={styles.taglineVideo}
        />
      </div>

      <p className={styles.text}>
        The resulting brand identity was consistently carried across all mediums, from the Shopify storefront and product packaging to app UI and real-world fashion activations. It helped frame Jumptag Club as a cultural product—not just a technical one—capable of resonating with diverse, fashion-conscious audiences.
      </p>
    </div>
  );
}
