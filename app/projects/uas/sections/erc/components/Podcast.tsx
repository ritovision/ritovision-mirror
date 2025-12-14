'use client';

import React, { useState, useEffect } from 'react';
import styles from './Podcast.module.css';

export default function Podcast() {
  const [, setIsMobile] = useState(false);
  const [play, setPlay] = useState(false);
  const videoId = 'NGEb7_vRPYM';

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 730);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div id="post-mortem-podcast" className={`defaulttopspace ${styles.wrapper}`}>
      <h2 className={styles.title}>Post-Mortem Podcast with William Entriken</h2>

      <div
        className={styles.videoWrapper}
        onClick={() => setPlay(true)}
        role="button"
        aria-label="Play podcast video"
      >
        {!play && (
          <>
            <div
              className={styles.thumbnail}
              style={{
                backgroundImage: `url(https://img.youtube.com/vi/${videoId}/hqdefault.jpg)`
              }}
            />
            <div className={styles.playButton} />
          </>
        )}
        {play && (
          <iframe
            className={styles.iframe}
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            title="Post-Mortem Podcast with William Entriken"
          />
        )}
      </div>

      <p className={styles.text}>
        In this live session on <em>Community Service Hour</em>, Rito breaks down the multi-phase strategy used to drive adoption of the UAS ERC. The conversation explores critical missteps, lessons learned, and how a future attempt might be stronger and more aligned with the ecosystem’s dynamics.
      </p>
    </div>
  );
}
