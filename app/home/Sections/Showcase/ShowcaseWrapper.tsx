// app\components\pages\home\Sections\Showcase\ShowcaseWrapper.tsx

'use client';

import { useEffect, useRef, useState } from 'react';
import CarolineVreelandShowcase from "./CarolineVreelandShowcase";
import Wabc77Showcase from "./Wabc77Showcase";
import Entriken from "./Entriken";
import JumptagShowcase from "./JumptagShowcase";
import Dogepalooza from "./Dogepalooza";  
import CODcampaign from "./CODcampaign";
import Hackernoon from "./Hackernoon";
import styles from "./ShowcaseWrapper.module.css";

// Export this color so it can be used in other components
export const defaultColor = 0x000000; // Black
export const scrolledColor = 0x012035; // The blue color (#012035)

export default function ShowcaseWrapper() {
  const [bgColor, setBgColor] = useState<number>(defaultColor);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const sectionRect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const triggerPoint = windowHeight * 0.8;

      if (sectionRect.top < triggerPoint) {
        const scrollProgress = Math.min(
          (triggerPoint - sectionRect.top) / (windowHeight * 0.4),
          1
        );
        if (scrollProgress >= 1) {
          setBgColor(scrolledColor);
        } else if (scrollProgress <= 0) {
          setBgColor(defaultColor);
        } else {
          const r = Math.round(((scrolledColor >> 16) & 0xFF) * scrollProgress);
          const g = Math.round(((scrolledColor >> 8) & 0xFF) * scrollProgress);
          const b = Math.round((scrolledColor & 0xFF) * scrollProgress);
          const interpolatedColor = (r << 16) | (g << 8) | b;
          setBgColor(interpolatedColor);
        }
      } else {
        setBgColor(defaultColor);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const bgColorHex = '#' + bgColor.toString(16).padStart(6, '0');

  return (
    <section 
      ref={sectionRef}
      className={styles.container}
      style={{ backgroundColor: bgColorHex }}
    >
      <header>
        <h2 className={styles.headerTitle}>Proof of Influence</h2>
        <h3 className={styles.headerSubtitle}>
          A snapshot of Rito's presence across worlds
        </h3>
        <div className={styles.topDivider} />
      </header>

      {/* New inner wrapper to constrain width of all subsections */}
      <div className={styles.content}>
        <CarolineVreelandShowcase />
        <div className={styles.divider} />
        <Wabc77Showcase />
        <div className={styles.divider} />
        <Entriken />
        <div className={styles.divider} />
        <JumptagShowcase />
        <div className={styles.divider} />
        <Dogepalooza />       
        <div className={styles.divider} />
        <Hackernoon />       
        <div className={styles.divider} />
        <CODcampaign />
        <div className={styles.divider} />
      </div>
    </section>
  );
}
