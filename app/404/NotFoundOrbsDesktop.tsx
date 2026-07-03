// ./app/components/pages/404/NotFoundOrbsDesktop.tsx
'use client';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import AnimatedSvgBorderBlock from '../home/hero/AnimatedSvgBorderBlock';
import WhiteOrbs from '@/components/utilities/particles/WhiteOrbs';
import styles from './NotFoundOrbsDesktop.module.css';

export default function NotFoundOrbsDesktop() {
  const items = useMemo(
    () => [
      { text: '404 Error',      color: '#FFFFFF' },
      { text: 'Page Not Found',  color: '#FFFFFF' },
      { text: 'So sorry about that', color: '#FC1819' },
    ],
    []
  );

  const [visibleIndex, setVisibleIndex] = useState(-1);
  const [, setFadeOut] = useState(false);
  const [iteration, setIteration] = useState(0);
  const [initialized, setInitialized] = useState(false);
  const timers = useRef<NodeJS.Timeout[]>([]);
  const resetTimer = useRef<NodeJS.Timeout | null>(null);

  const startSequence = useCallback(() => {
    // clear existing timers
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setVisibleIndex(-1);

    // schedule new reveals
    items.forEach((_, i) => {
      const t = setTimeout(() => {
        setVisibleIndex(i);
      }, 800 * i);
      timers.current.push(t);
    });
  }, [items]);

  // initial run
  useEffect(() => {
    if (!initialized) {
      startSequence();
      setInitialized(true);
    }
  }, [initialized, startSequence]);

  // loop every 60s
  useEffect(() => {
    const loop = setInterval(() => {
      setFadeOut(true);
      if (resetTimer.current) clearTimeout(resetTimer.current);
      resetTimer.current = setTimeout(() => {
        setFadeOut(false);
        timers.current.forEach(clearTimeout);
        timers.current = [];
        setVisibleIndex(-1);
        setIteration((n) => n + 1);
        startSequence();
      }, 2000);
    }, 60000);

    return () => {
      clearInterval(loop);
      if (resetTimer.current) clearTimeout(resetTimer.current);
      timers.current.forEach(clearTimeout);
    };
  }, [startSequence]);

  return (
    <WhiteOrbs height="100vh" background={0x012035} circleColor={0x04426C} glowColor={0x04426C}>
      <div className={styles.heroContainer}>
        <div className={styles.desktopContainer}>
          {items.map((item, idx) => (
            <AnimatedSvgBorderBlock
              key={`${iteration}-${idx}`}
              text={item.text}
              textColor={item.color}
              borderColor="var(--secondary-blue)"
              isVisible={idx <= visibleIndex}
              animationDuration={600}
              extraClassName={
                idx === 0
                  ? styles.leftAlign
                  : idx === 1
                  ? styles.rightAlign
                  : styles.centerAlign
              }
            />
          ))}
        </div>
        <div className={styles.bottomGradient}></div>
      </div>
    </WhiteOrbs>
  );
}
