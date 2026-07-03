'use client';
import React, { useEffect, useRef, useState } from 'react';
import styles from './Testimonial.module.css';
import Image from 'next/image';

const Testimonial = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const flexRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [flexVisible, setFlexVisible] = useState(false);

  useEffect(() => {
    const isMobile = window.innerWidth <= 500;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          setTimeout(() => setFlexVisible(true), 200); // delay for flex content
        }
      },
      {
        threshold: isMobile ? 0.2 : 0.1,
      }
    );

    const el = containerRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  return (
    <div
      id="testimonial"
      ref={containerRef}
      className={`${styles.container} ${visible ? styles.visible : ''} blueglow`}
    >
      <p className={styles.quote}>
        “Oh Rito. Sweet, sweet Rito. You are so lovely that you would take the time to build this beautiful site. I feel really loved, and I'm really grateful. Thank you so much for your support and for the time you spent doing that”
      </p>
      <div
        ref={flexRef}
        className={`${styles.flex} ${flexVisible ? styles.visible : ''}`}
      >
        <Image
          src="/images/pages/projects/fansite/testimonial.jpg"
          alt="Caroline Vreeland"
          width={150}
          height={200}
          className={styles.image}
        />
        <div className={styles.text}>
          <p className={styles.name}>-Caroline Vreeland</p>
          <p className={styles.title}>Celebrity Fashion Icon & Singer</p>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
