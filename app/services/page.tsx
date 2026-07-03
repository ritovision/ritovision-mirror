import React from 'react';
import { loadJsonLdScripts } from '@/lib/jsonld/loadJsonFromIndex';
import jsonLdData from './jsonld';
import styles from './services.module.css';
import HeroBox from './components/HeroBox';
import EngagementSection from './components/EngagementSection';
import Pricing from './components/Pricing';
import Testimonial from '@/components/content/Testimonial';
import ServicesForm from './components/ServicesForm';
import SectionHeading from '../components/utilities/sections/SectionHeading';
import Special from '@/services/components/Special';
import Propositions from '@/components/content/Propositions';
import Highlights from './components/Highlights';
import CTABreak from '../components/utilities/sections/CTA-break';

import { servicesPageMetadata } from './metadata';

export const metadata = servicesPageMetadata;

export default function ServicesPage() {
  return (
    <>
      {loadJsonLdScripts(jsonLdData, 'services-jsonld')}

      <SectionHeading title="Services" />

      <main className={styles.page}>
        <div className={styles.container}>
          <HeroBox />
          <div style={{ marginTop: '5rem' }}>
          <Propositions />
          </div>
          <Special />
          <Highlights />
          <EngagementSection />
          <Pricing />
          <CTABreak
            text={
              <>
                Learn more about the experience and perspective behind RitoVision&apos;s approach to user-facing systems.
              </>
            }
            buttonText="About Rito"
            buttonHref="/about"
            buttonVariant="blueAccentButton"
          />
          <Testimonial />

          <section id="contact-services" className={styles.formSection}>
            <ServicesForm />
          </section>
        </div>
      </main>
    </>
  );
}
