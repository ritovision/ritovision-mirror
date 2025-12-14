'use client';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import BlockTextSequence from '@/press/components/BlockTextSequence';
import WhiteOrbs from '@/components/utilities/particles/WhiteOrbs';
import styles from './HeroOrbsDesktop.module.css';

export default function HeroOrbsDesktop() {
  // Read the isTransitioning flag from Redux
  const isTransitioning = useSelector((state: RootState) => state.menuTransition.isTransitioning);
  const [animationReady, setAnimationReady] = useState(false);

  // Only set the animation to be ready when isTransitioning is false.
  useEffect(() => {
    setAnimationReady(!isTransitioning);
  }, [isTransitioning]);

  return (
    <WhiteOrbs
      height="100vh"
      background={0x012035}
      circleColor={0x04426C}
      glowColor={0x04426C}
    >
      <div className={styles.heroContainer}>
        <div className={styles.desktopContainer}>
          {animationReady ? (
            <BlockTextSequence />
          ) : (
            // Placeholder to reserve space while waiting for transition to complete.
            <div style={{ height: '100vh' }} />
          )}
        </div>
        {/* New gradient overlay at the bottom */}
        <div className={styles.bottomGradient}></div>
      </div>
    </WhiteOrbs>
  );
}
