'use client';

import React from 'react';
import styles from '../Public.module.css';

export default function EIP() {
  return (
    <div className={styles.publicContainer}>
      <h3 className={styles.title}>
        <img
          src="/images/pages/projects/entriken/logos/ethereum.png"
          alt="EIP Logo"
        />
        EIP
      </h3>

      <p className={styles.leftText}>
        Beyond his authorship of foundational Ethereum standards like ERC-721, William continues to contribute to the EIP (Ethereum Improvement Proposal) ecosystem.
      </p>
      <p className={styles.leftText}>
        He engages by providing feedback, directional input, and maintaining dialogue with the developer community — supporting the ongoing evolution of decentralized standards.
      </p>

      <div className={styles.redHeading}>
        Strategic Insight
      </div>
      <p className={styles.leftText}>
        While these activities are not major brand signals for mainstream audiences, they represent important ongoing goodwill toward the blockchain ecosystem he helped build within that niche audience.
      </p>
      <p className={styles.leftText}>
        This sustained involvement reflects a genuine commitment to the health and advancement of the space, and functions more as a gesture of goodwill rather than a major pillar of his public brand identity.
      </p>
    </div>
  );
}
