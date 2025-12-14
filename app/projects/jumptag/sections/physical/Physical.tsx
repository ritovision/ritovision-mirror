// \test\app\projects\jumptag\sections\physical\Physical.tsx
'use client';

import React from 'react';
import Jewelry from './components/Jewelry';
import RedHeader from '@/components/utilities/sections/RedHeader';
import styles from './Physical.module.css';

export default function Physical() {
  return (
    <section className={styles.wrapper}>
      <RedHeader id="physical-product">Physical Product</RedHeader>
      <Jewelry />
    </section>
  );
}
