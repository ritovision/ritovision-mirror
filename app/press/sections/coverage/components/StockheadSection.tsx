// app\press\sections\coverage\components\StockheadSection.tsx
'use client';
import React from 'react';
import SectionLineWrapper from '@/components/utilities/sections/SectionLineWrapper';
import LogoDisplay from '@/components/utilities/sections/topicSegment/LogoDisplay';
import TitleDisplay from '@/components/utilities/sections/topicSegment/TitleDisplay';
import ContentDisplay from '@/components/utilities/sections/topicSegment/ContentDisplay';

const StockheadSection = () => (
  <SectionLineWrapper
    id="quickbio-3"
    responsiveBreakpoint={500}
    responsiveMargin="15% auto 30% auto"
  >
    <LogoDisplay
    href="https://stockhead.com.au/cryptocurrency/bitcoin-is-the-gangsta-rap-of-the-tech-world-putting-the-verse-in-metaverse-with-crypto-rapper-rito-rhymes/"
      src="/images/pages/press/logos/stockhead-logo.png"
      alt="Stockhead Logo"
      fadeIn
      triggerAmountMobile={0.1}
      triggerAmountDesktop={0.4}
      mobileBreakpoint="(max-width: 768px)"
      borderColor="var(--secondary-blue)"
      backgroundColor="transparent"
    />

    <TitleDisplay
      href="https://stockhead.com.au/cryptocurrency/bitcoin-is-the-gangsta-rap-of-the-tech-world-putting-the-verse-in-metaverse-with-crypto-rapper-rito-rhymes/"
      text={`Rito’s Rap-Infused Feature Article
About Crypto, NFTs & Metaverses`}
      borderColor="#04426C"
      backgroundColor="transparent"
      fadeIn
      triggerAmountMobile={0.1}
      triggerAmountDesktop={0.4}
      mobileBreakpoint="(max-width: 768px)"
    />

    <div style={{ marginTop: '5%' }}>
      <ContentDisplay
        imageSrc="/images/pages/press/media/ritorhymes-bitcoin.jpeg"
        imageAlt="Rito Rhymes Bitcoin"
        caption={`"Bitcoin is the Gangsta Rap of the Tech World"`}
        body={`In this standout interview with Stockhead, Rito Rhymes steps fully into the role of crypto’s most infotaining voice—dropping bars, philosophy, and industry insights in equal measure. The piece spotlights Rito’s unique positioning as a thought leader who bridges tech and culture with charisma and clarity, transforming complex blockchain concepts into a masterclass of infotainment through digestible, insightful rhymes.`}
        backgroundColor="black"
        borderColor="var(--secondary-blue)"
        fadeIn
        triggerAmountMobile={0.1}
        triggerAmountDesktop={0.4}
        mobileBreakpoint="(max-width: 768px)"
        buttonText="Check out the article"
        buttonVariant="blueAccentButton"
        buttonHref="https://stockhead.com.au/cryptocurrency/bitcoin-is-the-gangsta-rap-of-the-tech-world-putting-the-verse-in-metaverse-with-crypto-rapper-rito-rhymes/"
      />
    </div>
  </SectionLineWrapper>
);

export default StockheadSection;
