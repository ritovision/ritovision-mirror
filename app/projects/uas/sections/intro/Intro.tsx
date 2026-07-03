// app\projects\uas\sections\intro\Intro.tsx
import React from 'react';
import Overview from './components/Overview';
import TestimonialLocal from '../../../entriken/sections/intro/components/TestimonialLocal';
import Toc from './components/Toc';
import Activities from './components/Activities';
import Cycles from './components/Cycles';
import styles from './Intro.module.css';

export default function Intro() {
  return (
    <section className={styles.introSection}>
      <Overview />
      <TestimonialLocal />
      <Toc />
      <Activities />
      <Cycles />
    </section>
  );
}
