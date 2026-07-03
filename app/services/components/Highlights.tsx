import React from "react";
import styles from "./Highlights.module.css";

type Highlight = {
  lead: string;
  text: string;
  href: string;
  linkLabel: string;
};

const highlights: Highlight[] = [
  {
    lead: "New York Times Site Feature",
    text: "Built and launched a celebrity fansite featured in The New York Times to introduce the celebrity, generating top-tier earned credibility for the release.",
    href: "/projects/fansite",
    linkLabel: "View project →",
  },
  {
    lead: "OSS Flagship Site Improvements",
    text: "Shipped high-impact UX/architecture improvements across flagship OSS websites serving millions including Kubernetes, Ethereum, OWASP, LangChain, and Storybook.",
    href: "/projects/oss",
    linkLabel: "View project →",
  },
  {
    lead: "AAA Game Studio Global Press Coverage and Gameplay Fixes",
    text: "Drove earned global coverage that pressured multi-billion-dollar AAA studio behind Call of Duty: Warzone to address critical gameplay issues.",
    href: "/projects/cod",
    linkLabel: "View project →",
  },
  {
    lead: "Industry Leader Brand Repositioning",
    text: "Led a brand repositioning for an industry leader with a demonstrated footprint across search visibility and AI knowledge retrieval surfaces.",
    href: "/projects/entriken",
    linkLabel: "View project →",
  },
  {
    lead: "NYFW Wearable Tech",
    text: "Built a wearable FashionTech brand showcased at a tech-themed New York Fashion Week fashion show used by celebrity fashion designers featured in the event.",
    href: "/projects/jumptag",
    linkLabel: "View project →",
  },
  {
    lead: "Solo built end-to-end a complex blockchain dApp and AI game",
    text: "He built and launched a complex production-quality OSS system that would normally take a team of specialists. It's the quintessential demonstration of Product, Brand, UX & Software Engineering integrated singularly.",
    href: "https://docs.ritoswap.com",
    linkLabel: "View Documentation →",
  },
];

const Highlights: React.FC = () => {
  return (
    <section className={`${styles.section} ${styles.container}`}>
      <h2 className={styles.header}>Selected Proof</h2>
      <ul className={styles.list}>
        {highlights.map((highlight) => (
          <li key={highlight.lead} className={styles.item}>
            <a className={styles.cardLink} href={highlight.href}>
              <p className={styles.description}>
                <strong className={styles.lead}>{highlight.lead}:</strong>{" "}
                {highlight.text}
              </p>
              <span className={styles.linkLabel}>{highlight.linkLabel}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Highlights;
