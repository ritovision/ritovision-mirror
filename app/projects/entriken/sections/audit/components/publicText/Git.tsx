'use client';

import React from 'react';
import styles from '../Public.module.css';

export default function Git() {
  return (
    <div className={styles.publicContainer}>
      <h3 className={styles.title}>
        <img
          src="/images/utilities/socials/github-white.png"
          alt="GitHub Logo"
        />
        GitHub
      </h3>

      <p className={styles.leftText}>
        William is a prolific contributor to GitHub, the leading platform for open-source software collaboration.
      </p>
      <p className={styles.leftText}>
        Within technical circles, GitHub requires little explanation — experienced developers, engineers, and technical decision-makers naturally refer to a contributor’s GitHub profile as a core credibility check. William’s contributions reflect a sustained, high-level engagement across blockchain, cybersecurity, and broader software ecosystems.
      </p>

      <div className={styles.redHeading}>
        Audience Perception and Brand Impact
      </div>

      <div className={styles.leftHeading}>
        Technical Audiences:
      </div>
      <p className={styles.leftText}>
        For those familiar with software development, William’s GitHub activity speaks for itself without requiring additional positioning or branding amplification. It reinforces his technical weight naturally, without needing promotional effort.
      </p>

      <div className={styles.leftHeading}>
        Mainstream Audiences:
      </div>
      <p className={styles.leftText}>
        For non-technical audiences, GitHub’s significance often goes unrecognized. Contributions to open-source projects may be perceived simply as hobbyist activity or volunteer work, without conveying the scale or depth of the technical expertise involved.
      </p>

      <div className={styles.redHeading}>
        Strategic Insight
      </div>
      <p className={styles.leftText}>
        GitHub serves as a passive but credible authority backdrop for William’s technical brand. However, it is not a potent primary tool for broader personal branding — either because it requires no promotion among technical peers, or because it carries limited meaning for generalist audiences. As such, while GitHub strengthens his invisible authority for those who seek it out, it plays a supporting rather than starring role in broader brand strategy.
      </p>
    </div>
  );
}
