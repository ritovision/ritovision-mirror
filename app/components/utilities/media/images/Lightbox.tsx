// ./app/components/utilities/media/images/Lightbox.tsx
"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./Lightbox.module.css";

interface LightboxProps {
  images: { src: string; alt: string }[];
  activeIndex: number | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function Lightbox({
  images,
  activeIndex,
  onClose,
  onPrev,
  onNext,
}: LightboxProps) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // when opened, trigger fade-in
  useEffect(() => {
    if (activeIndex !== null) {
      setVisible(true);
    }
  }, [activeIndex]);

  if (!mounted || activeIndex === null) return null;

  const { src, alt } = images[activeIndex];

  const handleClose = () => {
    // fade out
    setVisible(false);
    // after 1s, invoke parent onClose to unmount
    setTimeout(onClose, 1000);
  };

  const handleTouchStart = (e: React.TouchEvent) =>
    setTouchStartX(e.touches[0].clientX);

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX;
    if (deltaX > 50) onPrev();
    else if (deltaX < -50) onNext();
    setTouchStartX(null);
  };

  const lightbox = (
    <div
      className={`${styles.overlay} ${visible ? styles.overlayVisible : ""}`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <button
        className={styles.closeButton}
        onClick={handleClose}
        aria-label="Close"
      >
        <svg width="30" height="30" viewBox="0 0 24 24">
          <line
            x1="4"
            y1="4"
            x2="20"
            y2="20"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <line
            x1="20"
            y1="4"
            x2="4"
            y2="20"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <button
        className={styles.prevButton}
        onClick={onPrev}
        aria-label="Previous"
      >
        <svg width="50" height="50" viewBox="0 0 24 24">
          <polyline
            points="15 4 7 12 15 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <div className={styles.content}>
        <img src={src} alt={alt} className={styles.lightboxImage} />
        <div className={styles.caption}>{alt}</div>
        <a
          href={src}
          download
          className={styles.downloadButton}
          aria-label="Download image"
        >
          <img
            src="/images/utilities/icons/download-icon.png"
            alt="Download icon"
            className={styles.downloadIconLB}
          />
        </a>
      </div>

      <button
        className={styles.nextButton}
        onClick={onNext}
        aria-label="Next"
      >
        <svg width="50" height="50" viewBox="0 0 24 24">
          <polyline
            points="9 4 17 12 9 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );

  return createPortal(lightbox, document.body);
}
