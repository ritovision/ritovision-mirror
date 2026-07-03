'use client';

import React from 'react';
import styles from '../Public.module.css';

export default function CSH() {
  return (
    <div className={styles.publicContainer}>
      <h3 className={styles.title}>
        <img
          src="/images/pages/projects/entriken/logos/CSH.png"
          alt="CSH Podcast Logo"
        />
        CSH Podcast
      </h3>

      <p className={styles.leftText}>
        William hosts Community Service Hour — a hybrid-format podcast that blends open community participation with structured expert commentary.
      </p>
      <p className={styles.leftText}>
        Syndicated across all major platforms (Apple Podcasts, YouTube, and more), Community Service Hour invites anyone — via Twitter/X — to join live, ask questions, showcase projects, review code, and engage directly in discussions.
      </p>
      <p className={styles.leftText}>
        Some episodes feature planned guest interviews or workshops, while others offer William’s commentary on the latest developments in blockchain, cybersecurity, and decentralized innovation.
      </p>
      <p className={styles.leftText}>
        The podcast stands out not only for its format — an open, participatory blend of after-school club and educational show — but also for William’s deliberate choice to keep it advertisement-free, providing genuinely free advice and education to the public.
      </p>

      <div className={styles.redHeading}>
        Strategic Insight
      </div>
      <p className={styles.leftText}>
        Community Service Hour significantly strengthens William’s thought leadership by blending open accessibility with personal community engagement.
      </p>
      <p className={styles.leftText}>
        The podcast’s hybrid format — combining open participation, live workshops, guest interviews, and commentary — positions him as an accessible thought leader, not just an elite technical figure.
      </p>
      <p className={styles.leftText}>
        It softens the high-level technical authority associated with his blockchain legacy and makes him more approachable by offering a casual, open-door environment where anyone can join, ask questions, and engage with real-world projects.
      </p>
      <p className={styles.leftText}>
        This active, unscripted community engagement also deeply reinforces his Civic Hacker identity: Community Service Hour functions like a form of civic duty and civil service — providing free advice, education, and mentorship without commercial intent.
      </p>
      <p className={styles.leftText}>
        Rather than simply operating from a distance, William gets personally and directly involved, creating a visible, credible signal of goodwill and public contribution that resonates with both technical insiders and broader audiences.
      </p>
      <p className={styles.leftText}>
        Through this platform, William strengthens the perception that he remains closely tied to grassroots innovation, reinforcing authenticity, leadership approachability, and societal value as key aspects of his evolving public brand.
      </p>
    </div>
  );
}
