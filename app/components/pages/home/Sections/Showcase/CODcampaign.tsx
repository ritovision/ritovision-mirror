// app\components\pages\home\Sections\Showcase\CODcampaign.tsx

'use client';
import React from 'react';
import LogoDisplayCarousel from '@/components/utilities/sections/topicSegment/LogoDisplayCarousel';
import TitleDisplay from '@/components/utilities/sections/topicSegment/TitleDisplay';
import ContentDisplaySlider from '@/press/sections/coverage/ContentDisplaySlider';
import ButtonSection from '@/components/utilities/buttons/ButtonSection';
import subsectionStyles from './ShowcaseSubsection.module.css';

const CODcampaign = () => {
  return (
    <div>
      {/* Center the logo carousel as in the WABC77 section */}
      <div className={subsectionStyles.centerLogoContainer}>
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

      </div>

      <TitleDisplay
       href="/projects/cod"
        borderColor="var(--secondary-blue)"
        backgroundColor="transparent"
        fadeIn
        triggerAmountMobile={0.1}
        triggerAmountDesktop={0.4}
        mobileBreakpoint="(max-width: 768px)"
      >
        Infotaining <em>Call of Duty</em> Content Gets Global Coverage{' '}
        <span style={{ color: 'var(--primary-red)' }}>AND</span>{' '}
        Game Studio Addresses Issues
      </TitleDisplay>

      <ContentDisplaySlider
        backgroundColor="var(--black)"
        borderColor="var(--secondary-blue)"
        fadeIn
        triggerAmountMobile={0.1}
        triggerAmountDesktop={0.4}
        mobileBreakpoint="(max-width: 768px)"
      />

      {/* Button group */}
      <div
        style={{
          marginTop: '100px',
          textAlign: 'center',
          width: 'var(--container-width-narrow)',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        <ButtonSection
          title="Check out the full case study or see more of Rito's press coverage"
          buttonGroupProps={{
            buttons: [
              {
                text: 'Case Study',
                variant: 'blueAccentButton',
                href: '/projects/cod',
              },
              {
                text: "Press Coverage",
                variant: 'blackWhiteButton',
                href: '/press',
              },
            ],
          }}
        />
      </div>
    </div>
  );
};

export default CODcampaign;
