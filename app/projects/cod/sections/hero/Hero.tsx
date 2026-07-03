'use client';

import { useEffect, useState } from 'react';
import styles from './Hero.module.css';
import Image from 'next/image';

const Hero = () => {
  const [animationPhase, setAnimationPhase] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Set loaded state to prevent layout shifts
    setIsLoaded(true);
    
    // Phase 1: Activision animation
    const phase1 = setTimeout(() => setAnimationPhase(1), 100);
    
    // Phase 2: Infinity Ward animation
    const phase2 = setTimeout(() => setAnimationPhase(2), 800);
    
    // Phase 3: Raven Software animation
    const phase3 = setTimeout(() => setAnimationPhase(3), 1500);
    
    // Phase 4: Delay
    const phase4 = setTimeout(() => setAnimationPhase(4), 2000);
    
    // Phase 5: Final animation (fade out logos, fade in Warzone)
    const phase5 = setTimeout(() => setAnimationPhase(5), 2500);

    // Cleanup timeouts
    return () => {
      clearTimeout(phase1);
      clearTimeout(phase2);
      clearTimeout(phase3);
      clearTimeout(phase4);
      clearTimeout(phase5);
    };
  }, []);

  return (
    <div className={`${styles.heroContainer} ${isLoaded ? styles.loaded : ''}`}>
      <div className={styles.imagesContainer}>
        <div className={`${styles.logoContainer} ${animationPhase >= 1 ? styles.fadeIn : ''} ${animationPhase >= 5 ? styles.fadeOutScale : ''}`}>
          <Image
            src="/images/pages/projects/cod/hero/activision.jpg"
            alt="Activision"
            width={400}
            height={100}
            className={styles.logoImage}
            priority
          />
        </div>
        
        <div className={`${styles.logoContainer} ${animationPhase >= 2 ? styles.fadeIn : ''} ${animationPhase >= 5 ? styles.fadeOutScale : ''}`}>
          <Image
            src="/images/pages/projects/cod/hero/infinityward.jpg"
            alt="Infinity Ward"
            width={400}
            height={100}
            className={styles.logoImage}
            priority
          />
        </div>
        
        <div className={`${styles.logoContainer} ${animationPhase >= 3 ? styles.fadeIn : ''} ${animationPhase >= 5 ? styles.fadeOutScale : ''}`}>
          <Image
            src="/images/pages/projects/cod/hero/ravensoftware.jpg"
            alt="Raven Software"
            width={400}
            height={100}
            className={styles.logoImage}
            priority
          />
        </div>
      </div>
      
      <div className={`${styles.warzoneWrapper} ${animationPhase >= 5 ? styles.warzoneVisible : ''}`}>
        <Image
          src="/images/pages/projects/cod/hero/warzone.webp"
          alt="Warzone"
          width={1000}
          height={500}
          className={styles.warzoneImage}
          priority
        />
      </div>
    </div>
  );
};

export default Hero;