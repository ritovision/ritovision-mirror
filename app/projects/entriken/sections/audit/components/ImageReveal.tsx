"use client";

import React, { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import styles from "./ImageReveal.module.css";

type StyleWithVars = React.CSSProperties & { ["--delay"]?: string };

const lines = [
  "Lead Author",
  "Civic Hacker",
  "Cybersecurity",
  "Finance",
  "Solutions Architect",
];

const ImageReveal: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 730);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { ref, inView } = useInView({
    rootMargin: isMobile ? "0px 0px -30% 0px" : "0px 0px -25% 0px",
    triggerOnce: true,
  });

  const [textVisible, setTextVisible] = useState(false);
  const [fill, setFill] = useState(false);
  const [empty, setEmpty] = useState(false);
  const [imageVisible, setImageVisible] = useState(false);

  useEffect(() => {
    if (!inView) return;

    setTextVisible(true);

    const lineDelay = 500;
    const textDuration = lines.length * lineDelay;
    const bufferTextToFill = 500;
    const fillDelay = textDuration + bufferTextToFill;
    const fillDuration = 1500;
    const bufferFillToEmpty = 200;
    const emptyDelay = fillDelay + fillDuration + bufferFillToEmpty;
    const hideTextDelay = fillDelay + fillDuration;

    const timers: number[] = [];

    timers.push(
      window.setTimeout(() => {
        setFill(true);
      }, fillDelay)
    );

    timers.push(
      window.setTimeout(() => {
        setTextVisible(false);
      }, hideTextDelay)
    );

    timers.push(
      window.setTimeout(() => {
        setEmpty(true);
        setImageVisible(true);
      }, emptyDelay)
    );

    return () => timers.forEach(clearTimeout);
  }, [inView]);

  return (
    <div className="defaulttopspace defaultbottomspace">
      <h3 className={styles.heading}>Who is William Entriken?</h3>
      <div ref={ref} className={styles.container}>
        <Image
          src="/images/pages/projects/entriken/hero/hero.png"
          alt="Hero"
          fill
          className={`${styles.backgroundImage} ${imageVisible ? styles.visible : ""}`}
        />

        {textVisible && (
          <div className={styles.textContainer}>
            {lines.map((line, idx) => (
              <div
                key={idx}
                className={styles.textLine}
                style={{ "--delay": `${idx * 0.5}s` } as StyleWithVars}
              >
                {line}
              </div>
            ))}
          </div>
        )}

        <div className={`${styles.overlay} ${fill ? styles.fill : ""} ${empty ? styles.empty : ""}`} />
      </div>
    </div>
  );
};

export default ImageReveal;
