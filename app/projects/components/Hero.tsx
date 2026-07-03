"use client"; // ensure client component usage if needed

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store"; // adjust path as needed
import styles from "./Hero.module.css";

export default function Hero() {
  // Get the menu transition status from redux
  const isTransitioning = useSelector(
    (state: RootState) => state.menuTransition.isTransitioning
  );
  // We want animations to run only after the menu is closed (isTransitioning === false)
  const animate = !isTransitioning;

  return (
    <section className={`${styles.heroSection} ${animate ? styles.animate : ""}`}>
      <div className={styles.heroContainer}>
        {/* Main logomark image */}
        <img
          src="/images/brand/logomark-blacksquare.png"
          alt="logomark"
          className={styles.logomarkImage}
        />

        {/* Lines from the center */}
        <div className={styles.verticalLine}></div>
        <div className={styles.horizontalLine}></div>

        {/* Quadrant icons */}
        <div className={`${styles.quadrant} ${styles.topLeft}`}>
          <img
            src="/images/pages/projects/hero/code-icon.png"
            alt="code icon"
            className={styles.icon}
          />
        </div>
        <div className={`${styles.quadrant} ${styles.topRight}`}>
          <img
            src="/images/pages/projects/hero/hammer-wrench-icon.png"
            alt="hammer wrench icon"
            className={styles.icon}
          />
        </div>
        <div className={`${styles.quadrant} ${styles.bottomLeft}`}>
          <img
            src="/images/pages/projects/hero/up-icon.png"
            alt="up icon"
            className={styles.icon}
          />
        </div>
        <div className={`${styles.quadrant} ${styles.bottomRight}`}>
          <img
            src="/images/pages/projects/hero/AI-icon.png"
            alt="AI icon"
            className={styles.icon}
          />
        </div>
      </div>

      <p className={styles.heroText}>
        Welcome to Rito’s showcase of user-facing systems shaped through creative-strategic vision and high-impact execution. Rito makes important outcomes more predictable by leveraging his depth across Product, Brand, UX &amp; Engineering to address misalignments &amp; ambiguities that are hard to see or manage.
        <br /><br />
        Across industries, mediums, and scopes, these projects show the same ability: seeing the connections others miss, tracing symptoms to their causes across domains, and turning that insight into the right work.
      </p>
    </section>
  );
}
