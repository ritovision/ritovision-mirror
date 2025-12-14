'use client';

import React from 'react';
import styles from '../Public.module.css';

export default function Twitter() {
  return (
    <div className={styles.publicContainer}>
      <h3 className={styles.title}>
        <img
          src="/images/utilities/socials/twitter-white.png"
          alt="Twitter / X Logo"
        />
        Twitter / X
      </h3>

      <p className={styles.leftText}>
        He maintains an active presence on Twitter / X, offering a dynamic window into his personality, thought leadership, and technical interests.
      </p>
      <p className={styles.leftText}>
        His feed features a diverse mix of content — ranging from commentary on business and financial innovation, to cybersecurity insights (including zero-day vulnerability research), reflections on emerging laws and policies, and occasional humor or cultural commentary.
      </p>

      <div className={styles.redHeading}>
        Audience Perception and Brand Impact
      </div>

      <div className={styles.leftHeading}>
        Technical and Business Audiences:
      </div>
      <p className={styles.leftText}>
        William’s Twitter presence offers a direct, unfiltered pulse of his perspectives, providing valuable glimpses into his thinking across a wide range of fields.
      </p>

      <div className={styles.leftHeading}>
        Mainstream Audiences:
      </div>
      <p className={styles.leftText}>
        While accessible, the feed’s eclectic nature — blending technical research, social commentary, and casual interactions — makes it less structured as a formal brand platform.
      </p>

      <div className={styles.redHeading}>
        Strategic Insight
      </div>
      <p className={styles.leftText}>
        In the current way he enjoys running it and assuming he continues choosing to operate it this way, Twitter / X serves as a supplementary brand channel rather than a primary branding lever. While it effectively humanizes William and reinforces the breadth of his knowledge and personality, it is not designed as a tightly curated showcase of achievements or capabilities. Curious audiences may gain additional appreciation for William’s multidisciplinary thinking and technical sharpness, but the platform is unlikely to independently catalyze major brand recognition or authority elevation.
      </p>
      <p className={styles.leftText}>
        Instead, Twitter functions best as an informal bridge — tying together the more polished dimensions of William’s brand with a public-facing, personable presence.
      </p>
    </div>
  );
}
