'use client';
import React from 'react';
import styles from './Wix.module.css'; // Import the CSS Module

export default function Wix() {
  return (
    <div id="software-architecture" className={`${styles.wrapper} defaulttopspace`}> {/* Use wrapper class */}
      {/* Updated title */}
      <h3 className={styles.title}>Software Architecture</h3>

      {/* Overview Section */}
      <h4 className={styles.subheading}>Overview</h4> {/* Use subheading class */}
      <p className={styles.text}> {/* Use text class */}
        The technical architecture for WilliamEntriken.net was designed with a deliberate focus on ease of maintenance, security, and future-proof modularity — balancing immediate usability with long-term scalability.
      </p>
      <p className={styles.text}> {/* Use text class */}
        A hybrid approach was chosen, leveraging the intuitive content management capabilities of Wix combined with custom-coded components to extend functionality beyond standard no-code limitations.
      </p>

      {/* Platform Choice Section */}
      <h4 className={styles.subheading}>Platform Choice</h4> {/* Use subheading class */}
      <p className={styles.text}> {/* Use text class */}
        Wix was strategically selected for its low barrier to entry for content updates, allowing non-technical users — whether William himself or a future marketing team — to manage and refresh site content without developer intervention.
      </p>
      <p className={styles.text}> {/* Use text class */}
        This decision future-proofs the brand platform by ensuring flexibility and agility for campaign launches, PR updates, and dynamic content needs.
      </p>

      {/* Custom Secure Communications Section */}
      <h4 className={styles.subheading}>Custom Secure Communications</h4> {/* Use subheading class */}
      <p className={styles.text}> {/* Use text class */}
        Recognizing William's strong emphasis on security and privacy, custom-coded secure contact forms were embedded into the site architecture.
      </p>
      <p className={styles.bullet}>• Front-end forms are integrated with a Cloudflare Worker backend for serverless, high-resilience processing.</p> {/* Use bullet class */}
      <p className={styles.bullet}>• Additional layers were implemented for SMTP handling and CRM compatibility, supporting streamlined yet secure communications.</p> {/* Use bullet class */}
      <p className={styles.bullet}>• Message sanitization and redundancy safeguards were incorporated to protect sensitive data without exposing system architecture publicly.</p> {/* Use bullet class */}
      <p className={styles.text}> {/* Use text class */}
        This approach ensures that communications are secure, modular, and scalable — critical for protecting both operational integrity and user trust.
      </p>

      {/* Cross-Site Content Synchronization Section */}
      <h4 className={styles.subheading}>Cross-Site Content Synchronization</h4> {/* Use subheading class */}
      <p className={styles.text}> {/* Use text class */}
        A custom synchronization system was developed to align dynamic content between WilliamEntriken.net and Phor.net.
      </p>
      <p className={styles.bullet}>• Specific lists — including press coverage and speaking engagements — are managed centrally.</p> {/* Use bullet class */}
      <p className={styles.bullet}>• Updates made on Phor.net automatically propagate to WilliamEntriken.net, where they are restructured and displayed through a distinct, branded UI.</p> {/* Use bullet class */}
      <p className={styles.bullet}>• This integration minimizes administrative overhead, ensures brand consistency across platforms, and maintains the authenticity of William’s legacy materials while presenting them through a newly designed public-facing lens.</p> {/* Use bullet class */}

    </div>
  );
}
