'use client';

import React, { useState, useEffect } from 'react';
import styles from './Hero.module.css';

const IMAGE_DURATION = 1000;
const BAR_DURATION   = 800;
const TEXT_DURATION  = 600;

export default function Hero() {
  const [showImage,     setShowImage]     = useState(false);
  const [showBar1,      setShowBar1]      = useState(false);
  const [showBar1Text,  setShowBar1Text]  = useState(false);
  const [showBar2,      setShowBar2]      = useState(false);
  const [showBar2Text,  setShowBar2Text]  = useState(false);
  const [showBar3,      setShowBar3]      = useState(false);
  const [showBar3Text,  setShowBar3Text]  = useState(false);

  useEffect(() => {
    setShowImage(true);
    const t1 = setTimeout(() => {
      setShowBar1(true);
      const t2 = setTimeout(() => {
        setShowBar1Text(true);
        const t3 = setTimeout(() => {
          setShowBar2(true);
          const t4 = setTimeout(() => {
            setShowBar2Text(true);
            const t5 = setTimeout(() => {
              setShowBar3(true);
              const t6 = setTimeout(() => {
                setShowBar3Text(true);
              }, TEXT_DURATION);
              return () => clearTimeout(t6);
            }, BAR_DURATION);
            return () => clearTimeout(t5);
          }, TEXT_DURATION);
          return () => clearTimeout(t4);
        }, BAR_DURATION);
        return () => clearTimeout(t3);
      }, TEXT_DURATION);
      return () => clearTimeout(t2);
    }, IMAGE_DURATION);

    return () => clearTimeout(t1);
  }, []);

  return (
    <div className={styles.hero}>
      <div className={styles.imageContainer}>
        <img
          src="/images/pages/projects/fansite/caroline-hero.jpg"
          alt="Caroline Vreeland"
          className={`${styles.image} ${showImage ? styles.visible : ''}`}
        />

        {/* BAR 1 */}
        <div
          className={`
            ${styles.bar} ${styles.bar1}
            ${showBar1 ? styles.visible : ''}
          `}
        >
          <span className={`${styles.text} ${showBar1Text ? styles.visibleText : ''}`}>
            Highlighted in <em>The New York Times</em>
          </span>
        </div>

        {/* BAR 2 */}
        <div
          className={`
            ${styles.bar} ${styles.bar2}
            ${showBar2 ? styles.visible : ''}
          `}
        >
          <span className={`${styles.text} ${showBar2Text ? styles.visibleText : ''}`}>
            100k Website Visits in a Year{' '}
            <span className={styles.highlight}>without</span>{' '}
            Paid Marketing
          </span>
        </div>

        {/* BAR 3 */}
        <div
          className={`
            ${styles.bar} ${styles.bar3}
            ${showBar3 ? styles.visible : ''}
          `}
        >
          <span className={`${styles.text} ${showBar3Text ? styles.visibleText : ''}`}>
            Consistently{' '}
            <span className={styles.highlight2}>Top 10</span>{' '}
            Ranked Site on Google Search for her Name
          </span>
        </div>
      </div>
    </div>
  );
}
