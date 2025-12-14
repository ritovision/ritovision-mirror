'use client';

import React, { ReactNode, useEffect, useRef, useState } from 'react';
import styles from './PersonaDesktopGrid.module.css';

interface PersonaDesktopGridProps {
  topLeft?: ReactNode;
  topRight?: ReactNode;
  bottomLeft?: ReactNode;
  bottomRight?: ReactNode;
}

const PersonaDesktopGrid: React.FC<PersonaDesktopGridProps> = ({
  topLeft,
  topRight,
  bottomLeft,
  bottomRight,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setAnimate(true);
            observer.disconnect();
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -30% 0px',
        threshold: 0,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, []);

  // Clone children and pass down the animate prop
  const renderChild = (child: ReactNode) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child as React.ReactElement<{ animate?: boolean }>, { animate });
    }
    return child;
  };

  return (
    <div className={styles.gridContainer} ref={containerRef}>
      <div className={styles.gridCell}>{renderChild(topLeft)}</div>
      <div className={styles.gridCell}>{renderChild(topRight)}</div>
      <div className={styles.gridCell}>{renderChild(bottomLeft)}</div>
      <div className={styles.gridCell}>{renderChild(bottomRight)}</div>

      <svg className={styles.dividerSvg}>
  {/* Horizontal line */}
  <line
    className={`${styles.animatedLine} ${animate ? styles.horizontalLine : ''}`}
    x1="0"
    y1="487"
    x2="974"
    y2="487"
    stroke="#04426C"
    strokeWidth="2"
  />

  {/* Vertical line */}
  <line
    className={`${styles.animatedLine} ${animate ? styles.verticalLine : ''}`}
    x1="487"
    y1="0"
    x2="487"
    y2="974"
    stroke="#04426C"
    strokeWidth="2"
  />
</svg>

    </div>
  );
};

export default PersonaDesktopGrid;
