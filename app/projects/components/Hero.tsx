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

      {/* Ipsum Lorem Text underneath the image container */}
      <p className={styles.heroText}>
      Welcome to Rito’s showcase of strategic vision brought to life through high-impact execution. As a Strategic Synthesis Specialist who operates as a Full Stack Product Brand and UX Strategist, Rito leads with end-to-end ownership and multidimensional thinking to turn ambitious ideas into scalable systems with both cultural and technical relevance. Each project tackles complexity with clarity and shows how structured vision becomes scalable leadership in the marketplace.        </p>
    </section>
  );
}
