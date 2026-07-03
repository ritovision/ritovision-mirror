// app/projects/cod/sections/intro/Logos.tsx
'use client';

import { useEffect, useRef } from 'react';
import styles from './Logos.module.css';
import Image from 'next/image';

const Logos = () => {
  const logoRefs = useRef<Array<HTMLDivElement | null>>([]);
  const setLogoRef = (el: HTMLDivElement | null, index: number) => {
    logoRefs.current[index] = el;
  };

  useEffect(() => {
    const nodes = logoRefs.current.slice();

    const options = {
      root: null,
      rootMargin: `${window.innerWidth <= 800 ? '-20%' : '-10%'} 0px 0px 0px`,
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(styles.visible);
          observer.unobserve(entry.target);
        }
      });
    }, options);

    nodes.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => {
      nodes.forEach(ref => {
        if (ref) observer.unobserve(ref);
      });
      observer.disconnect();
    };
  }, []);

  const logos = [
    { src: '/images/pages/projects/cod/logos/mein-mmo.png', alt: 'Mein MMO', isWide: true },
    { src: '/images/pages/projects/cod/logos/screenrant.png', alt: 'Screen Rant', isWide: true },
    { src: '/images/pages/projects/cod/logos/dexerto.png', alt: 'Dexerto', isWide: true },
    { src: '/images/pages/projects/cod/logos/xgn.png', alt: 'XGN' },
    { src: '/images/pages/projects/cod/logos/charlieintel.png', alt: 'Charlie Intel' },
    { src: '/images/pages/projects/cod/logos/DBLTAP.png', alt: 'DBLTAP' },
    { src: '/images/pages/projects/cod/logos/esports.png', alt: 'Esports' },
    { src: '/images/pages/projects/cod/logos/gamerant.png', alt: 'Game Rant' },
    { src: '/images/pages/projects/cod/logos/gfinity.png', alt: 'Gfinity' },
  ];

  return (
    <section id="earned-coverage" className={styles.logosSection}>
      <h2 className={styles.title}>Earned Coverage From</h2>
      
      <div className={styles.logosGrid}>
        {logos.map((logo, index) => (
          <div 
            key={logo.alt}
            className={`${styles.logoItem} ${logo.isWide ? styles.wideItem : ''}`}
            ref={(el) => setLogoRef(el, index)}
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              width={logo.isWide ? 300 : 150}
              height={logo.isWide ? 150 : 150}
              className={styles.logoImage}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Logos;
