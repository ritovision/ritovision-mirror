'use client';
import React from 'react';
import styles from './SectionHeading.module.css';

interface SectionHeadingProps {
  title: string;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({ title }) => {
  return (
    <div className={styles.headingWrapper}>
      <h1 className={styles.heading}>{title}</h1>
    </div>
  );
};

export default SectionHeading;
