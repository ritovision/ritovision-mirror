'use client';

import React from 'react';
import styles from './Checkmark.module.css';

export interface CheckmarkProps {
  isChecked: boolean;
  onToggle: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export default function Checkmark({ isChecked, onToggle }: CheckmarkProps) {
  return (
    <div className={styles.checkboxContainer} onClick={onToggle}>
      {isChecked && (
        <svg
          className={styles.checkmark}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 13L9 17L19 7"
            stroke="#11C045"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </div>
  );
}
