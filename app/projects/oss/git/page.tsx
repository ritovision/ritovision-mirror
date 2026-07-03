import React from 'react';
import { gitCaseStudyMetadata } from './metadata';
import CaseStudyHeading from '../sections/CaseStudyHeading/CaseStudyHeading';
import GitCaseStudy from './components/GitCaseStudy';
import styles from './styles.module.css';

export const metadata = gitCaseStudyMetadata;

export default function GitCaseStudyPage() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <CaseStudyHeading
          title="Git Case Study"
          eyebrow="Git Case Study"
          logoSrc="/images/pages/projects/oss/logos/git-logo-white.png"
          logoAlt="Git logo"
          logoWidth={120}
          logoHeight={120}
        />
        <GitCaseStudy hideTitle />
      </div>
    </main>
  );
}
