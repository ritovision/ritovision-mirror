'use client';

import React from 'react';
import styles from '../Public.module.css';

export default function Zeppelin() {
  return (
    <div className={styles.publicContainer}>
      <h3 className={styles.title}>
        <img
          src="/images/pages/projects/entriken/logos/OpenZeppelin.png"
          alt="OpenZeppelin Logo"
        />
        Open Zeppelin
      </h3>

      <p className={styles.leftText}>
        In addition to his work on Ethereum standards, William also contributes to OpenZeppelin — one of the most respected open-source frameworks for secure smart contract development in the blockchain industry.
      </p>
      <p className={styles.leftText}>
        His involvement includes providing feedback, identifying security improvements, and engaging with best practices around decentralized application infrastructure. This participation naturally coexists with his ongoing contributions to the Ethereum Improvement Proposal (EIP) ecosystem, reflecting a continuous stewardship role within the broader decentralized technology space.
      </p>

      <div className={styles.redHeading}>
        Strategic Insight
      </div>
      <p className={styles.leftText}>
        While OpenZeppelin contributions are meaningful within technical communities, they likely fall behind GitHub and EIP governance in terms of personal brand relevance, functioning more as a supplementary reinforcement of his active engagement with blockchain security practices.
      </p>
      <p className={styles.leftText}>
        William’s engagement with OpenZeppelin strengthens his technical credibility among developers and security specialists, while serving as a natural extension of his ongoing goodwill toward the decentralized innovation ecosystem.
      </p>
    </div>
  );
}
