// c:/Users/Mattj/ritovision website/test/app/components/pages/speaker/Music.tsx

'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import styles from './Music.module.css';
import CustomAudioPlayer from '@/components/utilities/media/audio/CustomAudioPlayer';
import Button from '@/components/utilities/buttons/Button';

const Music: React.FC = () => {
  // Track mobile vs. desktop
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 730px)');
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    setIsMobile(mq.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Refs for in-view detection
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef  = useRef<HTMLDivElement>(null);

  // Intersection thresholds
  const imageThreshold = isMobile ? 0.2 : 0.1;
  const textThreshold  = isMobile ? 0.4 : 0.1;

  // Framer Motion in-view hooks
  const imageInView = useInView(imageRef, { amount: imageThreshold, once: true });
  const textInView  = useInView(textRef,  { amount: textThreshold,  once: true });

  // Triggered states
  const [imageTriggered, setImageTriggered] = useState(false);
  const [textTriggered,  setTextTriggered]  = useState(false);

  // Fire image animation when in view
  useEffect(() => {
    if (imageInView && !imageTriggered) {
      setImageTriggered(true);
    }
  }, [imageInView, imageTriggered]);

  // Fire text animation when in view
  useEffect(() => {
    if (textInView && !textTriggered) {
      setTextTriggered(true);
    }
  }, [textInView, textTriggered]);

  return (
    <div className={styles.musicSection}>
      <div className={styles.musicWrapper}>
        <div className={styles.musicContainer}>
          <div className={styles.topTextContainer}>
            <h3>Custom Songs &amp; Music-styled Presentations</h3>
          </div>

          <div className={styles.middleContainer}>
            <div className={styles.contentContainer}>
              <motion.div
                ref={imageRef}
                className={styles.imageContainer}
                initial={{ opacity: 0, scale: 0.3, rotate: 0 }}
                animate={
                  imageTriggered
                    ? { opacity: 1, scale: 1, rotate: 1080 }
                    : {}
                }
                transition={{ duration: 2, ease: 'easeOut' }}
              >
                <Image
                  src="/images/home/cobrands/Rito-mic-hold.jpg"
                  alt="Rito Rhymes"
                  width={450}
                  height={338}
                  priority
                  style={{ width: '100%', height: 'auto', borderRadius: '10px' }}
                />
              </motion.div>

              <div
                ref={textRef}
                className={`${styles.textContainer} ${
                  textTriggered ? styles.textContainerVisible : ''
                }`}
              >
                <p>
                  Rito—widely known through press and performances as Rito Rhymes—is a master of infotainment, blending sharp business insight with the energy of music. He’s created a wide range of songs that make complex technical topics not just digestible, but genuinely enjoyable.
                  <br /><br />
                  From rap to rock to EDM remixes, Rito writes, records, and produces across genres—often collaborating with singers, audio engineers, and producers to bring each track to life. Whether it’s a custom anthem for your event or a music-styled presentation woven into a keynote, Rito delivers infotainment that resonates.
                </p>

                <div
                  className={`${styles.buttonWrapper} ${
                    textTriggered ? styles.buttonWrapperVisible : ''
                  }`}
                >
                  <Button
                    text="See More Samples"
                    href="https://ritorhymes.com/music"
                  />
                </div>
              </div>
            </div>

            <div className={styles.embedContainer}>
              <CustomAudioPlayer
                audioSrc="/audio/Hodeler.mp3"
                title="Sample Song About Blockchain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Music;
