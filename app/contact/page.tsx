// app\contact\page.tsx
import React from 'react';
import { loadJsonLdScripts } from '@/lib/jsonld/loadJsonFromIndex';
import jsonLdData from './jsonld';
import SectionHeading from '../components/utilities/sections/SectionHeading';
import HeroSection from './components/HeroSection';
import GeneralForm from '@/components/utilities/forms/GeneralForm';
import ServicesForm from '../services/components/ServicesForm';
import SpeakerForm from '../speaker/components/SpeakerForm';
import DynamicFormSwitcher from '@/components/utilities/dropdown/DynamicFormSwitcher';
import styles from './styles.module.css';
import { contactPageMetadata } from './metadata';

export const metadata = contactPageMetadata;

export default function ContactPage() {
  const formsMap = {
    General: {
      label: 'General Inquiry',
      component: GeneralForm,
    },
    Services: {
      label: 'Service Request',
      component: ServicesForm,
    },
    Speaker: {
      label: 'Speaker Inquiry',
      component: SpeakerForm,
    },
  };

  return (
    <main>
      {loadJsonLdScripts(jsonLdData, 'contact-jsonld')}

      <SectionHeading title="Contact" />
      <HeroSection />
      <div className={styles.spacerAbove}>
        <div className={styles.formWrapper}>
          <DynamicFormSwitcher
            defaultForm="General"
            formsMap={formsMap}
            dropdownHeader="Select a Purpose for Your Contact"
            animationDuration={0.5}
          />
        </div>
      </div>
    </main>
  );
}
