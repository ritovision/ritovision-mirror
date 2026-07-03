'use client';

import React from 'react';
import basicStyles from '@/components/utilities/containers/BasicContainer.module.css';
import styles from './UX.module.css';

export default function UX() {
  return (
    <div id="ux-strategy" className={basicStyles.wrapper}>
      <h2 className={styles.heading}>UX Strategy</h2>

      <p className={styles.paragraph}>
        The user experience (UX) strategy for William Entriken’s brand platform was designed around three key imperatives: clarity, informational access, and immersion. Given the multifaceted nature of William’s expertise — spanning business leadership, software innovation, and public thought leadership — the UX approach needed to compartmentalize complexity while preserving user freedom and agency.
      </p>

      <h3 className={styles.subheading}>Information Architecture and User Choice</h3>
      <ul className={styles.bulletList}>
        <li>Each major idea or brand pillar was given its own dedicated page rather than being compressed into a single, overwhelming scrolling experience.</li>
        <li>This modular structure supports intuitive navigation and empowers users to explore content relevant to their individual interests and goals — accommodating audiences from technical experts to media professionals.</li>
        <li>On longer-form pages like the Legacy page, users see short-form overviews plus expandable long-form content, allowing quick summaries or deeper dives.</li>
        <li>Large lists of achievements—media coverage, speaking engagements—are handled via self-contained, expandable scroll components with “Show More” controls.</li>
      </ul>

      {/* moved in: context-specific contact forms under Information Architecture */}
      <p className={styles.paragraph}>
        Context-specific contact forms are integrated at key touchpoints to reduce friction:
      </p>
      <ul className={styles.bulletList}>
        <li>A speaking inquiry form on the Public Speaking page.</li>
        <li>A services intake form on the Services page.</li>
      </ul>

      <h3 className={styles.subheading}>Interaction Design</h3>
      <p className={styles.paragraph}>
        The interaction model prioritized sleekness and simplicity. Subtle scroll-triggered animations—soft fade-ins—keep the experience dynamic without distracting from core content. Animations are restrained to avoid a gamified feel, in keeping with the site’s serious professional positioning.
      </p>

      <h3 className={styles.subheading}>Navigation Considerations</h3>
      <p className={styles.paragraph}>
        Portfolio access is embedded directly into desktop and mobile menus—creating seamless discovery between WilliamEntriken.net and Phor.net without jarring cross-domain transitions. On mobile, to maximize immersion and avoid clutter, there is no sticky header; instead a scroll-to-top button appears contextually on longer pages.
      </p>

      <h3 className={styles.subheading}>Summary</h3>
      <p className={styles.paragraph}>
        Clear architecture organizes complexity into accessible pathways. User choice empowers exploration based on individual goals. Sleek, restrained interactions support content absorption and trust-building. The result mirrors William’s strategic brand positioning—multidimensional, accessible, and firmly authoritative.
      </p>
    </div>
  );
}
