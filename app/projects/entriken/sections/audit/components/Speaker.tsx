'use client';

import React from 'react';
import styles from './Speaker.module.css';

export default function Speaker() {
  return (
    <div id="public-speaking" className={`${styles.wrapper} defaulttopspace`}>

      <h3 className={styles.title}>Public Speaking</h3>

      <h4 className={styles.subheading}>Overview</h4>
      <p className={styles.text}>
        Public speaking has played a critical role in building William Entriken’s authority across a range of technical and business domains. From blockchain innovation and ethical hacking to business marketing and economics, William’s engagements demonstrate a consistent public presence and thought leadership that transcends any single niche.
      </p>

      <h4 className={styles.subheading}>Strengths and Brand Impact</h4>
      <p className={styles.bullet}>• Multi-Domain Authority: By speaking across topics including NFTs, FinTech, DeFi, cybersecurity, and information architecture, William presents himself as a versatile and forward-thinking thought leader.</p>
      <p className={styles.bullet}>• Platform Presence: Photographs, event features, and live recordings provide tangible social proof, enhancing accessibility and relatability for new audiences.</p>
      <p className={styles.bullet}>• Community Engagement: Through live broadcasts (e.g., Community Service Hours) and educational workshops, he fosters an open dialogue, reinforcing his brand values of accessibility, innovation, and civic contribution.</p>

      <h4 className={styles.subheading}>Association with Major Events and Institutions</h4>
      <p className={styles.bullet}>• Recurring honorary speaker at NFT.NYC, one of the premier global NFT conferences.</p>
      <p className={styles.bullet}>• Host and speaker at CHAIN 76, Philadelphia’s first blockchain pharma event, with attendees from Ernst & Young, Celgene, and Johnson & Johnson.</p>
      <p className={styles.bullet}>• Distinguished speaker at the Dallas Regional Chamber of Commerce’s blockchain innovation event.</p>

      <h4 className={styles.subheading}>Strategic Insight</h4>
      <p className={styles.bullet}>• Public speaking engagements allow William’s brand to communicate competence, leadership, and relevance across multiple industries without requiring deep technical explanation.</p>
      <p className={styles.bullet}>• Appearances, recordings, and event photography serve as visual shorthand for credibility — a critical tool for audiences unfamiliar with the nuances of blockchain or software standards.</p>
      <p className={styles.bullet}>• Maintaining an active and visible speaking profile enhances authority positioning and primes broader audiences (e.g., press, collaborators, conference organizers) for deeper engagement with his brand.</p>

    </div>
  );
}
