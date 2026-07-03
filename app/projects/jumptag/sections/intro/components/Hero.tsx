'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import styles from './Hero.module.css';

const heroImages = [
  '/images/pages/projects/jumptag/hero/hero1.jpg',
  '/images/pages/projects/jumptag/hero/hero2.jpg',
  '/images/pages/projects/jumptag/hero/hero3.jpg',
  '/images/pages/projects/jumptag/hero/hero4.jpg',
  '/images/pages/projects/jumptag/hero/hero5.jpg',
  '/images/pages/projects/jumptag/hero/hero6.jpg',
];

export default function Hero() {
  const [isLoaded, setIsLoaded]     = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isSliding, setIsSliding]   = useState(false);
  const timeoutRef                  = useRef<NodeJS.Timeout | null>(null);

  // Advance to the next slide, then schedule the next advance
  const advanceSlide = useCallback(() => {
    setIsSliding(true);
    const slideTimer = setTimeout(() => {
      setActiveIndex(prev => (prev + 1) % heroImages.length);
      setIsSliding(false);
      timeoutRef.current = setTimeout(advanceSlide, 2000);
    }, 500);
    return () => clearTimeout(slideTimer);
  }, []);

  useEffect(() => {
    setIsLoaded(true);
    // start first advance after 1s
    timeoutRef.current = setTimeout(advanceSlide, 1000);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [advanceSlide]);

  const nextIndex = (activeIndex + 1) % heroImages.length;

  return (
    <div className={`${styles.heroContainer} ${isLoaded ? styles.loaded : ''}`}>
      <div className={styles.slideshow}>
        {/* Next image underneath */}
        <div className={styles.nextImage}>
          <Image
            src={heroImages[nextIndex]}
            alt={`Jumptag showcase ${nextIndex + 1}`}
            fill
            sizes="(max-width: 500px) 90vw, 500px"
            className={styles.image}
          />
        </div>

        {/* Current image (static when not sliding) */}
        {!isSliding && (
          <div className={styles.currentImage}>
            <Image
              src={heroImages[activeIndex]}
              alt={`Jumptag showcase ${activeIndex + 1}`}
              fill
              priority
              sizes="(max-width: 500px) 90vw, 500px"
              className={styles.image}
            />
          </div>
        )}

        {/* Sliding image (during transition) */}
        {isSliding && (
          <div className={styles.slidingImage}>
            <Image
              src={heroImages[activeIndex]}
              alt={`Jumptag showcase ${activeIndex + 1}`}
              fill
              priority
              sizes="(max-width: 500px) 90vw, 500px"
              className={styles.image}
            />
          </div>
        )}
      </div>
    </div>
  );
}
