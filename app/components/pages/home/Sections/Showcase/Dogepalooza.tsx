// app\components\pages\home\Sections\Showcase\Dogepalooza.tsx
'use client';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import LogoDisplayCarousel from '@/components/utilities/sections/topicSegment/LogoDisplayCarousel';
import TitleDisplay from '@/components/utilities/sections/topicSegment/TitleDisplay';
import ButtonSection from '@/components/utilities/buttons/ButtonSection';
import ScrollFadeIn from '@/components/utilities/animations/ScrollFadeIn';
import subsectionStyles from './ShowcaseSubsection.module.css';
import styles from './JumptagShowcase.module.css';

// Import required Swiper CSS
import 'swiper/css';
import 'swiper/css/autoplay';

export default function Dogepalooza() {
  // Logos to cycle
  const logos = [
    '/images/pages/press/logos/Dogecoin_Logo.png',
    '/images/pages/press/logos/logo-utoday.png',
  ];

  // Images for the Swiper carousel
  const montageImages = [
    '/images/pages/speaker/hero/ritorhymes.jpg',
    '/images/pages/speaker/pastEngagements/Damon_Elliot-Rito.jpg',
    '/images/pages/speaker/pastEngagements/Damon-Rito-Stage.png',
    '/images/pages/speaker/pastEngagements/rito-broken-micstand.jpg',
  ];

  // Custom content container with Swiper + body text
  const customContentContainer = (
    <div
      className={styles.container}
      style={{ borderColor: 'var(--secondary-blue)', backgroundColor: 'var(--black)' }}
    >
      {/* Carousel */}
      <div className={styles.imageCaptionWrapper}>
        <div className={styles.imageWrapper}>
          <Swiper
            modules={[Autoplay]}
            slidesPerView={1}
            loop={true}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            className={styles.swiper}
          >
            {montageImages.map((img, idx) => (
              <SwiperSlide key={idx}>
                <img
                  src={img}
                  alt={`Dogepalooza image ${idx + 1}`}
                  className={styles.image}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Body text */}
      <div className={styles.bodyWrapper}>
        <div>
          <div className={styles.textWrapper}>
            <div className={styles.bodyText}>
              After connecting directly with the Dogecoin Foundation and learning
              first-hand about their roadmap, Rito performed at crypto music festival{' '}
              <em>Dogepalooza</em> with two original sets. One featuring the first-ever
              rap NFT on Dogecoin, the other a laymen-friendly roadmap breakdown entirely
              in spoken word verses. The Foundation later tweeted about his performance,
              and <em>U.Today</em> published a story about it. Rito also hit the stage
              impromptu with Grammy-winning producer Damon Elliott, ending the set with
              a mic-breaking moment.
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className={subsectionStyles.wrapper}>
      {/* Cycling Logos */}
      <div className={subsectionStyles.squareLogoContainer}>
        <LogoDisplayCarousel
          images={logos}
          links={[
            'https://u.today/dogecoin-used-to-purchase-nfts-worth-600000-in-historic-transaction',
            'https://u.today/dogecoin-used-to-purchase-nfts-worth-600000-in-historic-transaction',
          ]}
          alt="Dogecoin & U.Today Logos"
          interval={3000}
          fadeIn
          triggerAmountMobile={0.1}
          triggerAmountDesktop={0.8}
          mobileBreakpoint="(max-width: 768px)"
          borderColor="var(--secondary-blue)"
          backgroundColor="transparent"
        />
      </div>

      <TitleDisplay
        href="https://u.today/dogecoin-used-to-purchase-nfts-worth-600000-in-historic-transaction"
        borderColor="var(--secondary-blue)"
        backgroundColor="transparent"
        fadeIn
        triggerAmountMobile={0.1}
        triggerAmountDesktop={0.4}
        mobileBreakpoint="(max-width: 768px)"
      >
        Dogecoin Foundation Shouts Rito Out{' '}
        <span style={{ color: 'var(--primary-red)' }}>AND</span> he Performs with
        Grammy Winner Damon Elliot
      </TitleDisplay>

      {/* Content */}
      <ScrollFadeIn
        triggerAmountMobile={0.1}
        triggerAmountDesktop={0.4}
        mobileBreakpoint="(max-width: 768px)"
      >
        {customContentContainer}
      </ScrollFadeIn>

      {/* Button group */}
      <div className={subsectionStyles.buttonWrapper}>
        <ButtonSection
          title={
            <>
              Check out the article in <em>U.Today</em> or see more Rito in action with
              mic in hand!
            </>
          }
          buttonGroupProps={{
            buttons: [
              {
                text: 'U.Today Story',
                variant: 'blueAccentButton',
                href:
                  'https://u.today/dogecoin-used-to-purchase-nfts-worth-600000-in-historic-transaction',
              },
              {
                text: 'Speaker',
                variant: 'blackWhiteButton',
                href: '/speaker',
              },
            ],
          }}
        />
      </div>
    </div>
  );
}
