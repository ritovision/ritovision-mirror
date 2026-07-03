import React from 'react';
import { eipCaseStudyMetadata } from './metadata';
import CaseStudyHeading from '../sections/CaseStudyHeading/CaseStudyHeading';
import EipCaseStudy from './components/EipCaseStudy';
import styles from './styles.module.css';

export const metadata = eipCaseStudyMetadata;

export default function EipCaseStudyPage() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <CaseStudyHeading
          title="Ethereum EIPs Case Study"
          eyebrow="Ethereum EIPs Case Study"
          logoSrc="/images/pages/projects/oss/logos/ethereum-white.png"
          logoAlt="Ethereum logo"
          logoWidth={86}
          logoHeight={140}
        />
        <EipCaseStudy hideTitle />
      </div>
    </main>
  );
}
