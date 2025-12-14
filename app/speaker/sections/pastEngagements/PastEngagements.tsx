'use client';

import React from 'react';
import styles from './PastEngagements.module.css';
import Dogepalooza from '../../components/Dogepalooza';
import Radio from '../../components/Radio';
import Uas from '../../components/Uas';

const PastEngagements = () => {
  return (
    <section className={styles.pastEngagementsSection}>
      <h2 className={`headingLarge ${styles.sectionTitle}`}>
        Past Engagements
      </h2>
      <div className={styles.engagementsContainer}>
        <Dogepalooza />
        <Radio />
        <Uas />
      </div>
    </section>
  );
};

export default PastEngagements;
