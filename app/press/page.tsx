// app/press/page.tsx
import React from 'react';
import { pressPageMetadata } from './metadata';
import { Hero, Coverage, AccordionSection, Contact } from './sections';
import styles from './styles.module.css';
import jsonLdData from './jsonld';
import { loadJsonLdScripts } from '../../lib/jsonld/loadJsonFromIndex';

export const metadata = pressPageMetadata;

export default function PressPage() {
  return (
    <div className={styles.pageContainer}>
      {loadJsonLdScripts(jsonLdData, 'press-jsonld')}

      <Hero />

      <div className={styles.container}>
        <Coverage />
        <AccordionSection />
        <Contact />
      </div>
    </div>
  );
}
