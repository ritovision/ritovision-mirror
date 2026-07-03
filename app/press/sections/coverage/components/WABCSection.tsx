// app\press\sections\coverage\components\WABCSection.tsx
'use client';
import React from 'react';
import SectionLineWrapper from '@/components/utilities/sections/SectionLineWrapper';
import LogoDisplay from '@/components/utilities/sections/topicSegment/LogoDisplay';
import TitleDisplay from '@/components/utilities/sections/topicSegment/TitleDisplay';
import ContentDisplay from '@/components/utilities/sections/topicSegment/ContentDisplay';
import ButtonSection from '@/components/utilities/buttons/ButtonSection';
import styles from '../coverage.module.css';

const WABCSection = () => (
  <SectionLineWrapper
    id="quickbio-2"
    responsiveBreakpoint={500}
    responsiveMargin="15% auto 30% auto"
  >
    <LogoDisplay
    href="https://wabcradio.com/episode/rito-rhymes-rapper-and-crypto-nerd-6-8-22/"
      src="/images/pages/press/logos/77-WABC-gold.png"
      alt="77 WABC Logo"
      fadeIn
      triggerAmountMobile={0.1}
      triggerAmountDesktop={0.4}
      mobileBreakpoint="(max-width: 768px)"
      borderColor="var(--secondary-blue)"
      backgroundColor="transparent"
    />

    <TitleDisplay
      href="https://wabcradio.com/episode/rito-rhymes-rapper-and-crypto-nerd-6-8-22/"
      borderColor="#04426C"
      backgroundColor="transparent"
      fadeIn
      triggerAmountMobile={0.1}
      triggerAmountDesktop={0.4}
      mobileBreakpoint="(max-width: 768px)"
    >
      Live Radio Feature Interview & Rapping About Tech Topics on NYC's Flagship <em>77 WABC</em>
    </TitleDisplay>

    <div style={{ marginTop: '5%' }}>
      <ContentDisplay
        imageSrc="/images/pages/press/media/frankmorano.jpg"
        imageAlt="Frank Morano Interview"
        caption={<em>The Other Side of Midnight with Frank Morano</em>}
        body={
          <>
            In a one-of-a-kind 15-minute live interview on New York's flagship radio station{' '}
            <em>77 WABC</em>, Rito Rhymes brought the full spectrum of thought-leading infotainment to the airwaves. Seamlessly blending humor, philosophy, and impromptu rap, Rito unpacked the metaverse, blockchain, and the story of Dogecoin—live and unscripted. His improvised rhymes, insightful takes, and magnetic presence captivated listeners so much that the show named the entire episode after him: <em>Insane in the Blockchain</em>. It’s a prime example of Rito’s ability to inform, entertain, and shift the conversation—all in real time.
          </>
        }
        backgroundColor="black"
        borderColor="var(--secondary-blue)"
        fadeIn
        triggerAmountMobile={0.1}
        triggerAmountDesktop={0.4}
        mobileBreakpoint="(max-width: 768px)"
        buttonText="Listen to the interview"
        buttonVariant="blueAccentButton"
        buttonHref="https://wabcradio.com/episode/rito-rhymes-rapper-and-crypto-nerd-6-8-22/"
      />
    </div>

    <div className={styles.buttonContainer}>
      <p style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '1rem' }}>
        See what else Rito does on stage
      </p>
      <ButtonSection
        buttonGroupProps={{
          buttons: [{ text: 'Speaker', variant: 'blackWhiteButton', href: '/speaker' }],
        }}
        style={{ width: '90%', margin: '0 auto' }}
      />
    </div>
  </SectionLineWrapper>
);

export default WABCSection;
