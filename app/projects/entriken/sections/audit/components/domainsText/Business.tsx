// FILE PATH: app\projects\entriken\sections\audit\components\domainsText\Business.tsx
'use client';

import React from 'react';
// Import styles from the parent Domains component's CSS module
import styles from '../Domains.module.css';

export default function Business() {
  return (
    <> {/* Use Fragment to wrap the content without adding an extra DOM node */}
      {/* Overview Paragraphs */}
      <p className={styles.paragraph}>
        William Entriken’s foundation in business and finance is supported by strong academic and professional credentials.
      </p>
      <p className={styles.paragraph}>
        He holds an MBA in Investment Management and an MS in Finance from Drexel University, earned concurrently through a dual-degree program, alongside a Bachelor’s degree in Computer Science.
      </p>
      <p className={styles.paragraph}>
        Professionally, William has worked in corporate finance and consulting roles, including positions as a financial analyst at CDI Corporation supporting mergers and acquisitions, and as a consultant at Ernst & Young, one of the world’s leading professional services firms.
      </p>
      <p className={styles.paragraph}>
        Currently, he serves as General Manager at Pacific Medical Training, blending business operations leadership with strategic oversight.
      </p>
      <p className={styles.paragraph}>
        In addition to traditional finance roles, William has served as an advisor within the blockchain space — helping companies raise over $100 million through Initial Coin Offerings (ICOs) and token-based funding models.
      </p>

      {/* Audience Perception and Challenges Section - Structure updated */}
      <h4 className={styles.subheading}>Audience Perception and Challenges</h4>
      {/* Format using techPoint/techTitle/techDescription */}
      <div className={styles.techPoint}>
        <span className={styles.techTitle}>Baseline Credibility:</span>
        <p className={styles.techDescription}>
          In mainstream and financial circles, advanced degrees from respected institutions and high-profile corporate experience provide an immediate baseline of seriousness and professionalism.
        </p>
      </div>
      <div className={styles.techPoint}>
        <span className={styles.techTitle}>Expectation Mismatch:</span>
        <p className={styles.techDescription}>
          However, typical business archetypes — corporate executive, entrepreneur with a billion-dollar company, or VC-backed founder — do not neatly fit William’s narrative. Instead, his most impactful achievements exist within software innovation, blockchain infrastructure, and public contribution — creating ecosystems valued in the billions, even though he personally did not retain ownership stakes or direct monetization.
        </p>
      </div>
      <div className={styles.techPoint}>
        <span className={styles.techTitle}>Narrative Complexity:</span>
        <p className={styles.techDescription}>
          Without careful framing, there is a risk of confusing audiences expecting a traditional business success arc, leading to potential overwhelm or misalignment in brand storytelling.
        </p>
      </div>


      {/* Branding Opportunities Section - Keep existing structure */}
      <h4 className={styles.subheading}>Branding Opportunities</h4>
      {/* Branding Opportunities points with responsive styling using techPoint/techTitle/techDescription */}
      <div className={styles.techPoint}>
        <span className={styles.techTitle}>Foundational Credibility Anchor:</span>
        <p className={styles.techDescription}>
          William’s finance and business background serves as a critical credibility foundation — immediately signaling that he is not simply a technologist, but a strategist capable of operating at serious executive levels.
        </p>
      </div>
      <div className={styles.techPoint}>
        <span className={styles.techTitle}>Ecosystem Value Emphasis:</span>
        <p className={styles.techDescription}>
          Framing his contributions around the creation and scaling of multi-billion-dollar blockchain ecosystems (e.g., NFTs, DeFi, dApps) bridges the gap — showcasing economic impact and value creation at a systems level, beyond traditional business ownership narratives.
        </p>
      </div>
      <div className={styles.techPoint}>
        <span className={styles.techTitle}>Multidisciplinary Business Architect:</span>
        <p className={styles.techDescription}>
          Positioning William as someone who applies business acumen to architect and advise on scalable, decentralized economic systems offers a compelling, future-forward brand narrative.
        </p>
      </div>

      {/* Summary Section */}
      <h4 className={styles.subheading}>Summary</h4>
      <p className={styles.paragraph}>
        William Entriken’s business and finance background solidifies his strategic foundation, while his true differentiator lies in his ability to apply that acumen toward building and advising ecosystems that drive real-world, billion-dollar economic impact. Rather than following traditional entrepreneurial archetypes, William’s brand reflects the evolution of business leadership into the decentralized and digital-first age.
      </p>
    </>
  );
}