// app/components/utilities/presentation/CardDraw.tsx

'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styles from './CardDraw.module.css';

interface CardDrawProps {
  imageSrc: string;
  text: string;
  scrollTriggerOffset?: number;
  mobileBreakpoint?: number;
}

const CardDraw: React.FC<CardDrawProps> = ({
  imageSrc,
  text,
  scrollTriggerOffset = 300,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [aspectRatio, setAspectRatio] = useState(1.5);

  useEffect(() => {
    const img = new window.Image();
    img.src = imageSrc;
    img.onload = () => {
      setAspectRatio(img.width / img.height);
    };
  }, [imageSrc]);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      {
        rootMargin: `0px 0px -${scrollTriggerOffset}px 0px`,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [scrollTriggerOffset]);

  const svgWidth = 100;
  const svgHeight = 100 / aspectRatio;

  // Scale border radius to match 10px from CSS (.cardDrawContainer)
  const containerPxWidth = 500;
  const cssBorderRadius = 10;
  const cornerRadius = (cssBorderRadius / containerPxWidth) * svgWidth;

  const pathLeft = `
    M ${svgWidth / 2} 0
    L ${cornerRadius} 0
    Q 0 0, 0 ${cornerRadius}
    L 0 ${svgHeight - cornerRadius}
    Q 0 ${svgHeight}, ${cornerRadius} ${svgHeight}
    L ${svgWidth / 2} ${svgHeight}
  `;

  const pathRight = `
    M ${svgWidth / 2} 0
    L ${svgWidth - cornerRadius} 0
    Q ${svgWidth} 0, ${svgWidth} ${cornerRadius}
    L ${svgWidth} ${svgHeight - cornerRadius}
    Q ${svgWidth} ${svgHeight}, ${svgWidth - cornerRadius} ${svgHeight}
    L ${svgWidth / 2} ${svgHeight}
  `;

  return (
    <div
      className={styles.cardDrawContainer}
      ref={containerRef}
      style={{ height: `calc(${500 / aspectRatio}px)`, maxHeight: '600px' }}
    >
      <svg
        className={styles.svgContainer}
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        preserveAspectRatio="none"
      >
        <path
          className={`${styles.svgPath} ${isVisible ? styles.animatePathLeft : ''}`}
          d={pathLeft}
        />
        <path
          className={`${styles.svgPath} ${isVisible ? styles.animatePathRight : ''}`}
          d={pathRight}
        />
      </svg>

      <div className={`${styles.imageContainer} ${isVisible ? styles.imageVisible : ''}`}>
        <Image
          src={imageSrc}
          alt="Card background"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
      </div>

      <div className={`${styles.textContainer} ${isVisible ? styles.textVisible : ''}`}>
        <p className={styles.cardText}>{text}</p>
      </div>
    </div>
  );
};

export default CardDraw;
