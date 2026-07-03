import React from 'react';
import { loadJsonLdScripts } from '@/lib/jsonld/loadJsonFromIndex';
import jsonLdData from './jsonld';
import { ossPageMetadata } from './metadata';
import CaseStudyHeading from './sections/CaseStudyHeading/CaseStudyHeading';
import Intro from './sections/intro/Intro';
import OssTableSection from './sections/table/OssTableSection';
import CaseStudyCards from './sections/CaseStudyCards/CaseStudyCards';
import styles from './styles.module.css';

export const metadata = ossPageMetadata;

export default function OssPage() {
  return (
    <>
      {loadJsonLdScripts(jsonLdData, 'oss-jsonld')}

      <main className={styles.page}>
        <div className={styles.container}>
          <CaseStudyHeading
            title="Contributions to Major OSS"
            eyebrow="Major OSS Contributions"
          />
          <Intro />
          <OssTableSection />
          <CaseStudyCards />
        </div>
      </main>
    </>
  );
}
