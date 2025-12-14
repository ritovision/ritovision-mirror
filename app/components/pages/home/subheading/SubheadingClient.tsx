"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import styles from "./Subheading.module.css";

// Custom hook to detect mobile viewport (<730px)
function useIsMobile(breakpoint: number = 730) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < breakpoint);
    handler();
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, [breakpoint]);
  return isMobile;
}

// A fundamental typewriter effect component that animates the text once when triggered.
function TypewriterText({ text, trigger }: { text: string; trigger: boolean }) {
  const [displayed, setDisplayed] = useState("");
  const [hasRun, setHasRun] = useState(false);

  useEffect(() => {
    if (trigger && !hasRun) {
      let index = 0;
      const interval = setInterval(() => {
        index++;
        setDisplayed(text.slice(0, index));
        if (index >= text.length) {
          clearInterval(interval);
          setHasRun(true);
        }
      }, 100); // Adjust speed (in milliseconds) as desired.
      return () => clearInterval(interval);
    }
  }, [trigger, hasRun, text]);

  return <span>{displayed}</span>;
}

export default function SubheadingOverlay() {
  const isMobile = useIsMobile();
  const overlayRef = useRef<HTMLDivElement>(null);

  // For mobile, we use the same offset as before.
  // For desktop, we extend the fade out: from "0 90%" to "0 25%" instead of "0 35%".
  const offset =
    isMobile
      ? (["0 85%", "0 25%"] as [`${number} ${number}%`, `${number} ${number}%`])
      : (["0 90%", "0 25%"] as [`${number} ${number}%`, `${number} ${number}%`]);

  const { scrollYProgress } = useScroll({
    target: overlayRef,
    offset: offset,
  });

  // Normalized fade points for opacity.
  // Mobile remains unchanged.
  // For desktop, the full scroll range now corresponds to 65% of the viewport.
  // Fade in completes when the overlay's top is at 75% of the viewport:
  //   (90% - 75% = 15% difference => 15/65 ≈ 0.231)
  // Fade out starts when the overlay's top is at 50% of the viewport:
  //   (90% - 50% = 40% difference => 40/65 ≈ 0.615)
  // Fade out completes when the overlay's top is at 25% of the viewport.
  const inputRange = isMobile
    ? [0, 0.333, 0.75, 1]
    : [0, 0.231, 0.615, 1];

  const opacity = useTransform(scrollYProgress, inputRange, [0, 1, 1, 0]);

  // Trigger for the one-time typewriter effect.
  const [startTypewriter, setStartTypewriter] = useState(false);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => {
      // Trigger typewriter when fade-in is complete.
      if (v >= (isMobile ? 0.333 : 0.231) && !startTypewriter) {
        setStartTypewriter(true);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress, isMobile, startTypewriter]);

  return (
    <motion.div ref={overlayRef} className={styles.overlay} style={{ opacity }}>
      <p className={styles.lineSmall}>
        <TypewriterText text="The intersection of" trigger={startTypewriter} />
      </p>
      <p className={styles.lineLarge}>
        <TypewriterText text="Design" trigger={startTypewriter} />
      </p>
      <p className={styles.lineLarge}>
        <TypewriterText text="Technology" trigger={startTypewriter} />
      </p>
      <p className={styles.lineLarge}>
        <TypewriterText text="& Business Strategy" trigger={startTypewriter} />
      </p>
    </motion.div>
  );
}
