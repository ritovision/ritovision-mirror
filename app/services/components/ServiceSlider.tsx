'use client';

import React, { useState, useRef, useEffect } from 'react';
import styles from './ServiceSlider.module.css';

interface ServiceSliderProps {
  heading: string;
  backgroundImage: string;
  slides: string[];
}

const ServiceSlider: React.FC<ServiceSliderProps> = ({ heading, backgroundImage, slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  const hasMultipleSlides = slides.length > 1;

  const goToSlide = (index: number) => {
    if (isTransitioning || !hasMultipleSlides) return;
    
    let nextIndex = index;
    if (nextIndex < 0) nextIndex = slides.length - 1;
    if (nextIndex >= slides.length) nextIndex = 0;
    
    setIsTransitioning(true);
    setCurrentIndex(nextIndex);
  };

  const handleTransitionEnd = () => {
    setIsTransitioning(false);
  };

  const next = () => goToSlide(currentIndex + 1);
  const prev = () => goToSlide(currentIndex - 1);

  // Touch/swipe events
  const onTouchStart = (e: React.TouchEvent) => {
    if (isTransitioning) return;
    touchStartX.current = e.touches[0].clientX;
  };
  
  const onTouchEnd = (e: React.TouchEvent) => {
    if (isTransitioning || touchStartX.current === null || !hasMultipleSlides) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    touchStartX.current = null;
    
    if (diff > 50) next();
    else if (diff < -50) prev();
  };

  // Background fade-in on scroll
  useEffect(() => {
    if (!bgRef.current) return;
    const obs = new IntersectionObserver(
      ([ent]) => {
        if (ent.isIntersecting) {
          bgRef.current!.classList.add(styles.visible);
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(bgRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      className={`${styles.sliderContainer} ${isTransitioning ? styles.disabled : ''}`}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div
        ref={bgRef}
        className={styles.background}
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />

      <div className={styles.titleContainer}>
        <h3 className={styles.title}>{heading}</h3>
      </div>

      <div className={styles.slideWrapper}>
        {slides.map((text, index) => (
          <div 
            key={index} 
            className={styles.slide}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              opacity: index === currentIndex ? 1 : 0,
              transition: 'opacity 0.3s ease',
              zIndex: index === currentIndex ? 1 : 0,
            }}
            onTransitionEnd={index === currentIndex ? handleTransitionEnd : undefined}
          >
            <div className={styles.bodyContainer}>
              <p className={styles.text}>{text}</p>
            </div>
          </div>
        ))}
      </div>

      {hasMultipleSlides && (
        <>
          <button className={styles.arrowLeft} onClick={prev}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                 strokeLinejoin="round">
              <polyline points="20,5.07 16,12 20,18.93" />
            </svg>
          </button>

          <button className={styles.arrowRight} onClick={next}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                 strokeLinejoin="round">
              <polyline points="4,5.07 8,12 4,18.93" />
            </svg>
          </button>

          <div className={styles.nav}>
            {slides.map((_, i) => (
              <button
                key={i}
                className={`${styles.navCircle} ${currentIndex === i ? styles.active : ''}`}
                onClick={() => goToSlide(i)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ServiceSlider;
