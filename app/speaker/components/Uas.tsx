// app\components\pages\speaker\Uas.tsx
'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { useInView } from 'framer-motion';
import styles from './Uas.module.css';
import CustomAudioPlayer from '@/components/utilities/media/audio/CustomAudioPlayer';

const Uas = () => {
  const [isMobile, setIsMobile] = useState(false);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const bottomContainerRef = useRef<HTMLDivElement>(null);

  // 1) Track mobile vs desktop in its own effect
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 730px)');
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    setIsMobile(mq.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // 2) Determine your intersection threshold
  const thresholdValue = isMobile ? 0.2 : 0.1;

  // 3) useInView hooks to know when each section enters viewport
  const imageInView = useInView(imageContainerRef, { amount: thresholdValue, once: true });
  const bottomInView = useInView(bottomContainerRef, { amount: thresholdValue, once: true });

  // 4) Fire your CSS animations when inView flips true
  useEffect(() => {
    if (imageInView && imageContainerRef.current) {
      const img = imageContainerRef.current.querySelector('img');
      if (img && !img.classList.contains(styles.animateImage)) {
        img.classList.add(styles.animateImage);
        setTimeout(() => {
          overlayRef.current?.classList.add(styles.animateOverlay);
        }, 1000);
      }
    }
  }, [imageInView]);

  useEffect(() => {
    if (bottomInView && bottomContainerRef.current) {
      bottomContainerRef.current.classList.add(styles.animateBottom);
    }
  }, [bottomInView]);

  return (
    <div className={styles.uasContainer}>
      {/* Top header */}
      <div className={styles.topTextContainer}>
        <h3>Presenting &amp; Rapping with Blockchain Legend</h3>
      </div>

      <div className={styles.middleContainer}>
        {/* Image + overlay */}
        <div className={styles.contentContainer}>
          <div className={styles.imageContainer} ref={imageContainerRef}>
            <Image
              src="/images/pages/speaker/pastEngagements/Will.png"
              alt="Will"
              width={450}
              height={450}
              priority
              style={{ objectFit: 'cover' }}
              className={styles.imageInitial}
            />
            <div className={styles.overlayText} ref={overlayRef}>
              <p>
                Co-authoring an Ethereum standard with William Entriken, Rito pitched it to the
                Rari Foundation & DAO—as a rap.
              </p>
            </div>
          </div>

          {/* Audio Player */}
          <div className={styles.audioContainer}>
            <CustomAudioPlayer
              audioSrc="/audio/Rari-Proposal-Rap.mp3"
              title="Proposal Presentation Delivered as a Rap"
            />
          </div>
        </div>

        {/* Bottom section */}
        <div className={styles.bottomContainer} ref={bottomContainerRef}>
          <h3 className={styles.bottomTitle}>Podcast Post-Mortem with William Entriken</h3>
          <div className={styles.bottomContent}>
            <div className={styles.videoContainer}>
              <div className={styles.videoWrapper}>
                <iframe
                  src="https://www.youtube.com/embed/NGEb7_vRPYM?si=e18xiVN8J4RXwR1A"
                  title="YouTube Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
            <div className={styles.textBlock}>
              <p>
                What started as an ambitious Ethereum standard co-authored with William Entriken
                turned into a six-month sprint through high-stakes strategy. We had a deal on the
                table with Rarible, a PR firm ready to amplify, and a major software development
                firm backing us post-funding. But the crypto landscape shifted beneath our feet,
                and the playbook we started with no longer fit the field. This podcast dives into
                the rise, stall, and what might've been.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Uas;
