// \test\app\projects\entriken\sections\audit\components\domainsText\Solutions.tsx
'use client';

import React from 'react';
// Import styles from the parent Domains component's CSS module
import styles from '../Domains.module.css';

export default function Solutions() {
  return (
    <> {/* Use Fragment to wrap the content without adding an extra DOM node */}
      {/* Overview Paragraphs */}
      <p className={styles.paragraph}>
        At the core of William Entriken’s multidisciplinary expertise is his foundation as a solutions architect — a role that integrates technical vision, software engineering, and strategic business alignment.
      </p>
      <p className={styles.paragraph}>
        This capability forms the root system that connects his diverse activities across civic hacking, cybersecurity, blockchain standards development, and business consulting.
      </p>
      <p className={styles.paragraph}>
        As a solutions architect, William designs and implements complex systems that bridge technical depth with real-world outcomes — whether for open-source civic projects, private-sector business objectives, or decentralized blockchain ecosystems.
      </p>
      <p className={styles.paragraph}>
        This role is supported by his academic background, blending a Bachelor’s degree in Computer Science with dual graduate degrees in Finance and Investment Management, providing him a rare hybrid perspective on how software architecture decisions intersect with operational and financial realities.
      </p>

      {/* Audience Perception and Challenges Section - Structure updated */}
      <h4 className={styles.subheading}>Audience Perception and Challenges</h4>
      {/* Format using techPoint/techTitle/techDescription */}
      <div className={styles.techPoint}>
        <span className={styles.techTitle}>Niche Recognition:</span>
        <p className={styles.techDescription}>
          Among technical audiences, the title "solutions architect" immediately conveys authority in systems design and software scalability. However, to broader audiences unfamiliar with software development practices, the term may sound generic or lack emotional resonance.
        </p>
      </div>
      <div className={styles.techPoint}>
        <span className={styles.techTitle}>Lack of Immediate Impact Visibility:</span>
        <p className={styles.techDescription}>
          Solutions architecture describes the process of creation, but not the magnitude or significance of what has been built. Without contextual storytelling, the business and societal impacts of William’s contributions risk being underappreciated.
        </p>
      </div>
      <div className={styles.techPoint}>
        <span className={styles.techTitle}>Contrast with Civic Hacking:</span>
        <p className={styles.techDescription}>
          While closely related, civic hacking and solutions architecture reflect different motivations: civic hacking emphasizes public good, whereas solutions architecture typically centers on fulfilling defined business or operational goals. Balancing these narratives requires careful framing to avoid perceived contradictions.
        </p>
      </div>

      {/* Branding Opportunities Section */}
      <h4 className={styles.subheading}>Branding Opportunities</h4>
      {/* Branding Opportunities points with responsive styling using techPoint/techTitle/techDescription */}
      <div className={styles.techPoint}>
        <span className={styles.techTitle}>Foundational Identity:</span>
        <p className={styles.techDescription}>
          Solutions architecture serves as the critical foundation that underpins William’s broader contributions — providing the technical rigor, systems thinking, and problem-solving methodology necessary for his pioneering work in blockchain, civic technology, and cybersecurity.
        </p>
      </div>
      <div className={styles.techPoint}>
        <span className={styles.techTitle}>Software Pioneer Narrative:</span>
        <p className={styles.techDescription}>
          While "solutions architect" accurately describes William’s technical methodology, his brand positioning can be elevated by framing him as a software pioneer — an innovator who not only architects solutions but pushes the boundaries of what decentralized and digital systems can achieve.
        </p>
      </div>
      <div className={styles.techPoint}>
        <span className={styles.techTitle}>Strategic Integration with Civic Hacking and Business Acumen:</span>
        <p className={styles.techDescription}>
          By weaving his solutions architecture identity into both civic impact (public-serving technology) and business strategy (enterprise consulting, financial innovation), William’s brand can portray a coherent, multidisciplinary leader capable of designing and deploying systems with profound societal and economic influence.
        </p>
      </div>

      {/* Summary Section */}
      <h4 className={styles.subheading}>Summary</h4>
      <p className={styles.paragraph}>
        Solutions architecture represents the technical and strategic core of William Entriken’s work — the engine that powers his innovations across blockchain, finance, cybersecurity, and civic technology. Strategically positioned, it frames him not merely as a builder of systems, but as a pioneer shaping the infrastructures of tomorrow’s decentralized world.
      </p>
    </>
  );
}