import React from 'react';
import { loadJsonLdScripts } from '@/lib/jsonld/loadJsonFromIndex';
import jsonLdData from './jsonld';
import { jumptagPageMetadata } from './metadata';
import CaseStudyHeading from '@/projects/oss/sections/CaseStudyHeading/CaseStudyHeading';
import Intro from './sections/intro/Intro';
import Activations from './sections/activations/Activations';
import Physical from './sections/physical/Physical';
import Platform from './sections/platform/Platform';
import BrandingSection from './sections/branding/Branding';
import ConclusionWrapper from './sections/conclusion/ConclusionWrapper';
import styles from './styles.module.css';

export const metadata = jumptagPageMetadata;

export default function JumptagPage() {
  return (
    <>
      {loadJsonLdScripts(jsonLdData, 'jumptag-jsonld')}

      <main className={styles.page}>
        <div className={styles.container}>
          <CaseStudyHeading
            title="Wearable Tech End-to-End Management"
            eyebrow="Jumptag Case Study"
          />

          <Intro />
          <Activations />
          <Physical />
          <Platform />
          <BrandingSection />
          <ConclusionWrapper />
        </div>
      </main>
    </>
  );
}
