'use client';

import React from 'react';
import styles from './Press.module.css';

export default function Press() {
  return (
    <div id="press-publications" className={`${styles.wrapper} defaulttopspace`}>

      <h3 className={styles.title}>Press &amp; Publications</h3>

      <h4 className={styles.subheading}>Overview</h4>
      <p className={styles.text}>
        William Entriken’s body of press coverage and citations demonstrates broad authority across multiple disciplines — from civic hacking and finance to blockchain innovation. However, the diversity of coverage has also introduced challenges in consistently communicating a clear and unified public identity.
      </p>

      <h4 className={styles.subheading}>Strengths and Impact</h4>
      <div className={styles.techPoint}>
        <span className={styles.techTitle}>Mainstream Press Coverage:</span>
        <p className={styles.techDescription}>
          Early in his career, William gained recognition in reputable publications — including NBC for his civic technology contributions in the Philadelphia area, establishing early credibility outside of blockchain circles.
        </p>
      </div>
      <div className={styles.techPoint}>
        <span className={styles.techTitle}>Diverse Expertise Recognition:</span>
        <p className={styles.techDescription}>
          Across various articles and media appearances, William has been described as a civic hacker, financial analyst, and solutions architect, reflecting the breadth of his expertise.
        </p>
      </div>
      <div className={styles.techPoint}>
        <span className={styles.techTitle}>Academic Authority:</span>
        <p className={styles.techDescription}>
          ERC-721, the standard he led, has been cited in hundreds of peer-reviewed journal articles — solidifying his technical credibility among serious researchers, engineers, and scientific communities.
        </p>
      </div>

      <h4 className={styles.subheading}>Strategic Insight</h4>
      <div className={styles.techPoint}>
        <span className={styles.techTitle}>Continuity Challenge:</span>
        <p className={styles.techDescription}>
          The multiplicity of labels (civic hacker, financial analyst, blockchain expert) dilutes continuity of brand perception, making it harder for general audiences to form a simple, lasting mental image of William’s expertise.
        </p>
      </div>
      <div className={styles.techPoint}>
        <span className={styles.techTitle}>Opportunity Through Seminality:</span>
        <p className={styles.techDescription}>
          William’s foundational contributions to blockchain and digital infrastructure present a unique opportunity: By framing his role as a seminal architect behind multiple high-profile phenomena, his brand can borrow gravity from the wider ecosystem — without overextending or misrepresenting his contributions.
        </p>
      </div>
      <div className={styles.techPoint}>
        <span className={styles.techTitle}>Audience-Specific Positioning:</span>
        <p className={styles.techDescription}>
          Academic citations offer primary prestige among scientific and technical communities, while mainstream press presence reinforces supplementary credibility to broader, less technical audiences.
        </p>
      </div>

      <h4 className={styles.subheading}>Summary</h4>
      <p className={styles.text}>
        William’s presence across press, academic publications, and indirect ecosystem influence forms a strong but nuanced foundation of authority. The branding challenge lies not in creating new credibility, but in refining and aligning the story so that both technical and general audiences can immediately recognize his leadership and impact.
      </p>

    </div>
  );
}
