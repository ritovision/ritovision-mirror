// FILE PATH: app/components/utilities/sections/RedHeader.tsx
'use client';

import React from 'react';
import styles from './RedHeader.module.css';

interface RedHeaderProps {
  id: string;
  children: React.ReactNode;
}

export default function RedHeader({ id, children }: RedHeaderProps) {
  return (
    <div className={styles.wrapper}>
      <h2 id={id} className={styles.heading}>
        {children}
      </h2>
    </div>
  );
}
