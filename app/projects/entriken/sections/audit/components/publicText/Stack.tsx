'use client';

import React from 'react';
import styles from '../Public.module.css';

export default function Stack() {
  return (
    <div className={styles.publicContainer}>
      <h3 className={styles.title}>
        <img
          src="/images/pages/projects/entriken/logos/Stack_Overflow.png"
          alt="Stack Overflow Logo"
        />
        Stack Overflow
      </h3>

      <p className={styles.leftText}>
        He is a notable contributor to Stack Overflow, the premier Q&A platform for developers worldwide.
      </p>
      <p className={styles.leftText}>
        Over the years, William has answered a wide range of questions spanning software engineering, blockchain technologies, and smart contracts — with his contributions receiving millions of views collectively.
      </p>

      <div className={styles.redHeading}>
        Audience Perception and Brand Impact
      </div>

      <div className={styles.leftHeading}>
        Technical Audiences:
      </div>
      <p className={styles.leftText}>
        Active engagement on Stack Overflow is seen as a mark of credibility and community spirit within developer and engineering circles. William’s contributions demonstrate not only technical expertise but also a willingness to share knowledge and mentor others.
      </p>

      <div className={styles.leftHeading}>
        Mainstream Audiences:
      </div>
      <p className={styles.leftText}>
        For non-technical audiences, Stack Overflow activity is less visible or directly impactful, often blending into a general perception of "technical community involvement" without deeper understanding of its significance.
      </p>

      <div className={styles.redHeading}>
        Strategic Insight
      </div>
      <p className={styles.leftText}>
        Stack Overflow contributions play a secondary but valuable role in William’s broader brand strategy. They help humanize and soften the perception of elitism that can accompany achievements tied to large-scale financial ecosystems and foundational technical standards.
      </p>
      <p className={styles.leftText}>
        By showing a consistent willingness to engage, educate, and assist others at various technical levels, William reinforces an approachable, community-driven dimension to his brand.
      </p>
      <p className={styles.leftText}>
        However, compared to more direct and personal engagements — such as his Community Service Hours (CSH) podcast, where he visibly interacts with audiences in real time — Stack Overflow has relatively less potency as a branding tool. It remains an important character-building asset, adding relational depth, but is not positioned as a primary pillar of external brand visibility.
      </p>
    </div>
  );
}
