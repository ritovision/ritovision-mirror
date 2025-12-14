// app\projects\uas\sections\intro\components\Cycles.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import styles from './Cycles.module.css';
import Button from '@/components/utilities/buttons/Button';

export default function Cycles() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 730);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const rootMargin = isMobile ? '0px 0px -20% 0px' : '0px 0px -10% 0px';

  const [ref1, inView1] = useInView({ triggerOnce: true, rootMargin });
  const [ref2, inView2] = useInView({ triggerOnce: true, rootMargin });
  const [ref3, inView3] = useInView({ triggerOnce: true, rootMargin });

  return (
    <div id="planning-cycles" className={`defaulttopspace ${styles.container}`}>
      <h2 className={styles.title}>Managed Three Planning Cycles:</h2>

      <div
        ref={ref1}
        className={`${styles.cycleBox} ${inView1 ? styles.visible : styles.hidden}`}
      >
        <span className={styles.label}>Cycle I:</span>
        <span className={styles.text}>
          Targeted Rarible directly as primary integration point
        </span>
      </div>

      <div
        ref={ref2}
        className={`${styles.cycleBox} ${inView2 ? styles.visible : styles.hidden}`}
      >
        <span className={styles.label}>Cycle II:</span>
        <span className={styles.text}>
          Pivoted to focus on the Rarible Protocol’s 4,000-strong developer ecosystem
        </span>
      </div>

      <div
        ref={ref3}
        className={`${styles.cycleBox} ${inView3 ? styles.visible : styles.hidden}`}
      >
        <span className={styles.label}>Cycle III:</span>
        <span className={styles.text}>
          Scoped a full Rari Foundation and Rarible Protocol overhaul and governance reform to drive ERC adoption at scale
        </span>
      </div>

      {/* Static button section, no fade-in */}
      <div className={styles.buttonWrapper}>
        <p className={styles.introText}>
          To learn more about the cycle’s in depth strategy and execution, read the narrative accounting
        </p>
        <Button
          href="#full-narrative-of-erc-journey"
          text="Read UAS Chronicles"
          variant="blueAccentButton"
          className={styles.button}
        />
      </div>
    </div>
  );
}
