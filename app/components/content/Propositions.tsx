'use client';

import React, { useEffect, useRef, useState } from "react";
import styles from "./Propositions.module.css";

type Proposition = {
  title: string;
  description: string;
};

const propositions: Proposition[] = [
  {
    title: "Pivot From Stuck to Scaling",
    description:
      "Your product works technically, but it isn't landing with the market. There are issues with acquisition or churn. The cause is unclear or very messy, and you can't afford to move slowly or remain stagnant. Let's find the friction and ease it, or forge a better path around it.",
  },
  {
    title: "Vision & Strategy Alignment",
    description:
      "Your team of specialists are powerful, but the product or direction seems incoherent. Rito finds the place where two true things can stop agreeing with each other, then addresses the gap to move forward with alignment.",
  },
  {
    title: "Product Incubation & Launch",
    description:
      "You're incubating a new product or feature, and need to make decisions on what to build, why, and how to build it, and then... Rito starts building it.",
  },
  {
    title: "Product-Systems Due Diligence",
    description:
      "Leveraging his cross-functional depth, Rito can see through layers and ambiguity to identify risks and assess whether what they've built, what they promise, and where they're heading are actually coherent and supports the investment thesis.",
  },
  {
    title: "Operating Partner Support",
    description:
      "Your portfolio companies need help clarifying complex decisions, resolving misalignments among domain experts and strengthening user-facing outcomes.",
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
        When to call RitoVision
      </h3>
      {propositions.map((prop, index) => (
        <React.Fragment key={prop.title}>
          <PropositionPair
            title={prop.title}
            description={prop.description}
          />
          {index === 2 && (
            <div className={styles.investorDivider}>
              <h4 className={styles.investorHeading}>For Investors</h4>
              <div className={styles.investorRule} aria-hidden="true" />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Propositions;
