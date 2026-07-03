// app\press\sections\coverage\components\VideogameCampaignSection.tsx
'use client';
import React from 'react';
import SectionLineWrapper from '@/components/utilities/sections/SectionLineWrapper';
import LogoDisplayCarousel from '@/components/utilities/sections/topicSegment/LogoDisplayCarousel';
import TitleDisplay from '@/components/utilities/sections/topicSegment/TitleDisplay';
import ContentDisplaySlider from '@/press/sections/coverage/ContentDisplaySlider';

const VideogameCampaignSection = () => (
  <SectionLineWrapper
    id="quickbio-6"
    responsiveBreakpoint={500}
    responsiveMargin="15% auto 30% auto"
  >
    <LogoDisplayCarousel
      images={[
        '/images/pages/press/logos/gamerant-logo.png',
        '/images/pages/press/logos/screenrant-logo.png',
        '/images/pages/press/logos/dexerto-logo.png',
      ]}
      links={[
        'https://web.archive.org/web/20211023225040/https://gamerant.com/call-of-duty-warzone-exploding-helicopters-rebirth-bug-video/',
        'https://screenrant.com/cod-warzone-riot-shield-disappear-glitch-rap-video/',
        'http://dexerto.com/call-of-duty/warzone-hero-makes-hacker-rage-quit-after-epic-riot-shield-1v1-1650745/',
      ]}
      alt="Press Logos"
      interval={2000}
      fadeIn
      triggerAmountMobile={0.1}
      triggerAmountDesktop={0.4}
      mobileBreakpoint="(max-width: 768px)"
    />

    <TitleDisplay
      href="/projects/cod"
      borderColor="#04426C"
      backgroundColor="transparent"
      fadeIn
      triggerAmountMobile={0.1}
      triggerAmountDesktop={0.4}
      mobileBreakpoint="(max-width: 768px)"
    >
      Infotaining <em>Call of Duty</em> Content Gets Global Coverage{' '}
      <span style={{ color: 'var(--primary-red)' }}>AND</span> Game Studio Fixes Issues
    </TitleDisplay>

    <div style={{ marginTop: '5%' }}>
      <ContentDisplaySlider
        backgroundColor="black"
        borderColor="var(--secondary-blue)"
        fadeIn
        triggerAmountMobile={0.1}
        triggerAmountDesktop={0.4}
        mobileBreakpoint="(max-width: 768px)"
      />
    </div>
  </SectionLineWrapper>
);

export default VideogameCampaignSection;
