// app\press\sections\coverage\Coverage.tsx
'use client';
import React from 'react';
import PressIntro from './components/PressIntro';
import CarolineSection from './components/CarolineSection';
import WABCSection from './components/WABCSection';
import StockheadSection from './components/StockheadSection';
import DogecoinUTodaySection from './components/DogecoinUTodaySection';
import HackernoonSection from './components/HackernoonSection';
import VideogameCampaignSection from './components/VideogameCampaignSection';
import styles from './coverage.module.css';

const Coverage = () => (
  <>
    <PressIntro />
    <div className={styles.pressShowcase}>
      <h2 className={`headingLarge ${styles.pressHeading}`}>
        Press Coverage Snapshots
      </h2>
      <CarolineSection />
      <WABCSection />
      <StockheadSection />
      <DogecoinUTodaySection />
      <HackernoonSection />
      <VideogameCampaignSection />
    </div>
  </>
);

export default Coverage;
