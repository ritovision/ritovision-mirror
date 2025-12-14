'use client';

import React, { useEffect, useRef, useState } from 'react';
import styles from './Overview.module.css';

type Direction = {
  title: string;
  bullets: React.ReactNode[];
};

const directions: Direction[] = [
  {
    title: 'The Challenges',
    bullets: [
      'Turning Quality Assurance findings into infotaining content that can reach and resonate with non-technical general audiences.',
    'Compelling a multi-billion dollar game studio to become aware of and prioritize fixing issues you believe will improve the game.'
    ],
  },
  {
    title: 'Objectives',
    bullets: [
      'Attract media attention',
      'Raise public pressure',
      'Catalyze bug fixes',
    ],
  },
  {
    title: 'Strategy',
    bullets: [
      'Quality Assurance Testing',
      'Video storytelling',
      'Targeted journalism outreach',
    ],
  },
  {
    title: 'Results',
    bullets: [
      <>Top ranking gaming news outlets like <em>ScreenRant</em> published over a dozen articles and syndications about Rito's documented bugs</>,
      <>Game studio developers for <em>Call of Duty: Warzone</em> corrected 3 separate publicized issues</>
    ],
  },
];

const roles = [
  "Content Strategist",
  "Producer",
  "Video Editor",
  "Game Tester",
  "Quality Assurance Engineer",
  "Publicist",
  "Media Personality",
  "Musical Performer",
];

interface DirectionItemProps {
  title: string;
  bullets: React.ReactNode[];
}

const DirectionItem: React.FC<DirectionItemProps> = ({ title, bullets }) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);
  const [typedTitle, setTypedTitle] = useState('');
  const [titleComplete, setTitleComplete] = useState(false);

  useEffect(() => {
    const el = itemRef.current;
    if (!el) return;
    const isMobile = window.innerWidth <= 768;
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            setTriggered(true);
            obs.disconnect();
          }
        });
      },
      {
        root: null,
        rootMargin: `0px 0px -${isMobile ? 20 : 10}% 0px`,
        threshold: 0,
      }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!triggered) return;
    let idx = 0;
    const iv = setInterval(() => {
      idx++;
      setTypedTitle(title.slice(0, idx));
      if (idx === title.length) {
        setTitleComplete(true);
        clearInterval(iv);
      }
    }, 50);
    return () => clearInterval(iv);
  }, [triggered, title]);

  return (
    <div ref={itemRef} className={styles.directionPair}>
      <h4 className={styles.directionTitle}>
        <span className={styles.dummy}>{title}</span>
        <span className={styles.actual}>{typedTitle}</span>
      </h4>
      <ul className={`${styles.bulletList} ${titleComplete ? styles.fadeIn : ''}`}>
        {bullets.map((b, i) => (
          <li key={i} className={styles.bulletItem}>
            {b}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default function Overview() {
  const overallRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = overallRef.current;
    if (!el) return;
    const isMobile = window.innerWidth <= 768;
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            setVisible(true);
            obs.disconnect();
          }
        });
      },
      {
        root: null,
        rootMargin: `0px 0px -${isMobile ? 20 : 10}% 0px`,
        threshold: 0,
      }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      id="overview"
      ref={overallRef}
      className={`${styles.container} darkglow ${visible ? styles.animateOverall : ''}`}
    >
      <h3 className={styles.title}>Overview</h3>

      {directions.map((dir, i) => (
        <DirectionItem key={i} title={dir.title} bullets={dir.bullets} />
      ))}

      <div className={styles.rolesSection}>
        <h4 className={styles.rolesTitle}>Roles by Rito</h4>
        <div className={styles.rolesList}>
          {roles.map((r, i) => (
            <p key={i}>{r}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
