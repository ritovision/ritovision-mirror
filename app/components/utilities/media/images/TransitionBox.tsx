'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './TransitionBox.module.css';

interface TransitionBoxProps {
  images: string[];
  duration?: number;           // Time each image stays visible in ms (default: 2000)
  transitionDuration?: number; // Crossfade duration in ms (default: 500)
  alt?: string;
}

export default function TransitionBox({
  images,
  duration = 2000,
  transitionDuration = 500,
  alt = 'Transition Image',
}: TransitionBoxProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
    }, duration);
    return () => clearInterval(interval);
  }, [duration, images.length]);

  return (
    <div className={styles.transitionBox}>
      {images.map((src, index) => (
        <div
          key={`${src}-${index}`}
          className={styles.imageWrapper}
          style={{
            opacity: index === currentIndex ? 1 : 0,
            transition: `opacity ${transitionDuration}ms ease-in-out`,
          }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>
      ))}
    </div>
  );
}
