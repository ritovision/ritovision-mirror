'use client';

import React from 'react';
import styles from './Intro.module.css';
import Hero from '../hero/Hero';
import Overview from './components/Overview';
import Toc from './components/Toc';
import Highlights from './components/Highlights';

export default function Intro() {
  return (
    <section className={styles.intro}>
      <Hero />
      <Overview />
      <Toc />
      <Highlights />
    </section>
  );
}
