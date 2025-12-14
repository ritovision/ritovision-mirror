'use client';

import React from 'react';
import styles from './SEO.module.css'; // Import the CSS Module

export default function SEO() {
  return (
    <div id="seo-ai-optimization" className={`${styles.wrapper} defaulttopspace`}> {/* Use wrapper class */}
      {/* Title */}
      <h3 className={styles.title}>SEO & AI Optimization</h3> {/* Use title class */}

      {/* Overview Section */}
      <h4 className={styles.subheading}>Overview</h4> {/* Use subheading class */}
      <p className={styles.text}> {/* Use text class */}
        WilliamEntriken.net was engineered not only for traditional search engine visibility, but also for long-term machine readability in an evolving landscape of AI-powered discovery and retrieval systems.
      </p>

      {/* Performance Outcomes Section */}
      <h4 className={styles.subheading}>Performance Outcomes</h4> {/* Use subheading class */}
      <p className={styles.text}> {/* Use text class */}
        Within one year of launch, the site achieved and maintains top five search rankings across major search engines — including Google, Bing, and DuckDuckGo — for queries related to William Entriken’s name and professional identity.
      </p>

      {/* Technical Foundations Section */}
      <h4 className={styles.subheading}>Technical Foundations</h4> {/* Use subheading class */}

      {/* Structured Semantic Data */}
      <div className={styles.techPoint}> {/* Wrapper for each point */}
        <span className={styles.techTitle}>Structured Semantic Data:</span> {/* Title part */}
        <p className={styles.techDescription}> {/* Description part */}
          The site leverages JSON-LD structured markup conforming to schema.org standards, providing clear, machine-readable context around William’s identity, achievements, and site content. These structured signals enhance both traditional search engine crawling and AI systems’ contextual understanding of the site’s relevance and authority.
        </p>
      </div>

      {/* Native Accessibility and Semantic Support */}
      <div className={styles.techPoint}> {/* Wrapper for each point */}
        <span className={styles.techTitle}>Native Accessibility and Semantic Support:</span> {/* Title part */}
        <p className={styles.techDescription}> {/* Description part */}
          Wix’s built-in support for semantic HTML, ARIA roles, and alt text on imagery ensures that accessibility best practices are maintained even as the site evolves. This native functionality allows non-technical contributors and future marketing teams to easily maintain strong SEO and accessibility standards without requiring deep web development expertise.
        </p>
      </div>

      {/* Alignment with AI Discovery Patterns */}
      <div className={styles.techPoint}> {/* Wrapper for each point */}
        <span className={styles.techTitle}>Alignment with AI Discovery Patterns:</span> {/* Title part */}
        <p className={styles.techDescription}> {/* Description part */}
          By embedding structured metadata and ensuring consistent semantic clarity, the site is positioned to remain visible and relevant not only for search engine indexing, but also for emerging AI-driven retrieval systems and language models seeking authoritative data sources.
        </p>
      </div>

      {/* Summary Section */}
      <h4 className={styles.subheading}>Summary</h4> {/* Use subheading class */}
      <p className={styles.text}> {/* Use text class */}
        The architecture of WilliamEntriken.net ensures that his public-facing brand remains both highly discoverable and resilient in a digital ecosystem increasingly shaped by artificial intelligence and machine-driven content discovery.
      </p>

    </div>
  );
}
