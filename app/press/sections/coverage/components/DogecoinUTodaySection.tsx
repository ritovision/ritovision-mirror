// app\press\sections\coverage\components\DogecoinUTodaySection.tsx
'use client';
import React from 'react';
import SectionLineWrapper from '@/components/utilities/sections/SectionLineWrapper';
import LogoDisplayCarousel from '@/components/utilities/sections/topicSegment/LogoDisplayCarousel';
import TitleDisplay from '@/components/utilities/sections/topicSegment/TitleDisplay';
import ContentDisplay from '@/components/utilities/sections/topicSegment/ContentDisplay';

const DogecoinUTodaySection = () => (
  <SectionLineWrapper
    id="quickbio-4"
    responsiveBreakpoint={500}
    responsiveMargin="15% auto 30% auto"
  >
    <LogoDisplayCarousel
      images={[
        '/images/pages/press/logos/Dogecoin_Logo.png',
        '/images/pages/press/logos/logo-utoday.png',
      ]}
      links={[
        'https://u.today/dogecoin-used-to-purchase-nfts-worth-600000-in-historic-transaction',
        'https://u.today/dogecoin-used-to-purchase-nfts-worth-600000-in-historic-transaction',
      ]}
      alt="Dogecoin and U.Today Logos"
      interval={2000}
      fadeIn
      triggerAmountMobile={0.1}
      triggerAmountDesktop={0.4}
      mobileBreakpoint="(max-width: 768px)"
    />

    <TitleDisplay
      href="https://u.today/dogecoin-used-to-purchase-nfts-worth-600000-in-historic-transaction"
      borderColor="#04426C"
      backgroundColor="transparent"
      fadeIn
      triggerAmountMobile={0.1}
      triggerAmountDesktop={0.4}
      mobileBreakpoint="(max-width: 768px)"
    >
      Rito Rhymes' Roadmap Rap Gets Nod from the Dogecoin Foundation &{' '}
      <span style={{ fontStyle: 'italic' }}>U.Today</span>
    </TitleDisplay>

    <div style={{ marginTop: '5%' }}>
      <ContentDisplay
        imageSrc="/images/pages/speaker/hero/ritorhymes.jpg"
        imageAlt="Rito Rhymes"
        caption=""
        body={`After connecting directly with the Dogecoin Foundation and learning first-hand about their roadmap, Rito performed at crypto music festival Dogepalooza with two original sets. One featuring the first-ever rap NFT on Dogecoin, the other a laymen-friendly roadmap breakdown entirely in spoken word verses. The Foundation later tweeted about his performance, and U.Today published a story about it. Rito also hit the stage impromptu with Grammy-winning producer Damon Elliott, ending the set with a mic-breaking moment.`}
        backgroundColor="black"
        borderColor="var(--secondary-blue)"
        fadeIn
        triggerAmountMobile={0.1}
        triggerAmountDesktop={0.4}
        mobileBreakpoint="(max-width: 768px)"
        buttonText="Check out the article"
        buttonVariant="blueAccentButton"
        buttonHref="https://u.today/dogecoin-used-to-purchase-nfts-worth-600000-in-historic-transaction"
      />
    </div>
  </SectionLineWrapper>
);

export default DogecoinUTodaySection;
