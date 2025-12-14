'use client';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import AnimatedSvgBorderBlock from '../home/hero/AnimatedSvgBorderBlock';
import styles from './NotFoundOrbs.module.css';

export default function NotFoundOrbsMobile() {
  const items = useMemo(
    () => [
      { text: '404 Error', color: '#FFFFFF' },
      { text: 'Page Not Found', color: '#FFFFFF' },
      { text: 'So sorry about that', color: '#FC1819' },
    ],
    []
  );

  // Orb sequence state
  const [visibleIndex, setVisibleIndex] = useState(-1);
  const [fadeOut, setFadeOut] = useState(false);
  const [iteration, setIteration] = useState(0);
  const [initialized, setInitialized] = useState(false);
  const seqTimers = useRef<NodeJS.Timeout[]>([]);
  const resetTimer = useRef<NodeJS.Timeout | null>(null);

  // Video state & refs
  const [videoVisible, setVideoVisible] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const watchdog = useRef<NodeJS.Timeout | null>(null);

  const ensureVideoPlaying = useCallback(() => {
    if (
      videoRef.current &&
      (videoRef.current.paused || videoRef.current.ended)
    ) {
      videoRef.current
        .play()
        .catch(() => {
          setTimeout(() => {
            videoRef.current?.play().catch(() => {});
          }, 500);
        });
    }
  }, []);

  const startSequence = useCallback(() => {
    seqTimers.current.forEach(clearTimeout);
    seqTimers.current = [];
    setVisibleIndex(-1);
    setVideoVisible(false);

    // Text reveal sequence
    items.forEach((_, i) => {
      const t = setTimeout(() => {
        setVisibleIndex(i);
      }, 800 * i);
      seqTimers.current.push(t);
    });

    // Video fallback
    const vidT = setTimeout(() => {
      setVideoVisible(true);
      ensureVideoPlaying();
    }, 200);
    seqTimers.current.push(vidT);
  }, [items, ensureVideoPlaying]);

  // On mount: run once
  useEffect(() => {
    if (!initialized) {
      startSequence();
      setInitialized(true);
    }
  }, [initialized, startSequence]);

  // Every minute: fade out & restart
  useEffect(() => {
    const loop = setInterval(() => {
      setFadeOut(true);
      if (resetTimer.current) clearTimeout(resetTimer.current);
      resetTimer.current = setTimeout(() => {
        setFadeOut(false);
        seqTimers.current.forEach(clearTimeout);
        seqTimers.current = [];
        setVisibleIndex(-1);
        setIteration((n) => n + 1);
        startSequence();
      }, 2000);
    }, 60000);

    return () => {
      clearInterval(loop);
      if (resetTimer.current) clearTimeout(resetTimer.current);
      seqTimers.current.forEach(clearTimeout);
    };
  }, [startSequence]);

  // Keep video playing when visible
  useEffect(() => {
    if (!videoVisible) return;
    if (watchdog.current) clearInterval(watchdog.current);
    watchdog.current = setInterval(ensureVideoPlaying, 3000);
    return () => {
      if (watchdog.current) clearInterval(watchdog.current);
    };
  }, [videoVisible, ensureVideoPlaying]);

  // Reload video on error/stall
  const handleVideoError = () => {
    if (videoRef.current) {
      videoRef.current.load();
      setTimeout(ensureVideoPlaying, 500);
    }
  };

  return (
    <div
      className={`${styles.heroContainer} ${
        fadeOut ? styles.fadeOut : ''
      }`}
    >
      <video
        ref={videoRef}
        className={`${styles.backgroundVideo} ${
          videoVisible ? styles.videoVisible : ''
        }`}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onLoadedData={() => {
          setVideoVisible(true);
          ensureVideoPlaying();
        }}
        onError={handleVideoError}
        onStalled={handleVideoError}
        onPause={ensureVideoPlaying}
        onEnded={ensureVideoPlaying}
      >
        <source
          src="/video/Particle-Effect-blueBG-BlueOrbs.webm"
          type="video/webm"
        />
      </video>

      <div className={styles.videoGradient} />

      <div className={styles.sequenceContainer}>
        {items.map((item, idx) => (
          <AnimatedSvgBorderBlock
            key={`${iteration}-${idx}`}
            text={item.text}
            textColor={item.color}
            borderColor="var(--secondary-blue)"
            isVisible={idx <= visibleIndex}
            animationDuration={600}
            extraClassName={
              idx === 0
                ? styles.leftAlign
                : idx === 1
                ? styles.rightAlign
                : styles.centerAlign
            }
          />
        ))}
      </div>
    </div>
  );
}
