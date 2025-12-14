'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './Hero.module.css';
import { useDeferredActivation } from '@/hooks/useDeferredActivation';

const Hero = () => {
  // toggles true after menu-close transition, false on menu-open
  const shouldActivate = useDeferredActivation(true);
  
  // 0 = before any animation, 1 = images in, 2 = image fade → then text anims
  const [stage, setStage] = useState(0);
  const [leftImageDone, setLeftImageDone] = useState(false);
  const [rightImageDone, setRightImageDone] = useState(false);

  // RESET everything back to square-one whenever the menu is opened
  useEffect(() => {
    if (!shouldActivate) {
      setStage(0);
      setLeftImageDone(false);
      setRightImageDone(false);
    }
  }, [shouldActivate]);

  // Stage 1: fire when shouldActivate → true
  useEffect(() => {
    if (!shouldActivate) return;

    const t = setTimeout(() => setStage(1), 500);
    return () => clearTimeout(t);
  }, [shouldActivate]);

  // Stage 2: after your two-image sequence
  useEffect(() => {
    if (stage !== 1) return;

    const t = setTimeout(() => setStage(2), 1500);
    return () => clearTimeout(t);
  }, [stage]);

  // Left text
  useEffect(() => {
    if (stage !== 2) return;

    const t = setTimeout(() => setLeftImageDone(true), 500);
    return () => clearTimeout(t);
  }, [stage]);

  // Right text
  useEffect(() => {
    if (!leftImageDone) return;

    const t = setTimeout(() => setRightImageDone(true), 750);
    return () => clearTimeout(t);
  }, [leftImageDone]);

  return (
    <div className={styles.heroWrapper}>
      <div className={styles.heroContainer}>
        <div className={styles.topRow}>
          <div
            className={`
              ${styles.imageContainer}
              ${styles.leftImage}
              ${shouldActivate && stage >= 1 ? styles.show : ''}
            `}
          >
            <div className={styles.aspectRatioBox}>
              <Image
                src="/images/pages/speaker/hero/cerebral.jpg"
                alt="Speaker on stage"
                fill
                className={`
                  ${styles.image}
                  ${shouldActivate && stage >= 2 ? styles.transparent : ''}
                `}
                sizes="(max-width: 600px) 45vw, (max-width: 900px) 40vw, 400px"
                priority
              />
              <h2
                className={`
                  ${styles.imageText}
                  ${styles.leftText}
                  ${shouldActivate && stage >= 2 ? styles.showText : ''}
                `}
              >
                Cerebral
              </h2>
            </div>
          </div>

          <div
            className={`
              ${styles.imageContainer}
              ${styles.rightImage}
              ${shouldActivate && stage >= 1 ? styles.showDelayed : ''}
            `}
          >
            <div className={styles.aspectRatioBox}>
              <Image
                src="/images/pages/speaker/hero/ritorhymes.jpg"
                alt="Speaker presenting"
                fill
                className={`
                  ${styles.image}
                  ${shouldActivate && leftImageDone ? styles.transparentDelayed : ''}
                `}
                sizes="(max-width: 600px) 45vw, (max-width: 900px) 40vw, 400px"
                priority
              />
              <h2
                className={`
                  ${styles.imageText}
                  ${styles.rightText}
                  ${shouldActivate && leftImageDone ? styles.showTextFromRight : ''}
                `}
              >
                Exciting
              </h2>
            </div>
          </div>
        </div>

        <div
          className={`
            ${styles.imageContainer}
            ${styles.bottomImage}
            ${shouldActivate && stage >= 1 ? styles.showBottom : ''}
          `}
        >
          <Image
            src="/images/pages/speaker/hero/speakerbg1.jpg"
            alt="Speaker with audience"
            fill
            className={`
              ${styles.image}
              ${shouldActivate && rightImageDone ? styles.transparentDelayedMore : ''}
            `}
            sizes="(max-width: 600px) 95vw, (max-width: 900px) 85vw, 900px"
            priority
          />
          <h1
            className={`
              ${styles.imageText}
              ${styles.bottomText}
              ${shouldActivate && rightImageDone ? styles.showTextFromTop : ''}
            `}
          >
            Unconventional
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Hero;
