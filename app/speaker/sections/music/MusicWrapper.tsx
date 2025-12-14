'use client';

import React from 'react';
import styles from './MusicWrapper.module.css';
import Music from '@/speaker/components/Music';

const MusicWrapper: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <h2 className={`headingLarge defaulttopspace ${styles.heading}`}>
        Infotaining Songs for Events
      </h2>
      <Music />
    </div>
  );
};

export default MusicWrapper;
