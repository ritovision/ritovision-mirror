"use client";

import React from "react";
import EngagementItem from "./EngagementItem";
import styles from "./EngagementSection.module.css";

const engagementItems = [
  {
    icon: "/images/pages/services/engagement/gears.png",
    title: "Fractional Leadership",
    description:
      "An embedded strategic partner who helps make consequential decisions and participates directly in the work to carry them through. Best when the product, direction, or team needs senior cross-functional leadership without a full-time executive hire.",
    bgImage: "/images/pages/services/engagement/guide.jpg",
    link: "#contact-services",
  },
  {
    icon: "/images/pages/services/engagement/compass.png",
    title: "Advisory",
    description:
      "Senior cross-functional judgment for consequential decisions, helping you navigate trade-offs and ambiguity. Best for pivotal product decisions, product-systems diligence, and situations where the direction needs to be clear before the team commits.",
    bgImage: "/images/pages/services/engagement/be.jpg",
    link: "#contact-services",
  },
  {
    icon: "/images/pages/services/engagement/lightning.png",
    title: "Studio Delivery",
    description:
      "RitoVision independently takes responsibility for building and delivering a defined product, MVP, or system, bringing in the right specialists as needed. Best when the work needs to move from ambiguity to a high-quality release.",
    bgImage: "/images/pages/services/engagement/boost.jpg",
    link: "#contact-services",
  },
];

const EngagementSection: React.FC = () => {
  return (
    <section className={styles.section}>
      <h2 className={styles.header}>How Rito engages</h2>
      <p className={styles.subheader}>
        Rito works at the level of ownership the situation needs: embedded
        leadership, focused senior judgment, or independent delivery.
      </p>
      <div className={styles.grid}>
        {engagementItems.map((item, index) => (
          <EngagementItem key={index} {...item} />
        ))}
      </div>
    </section>
  );
};

export default EngagementSection;
