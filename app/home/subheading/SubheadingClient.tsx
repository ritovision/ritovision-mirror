"use client";

import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import styles from "./Subheading.module.css";

const seamWords = ["UX", "Brand", "Product", "Engineering"];

const overlayVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.08,
      staggerChildren: 0.11,
    },
  },
};

const leadLineVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.22, ease: "easeOut" },
  },
};

const wordsContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.12,
      staggerChildren: 0.2,
    },
  },
};

const wordVariants: Variants = {
  hidden: {
    opacity: 0,
    clipPath: "inset(0 50% 0 50%)",
  },
  visible: {
    opacity: 1,
    clipPath: "inset(0 0% 0 0%)",
    transition: {
      duration: 0.48,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

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
    offset,
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
  const [startSequence, setStartSequence] = useState(false);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (progress) => {
      const fadeInCompleteAt = isMobile ? 0.333 : 0.231;

      if (progress >= fadeInCompleteAt) {
        setStartSequence(true);
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress, isMobile]);

  return (
    <motion.div ref={overlayRef} className={styles.overlay} style={{ opacity }}>
      <motion.div
        className={styles.animationContent}
        initial="hidden"
        animate={startSequence ? "visible" : "hidden"}
        variants={overlayVariants}
      >
        <motion.p className={styles.lineSmall} variants={leadLineVariants}>
          See between the seams of
        </motion.p>

        <motion.div className={styles.wordsContainer} variants={wordsContainerVariants}>
          {seamWords.map((word) => (
            <motion.p
              key={word}
              className={styles.lineLarge}
              variants={wordVariants}
            >
              {word}
            </motion.p>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
