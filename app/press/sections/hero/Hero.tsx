// app\press\sections\hero\Hero.tsx
'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import styles from './hero.module.css';
import { useDeferredActivation } from '@/hooks/useDeferredActivation';

const DynamicWhiteOrbs = dynamic(
  () => import('@/components/utilities/particles/WhiteOrbs'),
  { ssr: false }
);

const Hero: React.FC = () => {
  const animationsReady = useDeferredActivation(true);
  const [revealPercentage, setRevealPercentage] = useState(0);
  const [showOrbs, setShowOrbs] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [animationsStarted, setAnimationsStarted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const checkScreen = () => {
      if (window.innerWidth >= 730) {
        setShowOrbs(true);
        setShowVideo(false);
      } else {
        setShowOrbs(false);
        setShowVideo(true);
      }
    };
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (showVideo && video) {
      const onCanPlay = () => {
        video.play();
        video.classList.add(styles.videoVisible);
      };
      video.addEventListener('canplay', onCanPlay);
      video.load();
      return () => video.removeEventListener('canplay', onCanPlay);
    }
  }, [showVideo]);

  const handleVideoEnded = () => {
    if (!videoRef.current) return;
    videoRef.current.classList.remove(styles.videoVisible);
    setTimeout(() => {
      videoRef.current!.currentTime = 0;
      videoRef.current!.play();
      videoRef.current!.classList.add(styles.videoVisible);
    }, 500);
  };

  useEffect(() => {
    if (!animationsReady) return;
    const timer = setTimeout(() => setAnimationsStarted(true), 1000);
    return () => clearTimeout(timer);
  }, [animationsReady]);

  useEffect(() => {
    if (!animationsStarted) return;
    const delay = 1200;
    const duration = 2000;
    const start = Date.now() + delay;
    let frame: number;

    const animate = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(Math.max(elapsed / duration, 0), 1);
      setRevealPercentage(progress * 100);
      if (progress < 1) frame = requestAnimationFrame(animate);
    };

    const t = setTimeout(() => (frame = requestAnimationFrame(animate)), delay);
    return () => {
      clearTimeout(t);
      cancelAnimationFrame(frame);
    };
  }, [animationsStarted]);

  const getTextStyle = (d: number) => ({
    opacity: animationsStarted ? 1 : 0,
    transition: 'opacity 0.5s ease-in-out',
    transitionDelay: animationsStarted ? `${d}s` : '0s',
  });

  const svgClass = animationsStarted
    ? `${styles.svgPath} ${styles.animateSvg}`
    : styles.svgPath;

  return (
    <section className={styles.heroWrapper}>
      {showOrbs && (
        <div className={styles.whiteOrbsBg}>
          <DynamicWhiteOrbs height="100%" />
        </div>
      )}
      {showVideo && (
        <div className={styles.videoWrapper}>
          <video
            ref={videoRef}
            className={styles.videoLayer}
            onEnded={handleVideoEnded}
            src="/video/Particle-Effect-blueBG-BlueOrbs1.webm"
            muted
            playsInline
            preload="auto"
          />
        </div>
      )}
      <div className={`${styles.container} ${animationsStarted ? styles.blueBg : ''}`}>
        <div
          className={styles.bgLayer}
          style={{ clipPath: `inset(${100 - revealPercentage}% 0 0 0)` }}
        />
        <div
          className={styles.imageLayer}
          style={{ clipPath: `inset(${100 - revealPercentage}% 0 0 0)` }}
        >
          <Image
            src="/images/home/hero/rito-picture1.png"
            alt="Rito Picture"
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 700px) 90vw, 700px"
          />
        </div>
        <div className={styles.textLayer}>
          <div className={`${styles.textBlock} ${styles.topLeft}`} style={getTextStyle(0)}>
            Creative
          </div>
          <div className={`${styles.textBlock} ${styles.middleRight}`} style={getTextStyle(0.5)}>
            Authoritative
          </div>
          <div className={`${styles.textBlock} ${styles.bottomCenter}`} style={getTextStyle(1)}>
            A Multi-Disciplinary Visionary
          </div>
        </div>
        <svg className={styles.svgBorder} viewBox="0 0 100 100" preserveAspectRatio="none">
          <path className={svgClass} d="M50,0 L0,0 L0,100 L50,100" />
          <path className={svgClass} d="M50,0 L100,0 L100,100 L50,100" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
