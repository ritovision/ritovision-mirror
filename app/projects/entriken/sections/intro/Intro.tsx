'use client';

import React from 'react';
import Overview from './components/Overview';
import Problems from './components/Problems';
import TestimonialLocal from './components/TestimonialLocal';
import Privacy from './components/Privacy';
import Toc from './components/Toc';
import styles from './Intro.module.css';

export default function Intro() {
  return (
    <section className={styles.introSection}>
      <Overview />
      <Toc />
      <Problems />
      <TestimonialLocal />
      <Privacy />
    </section>
  );
}
