'use client';
import React from 'react';
import styles from './Astro.module.css';

export default function Astro() {
  return (
    <div id="software-architecture" className={`${styles.wrapper} defaulttopspace`}>
      <h3 className={styles.title}>Software Architecture</h3>

      <h4 className={styles.subheading}>Overview</h4>
      <p className={styles.text}>
        WilliamEntriken.net was engineered as a durable editorial platform rather
        than a conventional marketing site or single-page application. The
        architecture treats content longevity, machine readability, and operational
        reliability as first-class concerns alongside presentation, giving the site
        a foundation designed to hold up over years of evolving public narrative
        rather than quarterly redesign cycles. The code is{' '}
        <a href="https://github.com/ritovision/william-entriken.net" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>
          Open Source on GitHub
        </a>{' '}
        under the Apache 2.0 license.
      </p>
      <p className={styles.text}>
        The original version was built in Wix when the project still anticipated
        active marketing use and frequent content updates by non-technical
        collaborators. Once the long-term content strategy, feed synchronization
        requirements, and form infrastructure became clearer, the platform was
        deliberately migrated to a custom Astro build that could support those
        needs without the constraints of a managed site builder.
      </p>

      <h4 className={styles.subheading}>Content Model and Component Architecture</h4>
      <p className={styles.text}>
        The site uses a multi-page Astro architecture where each route owns its own
        content and composition. Core routes such as <code>/about</code>,{' '}
        <code>/nfts</code>, <code>/press</code>, <code>/speaking</code>,{' '}
        <code>/contact</code>, and <code>/services</code> each live in dedicated
        folders with co-located <code>_content.json</code> files and page-specific
        components, keeping editorial ownership local to the page rather than
        centralized in a CMS or global data layer.
      </p>
      <p className={styles.bullet}>
        - Shared components are organized into distinct tiers: layout shells,
        primitive UI elements, reusable content sections, and shared image
        primitives that enforce consistent optimization and accessibility across
        every route.
      </p>
      <p className={styles.bullet}>
        - Styling is built on Bootstrap primitives composed with project-specific
        design tokens and utilities, maintaining visual consistency without
        depending on a rigid framework skin.
      </p>
      <p className={styles.bullet}>
        - Desktop sidebar and mobile drawer navigation both expose in-page
        table-of-contents panels, treating deep navigation as an architectural
        feature of long-form editorial pages rather than an afterthought.
      </p>

      <h4 className={styles.subheading}>Cross-Site Feed Synchronization</h4>
      <p className={styles.text}>
        Press and speaking coverage originates on phor.net, a separate repository
        in William's broader web ecosystem. Rather than duplicating that content
        manually or depending on fragile runtime fetches alone, the site implements
        a redundant two-path synchronization strategy that prioritizes data
        integrity while minimizing maintenance burden.
      </p>
      <p className={styles.bullet}>
        - A scheduled GitHub Actions workflow runs daily, fetches upstream feed
        JSON from the phor.net repository, normalizes it into local data files,
        and opens a pull request when the dataset has changed. This CI-driven path
        serves as the authoritative source of truth, keeping committed data current
        through an auditable and reviewable process.
      </p>
      <p className={styles.bullet}>
        - At runtime, feed components render from the embedded local dataset first,
        then perform a delayed fetch against the same upstream source. The payload
        is normalized and compared against the embedded items, and the UI updates
        only when an actual diff is detected. This path does not modify the
        repository — it only bridges the gap between sync cycles to surface recent
        upstream changes in the browser.
      </p>
      <p className={styles.bullet}>
        - The two paths are complementary by design. The CI path provides durable,
        version-controlled data. The runtime path provides freshness between syncs.
        Neither depends on the other, and the system degrades gracefully if either
        is temporarily unavailable.
      </p>

      <h4 className={styles.subheading}>Forms, Validation, and Delivery</h4>
      <p className={styles.text}>
        The site supports three distinct form flows — contact, services, and
        speaking inquiry — each with structured client-side validation and a
        delivery layer fully decoupled from the Astro application.
      </p>
      <p className={styles.bullet}>
        - Zod-backed schemas enforce required fields, field-specific constraints,
        email format validation, and payload size limits on the client before any
        network request is made.
      </p>
      <p className={styles.bullet}>
        - Form payloads are submitted as JSON to a Cloudflare Worker endpoint that
        handles SMTP delivery independently, keeping email infrastructure entirely
        outside the Astro application boundary.
      </p>
      <p className={styles.bullet}>
        - Two testing modes support development and production verification: a mock
        mode for predeploy testing and a live-safe test phrase for exercising real
        infrastructure during postdeploy validation without sending actual mail.
      </p>

      <h4 className={styles.subheading}>CI/CD Pipeline and Quality Gates</h4>
      <p className={styles.text}>
        The production pipeline enforces an eight-stage quality gate sequence that
        spans validation, testing, deployment, and automatic rollback — treating
        deployment reliability as a first-class architectural concern rather than
        an operational afterthought.
      </p>
      <p className={styles.bullet}>
        - The pipeline stages run in strict order: configuration validation,
        linting, Vitest unit tests, link checking, Playwright predeploy tests,
        Vercel deployment, Playwright postdeploy tests, and automatic rollback on
        postdeploy failure.
      </p>
      <p className={styles.bullet}>
        - Playwright runs the same browser test suite twice — once against the
        local build preview with mocked form endpoints, and once against the live
        production URL with live-safe test phrases — catching both build-time
        regressions and deployment-specific failures.
      </p>
      <p className={styles.bullet}>
        - Vitest unit tests cover feed normalization, schema generation, form
        environment and runtime behavior, submission logic, and shared runtime
        utilities.
      </p>
      <p className={styles.bullet}>
        - Accessibility compliance is enforced in CI through axe-core integration
        in Playwright, ensuring that core user flows meet accessibility standards
        on every deploy rather than being audited periodically after the fact.
      </p>
    </div>
  );
}
