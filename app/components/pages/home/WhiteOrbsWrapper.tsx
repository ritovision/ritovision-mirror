// app\components\pages\home\WhiteOrbsWrapper.tsx
"use client";
import dynamic from "next/dynamic";
import { useState, useEffect, useRef } from "react";
import Intro from "@/components/pages/home/intro/Intro";
import Propositions from "@/components/pages/home/Propositions";
import ButtonSection from "@/components/utilities/buttons/ButtonSection"; 
import styles from "./WhiteOrbsWrapper.module.css";

// Dynamically import WhiteOrbs with SSR disabled.
const DynamicWhiteOrbs = dynamic(
  () => import("@/components/utilities/particles/WhiteOrbs"),
  { ssr: false }
);

export default function WhiteOrbsWrapper() {
  // Default to desktop to avoid hydration mismatch
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);
  
  useEffect(() => {
    // After component mounts, check if we're on mobile
    setMounted(true);
    setIsMobile(window.innerWidth < 730);
    
    // Set content height only after mounting
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < 730);
      if (contentRef.current) {
        setContentHeight(contentRef.current.scrollHeight);
      }
    };
    
    // Set up resize listener
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  return (
    <div className={styles.wrapper}>
      {/* Sticky background container with particles */}
      {mounted && !isMobile && (
        <div 
          className={styles.stickyBackground}
          style={{ height: contentHeight > 0 ? `${contentHeight}px` : '100%' }}
        >
          <div className={styles.particlesContainer}>
            <DynamicWhiteOrbs
              background={0x000000}
              height="100%"
              circleColor={0x04426C}
              glowColor={0x012035}
            />
          </div>
        </div>
      )}
      
      {/* Content layer */}
      <div 
        className={mounted && isMobile ? styles.fallbackInner : styles.content} 
        ref={contentRef}
      >
        <Intro />
        <Propositions />

        {/* Duplicated group button code from Intro, placed under Propositions */}
        <div className={`${styles.buttonSectionWrapper} duplicatedButtonSection`}>
          <div className={styles.buttonSectionInner}>
            <ButtonSection
              title="See what we can do together"
              buttonGroupProps={{
                buttons: [
                  { text: "Services", href: "/services", variant: "blackAndRedButton" },
                  { text: "Contact", href: "/contact", variant: "blueAccentButton" },
                ],
              }}
              withBackground={false}
              className="duplicatedButtonSection"
            />
          </div>
        </div>
        <style jsx global>{`
          .duplicatedButtonSection h3 {
            font-size: clamp(1rem, 2vw, 1.5rem) !important;
          }
          @media (max-width: 729px) {
            .duplicatedButtonSection {
              margin-top: var(--spacing-section-gap);
            }
          }
        `}</style>
      </div>
    </div>
  );
}
