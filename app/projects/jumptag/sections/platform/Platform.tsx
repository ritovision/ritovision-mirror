// \test\app\projects\jumptag\sections\platform\Platform.tsx
'use client';

import React from 'react';
import FirstIteration from './components/FirstIteration';
import SecondIteration from './components/SecondIteration';
import ThirdIteration from './components/ThirdIteration';
import Shopify from './components/Shopify';
import RedHeader from '@/components/utilities/sections/RedHeader';
import styles from './Platform.module.css';

export default function Platform() {
  return (
    <section className={styles.platformWrapper || ''}>
      <RedHeader id="platform-development">Platform Development</RedHeader>
      <FirstIteration />
      <SecondIteration />
      <ThirdIteration />
      <Shopify />
    </section>
  );
}
