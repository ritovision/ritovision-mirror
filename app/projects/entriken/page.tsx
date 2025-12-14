import React from 'react';
import { loadJsonLdScripts } from '@/lib/jsonld/loadJsonFromIndex';
import jsonLdData from './jsonld';
import { entrikenPageMetadata } from './metadata';

import SectionHeading from '@/components/utilities/sections/SectionHeading';
import Hero from './sections/hero/Hero';
import Intro from './sections/intro/Intro';
import Audit from './sections/audit/Audit';
import Breakdown from './sections/breakdown/Breakdown';
import Conclusion from './sections/conclusion/Conclusion';

import ButtonGroup from '@/components/utilities/buttons/ButtonGroup';
import styles from './styles.module.css';

export const metadata = entrikenPageMetadata;

export default function EntrikenPage() {
  return (
    <>
      {loadJsonLdScripts(jsonLdData, 'entriken-jsonld')}

      <main className={styles.page}>
        <div className={styles.container}>
          <SectionHeading title="Strategic Brand Repositioning" />
          <Hero />
          <Intro />
          <Audit />
          <Breakdown />
          <Conclusion />

          {/* Call To Action Section */}
          <section className={styles.callToAction}>
            <p>
              To get RitoVision on your project, please inquire below, or learn
              more about his visionary approach
            </p>
            <ButtonGroup
              buttons={[
                {
                  variant: 'blueAccentButton',
                  text: 'Contact',
                  href: '/contact',
                },
                {
                  variant: 'blueAccentButton2',
                  text: 'About',
                  href: '/about',
                },
              ]}
              mobileMaxWidth="500px"
            />
          </section>
        </div>
      </main>
    </>
  );
}
