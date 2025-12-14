"use client";
import React from 'react';
import EngagementItem from './EngagementItem';
import styles from './EngagementSection.module.css';
import Button from '@/components/utilities/buttons/Button';

const engagementItems = [
  {
    icon: '/images/pages/services/engagement/compass.png',
    title: 'Guide your team',
    description: 'Don’t have a product team yet? I’ll help you scope, prioritize, and architect the right thing to build—then guide your team (or help you build one) through execution.',
    bgImage: '/images/pages/services/engagement/guide.jpg',
    link: '#contact-services',
  },
  {
    icon: '/images/pages/services/engagement/lightning.png',
    title: ' Be your team',
    description: 'You have the vision, but no one to build it. I’ll design, develop, and deliver your product—end-to-end—with full ownership and momentum. *May bring on additional support members as needed*',
    bgImage: '/images/pages/services/engagement/be.jpg',
    link: '#contact-services',
  },
  {
    icon: '/images/pages/services/engagement/gears.png',
    title: 'Boost your team',
    description: 'Your team is great—but missing a piece. I can jump in to handle UX strategy, dev execution, or QA when your roadmap’s overloaded.',
    bgImage: '/images/pages/services/engagement/boost.jpg',
    link: '#contact-services',
  },
];

const EngagementSection: React.FC = () => {
  return (
    <section className={styles.section}>
      <h2 className={styles.header}>Engagement Structure</h2>
      <p className={styles.subheader}>
        Rito offers a flexible engagement structure at any point in the product lifecycle that may comprise short-term, long-term or ad hoc arrangements.
      </p>
      <div className={styles.grid}>
        {engagementItems.map((item, index) => (
          <EngagementItem key={index} {...item} />
        ))}
      </div>
      <div className={styles.moreInfo}>
        <p className={styles.infoText}>
          Learn more about Rito and his visionary approach that earned recognition from the <em>New York Times, </em> top entertainment news outlets like <em>ScreenRant</em> and Celebrity Fashion Designers.
        </p>
        <Button text="About" variant="blueAccentButton" href="/about" />
      </div>
      <div className={styles.divider}></div>
    </section>
  );
};

export default EngagementSection;
