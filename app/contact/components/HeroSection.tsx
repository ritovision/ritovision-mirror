'use client'

import React, { useState, useEffect } from 'react';
import styles from './HeroSection.module.css';
import { useDeferredActivation } from '@/hooks/useDeferredActivation';

const HeroSection: React.FC = () => {
  const [shouldActivate, setShouldActivate] = useState(false);
  const isReady = useDeferredActivation(shouldActivate);
  
  // Set shouldActivate to true after component mounts
  useEffect(() => {
    setShouldActivate(true);
  }, []);

  return (
    <div className={`blueglow ${styles.heroContainer}`}>

      <img 
        src="/images/home/hero/rito-picture2.jpg" 
        alt="Rito Picture" 
        className={`${styles.heroImage} ${isReady ? styles.animate : ''}`} 
      />
      <div className={`${styles.heroText} ${isReady ? styles.animate : ''}`}>
        Get in Touch with RitoVision
      </div>
    </div>
  );
};

export default HeroSection;