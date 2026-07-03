'use client';

import React from 'react';
import styles from './Phor.module.css';

export default function Phor() {
  return (
    <div id="legacy-website" className={`${styles.wrapper} defaulttopspace`}>

      <h3 className={styles.title}>Phor.net</h3>
      <h4 className={`${styles.subheading} ${styles.subheadingWhite} ${styles.tightSubheading}`}>Portfolio &amp; Blog Site</h4>

      <h4 className={styles.subheading}>Overview</h4>
      <p className={styles.text}>
        Phor.net is William Entriken’s long-running personal website — a platform that has served as a portfolio, blog, and digital home for his professional and personal projects for many years.
      </p>
      <p className={styles.text}>
        Designed less as a traditional brand platform and more as an open, free-form digital journal, Phor.net prioritizes authenticity and genuine self-expression over structured branding or broad audience influence. Its ethos is closer to early internet personal sites or modern platforms like Tumblr, where individuality and free-flowing content take precedence over polished marketing narratives.
      </p>

      <h4 className={styles.subheading}>Strengths</h4>
      <p className={styles.bullet}>• Authenticity: Phor.net reflects William’s candid voice, genuine interests, and personal journey — building real goodwill within his technical communities.</p>
      <p className={styles.bullet}>• Niche Goodwill: Over time, the site has accumulated trust and familiarity among his peers across cybersecurity, civic hacking, finance, and blockchain spaces.</p>
      <p className={styles.bullet}>• Simplicity: With a streamlined structure, it allows readers to quickly explore key projects, writings, and speaking engagements.</p>

      <h4 className={styles.subheading}>Limitations as a Brand Platform</h4>
      <p className={styles.bullet}>• Consolidated Content: Critical aspects of William’s expertise — such as public speaking, press mentions, and major project contributions — are condensed into brief sections rather than given standalone treatment.</p>
      <p className={styles.bullet}>• Lack of Audience Targeting: The site’s free-form nature makes it challenging to strategically guide different audiences (e.g., press, collaborators, conference organizers) to relevant information.</p>
      <p className={styles.bullet}>• Intersecting Niches: Given William’s work across multiple distinct fields (cybersecurity, civic hacking, finance, blockchain), Phor.net’s generalist presentation struggles to deeply resonate with the specialized audiences within each niche.</p>

      <h4 className={styles.subheading}>Summary</h4>
      <p className={styles.text}>
        Phor.net embodies the authentic spirit of William’s work — candid, real, and community-driven. However, as his reputation and opportunities expanded into broader public and commercial spheres, a new, purpose-built brand platform became necessary to complement Phor.net: a platform designed not to replace authenticity, but to strategically frame and amplify his multidisciplinary expertise for new audiences.
      </p>

    </div>
  );
}
