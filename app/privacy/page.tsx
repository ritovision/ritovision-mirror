import React from 'react';
import { privacyPageMetadata } from './metadata';
import { loadJsonLdScripts } from '@/lib/jsonld/loadJsonFromIndex';
import jsonLdData from './jsonld';
import styles from './styles.module.css';

export const metadata = privacyPageMetadata;

export default function PrivacyPage() {
  return (
    <main className={styles.mainContainer}>
      {loadJsonLdScripts(jsonLdData, 'privacy-jsonld')}

      <div className={styles.content}>
        <h1 className={styles.title}>Privacy Policy</h1>
        <p className={styles.meta}>Last Updated: November 8, 2025</p>

        <section className={styles.section}>
          <h2>1. Introduction</h2>
          <p>
            This Privacy Policy explains what information Ritovision collects and how it is used. The site is primarily informational and provides a way to inquire about services via contact forms.
          </p>
        </section>

        <section className={styles.section}>
          <h2>2. Information We Collect</h2>
          <p>
            We only collect personal information that you voluntarily submit through our contact forms, such as your name, email address, and message details for the purpose of responding to your inquiry or request for services.
          </p>
          <p>
            We do not track your IP address, we do not collect payment information, and we do not track browsing behavior.
          </p>
        </section>

        <section className={styles.section}>
          <h2>3. Cookies and Tracking</h2>
          <p>
            We do not use cookies or similar tracking technologies for marketing or behavioral profiling. We may send anonymized reports of page errors to improve the site experience; these reports do not include personal data.
          </p>
        </section>

        <section className={styles.section}>
          <h2>4. How We Use Your Information</h2>
          <p>
            Information you submit via contact forms is used to review and respond to your inquiry or request for services and to operate and improve the site.
          </p>
        </section>

        <section className={styles.section}>
          <h2>5. Third-Party Sharing</h2>
          <p>
            We do not sell your personal information. We may share information with service providers to fulfill or support specific requests you make, with analytics providers to improve user experience using anonymized operational data, and with legal authorities when required by law.
          </p>
        </section>

        <section className={styles.section}>
          <h2>6. Your Rights</h2>
          <p>
            You may request access to, correction of, or deletion of personal information you have provided. We do not send marketing communications, so there is no marketing opt-out to manage.
          </p>
        </section>

        <section className={styles.section}>
          <h2>7. Data Security</h2>
          <p>
            We use reasonable technical and organizational measures to safeguard the information you submit. However, no method of transmission or storage is completely secure.
          </p>
        </section>

        <section className={styles.section}>
          <h2>8. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. The date above reflects the latest version. Your continued use of the site signifies acceptance of any changes.
          </p>
        </section>

        <section className={styles.section}>
          <h2>9. Contact Us</h2>
          <p>
            For questions about this Privacy Policy or your data, contact{' '}
            <a href="mailto:support@ritovision.com">support@ritovision.com</a>.
          </p>
        </section>
      </div>
    </main>
  );
}
