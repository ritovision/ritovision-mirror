'use client';

import React, { useId } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import OrbImage from '@/components/utilities/media/images/OrbImage';
import 'swiper/css';
import 'swiper/css/navigation';
import styles from './CaptionedSwiper.module.css';

export type CaptionedSlide = {
  title: string;
  caption: string;
  src: string;
  alt: string;
  aspectRatio?: string | number;
};

interface CaptionedSwiperProps {
  items: CaptionedSlide[];
  onSlideChange?: (index: number) => void;
}

export default function CaptionedSwiper({ items, onSlideChange }: CaptionedSwiperProps) {
  const navId = useId().replace(/:/g, '');
  const prevClass = `captionedPrev-${navId}`;
  const nextClass = `captionedNext-${navId}`;

  return (
    <div className={styles.wrapper}>
      <div className={styles.shell}>
        <button
          type="button"
          className={`${styles.navButton} ${styles.prev} ${prevClass}`}
          aria-label="Previous slide"
        >
          <svg className={styles.navIcon} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
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
              onSlideChange?.(swiper.realIndex);
            }}
            onSlideChange={(swiper) => {
              onSlideChange?.(swiper.realIndex);
            }}
            className={styles.swiper}
          >
            {items.map((item) => (
              <SwiperSlide key={`${item.title}-${item.src}`} className={styles.slide}>
                <div className={styles.slideContent}>
                  <div className={styles.title}>{item.title}</div>
                  <OrbImage
                    src={item.src}
                    alt={item.alt}
                    containerClassName={styles.media}
                    aspectRatio={item.aspectRatio ?? '4 / 3'}
                    sizes="(max-width: 768px) 90vw, 420px"
                    radius="8px"
                    style={{ objectFit: 'contain' }}
                  />
                  <p className={styles.caption}>{item.caption}</p>
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
          <svg className={styles.navIcon} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" />
          </svg>
        </button>
      </div>
    </div>
  );
}
