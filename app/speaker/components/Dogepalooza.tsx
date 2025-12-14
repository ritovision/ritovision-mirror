'use client';

import React, { useEffect, useState } from 'react';
import desktopStyles from './Dogepalooza-desktop.module.css';
import mobileStyles from './Dogepalooza-mobile.module.css';
import animationStyles from './Dogepalooza-animations.module.css';
import Image from 'next/image';
import CustomAudioPlayer from '@/components/utilities/media/audio/CustomAudioPlayer';

const Dogepalooza = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 730px)');
    const handleMediaChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);

    setIsMobile(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleMediaChange);
    return () => mediaQuery.removeEventListener('change', handleMediaChange);
  }, []);

  const styles = isMobile ? mobileStyles : desktopStyles;

  useEffect(() => {
    const triggerOffset = isMobile ? '-20%' : '-10%';
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(animationStyles.active);
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      rootMargin: `0px 0px ${triggerOffset} 0px`,
      threshold: 0,
    });

    const animatedElements = document.querySelectorAll(`.${animationStyles.imageInnerAnimate}`);
    animatedElements.forEach(el => observer.observe(el));

    return () => {
      animatedElements.forEach(el => observer.unobserve(el));
    };
  }, [isMobile]);

  return (
    <div className={styles.dogepaloozaContainer}>
      <div className={styles.topTextContainer}>
        <h3>Performing a Roadmap Rap for Dogecoin and Getting On-stage with a Grammy Winner</h3>
      </div>

      <div className={styles.middleContainer}>
        <div className={styles.imageGallery}>
          <div className={`${styles.imageWrapper} ${styles.image1}`}>
            <div className={animationStyles.imageInnerAnimate}>
              <Image
                src="/images/pages/speaker/pastEngagements/Damon-Rito-Stage.png"
                alt="Damon and Rito on stage"
                width={600}
                height={400}
                className={styles.galleryImage}
              />
            </div>
          </div>

          <div className={`${styles.imageWrapper} ${styles.image2}`}>
            <div className={animationStyles.imageInnerAnimate}>
              <Image
                src="/images/pages/speaker/pastEngagements/Damon_Elliot-Rito.jpg"
                alt="Damon and Rito"
                width={600}
                height={400}
                className={styles.galleryImage}
              />
            </div>
          </div>

          <div className={`${styles.imageWrapper} ${styles.image3}`}>
            <div className={animationStyles.imageInnerAnimate}>
              <Image
                src="/images/pages/speaker/pastEngagements/rito-broken-micstand.jpg"
                alt="Rito with broken mic"
                width={600}
                height={400}
                className={styles.galleryImage}
              />
            </div>
          </div>

          <div className={`${styles.imageWrapper} ${styles.image4}`}>
            <div className={animationStyles.imageInnerAnimate}>
              <Image
                src="/images/pages/speaker/hero/ritorhymes.jpg"
                alt="Rito performing"
                width={600}
                height={400}
                className={styles.galleryImage}
              />
            </div>
          </div>
        </div>

        <div className={styles.bottomContent}>
          <div className={styles.bottomTextContainer}>
            <p>
              At crypto-music festival Dogepalooza, Rito was in his element—delivering a mix of spoken word and rap, including a lyrical piece unpacking Dogecoin's technical roadmap: its scope, implementation, and impact on the ecosystem. The foundation itself took notice and gave it a shoutout afterwards. He also performed a Snoop Dogg parody remix featuring recorded vocals by viral artist Eline Vera.<br /><br />
              But the most unforgettable moment came unscripted. <br /><br />
              During Grammy-winning producer Damon Elliott's set, Rito was in the crowd—vibing hard, dancing wild. Damon couldn't ignore it. He pointed straight at him:<br /><br />
              “You… yeah YOU… you dancin' like it's 1999!”<br /><br />
              Ready to mince moves instead of words, Rito took the stage, and what started as a spontaneous vibe turned into a full-on impromptu performance—Damon shouting Rito out, the crowd roaring, and a mic stand accidentally broken from moment a well met.
            </p>
          </div>
          <div className={styles.audioWrapper}>
            <CustomAudioPlayer
              title="Roadmap Rap"
              audioSrc="/audio/Dogecoin-Roadmap-Rap.mp3"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dogepalooza;
