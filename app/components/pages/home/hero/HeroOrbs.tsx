// app\components\pages\home\hero\HeroOrbs.tsx
'use client';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import styles from './HeroOrbs.module.css';
import AnimatedSvgBorderBlock from './AnimatedSvgBorderBlock';

export default function HeroOrbs() {
  const items = useMemo(
    () => [
      { text: 'Creative', color: 'var(--foreground)' },
      { text: 'Authoritative', color: 'var(--foreground)' },
      { text: 'A Multi-Disciplinary Visionary', color: 'var(--primary-red)' },
    ],
    []
  );

  const isTransitioning = useSelector(
    (state: RootState) => state.menuTransition.isTransitioning
  );

  const [visibleIndex, setVisibleIndex] = useState(-1);
  const [videoVisible, setVideoVisible] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [animationIteration, setAnimationIteration] = useState(0);
  const [animationsInitialized, setAnimationsInitialized] = useState(false);
  const [imageVisible, setImageVisible] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const timerRefs = useRef<NodeJS.Timeout[]>([]);
  const resetTimerRef = useRef<NodeJS.Timeout | null>(null);
  const videoWatchdogRef = useRef<NodeJS.Timeout | null>(null);
  const imageRef = useRef<HTMLDivElement>(null);

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
          }, 1000);
        });
    }
  }, []);

  const startAnimationSequence = useCallback(() => {
    timerRefs.current.forEach(clearTimeout);
    timerRefs.current = [];
    setVisibleIndex(-1);
    setVideoVisible(false);
    setImageVisible(false);

    items.forEach((_, index) => {
      const t = setTimeout(() => {
        setVisibleIndex(index);
      }, 800 * index);
      timerRefs.current.push(t);
    });

    const vidTimer = setTimeout(() => {
      setVideoVisible(true);
      ensureVideoPlaying();
    }, 200);
    timerRefs.current.push(vidTimer);

    const imageThreshold = window.innerWidth < 730 ? 1 : 0.6;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setImageVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: imageThreshold }
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }
  }, [items, ensureVideoPlaying]);

  useEffect(() => {
    if (!animationsInitialized && !isTransitioning) {
      startAnimationSequence();
      setAnimationsInitialized(true);
    }
  }, [animationsInitialized, isTransitioning, startAnimationSequence]);

  useEffect(() => {
    if (isTransitioning || !videoVisible) return;
    if (videoWatchdogRef.current) clearInterval(videoWatchdogRef.current);
    videoWatchdogRef.current = setInterval(ensureVideoPlaying, 3000);
    return () => {
      if (videoWatchdogRef.current) clearInterval(videoWatchdogRef.current);
    };
  }, [videoVisible, isTransitioning, ensureVideoPlaying]);

  useEffect(() => {
    if (isTransitioning) return;
    const intervalId = setInterval(() => {
      setFadeOut(true);
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
      resetTimerRef.current = setTimeout(() => {
        setFadeOut(false);
        timerRefs.current.forEach(clearTimeout);
        timerRefs.current = [];
        setVisibleIndex(-1);
        setVideoVisible(false);
        setImageVisible(false);
        setAnimationIteration((n) => n + 1);
        startAnimationSequence();
      }, 2000);
    }, 60000);

    return () => {
      clearInterval(intervalId);
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
      timerRefs.current.forEach(clearTimeout);
    };
  }, [isTransitioning, startAnimationSequence]);

  const handleVideoError = () => {
    if (videoRef.current) {
      videoRef.current.load();
      setTimeout(ensureVideoPlaying, 500);
    }
  };

  return (
    <div className={`${styles.heroContainer} ${fadeOut ? styles.fadeOut : ''}`}>
      <video
        ref={videoRef}
        className={`${styles.backgroundVideo} ${videoVisible ? styles.videoVisible : ''}`}
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
        onPause={ensureVideoPlaying}
        onEnded={ensureVideoPlaying}
        onStalled={handleVideoError}
      >
        <source
          src="/video/Particle-Effect-blueBG-BlueOrbs1.webm"
          type="video/webm"
          // @ts-expect-error React types don’t yet include fetchpriority
          fetchPriority="high"
        />
      </video>

      <div className={styles.videoGradient} />

      <div className={styles.sequenceContainer}>
        {items.map((item, idx) => (
          <AnimatedSvgBorderBlock
            key={`${animationIteration}-${idx}`}
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
                : styles.multidisciplinaryText
            }
          />
        ))}
      </div>

      <div ref={imageRef} className={styles.imageContainer}>
        <img
          src="/images/home/hero/rito-picture3.jpg"
          alt="Rito"
          className={`${styles.heroImage} ${imageVisible ? styles.imageVisible : ''}`}
        />
      </div>
    </div>
  );
}
