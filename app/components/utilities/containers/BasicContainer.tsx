'use client';

import React from 'react';
import styles from './BasicContainer.module.css';

export interface BasicContainerProps {
  title: string;
  paragraphs: string[];
}

export default function BasicContainer({ title, paragraphs }: BasicContainerProps) {
  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>{title}</h3>
      {paragraphs.map((text, i) => (
        <p key={i} className={styles.text}>
          {text}
        </p>
      ))}
    </div>
  );
}
