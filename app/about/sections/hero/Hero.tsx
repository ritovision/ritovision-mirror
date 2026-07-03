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
          src="/images/home/hero/rito-ponder.jpg"
          alt="Rito Picture"
          className={styles.revealingImage}
          style={{ clipPath: `inset(${100 - revealPercentage}% 0 0 0)` }}
        />
      </div>
      <VisionText isReady={isReady} />
    </section>
  );
}

const VisionText: React.FC<{ isReady: boolean }> = ({ isReady }) => {
  const s1Lead = "See between the seams.";
  const s1Tail = " And build it.";
  const s1 = `${s1Lead}${s1Tail}`;
  const s2 = "Depth across Product, Brand, UX & Engineering";
  const s2Words = s2.split(" ");
  const whiteRanges = [
    { start: s1.indexOf("between"), end: s1.indexOf("between") + "between".length },
    { start: s1.indexOf("build"), end: s1.indexOf("build") + "build".length },
  ];
  const [typedText, setTypedText] = useState("");
  const [animateS2, setAnimateS2] = useState(false);

  useEffect(() => {
    if (!isReady) return;

    setTypedText("");
    setAnimateS2(false);

    let charIndex = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;

    const typeNextCharacter = () => {
      charIndex += 1;
      setTypedText(s1.substring(0, charIndex));

      if (charIndex < s1.length) {
        const delay = charIndex === s1Lead.length ? 750 : 50;
        timer = setTimeout(typeNextCharacter, delay);
        return;
      }

      timer = setTimeout(() => setAnimateS2(true), 750);
    };

    timer = setTimeout(typeNextCharacter, 50);

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isReady]);

  return (
    <div className={styles.visionTextContainer}>
      <div className={styles.visionTextS1}>
        {[...typedText].map((character, index) => {
          const isWhite = whiteRanges.some(
            ({ start, end }) => index >= start && index < end
          );

          return (
            <span className={isWhite ? styles.whiteWord : undefined} key={index}>
              {character}
            </span>
          );
        })}
      </div>
      <div
        className={`${styles.visionTextS2} ${
          animateS2 ? styles.animateS2 : ""
        }`}
      >
        {s2Words.map((word, index) => (
          <span
            className={styles.visionTextS2Word}
            key={`${word}-${index}`}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            {word}
          </span>
        ))}
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
