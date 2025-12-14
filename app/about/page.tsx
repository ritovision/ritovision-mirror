import React from 'react';
import { loadJsonLdScripts } from '@/lib/jsonld/loadJsonFromIndex';
import jsonLdData from './jsonld';
import SectionHeading from '../components/utilities/sections/SectionHeading';
import { Visionary, Personas, Faq, Bio, Hero } from './sections';
import { aboutPageMetadata } from './metadata';

export const metadata = aboutPageMetadata;

export default function AboutPage() {
  return (
    <div>
      {loadJsonLdScripts(jsonLdData, 'about-jsonld')}

      <SectionHeading title="About" />
      <Hero />
      <Bio />
      <Visionary />
      <Personas />
      <Faq />
    </div>
  );
}
