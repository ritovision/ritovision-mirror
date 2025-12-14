'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './MoatGraph.module.css';

const MoatGraph = () => {
  const graphRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [animationStep, setAnimationStep] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Check if element is 10% visible on desktop or 20% on mobile
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: window.innerWidth > 730 ? 0.1 : 0.2,
        rootMargin: '0px'
      }
    );

    if (graphRef.current) {
      observer.observe(graphRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      // Step 1: Marketplace text fade in
      setAnimationStep(1);
      
      // Step 2: $ Gas fade in
      const step2Timeout = setTimeout(() => {
        setAnimationStep(2);
      }, 1000);
      
      // Step 3: Delay before donut animation
      const step3Timeout = setTimeout(() => {
        setAnimationStep(3);
      }, 1500);
      
      // Step 4: Donut animation starts
      const step4Timeout = setTimeout(() => {
        setAnimationStep(4);
      }, 2000);
      
      // Step 5: $ Gas changes color after donut animation completes
      const step5Timeout = setTimeout(() => {
        setAnimationStep(5);
      }, 3000);
      
      return () => {
        clearTimeout(step2Timeout);
        clearTimeout(step3Timeout);
        clearTimeout(step4Timeout);
        clearTimeout(step5Timeout);
      };
    }
  }, [isVisible]);

  // Constants for positioning
  const centerX = 200;
  const centerY = 200;
  const radius = 130;

  return (
    <div className={styles.container} ref={graphRef}>
      <div className={styles.graphContainer}>
        <svg className={styles.svg} viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
          {/* Order matters in SVG - elements later in the DOM appear on top */}
          
          {/* Donut Animation */}
          {animationStep >= 4 && (
            <circle 
              className={styles.donut}
              cx={centerX} 
              cy={centerY} 
              r={radius} 
              fill="transparent"
              stroke="white"
            />
          )}
          
          {/* Marketplace Text */}
          <text 
            x={centerX} 
            y={centerY} 
            textAnchor="middle" 
            dominantBaseline="middle" 
            className={`${styles.marketplaceText} ${animationStep >= 1 ? styles.fadeIn : ''}`}
          >
            Marketplace
          </text>
          
          {/* $ Gas Text - Positioned on the bottom of the circle */}
          {/* Adding a higher z-index when it changes color */}
          <text 
            x={centerX} 
            y={centerY + radius} 
            textAnchor="middle" 
            dominantBaseline="middle" 
            className={`
              ${styles.gasText} 
              ${animationStep >= 2 ? styles.fadeIn : ''} 
              ${animationStep >= 5 ? styles.blueColor : ''}
            `}
          >
            $ Gas
          </text>
        </svg>
      </div>
    </div>
  );
};

export default MoatGraph;