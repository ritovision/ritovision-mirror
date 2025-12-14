"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./TypewriterHeading.module.css";

interface TypewriterHeadingProps {
  phrases: string[];
  typingSpeed?: number; // in milliseconds; defaults to 150ms
  startTyping?: boolean; // legacy prop
  scrollTrigger?: number; // new prop: either a fraction (0-1) or percentage (>1) for when to start typing
}

export default function TypewriterHeading({
  phrases,
  typingSpeed = 150,
  startTyping = false,
  scrollTrigger,
}: TypewriterHeadingProps) {
  const [text, setText] = useState("");
  const [hasStarted, setHasStarted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Use scrollTrigger if provided; otherwise, fallback to startTyping prop.
  useEffect(() => {
    if (scrollTrigger !== undefined) {
      // Convert percentage values (> 1) into a fraction.
      const thresholdValue = scrollTrigger > 1 ? scrollTrigger / 100 : scrollTrigger;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.intersectionRatio >= thresholdValue) {
              setHasStarted(true);
              observer.disconnect();
            }
          });
        },
        { threshold: thresholdValue }
      );

      if (containerRef.current) {
        observer.observe(containerRef.current);
      }

      return () => observer.disconnect();
    } else if (startTyping) {
      setHasStarted(true);
    }
  }, [scrollTrigger, startTyping]);

  useEffect(() => {
    if (!hasStarted) return;

    let lineIndex = 0;
    let charIndex = 0;

    const typeNext = () => {
      if (lineIndex < phrases.length) {
        const currentPhrase = phrases[lineIndex];
        if (charIndex < currentPhrase.length) {
          const typedText =
            phrases.slice(0, lineIndex).join("\n") +
            (lineIndex > 0 ? "\n" : "") +
            currentPhrase.substring(0, charIndex + 1);
          setText(typedText);
          charIndex++;
          setTimeout(typeNext, typingSpeed);
        } else {
          lineIndex++;
          charIndex = 0;
          if (lineIndex < phrases.length) {
            const typedText = phrases.slice(0, lineIndex).join("\n") + "\n";
            setText(typedText);
          }
          setTimeout(typeNext, typingSpeed);
        }
      }
    };

    typeNext();
  }, [hasStarted, phrases, typingSpeed]);

  const lines = text.split("\n");

  return (
    <div className={styles.container} ref={containerRef}>
      <p className={`${styles.text} ${styles.placeholder}`}>
        {phrases.join("\n")}
      </p>
      <p className={`${styles.text} ${styles.animatedText}`}>
        {lines.map((line, idx) => (
          <span key={idx}>
            {line}
            {idx < lines.length - 1 && <br />}
          </span>
        ))}
      </p>
    </div>
  );
}
