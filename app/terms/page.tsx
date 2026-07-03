import React from 'react';
import { termsPageMetadata } from './metadata';
import { loadJsonLdScripts } from '@/lib/jsonld/loadJsonFromIndex';
import jsonLdData from './jsonld';
import styles from './styles.module.css';

export const metadata = termsPageMetadata;

export default function TermsPage() {
  return (
    <main className={styles.mainContainer}>
      {loadJsonLdScripts(jsonLdData, 'terms-jsonld')}

      <div className={styles.content}>
        <h1 className={styles.title}>Terms of Service</h1>
        <p className={styles.meta}>Last Updated: November 8, 2025</p>

        <section className={styles.section}>
          <h2>1. Introduction</h2>
          <p>
            These Terms of Service govern your access to and use of the Ritovision website and related properties. By using this site, you agree to these Terms.
          </p>
        </section>

        <section className={styles.section}>
          <h2>2. Services and Purpose</h2>
          <p>
            The site is provided for informational purposes and as a means to inquire about services through contact forms. Any content on this site is general information and is not tailored to your situation.
          </p>
        </section>

        <section className={styles.section}>
          <h2>3. No Financial or Investment Advice</h2>
          <p>
            The site does not provide financial, investment, legal, tax, or accounting advice. Nothing on the site should be construed as a recommendation to buy, sell, or hold any asset, including digital assets or cryptocurrencies. You are solely responsible for your decisions and should consult qualified professionals before acting.
          </p>
        </section>

        <section className={styles.section}>
          <h2>4. No Warranty; Availability</h2>
          <p>
            The site and all content are provided “as is” and “as available” without warranties of any kind, express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, title, and non-infringement. We do not warrant that the site will be uninterrupted, secure, timely, or error-free, or that defects will be corrected.
          </p>
        </section>

        <section className={styles.section}>
          <h2>5. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, Ritovision and its affiliates shall not be liable for any indirect, incidental, special, consequential, exemplary, or punitive damages, or for any loss of profits, revenues, data, or goodwill arising from or related to your use of the site.
          </p>
        </section>

        <section className={styles.section}>
          <h2>6. User Responsibilities</h2>
          <ul className={styles.list}>
            <li>Use the site in compliance with applicable laws and regulations.</li>
            <li>Respect intellectual property and proprietary rights.</li>
            <li>Do not interfere with, disrupt, or attempt to gain unauthorized access to the site or its systems.</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>7. Contact Forms and Submissions</h2>
          <p>
            Submitting a form does not guarantee a response, services, engagement, partnership, affiliation, or the availability of any offering. Submissions are inquiries only and create no obligations.
          </p>
        </section>

        <section className={styles.section}>
          <h2>8. Changes to These Terms</h2>
          <p>
            We may update these Terms at any time. The “Last Updated” date reflects the latest revision. Your continued use of the site constitutes acceptance of the updated Terms.
          </p>
        </section>

        <section className={styles.section}>
          <h2>9. Governing Law; Venue; Conflict of Laws</h2>
          <p>
            These Terms are governed by the laws of the State of Delaware, without regard to its conflict-of-laws principles. You agree to the exclusive jurisdiction and venue of the state and federal courts located in Delaware for any dispute arising out of or relating to these Terms or the site.
          </p>
        </section>

        <section className={styles.section}>
          <h2>10. Contact</h2>
          <p>
            For questions about these Terms, contact{" "}
            <a href="mailto:support@ritovision.com">support@ritovision.com</a>.
          </p>
        </section>
      </div>
    </main>
  );
}
