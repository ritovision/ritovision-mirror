// File: app/projects/cod/sections/hero/HeroText.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './HeroText.module.css';

const HeroText = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const isMobile = window.matchMedia('(max-width: 600px)').matches;
    const rootMargin = isMobile ? '0px 0px -20% 0px' : '0px 0px -10% 0px';
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { root: null, rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`${styles.heroTextContainer} ${visible ? styles.visible : ''}`}>
      <h2 className={styles.title}>Fixing Call of Duty through Content &amp; PR</h2>
      <p className={styles.description}>
        When Call of Duty: Warzone ignored or were unaware of persistent bugs in the game, Rito took matters
        into his own hands—creating viral videos, crafting a narrative around them, and pitching the story
        directly to gaming media. The result? Earned coverage across top outlets and a series of quiet fixes
        by the devs. This case study is about wielding storytelling, content strategy, and Public Relations
        tactics to influence change in one of the world’s biggest gaming franchises.
      </p>
    </div>
  );
};

export default HeroText;
