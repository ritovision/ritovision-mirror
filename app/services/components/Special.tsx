//app/components/pages/services/Special.tsx
"use client";

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Button from '@/utilities/buttons/Button';
import styles from './Special.module.css';

const Special = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animationStep, setAnimationStep] = useState(0);
  const componentRef = useRef<HTMLDivElement>(null);
  const headerText = "A Bespoke Velocity-Building Package";

  const titleBannerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [borderAnimationComplete, setBorderAnimationComplete] = useState(false);
  const borderAnimationDuration = 1000;

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) setIsVisible(true);
      },
      {
        root: null,
        rootMargin: window.innerWidth > 730 ? '0px 0px -10% 0px' : '0px 0px -20% 0px',
        threshold: 0.1,
      }
    );
    const node = componentRef.current;
    if (node) observer.observe(node);
    return () => {
      if (node) observer.unobserve(node);
    };
  }, []);

  const updateDimensions = () => {
    if (titleBannerRef.current) {
      const { width, height } = titleBannerRef.current.getBoundingClientRect();
      setDimensions({ width, height });
    }
  };

  useEffect(() => {
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    updateDimensions();
    requestAnimationFrame(() => {
      setBorderAnimationComplete(true);
    });
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;
    const delays = [0, 1000, 2000, 3000, 4000, 5000];
    const timers = delays.map((delay, i) =>
      setTimeout(() => setAnimationStep(i + 1), delay)
    );
    return () => timers.forEach(clearTimeout);
  }, [isVisible]);

  const pathLength = dimensions.width + dimensions.height;

  return (
    <div ref={componentRef} className={styles.container}>
      <div className={`${styles.titleBannerContainer} ${isVisible ? styles.visible : ''}`}>
        <div ref={titleBannerRef} className={styles.titleBanner}>
          <video
            autoPlay
            muted
            loop
            playsInline
            className={styles.backgroundVideo}
          >
            <source
              src="/video/Particle-Effect-blueBG-BlueOrbs1.webm"
              type="video/webm"
            />
            Your browser does not support the video tag.
          </video>
          {dimensions.width > 0 && dimensions.height > 0 && (
            <svg width={dimensions.width} height={dimensions.height} className={styles.borderSvg}>
              {['left', 'right'].map(side => (
                <path
                  key={side}
                  d={
                    side === 'left'
                      ? `M ${dimensions.width / 2} 0 L 0 0 L 0 ${dimensions.height} L ${dimensions.width / 2} ${dimensions.height}`
                      : `M ${dimensions.width / 2} 0 L ${dimensions.width} 0 L ${dimensions.width} ${dimensions.height} L ${dimensions.width / 2} ${dimensions.height}`
                  }
                  fill="none"
                  stroke="var(--primary-red)"
                  strokeWidth="1"
                  style={{
                    strokeDasharray: pathLength,
                    strokeDashoffset: borderAnimationComplete ? 0 : pathLength,
                    transition: `stroke-dashoffset ${borderAnimationDuration}ms ease-out`,
                  }}
                />
              ))}
            </svg>
          )}
          <div className={styles.titleContent}>
            <span className={`${styles.word} ${animationStep >= 1 ? styles.visibleWord : ''}`}>Visionary</span>
            <span className={`${styles.word} ${animationStep >= 2 ? styles.visibleIntegration : ''}`}>Integration</span>
            <span className={`${styles.word} ${animationStep >= 3 ? styles.visibleAccelerator : ''}`}>Accelerator</span>
          </div>
        </div>
      </div>

      <div className={`${styles.imageContainer} ${animationStep >= 3 ? `${styles.imageVisible} redglow` : ''}`}>
        <div className={styles.imageContent}>
          <Image
            src="/images/pages/services/special.jpg"
            alt="Visionary Integration Accelerator"
            fill
            style={{ objectFit: 'cover' }}
            className={styles.heroImage}
          />
          <div className={styles.headerWrapper}>
            {animationStep >= 4 && (
              <h3 className={`${styles.imageHeader} ${styles.typeWriter}`}>{headerText}</h3>
            )}
          </div>
          <p className={`${styles.imageText} ${animationStep >= 5 ? styles.fadeIn : ''}`}>
            As your <strong>Strategic Synthesis Specialist</strong>, Rito embeds alongside your team to act as the connective tissue between vision and reality aligning product strategy, technical architecture, brand identity, user experience, and go-to-market direction into one coherent roadmap. <br /><br />This is a strategic partnership where Rito coordinates with your team to get inside your challenges, design the structure, and accelerate quality outcomes across across disciplines.
            <br /><br />
            The result is a clarified product vision, a sharp system of execution, and a foundation that doesn’t just scale... it positions you for leadership in your space.
          </p>
          <div className={`${styles.buttonContainer} ${animationStep >= 6 ? styles.buttonVisible : ''}`}>
            <Button variant="blueAccentButton" text="Discovery Call" href="#services-form" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Special;
