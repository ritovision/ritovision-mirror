'use client';
import React, { useEffect, useState, useRef } from 'react';

export default function HeroDynamicImage() {
  const [isWide, setIsWide] = useState(true); // Default to true to avoid flickering
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Check screen width on mount and when window resizes
  useEffect(() => {
    const checkWidth = () => {
      setIsWide(window.innerWidth >= 730);
    };
    
    // Check width immediately
    checkWidth();
    
    // Add resize listener
    window.addEventListener('resize', checkWidth);
    
    // Clean up
    return () => window.removeEventListener('resize', checkWidth);
  }, []);

  // Set up Intersection Observer to trigger a fade in when 10% of the container becomes visible.
  useEffect(() => {
    if (!containerRef.current) return;

    const observerOptions = {
      threshold: 0.1, // Trigger when 10% of the element is visible
    };

    const observerCallback: IntersectionObserverCallback = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.1) {
          setIsVisible(true);
          observer.disconnect(); // Disconnect after trigger to run the fade-in only once
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  // If the screen width is less than 730px, render nothing
  if (!isWide) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      style={{
        height: '500px',
        width: '100%',
        overflow: 'hidden',
        position: 'relative',
        opacity: isVisible ? 1 : 0, // Start invisible and fade in when triggered
        transition: 'opacity 1s ease-in-out',
      }}
    >
      <img
        src="/images/home/hero/rito-picture4.jpg"
        alt="Dynamic Hero Visual"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
        }}
        onError={(e) => {
          console.error('Image failed to load:', e);
          // Optional fallback styling to make errors more visible
          const target = e.target as HTMLImageElement;
          target.style.background = '#f0f0f0';
          target.style.display = 'flex';
          target.style.alignItems = 'center';
          target.style.justifyContent = 'center';
        }}
      />
    </div>
  );
}
