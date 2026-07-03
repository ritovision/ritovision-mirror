import React from 'react';
import { loadJsonLdScripts } from '@/lib/jsonld/loadJsonFromIndex';
import jsonLdData from './jsonld';
import styles from './styles.module.css';
import { HeroSection, Intro, PastEngagements, Music, ContactSection } from './sections';
import { speakerPageMetadata } from "./metadata";

export const metadata = speakerPageMetadata;

export default function SpeakerPage() {
  return (
    <main className={styles.speakerPage}>
      {loadJsonLdScripts(jsonLdData, 'speaker-jsonld')}

      <HeroSection />
      <Intro />
      <PastEngagements />
      <Music />
      <ContactSection />
    </main>
  );
}
