'use client';

import React from 'react';
import styles from './Photography.module.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

export default function Photography() {
  return (
    <div className={`${styles.wrapper} defaulttopspace`}>
      <h3 id="photography-style" className={styles.title}>
        Photography Style
      </h3>

      <img
        src="/images/pages/projects/jumptag/photography/cover.jpg"
        alt="Jumptag Club photography cover"
        className={styles.cover}
      />

      <p className={styles.text}>
        The visual identity of Jumptag Club was built through a focused lifestyle and portrait photography approach—vibrant, emotive, and grounded in human experience. The photography highlighted the product in real-world contexts, showing not just how it looked, but how it felt in use.
      </p>

      <p className={styles.text}>
        Each image was designed to convey a sense of motion, identity, and authenticity. Featuring a diverse range of models across race, style, and background, the photos illustrated the product’s flexibility—how it could belong equally to a streetwear enthusiast, a high-fashion creative, or a casual urban commuter. The choice to highlight this diversity wasn’t incidental—it was part of the broader vision to position Jumptag Club as a universal, modular accessory that adapts to the person wearing it.
      </p>

      <div className={styles.swiperContainer}>
        <Swiper
          modules={[Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          className={styles.swiper}
        >
          <SwiperSlide>
            <img
              src="/images/pages/projects/jumptag/photography/slide6.jpg"
              alt="Photography slide 6"
              className={styles.swiperImage}
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="/images/pages/projects/jumptag/photography/slide5.jpg"
              alt="Photography slide 5"
              className={styles.swiperImage}
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="/images/pages/projects/jumptag/photography/slide4.jpg"
              alt="Photography slide 4"
              className={styles.swiperImage}
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="/images/pages/projects/jumptag/photography/slide3.jpg"
              alt="Photography slide 3"
              className={styles.swiperImage}
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="/images/pages/projects/jumptag/photography/slide2.jpg"
              alt="Photography slide 2"
              className={styles.swiperImage}
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="/images/pages/projects/jumptag/photography/slide1.webp"
              alt="Photography slide 1"
              className={styles.swiperImage}
            />
          </SwiperSlide>
        </Swiper>
      </div>

      <p className={styles.text}>
        Shot across New York City and parts of New Jersey, the photoshoots were conceptualized, directed, and photographed personally by Rito. These weren’t stock portraits or controlled studio setups—they were live, in-the-world scenes shot in dynamic environments: rooftops, streets, cafes, creative spaces. The result is a library of visuals that reflect both the technical aesthetic of the product and the lived-in emotion of everyday wear.
      </p>

      <p className={styles.text}>
        Among the talent featured in the imagery are models who have gone on to appear in publications like Vogue and Harper’s Bazaar—a testament to both the styling of the product and the caliber of visual storytelling.
      </p>

      <p className={styles.text}>
        This photography work became a core pillar of the brand’s presence—used across the Jumptag App UI, e-commerce storefront, marketing materials, and fashion activation presentations.
      </p>
    </div>
  );
}
