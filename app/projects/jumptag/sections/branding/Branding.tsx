// \test\app\projects\jumptag\sections\branding\Branding.tsx
'use client';

import React from 'react';
import styles from './Branding.module.css';

import Identity from './components/Identity';
import Photography from './components/Photography';
import Music from './components/Music';
import RedHeader from '@/components/utilities/sections/RedHeader';

export default function BrandingSection() {
  return (
    <section className={styles.wrapper}>
      <RedHeader id="branding-and-visual-identity">Branding & Visual Identity</RedHeader>
      <Identity />
      <Photography />
      <Music />
    </section>
  );
}
