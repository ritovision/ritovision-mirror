import React from 'react';
import { lkmlCaseStudyMetadata } from './metadata';
import CaseStudyHeading from '../sections/CaseStudyHeading/CaseStudyHeading';
import LkmlCaseStudy from './components/LkmlCaseStudy';
import styles from './styles.module.css';

export const metadata = lkmlCaseStudyMetadata;

export default function LkmlCaseStudyPage() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <CaseStudyHeading
          title="Linux Kernel Mailing List archive Case Study"
          eyebrow="LKML Case Study"
          logoSrc="/images/pages/projects/oss/logos/linux-white.png"
          logoAlt="Linux logo"
          logoWidth={140}
          logoHeight={154}
        />
        <LkmlCaseStudy />
      </div>
    </main>
  );
}
