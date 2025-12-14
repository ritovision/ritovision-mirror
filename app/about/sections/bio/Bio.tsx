// \test\app\about\sections\bio\Bio.tsx

"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./Bio.module.css";
import SectionLineWrapper from "@/components/utilities/sections/SectionLineWrapper";
import ButtonSection from "@/components/utilities/buttons/ButtonSection";

const TypewriterEffect: React.FC<{ phrases: string[]; typingSpeed?: number }> = ({
  phrases,
  typingSpeed = 150,
}) => {
  const [text, setText] = useState("");
  const [hasStarted, setHasStarted] = useState(false);
  const typeRef = useRef<HTMLDivElement>(null);

  // Trigger typewriter when its container is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      {
        root: null,
        rootMargin: "0px 0px -15% 0px",
        threshold: 0,
      }
    );
    if (typeRef.current) {
      observer.observe(typeRef.current);
    }
    return () => observer.disconnect();
  }, []);

  // Typewriter effect with an added delay when starting the second line
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
          // Finished current line, move to next line
          lineIndex++;
          charIndex = 0;
          if (lineIndex < phrases.length) {
            const typedText = phrases.slice(0, lineIndex).join("\n") + "\n";
            setText(typedText);
          }
          // Extra delay of 750ms when transitioning to the second line
          const delay = lineIndex === 1 ? 750 : typingSpeed;
          setTimeout(typeNext, delay);
        }
      }
    };

    typeNext();
  }, [hasStarted, phrases, typingSpeed]);

  const lines = text.split("\n");

  return (
    <div className={styles.typewriterContainer} ref={typeRef}>
      {/* Placeholder to reserve the final space */}
      <p className={`${styles.typewriterText} ${styles.typewriterPlaceholder}`}>
        {phrases.join("\n")}
      </p>
      {/* Animated overlay */}
      <p className={`${styles.typewriterText} ${styles.typewriterAnimated}`}>
        {lines.map((line, idx) => (
          <span key={idx}>
            {line}
            {idx < lines.length - 1 && <br />}
          </span>
        ))}
      </p>
    </div>
  );
};

const Bio: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    let rootMargin = "0px 0px -20% 0px";
    if (window.innerWidth >= 730) {
      rootMargin = "0px 0px -10% 0px";
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin,
        threshold: 0,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, []);

  return (
    <>
      {/* Bio Container */}
      <div
        ref={containerRef}
        className={`${styles.container} ${isVisible ? styles.revealed : ""}`}
      >
        <h3 className={styles.title}>About RitoVision</h3>
        <p className={styles.content}>
          RitoVision bridges the gap between visionary thinking and technical
          execution as a hybrid studio, consultancy and C-suite vehicle where bold directions evolve
          into strategic products, immersive narratives and elegant systems.
          <br />
          <br />
          Rito is a creative-strategic powerhouse with a passion for
          building and an authentic, collaborative approach.
          <br />
          <br />
          He's talked (and rapped) about tech on live radio, had his work
          recognized by <i>The New York Times</i>, built end-to-end
          applications—including wearable tech featured in a future-forward
          fashion show with celebrity designers, and co-authored a software
          standard alongside the leading pioneer of the NFT ecosystem.
          <br />
          <br />
          Rito's also made high-visibility contributions to major Open Source projects' websites serving millions of users each month including <a href="https://github.com/kubernetes/website/pull/52386" target="_blank" rel="noopener noreferrer"><u>Kubernetes</u></a>, <a href="https://github.com/ethereum/EIPs/pull/10358" target="_blank" rel="noopener noreferrer"><u>Ethereum EIP</u></a>, <a href="https://github.com/langchain-ai/langchainjs/pull/8942" target="_blank" rel="noopener noreferrer"><u>LangChain</u></a> and <a href="https://github.com/storybookjs/web/pull/342" target="_blank" rel="noopener noreferrer"><u>Storybook</u></a>
        </p>
        <TypewriterEffect
          phrases={[
            "Ultimately Rito's Vision is to lead a creative world where technology doesn't just work,",
            "",
            "-it moves people.",
          ]}
          typingSpeed={75}
        />
      </div>

      {/* Button Section UNDERNEATH the container */}
      <SectionLineWrapper isFirstSection={false}>
        <div className={styles.buttonSectionWrapper}>
          <ButtonSection
            title="If you'd like to learn more about Rito, check out his projects or his Press page for more."
            buttonGroupProps={{
              buttons: [
                { text: "Projects", href: "/projects", variant: "blueAccentButton" },
                { text: "Press", href: "/press", variant: "blueAccentButton" },
              ],
            }}
          />
        </div>
      </SectionLineWrapper>
    </>
  );
};

export default Bio;
