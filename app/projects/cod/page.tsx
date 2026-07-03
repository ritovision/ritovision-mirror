import React from 'react';
import { loadJsonLdScripts } from '@/lib/jsonld/loadJsonFromIndex';
import jsonLdData from './jsonld';
import { codPageMetadata } from './metadata';

import CaseStudyHeading from '@/projects/oss/sections/CaseStudyHeading/CaseStudyHeading';
import Hero from './sections/hero/Hero';
import HeroText from './sections/hero/HeroText';
import Intro from './sections/intro/Intro';
import Process from './sections/process/Process';
import CoverageSection from './sections/coverage/CoverageSection';
import Conclusion from './sections/Conclusion';
import ButtonGroup from '../../components/utilities/buttons/ButtonGroup';
import styles from './styles.module.css';

export const metadata = codPageMetadata;

export default function CodPage() {
  return (
    <>
      {loadJsonLdScripts(jsonLdData, 'cod-jsonld')}

      <CaseStudyHeading
        title="From Glitch to Global"
        eyebrow="Call of Duty Case Study"
      />

      <main className={styles.page}>
        <div className={styles.container}>
          <Hero />
          <HeroText />
          <Intro />

          <Process />
          <CoverageSection />
          <Conclusion />

          {/* Call To Action Section */}
          <section className={styles.callToAction}>
            <p>
              To get RitoVision on your project, please inquire below, or learn
              more about his notable press coverage
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
                  text: 'Press',
                  href: '/press',
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
