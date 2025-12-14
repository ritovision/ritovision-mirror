import React from 'react';
import { loadJsonLdScripts } from '@/lib/jsonld/loadJsonFromIndex';
import jsonLdData from './jsonld';
import styles from './services.module.css';
import HeroBox from './components/HeroBox';
import EngagementSection from './components/EngagementSection';
import CoreServiceOfferings from './components/CoreServiceOfferings';
import Testimonial from './components/Testimonial';
import Button from '../components/utilities/buttons/Button';
import ServicesForm from './components/ServicesForm';
import SectionHeading from '../components/utilities/sections/SectionHeading';
import Special from '@/services/components/Special';
import Propositions from '../components/pages/home/Propositions';

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
          <EngagementSection />
          <CoreServiceOfferings />
          <Special />
          <Testimonial />

          {/* Call To Action Section */}
          <section className={styles.callToAction}>
            <p>
              Book a free 30 minute discovery call to see how RitoVision can help you,{' '}
              <span className={styles.underline}>just keep scrolling down!</span>
              <br /><br />
              Or<br /><br />
              If you’d like to see more of Rito’s work or press coverage his work has received, check out these pages
            </p>
            <div className={styles.buttonGroup}>
              <Button variant="blueAccentButton" text="Projects" href="/projects" />
              <Button variant="blueAccentButton2" text="Press" href="/press" />
            </div>
          </section>

          <section id="contact-services" className={styles.formSection}>
            <ServicesForm />
          </section>
        </div>
      </main>
    </>
  );
}
