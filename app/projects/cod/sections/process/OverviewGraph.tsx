// app\projects\cod\sections\process\OverviewGraph.tsx
'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';
import styles from './OverviewGraph.module.css';

const OverviewGraph = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inViewRef, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  // merge refs
  const setRefs = useCallback((node: HTMLDivElement | null) => {
    containerRef.current = node;
    inViewRef(node);
  }, [inViewRef]);

  const [isMobile, setIsMobile] = useState(false);
  const [isTiny, setIsTiny] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      setIsMobile(w < 768);
      setIsTiny(w < 500);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        document.documentElement.style.setProperty(
          '--animation-play-state',
          entry.isIntersecting ? 'running' : 'paused'
        );
      },
      { threshold: 0.1 }
    );
    obs.observe(containerRef.current);
    return () => {
      obs.disconnect();
      document.documentElement.style.setProperty('--animation-play-state', 'paused');
    };
  }, []);

  const centerX = 300;
  const centerY = 300;
  const baseRadius = isMobile ? 120 : 100;
  const radius = isTiny ? (baseRadius * 4) / 3 : baseRadius;
  const offset = radius * 0.75;
  const circumference = 2 * Math.PI * radius;

  return (
    <div ref={setRefs} className={styles.container}>
      <div className={`${styles.vennDiagram} ${inView ? styles.animate : ''}`}>
        <svg
          viewBox="0 0 600 600"
          width="100%"
          preserveAspectRatio="xMidYMid meet"
          className={styles.svg}
        >
          {/* Pitching (bottom) */}
          <g className={styles.pitchingGroup}>
            <circle
              cx={centerX + offset}
              cy={centerY + offset}
              r={radius}
              className={styles.vennCircleBg}
              fill="var(--primary-blue)"
            />
            <text
              x={centerX + offset}
              y={centerY + offset}
              className={styles.vennText}
              textAnchor="middle"
              dominantBaseline="middle"
            >
              Pitching
            </text>
            <circle
              cx={centerX + offset}
              cy={centerY + offset}
              r={radius}
              className={styles.vennCircle}
              fill="none"
              style={{
                strokeDasharray: circumference,
                strokeDashoffset: circumference,
              }}
            />
          </g>

          {/* Content (middle) */}
          <g className={styles.contentGroup}>
            <circle
              cx={centerX - offset}
              cy={centerY + offset}
              r={radius}
              className={styles.vennCircleBg}
              fill="var(--primary-blue)"
            />
            <text
              x={centerX - offset}
              y={centerY + offset}
              className={styles.vennText}
              textAnchor="middle"
              dominantBaseline="middle"
            >
              Content
            </text>
            <circle
              cx={centerX - offset}
              cy={centerY + offset}
              r={radius}
              className={styles.vennCircle}
              fill="none"
              style={{
                strokeDasharray: circumference,
                strokeDashoffset: circumference,
              }}
            />
          </g>

          {/* QA (top) */}
          <g className={styles.qaGroup}>
            <circle
              cx={centerX}
              cy={centerY - offset}
              r={radius}
              className={styles.vennCircleBg}
              fill="var(--primary-blue)"
            />
            <text
              x={centerX}
              y={centerY - offset}
              className={styles.vennText}
              textAnchor="middle"
              dominantBaseline="middle"
            >
              QA
            </text>
            <circle
              cx={centerX}
              cy={centerY - offset}
              r={radius}
              className={styles.vennCircle}
              fill="none"
              style={{
                strokeDasharray: circumference,
                strokeDashoffset: circumference,
              }}
            />
          </g>
        </svg>
      </div>
    </div>
  );
};

export default OverviewGraph;
