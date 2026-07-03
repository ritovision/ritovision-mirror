import React from 'react';
import { loadJsonLdScripts } from '@/lib/jsonld/loadJsonFromIndex';
import jsonLdData from './jsonld';
import { uasPageMetadata } from './metadata';
import Conclusion from './sections/conclusion/Conclusion';
import { MatrixRainContainer } from '@/components/utilities/particles/MatrixRain/MatrixRainContainer';
import CaseStudyHeading from '@/projects/oss/sections/CaseStudyHeading/CaseStudyHeading';
import Hero from './components/Hero';
import Intro from './sections/intro/Intro';
import ERC from './sections/erc/ERC';
import ButtonGroup from '@/components/utilities/buttons/ButtonGroup';
import styles from './styles.module.css';

export const metadata = uasPageMetadata;

export default function UasPage() {
  return (
    <>
      {loadJsonLdScripts(jsonLdData, 'uas-jsonld')}

      <main style={{ position: 'relative', zIndex: 1 }}>
        <CaseStudyHeading
          title="The UAS Chronicles:"
          eyebrow="UAS Chronicles Case Study"
        />
        <h2
          className={styles.ercJourney}
          style={{
            color: 'var(--primary-red)',
            textAlign: 'center',
            marginTop: '-0.25em',
            marginBottom: '.4em',
          }}
        >
          An ERC Journey with a Legend
        </h2>

        <Hero />
        <Intro />
        <ERC />

        <div id="encrypted-access-to-erc">
          <MatrixRainContainer />
        </div>
        <Conclusion />

        {/* Call To Action Section */}
        <section className={styles.callToAction}>
          <p style={{ textAlign: 'center' }}>
            To get UAS Chronicles on your project, inquire below or learn more about our journey
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
      </main>
    </>
  );
}
