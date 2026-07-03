'use client';

import React from 'react';
import styles from './SEO.module.css';

export default function SEO() {
  return (
    <div id="seo-ai-optimization" className={`${styles.wrapper} defaulttopspace`}>
      <h3 className={styles.title}>SEO & AI Optimization</h3>

      <h4 className={styles.subheading}>Overview</h4>
      <p className={styles.text}>
        WilliamEntriken.net was engineered not only for traditional search engine
        visibility, but also for long-term machine readability in an evolving
        landscape of AI-powered discovery and retrieval systems.
      </p>

      <h4 className={styles.subheading}>Performance Outcomes</h4>
      <p className={styles.text}>
        Within one year of launch, the site achieved and maintains top five search
        rankings across major search engines - including Google, Bing, and
        DuckDuckGo - for queries related to William Entriken's name and professional
        identity.
      </p>

      <h4 className={styles.subheading}>Technical Foundations</h4>

      <div className={styles.techPoint}>
        <span className={styles.techTitle}>Structured Semantic Data:</span>
        <p className={styles.techDescription}>
          The site leverages JSON-LD structured markup conforming to schema.org
          standards, providing clear, machine-readable context around William's
          identity, achievements, and site content. These structured signals enhance
          both traditional search engine crawling and AI systems' contextual
          understanding of the site's relevance and authority.
        </p>
      </div>

      <div className={styles.techPoint}>
        <span className={styles.techTitle}>Astro-Based Semantic Architecture:</span>
        <p className={styles.techDescription}>
          The Astro rebuild gave the site a cleaner multi-page structure, route-level
          content ownership, and tighter control over semantic output. That foundation
          supports accessibility, crawlability, and maintainability without depending
          on generic page-builder abstractions.
        </p>
      </div>

      <div className={styles.techPoint}>
        <span className={styles.techTitle}>Alignment with AI Discovery Patterns:</span>
        <p className={styles.techDescription}>
          The site's architecture also treats AI discoverability as a product concern.
          It combines structured metadata with machine-friendly page composition and an
          "Ask your AI" workflow that supports provider deep links and Markdown export
          for downstream retrieval and summarization tools.
        </p>
      </div>

      <h4 className={styles.subheading}>Summary</h4>
      <p className={styles.text}>
        The architecture of WilliamEntriken.net ensures that his public-facing brand
        remains both highly discoverable and resilient in a digital ecosystem
        increasingly shaped by artificial intelligence and machine-driven content
        discovery.
      </p>
    </div>
  );
}
