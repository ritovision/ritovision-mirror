'use client';

import React from 'react';
import Strategy from './components/Strategy';
import WebsiteTable from './components/WebsiteTable';
import Wix from './components/Wix';
import SEO from './components/SEO';
import UX from './components/UX';
import Creative from './components/Creative';
import styles from './Breakdown.module.css';

export default function Breakdown() {
  return (
    <section className={styles.breakdownSection}>
      <Strategy />
      <WebsiteTable />
      <UX />
      <Creative />
      <Wix />
      <SEO />
    </section>
  );
}
