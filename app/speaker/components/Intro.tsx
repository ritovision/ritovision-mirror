'use client';
import React, { useEffect, useRef } from 'react';
import styles from './Intro.module.css';

export default function Intro() {
  const containerRef = useRef<HTMLElement>(null);
  const bulletListRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const viewportWidth = window.innerWidth;
      // For desktop: trigger when the bottom is 10% from viewport bottom; mobile uses 20%
      const bottomMargin = viewportWidth > 730 ? '-10%' : '-20%';

      const containerObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add(styles.animateContainer);
              containerObserver.disconnect();
            }
          });
        },
        {
          root: null,
          rootMargin: `0px 0px ${bottomMargin} 0px`,
          threshold: 0,
        }
      );
      containerObserver.observe(containerRef.current);
    }

    if (bulletListRef.current) {
      const viewportWidth = window.innerWidth;
      const bottomMargin = viewportWidth > 730 ? '-10%' : '-20%';

      const listObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add(styles.animateList);
              listObserver.disconnect();
            }
          });
        },
        {
          root: null,
          rootMargin: `0px 0px ${bottomMargin} 0px`,
          threshold: 0,
        }
      );
      listObserver.observe(bulletListRef.current);
    }
  }, []);

  return (
    <section ref={containerRef} className={`blueglow ${styles.container}`}>
      <h2 className={styles.title}>In the Spotlight</h2>
      <p className={styles.paragraph}>
        Rito is a polymath with multi-disciplinary domain authority and can speak to a variety
        of topics from software innovations, user design and cultural evolutions. He’s been on the
        radio, led presentations with industry heavyweights and has even done musical performances
        alongside grammy winners.
      </p>
      <p className={styles.paragraphAgency}>
        He delivers with an uncanny ability to take complex topics and inject humor, character and
        insight in a way that flows authentically to audiences.
      </p>
      <p className={styles.paragraph}>
        With great versatility he is comfortable delivering in a variety of contexts:
      </p>
      <ul ref={bulletListRef} className={styles.list}>
        <li className={styles.listItem}>
          <span className={styles.listText}>Presentations</span>
        </li>
        <li className={styles.listItem}>
          <span className={styles.listText}>Radio &amp; Broadcasting</span>
        </li>
        <li className={styles.listItem}>
          <span className={styles.listText}>Workshops</span>
        </li>
        <li className={styles.listItem}>
          <span className={styles.listText}>Pitches</span>
        </li>
        <li className={styles.listItem}>
          <span className={styles.listText}>Musical Performances</span>
        </li>
      </ul>
    </section>
  );
}
