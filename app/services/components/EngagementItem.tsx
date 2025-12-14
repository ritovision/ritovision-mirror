"use client";
import React, { useEffect, useRef, useState } from 'react';
import styles from './EngagementItem.module.css';
import { useDeferredActivation } from '@/hooks/useDeferredActivation';

export interface EngagementItemProps {
  icon: string;
  title: string;
  description: string;
  bgImage: string;
  link: string;
}

const EngagementItem: React.FC<EngagementItemProps> = ({ icon, title, description, bgImage, link }) => {
  const containerRef = useRef<HTMLAnchorElement>(null);
  const [animate, setAnimate] = useState(false);
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const [shouldActivate, setShouldActivate] = useState(false);
  
  // Use our custom hook to defer animations until menu transitions are complete
  const isReady = useDeferredActivation(shouldActivate);

  useEffect(() => {
    // Set shouldActivate to true after component mounts
    setShouldActivate(true);
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < 730);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle desktop animation activation
  useEffect(() => {
    if (window.innerWidth >= 730 && isReady) {
      setAnimate(true);
    }
  }, [isReady]);

  // Handle mobile animation with intersection observer
  useEffect(() => {
    if (!isReady) return; // Don't set up observers until we're ready to animate
    
    if (isMobile && containerRef.current && !animate) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.1) {
              setAnimate(true);
              observer.disconnect();
            }
          });
        },
        { threshold: 0.1 }
      );
      
      observer.observe(containerRef.current);
      return () => observer.disconnect();
    }
  }, [isMobile, animate, isReady]);

  return (
    <div className={styles.itemWrapper}>
      {/* Icon placed outside the container, centered with breathing room */}
      <div className={styles.iconWrapper}>
        <img src={icon} alt={`${title} icon`} className={styles.icon} />
      </div>
      <a href={link} ref={containerRef} className={`${styles.container} ${animate ? styles.animate : ''}`}>
        {/* Header now only contains the title */}
        <div className={styles.header}>
          <h3 className={styles.title}>{title}</h3>
        </div>
        {/* Description - isolated center positioning */}
        <p className={styles.description}>{description}</p>
        {/* Background - separate layer */}
        <div className={styles.bgImage} style={{ backgroundImage: `url(${bgImage})` }} />
      </a>
    </div>
  );
};

export default EngagementItem;