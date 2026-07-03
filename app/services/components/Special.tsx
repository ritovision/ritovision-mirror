"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Button from "@/utilities/buttons/Button";
import styles from "./Special.module.css";

const domains = [
  { name: "Product", description: "Decisions and execution." },
  { name: "Brand", description: "Identity, positioning, and promises." },
  { name: "UX", description: "What people understand, feel, and do." },
  {
    name: "Engineering",
    description: "Architecture, quality, and the systems that make it real.",
  },
];

const Special = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animationStep, setAnimationStep] = useState(0);
  const componentRef = useRef<HTMLDivElement>(null);
  const headerText = "One system, connected at the seams.";

  const titleBannerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [borderAnimationComplete, setBorderAnimationComplete] = useState(false);
  const borderAnimationDuration = 1000;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setIsVisible(true);
      },
      {
        root: null,
        rootMargin:
          window.innerWidth > 730 ? "0px 0px -10% 0px" : "0px 0px -20% 0px",
        threshold: 0.1,
      }
    );
    const node = componentRef.current;
    if (node) observer.observe(node);
    return () => {
      if (node) observer.unobserve(node);
    };
  }, []);

  const updateDimensions = () => {
    if (titleBannerRef.current) {
      const { width, height } = titleBannerRef.current.getBoundingClientRect();
      setDimensions({ width, height });
    }
  };

  useEffect(() => {
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    updateDimensions();
    requestAnimationFrame(() => {
      setBorderAnimationComplete(true);
    });
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;
    const delays = [0, 800, 1600, 2600, 3400, 4200, 5000];
    const timers = delays.map((delay, index) =>
      setTimeout(() => setAnimationStep(index + 1), delay)
    );
    return () => timers.forEach(clearTimeout);
  }, [isVisible]);

  const pathLength = dimensions.width + dimensions.height;

  return (
    <section ref={componentRef} className={styles.container}>
      <div
        className={`${styles.titleBannerContainer} ${
          isVisible ? styles.visible : ""
        }`}
      >
        <div ref={titleBannerRef} className={styles.titleBanner}>
          <video
            autoPlay
            muted
            loop
            playsInline
            className={styles.backgroundVideo}
          >
            <source
              src="/video/Particle-Effect-blueBG-BlueOrbs1.webm"
              type="video/webm"
            />
            Your browser does not support the video tag.
          </video>
          {dimensions.width > 0 && dimensions.height > 0 && (
            <svg
              width={dimensions.width}
              height={dimensions.height}
              className={styles.borderSvg}
            >
              {["left", "right"].map((side) => (
                <path
                  key={side}
                  d={
                    side === "left"
                      ? `M ${dimensions.width / 2} 0 L 0 0 L 0 ${
                          dimensions.height
                        } L ${dimensions.width / 2} ${dimensions.height}`
                      : `M ${dimensions.width / 2} 0 L ${dimensions.width} 0 L ${
                          dimensions.width
                        } ${dimensions.height} L ${dimensions.width / 2} ${
                          dimensions.height
                        }`
                  }
                  fill="none"
                  stroke="var(--primary-red)"
                  strokeWidth="1"
                  style={{
                    strokeDasharray: pathLength,
                    strokeDashoffset: borderAnimationComplete ? 0 : pathLength,
                    transition: `stroke-dashoffset ${borderAnimationDuration}ms ease-out`,
                  }}
                />
              ))}
            </svg>
          )}
          <div className={styles.titleContent}>
            <span
              className={`${styles.titleLine} ${styles.depthLine} ${
                animationStep >= 1 ? styles.visibleWord : ""
              }`}
            >
              Cross-functional depth
            </span>
            <span
              className={`${styles.titleLine} ${styles.systemsLine} ${
                animationStep >= 2 ? styles.visibleIntegration : ""
              }`}
            >
              in user-facing systems
            </span>
          </div>
        </div>
      </div>

      <div
        className={`${styles.imageContainer} ${
          animationStep >= 3 ? `${styles.imageVisible} redglow` : ""
        }`}
      >
        <div className={styles.imageContent}>
          <Image
            src="/images/pages/services/special.jpg"
            alt="Cross-functional depth in user-facing systems"
            fill
            style={{ objectFit: "cover" }}
            className={styles.heroImage}
          />
          <div className={styles.headerWrapper}>
            {animationStep >= 4 && (
              <h3 className={`${styles.imageHeader} ${styles.typeWriter}`}>
                {headerText}
              </h3>
            )}
          </div>

          <ul
            className={`${styles.domainList} ${
              animationStep >= 5 ? styles.domainListVisible : ""
            }`}
          >
            {domains.map((domain) => (
              <li key={domain.name} className={styles.domain}>
                <strong>{domain.name}</strong>
                <span>{domain.description}</span>
              </li>
            ))}
          </ul>

          <p
            className={`${styles.imageText} ${
              animationStep >= 6 ? styles.fadeIn : ""
            }`}
          >
            In user-facing systems, product, brand, UX, and engineering are not
            separate concerns. They shape one another. Rito works across those
            seams to find what is actually driving the problem, clarify the right
            trade-offs, and carry the necessary change through.
          </p>
          <div
            className={`${styles.buttonContainer} ${
              animationStep >= 7 ? styles.buttonVisible : ""
            }`}
          >
            <Button
              variant="blueAccentButton"
              text="Discovery Call"
              href="#contact-services"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Special;
