// FILE PATH: c:/Users/Mattj/ritovision website/test/app/about/sections/hero/Hero.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import styles from "./Hero.module.css";
import { useDeferredActivation } from "@/hooks/useDeferredActivation";

//––– Inner content component: holds all animation state and logic –––
function HeroContent() {
  // deferred activation drive for VisionText
  const [shouldActivate, setShouldActivate] = useState(false);
  const isReady = useDeferredActivation(shouldActivate);

  // image‐reveal state
  const [revealPercentage, setRevealPercentage] = useState(0);

  // Kick off the first run when this component mounts
  useEffect(() => {
    setShouldActivate(true);
  }, []);

  // When `isReady` flips to true, restart the image reveal
  useEffect(() => {
    if (!isReady) return;

    setRevealPercentage(0);
    const timer = setTimeout(() => {
      let start: number | null = null;
      const duration = 2000;
      const step = (ts: number) => {
        if (start === null) start = ts;
        const progress = ts - start;
        const pct = Math.min(100, (progress / duration) * 100);
        setRevealPercentage(pct);
        if (pct < 100) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, 1500);

    return () => clearTimeout(timer);
  }, [isReady]);

  return (
    <section className={styles.heroSection}>
      <div className={styles.imageContainer}>
        <img
          src="/images/brand/logomark-blacksquare.png"
          alt="Logomark-black-background"
          className={styles.logomarkImage}
        />
        <img
          src="/images/home/hero/rito-picture1.png"
          alt="Rito Picture"
          className={styles.revealingImage}
          style={{ clipPath: `inset(${100 - revealPercentage}% 0 0 0)` }}
        />
      </div>
      <VisionText isReady={isReady} />
    </section>
  );
}

//––– VisionText stays the same –––
const VisionText: React.FC<{ isReady: boolean }> = ({ isReady }) => {
  const s1 = "Driving Vision & Complexity into Scalable Market Leadership";
  const s2 = "Filling the cracks across Product, Brand, UX & Technology";
  const [typedText, setTypedText] = useState("");
  const [animateS2, setAnimateS2] = useState(false);

  useEffect(() => {
    if (!isReady) return;

    // reset on each run
    setTypedText("");
    setAnimateS2(false);

    let charIndex = 0;
    const interval = setInterval(() => {
      charIndex++;
      setTypedText(s1.substring(0, charIndex));
      if (charIndex >= s1.length) {
        clearInterval(interval);
        setTimeout(() => setAnimateS2(true), 300);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [isReady]);

  return (
    <div className={styles.visionTextContainer}>
      <div className={styles.visionTextS1}>{typedText}</div>
      <div
        className={`${styles.visionTextS2} ${
          animateS2 ? styles.animateS2 : ""
        }`}
      >
        {s2}
      </div>
    </div>
  );
};

//––– Outer wrapper: resets HeroContent on menu‐open (after 0.3s), so it re‐mounts and everything goes back to zero –––
export default function Hero() {
  const isTransitioning = useSelector(
    (state: RootState) => state.menuTransition.isTransitioning
  );
  const [heroKey, setHeroKey] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isTransitioning) {
      // menu is opening → wait 300ms, then bump key to remount HeroContent behind the menu
      timer = setTimeout(() => setHeroKey((k) => k + 1), 300);
    }
    return () => clearTimeout(timer);
  }, [isTransitioning]);

  return <HeroContent key={heroKey} />;
}
