'use client'
import React from 'react'
import PlainContainer from '@/projects/components/PlainContainer'
import ImageRandomizer from './ImageRandomizer'
import styles from './StaticSite.module.css'

interface StaticSiteProps {
  title?: string
}

export default function StaticSite({ title = 'A Static Site Built like a CMS' }: StaticSiteProps) {
  return (
    <PlainContainer id="static-site-cms" title={title}>
      <p className={`${styles.paragraph} defaultbottomspace`}>
        The current version of the site is powered by Always Fresh Lite (AFL): a Next.js architecture that behaves like a headless CMS without borrowing any of its operational baggage. Content lives in modular files, deterministic data maps, and curated media pools. The result is a code-first workflow that stays nimble, avoids platform lock-in, and keeps performance predictable.
      </p>
      <p className={styles.repoLink}>
        <a href="https://github.com/ritovision/vreeland-fansite" target="_blank" rel="noopener noreferrer">
          See the GitHub repo for the full Open Source codebase and technical specs
        </a>
      </p>
      <p className={`${styles.paragraph} defaultbottomspace`}>
        AFL pairs static generation with edge caching so the site still feels alive thanks to controlled randomness, orchestration logic, and automated cache priming, even when no one is publishing net-new content.
      </p>
      <img
        src="/images/pages/projects/fansite/CMR-diagram.svg"
        alt="Client-side Media Randomization diagram"
        className={styles.diagram}
        loading="lazy"
      />

      <section className={styles.section}>
        <h3 className={styles.heading}>Always Fresh Lite (CMR): Freshness Without New Posts</h3>
        <p className={styles.paragraph}>
          Every page load runs Client-side Media Randomization (CMR): curated pools of photography and copy variants that reshuffle within strict guardrails. Visitors experience new compositions, bots see deterministic media and JSON-LD, all without an editorial team scrambling for weekly updates. It creates perceived freshness, encourages return visits, and protects the performance gains of a static build.
        </p>
        <ImageRandomizer />
      </section>

      <section className={styles.section}>
        <h3 className={styles.heading}>Drag-and-Drop File Integration</h3>
        <p className={styles.paragraph}>
          Adding content is as simple as dropping a file into a folder. The system is designed to auto-detect and render new assets, whether it's an image, a structured data file, or metadata. This replicates the ease-of-use of a headless CMS, but without the need for a database, admin interface, or server-side logic. The publishing workflow is fast, frictionless, and fully developer-controlled.
        </p>
      </section>

      <section className={styles.section}>
        <h3 className={styles.heading}>Client-Side Search Engine for Press Coverage</h3>
        <p className={styles.paragraph}>
          The site features an advanced client-side search and filtering system to browse through over 80 articles featuring Caroline Vreeland. Visitors can filter by publication or tag, navigate with pagination, and instantly access content, all without making a single server request. This architecture gives the impression of a rich, database-powered archive while maintaining the simplicity of a static frontend. It’s fast, scalable, and completely self-contained.
        </p>
      </section>
    </PlainContainer>
  )
}
