import React from 'react';
import { securityPageMetadata } from './metadata';
import { loadJsonLdScripts } from '@/lib/jsonld/loadJsonFromIndex';
import jsonLdData from './jsonld';
import styles from './styles.module.css';
import PGP from '@/components/content/PGP';

export const metadata = securityPageMetadata;

export default function SecurityPage() {
  return (
    <main className={styles.mainContainer}>
      {loadJsonLdScripts(jsonLdData, 'security-jsonld')}

      <div className={styles.content}>
        <h1 className={styles.title}>Security Policy</h1>
        <p className={styles.meta}>Last Updated: January 16, 2026</p>

        <section className={styles.section}>
          <h2>1. Overview</h2>
          <p>
            This page explains how to report security issues for Ritovision
            digital properties and how we handle disclosures.
          </p>
        </section>

        <section className={styles.section}>
          <h2>2. Reporting a Vulnerability</h2>
          <p>
            Please submit security reports using the General Inquiry form on the{' '}
            <a href="/contact">contact page</a>. Include enough detail for us to
            reproduce the issue.
          </p>
          <ul className={styles.list}>
            <li>Affected URLs or endpoints</li>
            <li>Steps to reproduce</li>
            <li>Potential impact</li>
            <li>Your preferred contact method</li>
          </ul>
          <p>
            If you want to share sensitive details, use the PGP key listed below
            to encrypt your message.
          </p>
        </section>

        <section className={styles.section}>
          <h2>3. Scope</h2>
          <p>In scope:</p>
          <ul className={styles.list}>
            <li>ritovision.com, its static content and other web properties including ritorhymes.com, ritography.com, ritoswap.com, carolinevreeland.com, williamentriken.net</li>
            <li>Contact forms and related site functionality</li>
          </ul>
          <p>Out of scope:</p>
          <ul className={styles.list}>
            <li>Third-party services or integrations we do not control</li>
            <li>Social media accounts and external platforms</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>4. Safe Harbor</h2>
          <p>
            We welcome good-faith security research. Please avoid privacy
            violations, data destruction, or service disruption. If you follow
            this policy, we will not pursue legal action against you for your
            research.
          </p>
        </section>

        <section className={styles.section}>
          <h2>5. Response and Remediation</h2>
          <p>
            We review reports in order of receipt and prioritize by severity.
            We aim to acknowledge submissions as soon as possible. Resolution
            timelines vary depending on complexity and impact, and we may ask
            for clarification along the way.
          </p>
        </section>

        <section className={styles.section}>
          <h2>6. Coordinated Disclosure</h2>
          <p>
            Please keep vulnerability details private until we have completed a
            fix or mutually agreed on a disclosure timeline.
          </p>
        </section>

        <section className={styles.section}>
          <h2>7. security.txt</h2>
          <p>
            The canonical machine-readable policy is published at{' '}
            <a href="/.well-known/security.txt">
              ritovision.com/.well-known/security.txt
            </a>
            .
          </p>
        </section>

        <section className={styles.section}>
          <h2>8. PGP Key</h2>
          <p>
            Use this key to encrypt sensitive reports. The canonical key is the
            .asc file listed in security.txt.
          </p>
          <PGP />
        </section>
      </div>
    </main>
  );
}
