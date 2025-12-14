'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules'; // Added Autoplay if needed, keep Pagination
import type { SwiperRef } from 'swiper/react';
import type { Swiper as SwiperCore } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import styles from './ContentDisplaySlider.module.css';
import ScrollFadeIn from '@/components/utilities/animations/ScrollFadeIn';
import Dropdown from '@/components/utilities/dropdown/Dropdown';

interface ContentDisplaySliderProps {
  caption?: string;
  bodyTextContent?: React.ReactNode; // Updated to allow JSX elements
  borderColor?: string;
  backgroundColor?: string;
  fadeIn?: boolean;
  duration?: number;
  triggerAmount?: number;
  triggerAmountMobile?: number;
  triggerAmountDesktop?: number;
  mobileBreakpoint?: string; // Consider using a number breakpoint like 730
}

const ContentDisplaySlider: React.FC<ContentDisplaySliderProps> = ({
  caption = 'Samples from the Campaign',
  // Updated default body text with JSX to italicize ScreenRant
  bodyTextContent = (
    <>
      Rito gained significant media attention from the leading gaming news outlets like <em>ScreenRant</em> and <em>Dexerto</em> for a series of infotaining videos showcasing bugs within <em>Call of Duty: Warzone</em>. The coverage ultimately prompted the major game studio behind it to fix the publicized issues.
    </>
  ),
  borderColor = 'var(--secondary-blue)',
  backgroundColor = 'transparent', // Defaulting to transparent as requested
  fadeIn = true,
  duration,
  triggerAmount,
  triggerAmountMobile,
  triggerAmountDesktop,
  mobileBreakpoint = '(max-width: 730px)',
}) => {
  const sliderWrapperRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<SwiperRef | null>(null);

  // Track which video (if any) is active
  const [activeVideoIndex, setActiveVideoIndex] = useState<number | null>(null);

  const videos = [
    'https://www.youtube.com/embed/IWduukB7t0g?enablejsapi=1',
    'https://www.youtube.com/embed/c7pHn3WCi4k?enablejsapi=1',
  ];

  // Helper function to extract video ID from a YouTube embed URL
  const extractVideoId = (url: string) => {
    const match = url.match(/embed\/([^?]+)/);
    return match ? match[1] : '';
  };

  // Dropdown items (as provided in the example)
  const dropdownItems = [
    { label: "ScreenRant", url: "https://screenrant.com/cod-warzone-riot-shield-disappear-glitch-rap-video/" },
    { label: "Dexerto (Cheater Story)", url: "https://www.dexerto.com/call-of-duty/warzone-hero-makes-hacker-rage-quit-after-epic-riot-shield-1v1-1650745/" },
    { label: "Gfinity Esports", url: "https://www.gfinityesports.com/article/snoop-dogg-head-disappear" },
    { label: "Charlie Intel", url: "https://www.charlieintel.com/call-of-duty-warzone/crazy-warzone-bug-makes-snoop-dogg-operator-impossible-to-headshot-177193/" },
    { label: "GameRant", url: "https://web.archive.org/web/20211023225040/https://gamerant.com/call-of-duty-warzone-exploding-helicopters-rebirth-bug-video/" },
    { label: "Dexerto (Helicopter)", url: "https://www.dexerto.com/call-of-duty/explosive-warzone-bug-causes-helicopters-to-self-destruct-out-of-nowhere-1681693/" },
    { label: "Dexerto (Riot Shield)", url: "https://www.dexerto.com/call-of-duty/bizarre-warzone-glitch-steals-riot-shields-from-players-mid-game-1707837/" },
    { label: "GameRant (Riot Shield)", url: "https://gamerant.com/call-of-duty-warzone-bug-is-randomly-removing-riot-shields/" }
  ];

  const handleDropdownChange = (selectedLabel: string) => {
    const selectedItem = dropdownItems.find(item => item.label === selectedLabel);
    if (selectedItem?.url) {
      window.open(selectedItem.url, '_blank', 'noopener,noreferrer');
    }
  };

  // Convert items to labels for the Dropdown component
  const dropdownLabels = dropdownItems.map(item => item.label);

  // Pause video on slide change only if the active slide is different
  const handleSlideChange = (swiper: SwiperCore) => {
    if (activeVideoIndex !== swiper.realIndex) {
      if (sliderWrapperRef.current) {
        const iframes = sliderWrapperRef.current.querySelectorAll('iframe');
        iframes.forEach((iframe) => {
          if (iframe.contentWindow) {
            iframe.contentWindow.postMessage(
              JSON.stringify({ event: 'command', func: 'pauseVideo', args: [] }),
              '*'
            );
          }
        });
      }
      setActiveVideoIndex(null);
    }
  };

  // Update Swiper on window resize (helps with responsiveness)
  useEffect(() => {
    const updateSwiper = () => {
      swiperRef.current?.swiper?.update();
    };
    window.addEventListener('resize', updateSwiper);
    setTimeout(updateSwiper, 0);
    return () => window.removeEventListener('resize', updateSwiper);
  }, []);

  const content = (
    <div className={styles.containerWrapper}>
      {/* Main content container with border and background */}
      <div className={styles.container} style={{ borderColor, backgroundColor }}>
        
        {/* Left Column (Mobile: Top) */}
        <div className={styles.sliderCaptionWrapper}>
          <div className={styles.sliderWrapper} ref={sliderWrapperRef}>
            <Swiper
              ref={swiperRef}
              modules={[Pagination]} // Add Autoplay here if desired: modules={[Pagination, Autoplay]}
              pagination={{ clickable: true, el: `.${styles.customPagination}` }}
              loop={true}
              slidesPerView={1}
              spaceBetween={0}
              autoHeight={true}
              onSlideChange={(swiper) => handleSlideChange(swiper)}
              className={styles.swiperContainer}
            >
              {videos.map((videoUrl, index) => {
                const videoId = extractVideoId(videoUrl);
                return (
                  <SwiperSlide key={index} className={styles.swiperSlide}>
                    <div className={styles.videoContainer}>
                      {activeVideoIndex === index ? (
                        <iframe
                          src={`${videoUrl}&autoplay=1`}
                          title={`YouTube video player ${index + 1}`}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                          className={styles.videoIframe}
                        ></iframe>
                      ) : (
                        <div
                          className={styles.thumbnailContainer}
                          onClick={() => setActiveVideoIndex(index)}
                        >
                          <img
                            src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                            alt={`Thumbnail for video ${index + 1}`}
                            className={styles.videoThumbnail}
                          />
                          <div className={styles.playOverlay}>
                            <svg className={styles.playIcon} viewBox="0 0 24 24" fill="currentColor">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                        </div>
                      )}
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
            {/* Custom Pagination Dots Container */}
            <div className={styles.customPagination}></div>
          </div>
          {caption && <div className={styles.caption}>{caption}</div>}
        </div>

        {/* Right Column (Mobile: Bottom) */}
        <div className={styles.bodyWrapper}>
          <div className={styles.bodyInnerWrapper}>
            <div className={styles.textWrapper}>
              <div className={styles.bodyText}>{bodyTextContent}</div>
            </div>
            <div className={styles.buttonWrapper}>
              <Dropdown
                label="Check out the articles"
                items={dropdownLabels}
                onChange={handleDropdownChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return fadeIn ? (
    <ScrollFadeIn
      duration={duration}
      triggerAmount={triggerAmount}
      triggerAmountMobile={triggerAmountMobile}
      triggerAmountDesktop={triggerAmountDesktop}
      mobileBreakpoint={mobileBreakpoint}
    >
      {content}
    </ScrollFadeIn>
  ) : (
    content
  );
};

export default ContentDisplaySlider;
