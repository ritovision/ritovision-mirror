// FILE PATH: app\projects\entriken\sections\audit\components\domainsText\Civic.tsx
'use client';

import React from 'react';
// Import styles from the parent Domains component's CSS module
import styles from '../Domains.module.css';

export default function Civic() {
  return (
    <> {/* Use Fragment to wrap the content without adding an extra DOM node */}
      <p className={styles.paragraph}>
        Contrary to initial impressions, the term "Civic Hacker" has little to do with illegal activity or cybersecurity breaches.
      </p>
      <p className={styles.paragraph}>
        A civic hacker is an individual who applies technological, data-driven, and creative problem-solving skills to augment or build public-serving projects, typically in open-source or community-driven contexts.
      </p>
      <p className={styles.paragraph}>
        Early in his career, William Entriken embodied this ethos through a variety of initiatives in Philadelphia — notably developing a custom application to improve the notoriously unreliable SEPTA train schedules.
      </p>
       <p className={styles.paragraph}>
        By creating a real-time tracking algorithm and making it publicly available, William provided a tangible civic improvement that reflected the spirit of open-source contribution and public good.
      </p>

      {/* Audience Perception and Challenges Section */}
      <h4 className={styles.subheading}>Audience Perception and Challenges</h4>
      <p className={styles.paragraph}>
        While the "Civic Hacker" identity is globally acknowledged — including formal recognition by institutions such as the U.S. government (e.g., National Day of Civic Hacking) — it remains relatively obscure in mainstream discourse.
      </p>
      <p className={styles.paragraph}>
        For audiences unfamiliar with the term, the inclusion of "hacker" may inadvertently evoke negative associations, creating an initial brand perception hurdle.
      </p>
      <p className={styles.paragraph}>
        Additionally, the breadth of the civic hacker role can lead to ambiguity without targeted brand messaging: it encompasses work across cybersecurity, solutions architecture, finance governance, and blockchain — making it both a strength and a strategic challenge.
      </p>

      {/* Branding Opportunities Section */}
      <h4 className={styles.subheading}>Branding Opportunities</h4>
      {/* Branding Opportunities points with responsive styling */}
      <div className={styles.techPoint}>
        <span className={styles.techTitle}>Unifying Multidisciplinary Expertise:</span>
        <p className={styles.techDescription}>
          Civic hacking offers a natural umbrella for William’s wide-ranging skill set — allowing cybersecurity research, blockchain standards development, financial advocacy, and solutions architecture to align under a single narrative of societal contribution.
        </p>
      </div>
      <div className={styles.techPoint}>
        <span className={styles.techTitle}>Pinnacle Positioning Potential:</span>
        <p className={styles.techDescription}>
          Through his foundational contributions to blockchain infrastructure — offered without personal financial stakes — William exemplifies the pinnacle of civic hacker values at a global scale.
        </p>
      </div>
      <div className={styles.techPoint}>
        <span className={styles.techTitle}>Undersaturated Thought Leadership Space:</span>
        <p className={styles.techDescription}>
          Although civic hacking is acknowledged, few individuals have successfully positioned themselves as mainstream thought leaders within this identity. With active brand campaigning and strategic visibility efforts, William has a realistic opportunity to own and define this archetype in the public imagination.
        </p>
      </div>

      {/* Summary Section */}
      <h4 className={styles.subheading}>Summary</h4>
      <p className={styles.paragraph}>
        While not immediately accessible to general audiences, the civic hacker identity provides a compelling, values-driven frame for William Entriken’s multidisciplinary expertise. Strategically cultivated, it could serve as a powerful differentiator — establishing him not just as a pioneer in blockchain or cybersecurity, but as a leading figure in the broader movement of technological public service.
      </p>
    </>
  );
}