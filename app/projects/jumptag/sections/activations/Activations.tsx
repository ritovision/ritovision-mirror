// projects\jumptag\sections\activations\Activations.tsx
'use client';

import React from 'react';
import Demode from './components/Demode';
import Sponsorship from './components/Sponsorship';
import RedHeader from '@/components/utilities/sections/RedHeader';
import styles from './Activations.module.css';

export default function Activations() {
  return (
    <section className={styles.wrapper}>
      <RedHeader id="new-york-fashion-week-activations">
        New York Fashion Week Activations
      </RedHeader>
      <Demode />
      <Sponsorship />
    </section>
  );
}
