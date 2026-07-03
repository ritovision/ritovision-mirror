// app\projects\uas\sections\erc\components\Proposal.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import CustomAudioPlayer from '@/components/utilities/media/audio/CustomAudioPlayer';
import Button from '@/components/utilities/buttons/Button';
import styles from './Proposal.module.css';

export default function Proposal() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 730);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: isMobile ? '0px 0px -20% 0px' : '0px 0px -10% 0px'
  });

  return (
    <div
      id="erc-pitches"
      ref={ref}
      className={`defaulttopspace ${styles.wrapper} ${inView ? styles.visible : styles.hidden}`}
    >
      <div className={styles.flexRow}>
        <div className={styles.infoBox}>
          <h3 className={styles.infoTitle}>DAO Dialogue Through Dynamic Proposals</h3>
          <p className={styles.infoText}>
            The UAS adoption effort included a set of detailed proposals written by Rito and William Entriken to engage directly with the Rari DAO and Foundation. These proposals served as living documents—changing in response to community comments, town hall feedback, and forum discussions.
            <br />
            <br />
            The link below showcases the initial stages of that proposal evolution, reflecting both strategic thinking and collaborative input.
          </p>
          <div className={styles.buttonWrapper}>
            <Button
              text="View Rari Proposals"
              href="https://forum.rari.foundation/t/proposal-a-new-erc-universal-asset-signing/1513"
            />
          </div>
        </div>
        <div className={styles.audioBox}>
          <CustomAudioPlayer
            title="First Rari Proposal Delivered as a Rap"
            audioSrc="\audio\Rari-Proposal-Rap.mp3"
          />
        </div>
      </div>
    </div>
  );
}
