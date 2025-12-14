// app\components\pages\home\Sections\Showcase\JumptagShowcase.tsx
'use client';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import LogoDisplay from '@/components/utilities/sections/topicSegment/LogoDisplay';
import TitleDisplay from '@/components/utilities/sections/topicSegment/TitleDisplay';
import ScrollFadeIn from '@/components/utilities/animations/ScrollFadeIn';
import Button from '@/components/utilities/buttons/Button';
import subsectionStyles from './ShowcaseSubsection.module.css';
import styles from './JumptagShowcase.module.css';

// Import required Swiper CSS
import 'swiper/css';
import 'swiper/css/autoplay';

export default function JumptagShowcase() {
  // Array of image paths for the slider
  const montageImages = [
    '/images/pages/projects/jumptag/photography/cover.jpg',
    '/images/pages/projects/jumptag/demode/fashionfloor.jpg',
    '/images/pages/projects/jumptag/demode/group-emily.jpg',
    '/images/pages/projects/jumptag/demode/romeohunte.jpg',
    '/images/pages/projects/jumptag/demode/romeohunte-scan.jpg'
  ];

  // Content for the custom container (replaces ContentDisplay)
  const customContentContainer = (
    <div className={styles.container} style={{ borderColor: 'var(--secondary-blue)', backgroundColor: 'var(--black)' }}>
      {/* Left column: Image Slider */}
      <div className={styles.imageCaptionWrapper}>
        <div className={styles.imageWrapper}>
          <Swiper
            modules={[Autoplay]}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            className={styles.swiper}
          >
            {montageImages.map((image, index) => (
              <SwiperSlide key={index}>
                <img 
                  src={image} 
                  alt={`Jumptag montage image ${index + 1}`} 
                  className={styles.image} 
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Right column: Body text */}
      <div className={styles.bodyWrapper}>
        <div>
          <div className={styles.textWrapper}>
            <div className={styles.bodyText}>
            In a pilot run for Jumptag Club, founded by Rito, he led end-to-end brand and product development of app-controlled wearable QR jewelry—originally a customizable Web3 wallet, evolved into a universal connector for anything online. The product debuted as the centerpiece of an interactive New York Fashion Week show, where guests scanned the jewelry worn by models styled by celebrity designers like Romeo Hunte and Pamela Dennis.            </div>
          </div>
          <div className={styles.buttonWrapper}>
            <Button
              text="Learn More"
              variant="blueAccentButton"
              href="/projects/jumptag"
            />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className={subsectionStyles.wrapper}>
      {/* Logo */}
      <div className={subsectionStyles.squareLogoContainer}>
        <LogoDisplay
        href="/projects/jumptag"
          src="/images/pages/projects/jumptag/brand/latest-logo.png"
          alt="Jumptag Club Logo"
          fadeIn
          triggerAmountMobile={0.1}
          triggerAmountDesktop={0.8}
          mobileBreakpoint="(max-width: 768px)"
          borderColor="var(--secondary-blue)"
          backgroundColor="transparent"
        />
      </div>
      
      {/* Title */}
      <TitleDisplay
      href="/projects/jumptag"
        text="Wearable Tech Powers a NYFW Fashion Show with Celebrity Designers & Published Models"
        borderColor="var(--secondary-blue)"
        backgroundColor="transparent"
        fadeIn
        triggerAmountMobile={0.1}
        triggerAmountDesktop={0.4}
        mobileBreakpoint="(max-width: 768px)"
      />
      
      {/* Custom Content Container with Swiper */}
      <ScrollFadeIn
        triggerAmountMobile={0.1}
        triggerAmountDesktop={0.4}
        mobileBreakpoint="(max-width: 768px)"
      >
        {customContentContainer}
      </ScrollFadeIn>
      
  
    </div>
  );
}
