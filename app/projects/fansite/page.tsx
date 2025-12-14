import React from 'react';
import { loadJsonLdScripts } from '@/lib/jsonld/loadJsonFromIndex';
import jsonLdData from './jsonld';
import { fansitePageMetadata } from './metadata';

import SectionHeading from '../../components/utilities/sections/SectionHeading';
import Hero from './components/Hero';
import Testimonial from './components/Testimonial';
import GeneralInfo from './sections/generalInfo/GeneralInfo';
import Nextjs from './sections/nextjs/Nextjs';
import Conclusion from './sections/Conclusion';
import ButtonGroup from '../../components/utilities/buttons/ButtonGroup';
import styles from './styles.module.css';

export const metadata = fansitePageMetadata;

export default function FansitePage() {
  return (
    <>
      {loadJsonLdScripts(jsonLdData, 'fansite-jsonld')}

      <SectionHeading title="Fashion Celebrity Fansite" />

      <main className={styles.page}>
        <div className={styles.container}>
          <Hero />
          <Testimonial />
          <GeneralInfo />
          <Nextjs />
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
