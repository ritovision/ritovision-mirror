import React from 'react';
import { owaspCaseStudyMetadata } from './metadata';
import CaseStudyHeading from '../sections/CaseStudyHeading/CaseStudyHeading';
import OwaspSection from './components/owasp';
import styles from './styles.module.css';

export const metadata = owaspCaseStudyMetadata;

export default function OwaspCaseStudyPage() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <CaseStudyHeading
          title="OWASP Case Study"
          eyebrow="OWASP Case Study"
          logoSrc="/images/pages/projects/oss/logos/owasp-white.png"
          logoAlt="OWASP logo"
          logoWidth={120}
          logoHeight={120}
        />
        <OwaspSection />
      </div>
    </main>
  );
}
