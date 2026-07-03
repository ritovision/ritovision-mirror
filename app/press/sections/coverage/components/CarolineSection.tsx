// app\press\sections\coverage\components\CarolineSection.tsx
'use client';
import React from 'react';
import SectionLineWrapper from '@/components/utilities/sections/SectionLineWrapper';
import LogoDisplay from '@/components/utilities/sections/topicSegment/LogoDisplay';
import TitleDisplay from '@/components/utilities/sections/topicSegment/TitleDisplay';
import ContentDisplay from '@/components/utilities/sections/topicSegment/ContentDisplay';
import ButtonSection from '@/components/utilities/buttons/ButtonSection';
import styles from '../coverage.module.css';

const CarolineSection = () => (
  <SectionLineWrapper
    id="quickbio-1"
    responsiveBreakpoint={500}
    responsiveMargin="15% auto 30% auto"
  >
    <LogoDisplay
    href="https://www.nytimes.com/2020/01/16/style/caroline-vreeland-a-singer-with-a-famous-fashion-name.html"
      src="/images/pages/press/logos/NYT-logo.png"
      alt="New York Times Logo"
      fadeIn
      triggerAmountMobile={0.1}
      triggerAmountDesktop={0.8}
      mobileBreakpoint="(max-width: 768px)"
      borderColor="var(--secondary-blue)"
      backgroundColor="transparent"
    />

    <TitleDisplay
      href="/projects/fansite"
      text={`Rito’s Digital Tribute to Fashion 
Royalty Recognized by NYT`}
      borderColor="#04426C"
      backgroundColor="transparent"
      fadeIn
      triggerAmountMobile={0.1}
      triggerAmountDesktop={0.4}
      mobileBreakpoint="(max-width: 768px)"
    />

    {/* ↑ add spacing below this title by wrapping the next block ↓ */}
    <div style={{ marginTop: '5%' }}>
      <ContentDisplay
        imageSrc="/images/pages/press/media/carovreeland.jpg"
        imageAlt="Caroline Vreeland"
        caption="Recognition for Rito's fansite for Caroline Vreeland"
        body={
          <>
            Rito’s independently built fansite tribute for celebrity fashion icon and singer Caroline Vreeland—great granddaughter of legendary Vogue editor Diana Vreeland—earned an unexpected spotlight in <em>The New York Times</em> where it was directly linked and presented by the editor to strategically convey her claim to fame in the introduction. Designed as a heartfelt homage to Caroline’s artistic and fashion legacy, the site organically drew over 100,000 unique visitors in a single year. Its cultural resonance and refined execution didn’t go unnoticed—Caroline herself shared, “Oh Rito. Sweet, sweet Rito... I feel really loved, and I'm really grateful.”
            <br />
            <br />
            The feature underscores Rito’s ability to craft digital experiences that celebrate artistry, ignite communities, and gain recognition from icons themselves.
          </>
        }
        backgroundColor="black"
        borderColor="var(--secondary-blue)"
        fadeIn
        triggerAmountMobile={0.1}
        triggerAmountDesktop={0.4}
        mobileBreakpoint="(max-width: 768px)"
        buttonText="Check out the Article"
        buttonVariant="blueAccentButton"
        buttonHref="https://www.nytimes.com/2020/01/16/style/caroline-vreeland-a-singer-with-a-famous-fashion-name.html"
      />
    </div>

    <div className={styles.buttonContainer}>
      <ButtonSection
        title="Learn more about the project"
        buttonGroupProps={{
          buttons: [
            { text: 'See Website', variant: 'blueAccentButton', href: 'https://carolinevreeland.com' },
            { text: 'Project Details', variant: 'blackWhiteButton', href: '/projects#Caroline' },
          ],
        }}
      />
    </div>
  </SectionLineWrapper>
);

export default CarolineSection;
