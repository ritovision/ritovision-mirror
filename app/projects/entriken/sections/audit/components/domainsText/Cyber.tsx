// \test\app\projects\entriken\sections\audit\components\domainsText\Cyber.tsx
'use client';

import React from 'react';
// Import styles from the parent Domains component's CSS module
import styles from '../Domains.module.css';

export default function Cyber() {
  return (
    <> {/* Use Fragment to wrap the content without adding an extra DOM node */}
      {/* Overview Paragraphs */}
      <p className={styles.paragraph}>
        As a cybersecurity professional, William Entriken has built an impressive track record collaborating with organizations such as Apple, FINRA, the U.S. Securities and Exchange Commission (SEC), and the Federal Bureau of Investigation (FBI) — supported by a Department of Defense security clearance.
      </p>
      <p className={styles.paragraph}>
        His work spans both private-sector engagements and national security contributions, including penetration testing, secure code review, and the responsible disclosure of vulnerabilities.
      </p>
      <p className={styles.paragraph}>
        Operating as a white hat hacker, William actively publishes research on zero-day vulnerabilities, earning recognition within specialized cybersecurity circles and maintaining a watch-listed profile monitored by governmental entities and nation-states.
      </p>
      <p className={styles.paragraph}>
        This status underscores both his technical credibility and the real-world impact of his contributions — protecting untold sums of assets and infrastructure through proactive, ethical security work.
      </p>

      {/* Audience Perception and Challenges Section */}
      <h4 className={styles.subheading}>Audience Perception and Challenges</h4>
      <p className={styles.paragraph}>
        While cybersecurity expertise commands deep respect within technical and government sectors, it introduces a degree of brand complexity when positioning to broader audiences:
      </p>
      <p className={styles.paragraph}>
        Public Misunderstanding: The nuances of white hat versus black hat hacking are often lost on general audiences, leading to potential misinterpretation or undue caution.
      </p>
      <p className={styles.paragraph}>
        Identity Dilution Risk: Emphasizing a cybersecurity persona too heavily could distract from more commercially accessible identities in business, finance, and solutions architecture.
      </p>
      <p className={styles.paragraph}>
        Niche Recognition: Within cybersecurity circles, William’s credibility is firmly established, limiting the marginal utility of additional mainstream brand building in this domain.
      </p>

      {/* Branding Opportunities Section */}
      <h4 className={styles.subheading}>Branding Opportunities</h4>
      {/* Branding Opportunities points with responsive styling */}
      <div className={styles.techPoint}>
        <span className={styles.techTitle}>Strategic Authority Signal:</span>
        <p className={styles.techDescription}>
          Cybersecurity credentials serve as a powerful auxiliary authority marker, signaling deep technical mastery, high-trustworthiness, and operational rigor.
        </p>
      </div>
      <div className={styles.techPoint}>
        <span className={styles.techTitle}>Narrative Flair:</span>
        <p className={styles.techDescription}>
          Integrating cybersecurity accomplishments into broader brand narratives adds dimension and "edge" — positioning William not merely as a technologist or entrepreneur, but as a strategic operator capable of identifying and neutralizing systemic vulnerabilities.
        </p>
      </div>
      <div className={styles.techPoint}>
        <span className={styles.techTitle}>Business Protective Framing:</span>
        <p className={styles.techDescription}>
          Framed correctly, cybersecurity expertise strengthens William’s appeal to business audiences — portraying him as someone who not only builds scalable solutions but also understands how to safeguard them against existential threats.
        </p>
      </div>

      {/* Summary Section */}
      <h4 className={styles.subheading}>Summary</h4>
      <p className={styles.paragraph}>
        William Entriken’s cybersecurity profile offers a compelling supplement to his broader brand — reinforcing his credentials as a builder, protector, and strategist. While not suited to become the centerpiece of mainstream positioning, this domain adds a distinctive layer of credibility, trust, and tactical acumen to his overall thought leadership identity.
      </p>
    </>
  );
}