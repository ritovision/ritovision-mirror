'use client';

import React, { useEffect, useRef, useState } from "react";
import styles from "./Propositions.module.css";

type Proposition = {
  title: string;
  description: string;
};

const propositions: Proposition[] = [
  {
    title: "Command the Market Narrative",
    description:
      "You're not just building a product—you're building a category. Let’s crystallize your narrative, harden your UX, and engineer a presence that commands attention in the markets that matter.",
  },
  {
    title: "Pivot From Stuck to Scaling",
    description:
      "When growth flatlines, we don't guess, we dissect. Together we’ll surface friction, rebuild alignment, and drive toward renewed velocity with clarity and precision.",
  },
  {
    title: "Vision & Strategy Alignment",
    description:
      "When complexity and moving parts aren’t working together, let’s turn them into a focused roadmap—aligning product, brand, and go-to-market strategy into one clear direction.",
  },
  {
    title: "New Product Incubation",
    description:
      "Ideas are easy. Strong foundations & scaled execution are rare. From whiteboard to traction, let's architect and ship with intent, rigor, and readiness.",
  },
  {
    title: "Product Due Diligence & Insights",
    description:
      "Before you commit millions—or even your time—you need a surgical read on feasibility, UX, and product-market timing. Let’s sharpen your edge before you make your move.",
  },
];

interface PropositionPairProps {
  title: string;
  description: string;
}

const PropositionPair: React.FC<PropositionPairProps> = ({
  title,
  description,
}) => {
  const pairRef = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);
  const [typedTitle, setTypedTitle] = useState("");
  const [titleComplete, setTitleComplete] = useState(false);

  useEffect(() => {
    const currentRef = pairRef.current;
    if (!currentRef) return;

    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: "0px",
      threshold: 0.25, // fire when at least 25% of the element is visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTriggered(true);
          observer.disconnect();
        }
      });
    }, observerOptions);

    observer.observe(currentRef);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (triggered) {
      let index = 0;
      const interval = setInterval(() => {
        index++;
        setTypedTitle(title.slice(0, index));
        if (index === title.length) {
          setTitleComplete(true);
          clearInterval(interval);
        }
      }, 50);
      return () => clearInterval(interval);
    }
  }, [triggered, title]);

  return (
    <div ref={pairRef} className={styles.propositionPair}>
      <h4 className={styles.propositionTitle}>
        <span className={styles.dummy}>{title}</span>
        <span className={styles.actual}>{typedTitle}</span>
      </h4>
      <p
        className={`${styles.propositionDesc} ${
          titleComplete ? styles.fadeIn : ""
        }`}
      >
        {description}
      </p>
    </div>
  );
};

const Propositions: React.FC = () => {
  const overallRef = useRef<HTMLDivElement>(null);
  const [overallVisible, setOverallVisible] = useState(false);

  useEffect(() => {
    const currentRef = overallRef.current;
    if (!currentRef) return;

    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: "0px",
      threshold: 0.25, // overall container enters at least 25% into view
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setOverallVisible(true);
          observer.disconnect();
        }
      });
    }, observerOptions);

    observer.observe(currentRef);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={overallRef}
      className={`${styles.container} ${
        overallVisible ? styles.animateOverall : ""
      }`}
    >
      <h3 className={styles.title}>
        Driving Market Leadership Across the Product Lifecycle
      </h3>
      {propositions.map((prop, index) => (
        <PropositionPair
          key={index}
          title={prop.title}
          description={prop.description}
        />
      ))}
    </div>
  );
};

export default Propositions;
