'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

const HeroBottomContent: React.FC = () => {
  const [imageVisible, setImageVisible] = useState(false);
  const [textVisible, setTextVisible] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);
  const isTransitioning = useSelector((state: RootState) => state.menuTransition.isTransitioning);

  // Trigger image fade-in after a 2-second delay once menu transition is false.
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (!isTransitioning) {
      timer = setTimeout(() => {
        setImageVisible(true);
      }, 2000);
    } else {
      setImageVisible(false);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isTransitioning]);

  // Use IntersectionObserver to trigger text fade-in when it enters the bottom 10% of the viewport.
  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTextVisible(true);
          observer.disconnect();
        }
      });
    };

    const options = {
      root: null,
      rootMargin: '0px 0px -10% 0px',
      threshold: 0,
    };

    const observer = new IntersectionObserver(observerCallback, options);
    if (textRef.current) {
      observer.observe(textRef.current);
    }
    return () => {
      observer.disconnect();
    };
  }, []);

  // Inline styles for the image: 2-second opacity transition.
  const imageStyle: React.CSSProperties = {
    width: '90%',
    maxWidth: '600px',
    borderRadius: '10px',
    transition: 'opacity 2s ease-in-out',
    opacity: imageVisible ? 1 : 0,
  };

  // Inline styles for the text:
  // 90% width on mobile, max width 567px on desktop.
  const textContainerStyle: React.CSSProperties = {
    width: '90%',
    maxWidth: '567px',
    transition: 'opacity 0.5s ease-in-out',
    opacity: textVisible ? 1 : 0,
    margin: '1rem auto 0',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '2rem' }}>
      <img
        src="/images/home/hero/rito-picture1.png"
        alt="Rito"
        style={imageStyle}
      />
      <p ref={textRef} style={textContainerStyle}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Mauris in aliquam sem fringilla ut morbi tincidunt augue interdum velit.
        Amet volutpat consequat mauris nunc congue nisi vitae suscipit tellus.
      </p>
    </div>
  );
};

export default HeroBottomContent;
