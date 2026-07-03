'use client';

import React, { useRef, useEffect } from 'react';
import styles from './ScrollRevealWrapper.module.css';

interface ScrollRevealWrapperProps {
  children: React.ReactNode;
}

const ScrollRevealWrapper: React.FC<ScrollRevealWrapperProps> = ({ children }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add the animate class from our CSS module
            element.classList.add(styles.animate);
            observer.unobserve(element);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return <div ref={ref} className={styles.scrollReveal}>{children}</div>;
};

export default ScrollRevealWrapper;
