// app\press\sections\coverage\components\HackernoonSection.tsx
'use client';
import React from 'react';
import SectionLineWrapper from '@/components/utilities/sections/SectionLineWrapper';
import LogoDisplay from '@/components/utilities/sections/topicSegment/LogoDisplay';
import TitleDisplay from '@/components/utilities/sections/topicSegment/TitleDisplay';
import ContentDisplay from '@/components/utilities/sections/topicSegment/ContentDisplay';
import ButtonSection from '@/components/utilities/buttons/ButtonSection';

const HackernoonSection = () => (
  <SectionLineWrapper
    id="quickbio-5"
    responsiveBreakpoint={500}
    responsiveMargin="15% auto 30% auto"
  >
    <LogoDisplay
    href="https://hackernoon.com/about/ritorhymes"
      src="/images/pages/press/logos/Hackernoon.jpg"
      alt="Hackernoon Logo"
      fadeIn
      triggerAmountMobile={0.1}
      triggerAmountDesktop={0.4}
      mobileBreakpoint="(max-width: 768px)"
      borderColor="var(--secondary-blue)"
      backgroundColor="transparent"
    />

    <TitleDisplay
      href="https://hackernoon.com/about/ritorhymes"
      borderColor="#04426C"
      backgroundColor="transparent"
      fadeIn
      triggerAmountMobile={0.1}
      triggerAmountDesktop={0.4}
      mobileBreakpoint="(max-width: 768px)"
    >
      Nominated as Contributor of the Year in 3 Categories by <em>HackerNoon</em>
    </TitleDisplay>

    <div style={{ marginTop: '5%' }}>
      <ContentDisplay
        imageSrc="/images/pages/press/media/rito-dogey.jpg"
        imageAlt="Rito Dogey"
        caption={<em>Rito posing in a Doge mask.</em>}
        body={
          <>
            Rito was recognized by <em>HackerNoon’s Noonies awards</em> as a Contributor of the Year nominee in three distinct categories—Metaverse, Music, and Humor. The nominations highlight his cross-disciplinary impact at the intersection of emerging tech and culture, blending product insight with creative storytelling. He was in strong company, nominated alongside Web3 builders, fintech journalists, and contributors to major outlets like <em>Forbes</em> and <em>Cointelegraph</em>.
          </>
        }
        backgroundColor="black"
        borderColor="var(--secondary-blue)"
        fadeIn
        triggerAmountMobile={0.1}
        triggerAmountDesktop={0.4}
        mobileBreakpoint="(max-width: 768px)"
      />
    </div>

    <div style={{ marginTop: '6rem', textAlign: 'center', width: '90%' }}>
      <ButtonSection
        title="Read his HackerNoon stories"
        buttonGroupProps={{
          buttons: [
            {
              text: 'Roadmap Article',
              variant: 'blueAccentButton',
              href: 'https://hackernoon.com/is-dogecoin-headed-to-twitter-the-moon-or-throughout-the-universe',
            },
            {
              text: 'Dogepalooza Article',
              variant: 'blueAccentButton',
              href: 'https://hackernoon.com/who-showed-up-to-dogepalooza-and-who-cares-much-surprise',
            },
          ],
        }}
      />
    </div>
  </SectionLineWrapper>
);

export default HackernoonSection;
