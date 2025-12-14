"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Intro.module.css";
import ButtonSection from "@/utilities/buttons/ButtonSection"; // imported ButtonSection

const FadeInSection: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Set threshold: 0.2 for mobile (<730px) and 0.10 for desktop.
    const threshold = window.innerWidth < 730 ? 0.2 : 0.10;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${styles.fadeInSection} ${isVisible ? styles.visible : ""}`}
    >
      {children}
    </div>
  );
};

const FlipCard: React.FC = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setFlipped(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={cardRef} className={`${styles.flipCard} ${flipped ? styles.flipped : ""}`}>
      <div className={styles.flipCardInner}>
        <div className={styles.flipCardFront}></div>
        <div className={styles.flipCardBack}>
          <div className={styles.content}>
            <h3>Meet Rito</h3>
            <p>
              — a multidisciplinary product leader holding a Master's in
              Human-Computer Interaction and bringing a decade of experience
              designing and building websites and applications, and leading
              software startups.
            </p>
            <img
              src="/images/home/intro/Rito-CEO.png"
              alt="Rito posing in a suit looking at viewer with monitors behind him"
              className={styles.contentImage}
            />
            <FadeInSection>
              <p>
                With impactful projects recognized by the New York Times—celebrity
                fashion designers—and gaming industry giants, Rito helps startups
                and enterprises across a variety of industries navigate every
                stage of their product journey.
              </p>
            </FadeInSection>
            <FadeInSection>
              <img
                src="/images/home/intro/rito-tinkering.png"
                alt="Rito tinkering with a robot with his hands and tools"
                className={styles.contentImage}
              />
            </FadeInSection>
            <FadeInSection>
              <p>
                Whether as a strategist defining roadmaps, a hands-on builder coding
                MVPs, or an auditor rescuing stalled products, Rito delivers
                authentic direction that harmonizes vision, product-market fit, and audience
                connection to deliver measurable business outcomes.
              </p>
            </FadeInSection>
            {/* New button section inserted below the last piece of text */}
            <FadeInSection>
              <div className={`${styles.buttonSectionWrapper} customButtonSection`}>
                <ButtonSection
                  title="What can RitoVision do for you?"
                  buttonGroupProps={{
                    buttons: [
                      { text: "Learn More", href: "/about", variant: "redButton" },
                      { text: "Contact", href: "/contact", variant: "blueAccentButton" },
                    ],
                  }}
                  withBackground={false}
                  className="customButtonSection"
                />
              </div>
              <style jsx global>{`
                .customButtonSection h3 {
                  font-size: clamp(1rem, 2vw, 1.5rem) !important;
                }
                  @media (max-width: 729px) {
  .customButtonSection {
    margin-top: 20%;
  }
}
              `}</style>
            </FadeInSection>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlipCard;
