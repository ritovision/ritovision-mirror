'use client';

import React, { useId, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import OrbImage from '@/components/utilities/media/images/OrbImage';
import 'swiper/css';
import 'swiper/css/navigation';
import styles from './BeforeAfterSwiper.module.css';

export type BeforeAfterItem = {
  label: string;
  innerLabel?: string;
  src: string;
  type?: string;
  mediaType?: 'video' | 'image';
  alt?: string;
  aspectRatio?: string | number;
};

interface BeforeAfterSwiperProps {
  items: BeforeAfterItem[];
  onSlideChange?: (index: number) => void;
}

export default function BeforeAfterSwiper({ items, onSlideChange }: BeforeAfterSwiperProps) {
  const navId = useId().replace(/:/g, '');
  const prevClass = `beforeAfterPrev-${navId}`;
  const nextClass = `beforeAfterNext-${navId}`;
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className={styles.wrapper}>
      {items.length > 1 && (
        <div className={styles.heading}>
          {items.map((item, index) => (
            <React.Fragment key={`${item.label}-${item.src}-heading`}>
              <button
                type="button"
                className={`${styles.headingButton} ${
                  activeIndex === index ? styles.headingActive : styles.headingInactive
                }`}
                onClick={() => {
                  if (swiperRef.current) {
                    swiperRef.current.slideToLoop(index);
                  }
                  setActiveIndex(index);
                }}
              >
                {item.label}
              </button>
              {index < items.length - 1 && (
                <span className={styles.headingSeparator}>&amp;</span>
              )}
            </React.Fragment>
          ))}
        </div>
      )}
      <div className={styles.shell}>
        <button
          type="button"
          className={`${styles.navButton} ${styles.prev} ${prevClass}`}
          aria-label="Previous slide"
        >
          <svg
            className={styles.navIcon}
            viewBox="0 0 24 24"
            aria-hidden="true"
            focusable="false"
          >
            <path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" />
          </svg>
        </button>

        <div className={styles.sliderFrame}>
          <Swiper
            modules={[Navigation]}
            navigation={{
              prevEl: `.${prevClass}`,
              nextEl: `.${nextClass}`,
            }}
            loop
            slidesPerView={1}
            spaceBetween={0}
            autoHeight
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
              setActiveIndex(swiper.realIndex);
              onSlideChange?.(swiper.realIndex);
            }}
            onSlideChange={(swiper) => {
              setActiveIndex(swiper.realIndex);
              onSlideChange?.(swiper.realIndex);
            }}
            className={styles.swiper}
          >
            {items.map((item) => (
              <SwiperSlide key={`${item.label}-${item.src}`} className={styles.slide}>
                <div className={styles.slideContent}>
                  <div className={styles.label}>{item.innerLabel ?? item.label}</div>
                  {item.mediaType === 'image' || item.type?.startsWith('image/') ? (
                    <OrbImage
                      src={item.src}
                      alt={item.alt ?? `${item.label} slide`}
                      containerClassName={styles.video}
                      aspectRatio={item.aspectRatio ?? '4 / 3'}
                      sizes="(max-width: 768px) 90vw, 400px"
                      radius="8px"
                      style={{ objectFit: 'contain' }}
                    />
                  ) : (
                    <video
                      className={styles.video}
                      controls
                      playsInline
                      preload="metadata"
                    >
                      <source src={item.src} type={item.type ?? 'video/webm'} />
                      Your browser does not support the video tag.
                    </video>
                  )}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <button
          type="button"
          className={`${styles.navButton} ${styles.next} ${nextClass}`}
          aria-label="Next slide"
        >
          <svg
            className={styles.navIcon}
            viewBox="0 0 24 24"
            aria-hidden="true"
            focusable="false"
          >
            <path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" />
          </svg>
        </button>
      </div>
    </div>
  );
}
