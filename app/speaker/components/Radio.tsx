'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import styles from './Radio.module.css';
import CustomAudioPlayer from '@/components/utilities/media/audio/CustomAudioPlayer';

const Radio = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [imageRevealPercentage, setImageRevealPercentage] = useState(0);
  const [imageAnimationTriggered, setImageAnimationTriggered] = useState(false);
  const [textRevealPercentage, setTextRevealPercentage] = useState(0);
  const [textAnimationTriggered, setTextAnimationTriggered] = useState(false);
  const animationDuration = 1500; // Adjust as needed in milliseconds
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 730px)');
    const handleMediaChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    setIsMobile(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleMediaChange);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const viewportHeight = window.innerHeight;

      // Trigger for Image
      if (imageContainerRef.current && !imageAnimationTriggered) {
        const imageContainer = imageContainerRef.current;
        const rect = imageContainer.getBoundingClientRect();
        const imageBottom = rect.bottom;
        const imageTriggerPercentage = isMobile ? 0.20 : 0.10;
        const imageTriggerOffset = viewportHeight * imageTriggerPercentage;

        if (imageBottom <= viewportHeight + imageTriggerOffset) {
          setImageAnimationTriggered(true);
        }
      }

      // Trigger for Text
      if (textContainerRef.current && !textAnimationTriggered) {
        const textContainer = textContainerRef.current;
        const rect = textContainer.getBoundingClientRect();
        const textBottom = rect.bottom;
        const textTriggerPercentage = isMobile ? 0.40 : 0.10; // 40% for mobile, 10% for larger
        const textTriggerOffset = viewportHeight * textTriggerPercentage;

        if (textBottom <= viewportHeight + textTriggerOffset) {
          setTextAnimationTriggered(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll); // Also listen for resize in case viewport height changes

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [isMobile, imageAnimationTriggered, textAnimationTriggered]);

  useEffect(() => {
    if (imageAnimationTriggered) {
      let startTime: number | null = null;
      const duration = animationDuration;

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        const percentage = Math.min(100, (progress / duration) * 100);
        setImageRevealPercentage(percentage);

        if (percentage < 100) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    } else {
      setImageRevealPercentage(0); // Reset if animation hasn't been triggered
    }
  }, [imageAnimationTriggered, animationDuration]);

  useEffect(() => {
    if (textAnimationTriggered) {
      let startTime: number | null = null;
      const duration = animationDuration;

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        const percentage = Math.min(100, (progress / duration) * 100);
        setTextRevealPercentage(percentage);

        if (percentage < 100) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    } else {
      setTextRevealPercentage(0); // Reset if animation hasn't been triggered
    }
  }, [textAnimationTriggered, animationDuration]);

  const imageClipPathStyle = {
    clipPath: `inset(${100 - imageRevealPercentage}% 0 0 0)`,
  };

  const textClipPathStyle = {
    clipPath: `inset(0 0 ${100 - textRevealPercentage}% 0)`,
  };

  return (
    <div className={styles.radioContainer}>
      <div className={styles.topTextContainer}>
        <h3>Live Radio Feature Interview on NYC's Flagship<em>77 WABC</em> About Tech with Impromptu Rapping</h3>
      </div>

      <div className={styles.middleContainer}>
        <div className={styles.contentContainer}>
          <div className={styles.imageContainer} style={imageAnimationTriggered ? imageClipPathStyle : { clipPath: 'inset(100% 0 0 0)' }} ref={imageContainerRef}>
            <Image
              src="/images/pages/speaker/pastEngagements/ritoradio.jpg"
              alt="Rito Rhymes"
              width={450}
              height={338}
              layout="responsive"
              style={{ transition: 'clip-path 0.3s ease-out' }}
            />
          </div>

          <div className={styles.textContainer} style={textAnimationTriggered ? textClipPathStyle : { clipPath: 'inset(0 0 100% 0)' }} ref={textContainerRef}>
            <p>
            Listen to this unique interview where Rito Rhymes embodies an infotaining intersection of technology and music, offering insights on blockchain, the metaverse, and digital culture—while delivering improvised rap responses live on air. This appearance on <i>The Other Side of Midnight with Frank Morano</i > showcases Rito's dynamic voice as a technologist, strategist, and artist.
            </p>
          </div>
        </div>

        <div className={styles.embedContainer}>
          <CustomAudioPlayer
            audioSrc="\audio\77WABC-interview.mp3"
            title="77 WABC Insane in the Blockchain"
          />
        </div>
      </div>
    </div>
  );
};

export default Radio;