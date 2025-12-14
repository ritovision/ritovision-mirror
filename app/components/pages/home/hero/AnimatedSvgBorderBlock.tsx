'use client';
import React, { useEffect, useRef, useState } from 'react';
import styles from './HeroOrbs.module.css';

interface AnimatedSvgBorderBlockProps {
  text: string;
  textColor: string;
  borderColor?: string;
  isVisible: boolean;
  animationDuration?: number;
  extraClassName?: string;
}

const AnimatedSvgBorderBlock: React.FC<AnimatedSvgBorderBlockProps> = ({
  text,
  textColor,
  borderColor = 'var(--secondary-blue)',
  isVisible,
  animationDuration = 600,
  extraClassName = '',
}) => {
  const textRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    if (isVisible && textRef.current) {
      // Measure the text container dimensions for the SVG border
      const { width, height } = textRef.current.getBoundingClientRect();
      setDimensions({ width, height });
      // After the specified duration, mark the animation as complete
      const timer = setTimeout(() => {
        setAnimationComplete(true);
      }, animationDuration);
      return () => clearTimeout(timer);
    } else {
      setAnimationComplete(false);
    }
  }, [isVisible, animationDuration, text]);

  // Compute the length for each half of the rectangle.
  // Each animated half covers:
  //   - Horizontal segment from the top center to the side: length = width/2
  //   - Vertical segment along the side: length = height
  //   - Horizontal segment along the bottom from the side to the bottom center: length = width/2
  // Total length = width + height.
  const pathLength = dimensions.width + dimensions.height;

  return (
    <div
      className={`${styles.blockWrapper} ${extraClassName}`}
      style={{
        opacity: isVisible ? 1 : 0,
        visibility: isVisible ? 'visible' : 'hidden',
      }}
    >
      <div
        className={styles.svgContainer}
        style={{ width: dimensions.width, height: dimensions.height }}
      >
        {isVisible && dimensions.width > 0 && dimensions.height > 0 && (
          <svg width={dimensions.width} height={dimensions.height} className={styles.svgBorder}>
            {/* Left half: from top center -> top left -> bottom left -> bottom center */}
            <path
              d={`
                M ${dimensions.width / 2} 0 
                L 0 0 
                L 0 ${dimensions.height} 
                L ${dimensions.width / 2} ${dimensions.height}
              `}
              fill="none"
              stroke={borderColor}
              strokeWidth="4"
              style={{
                strokeDasharray: pathLength,
                strokeDashoffset: animationComplete ? 0 : pathLength,
                transition: `stroke-dashoffset ${animationDuration}ms ease-out`,
              }}
            />
            {/* Right half: from top center -> top right -> bottom right -> bottom center */}
            <path
              d={`
                M ${dimensions.width / 2} 0 
                L ${dimensions.width} 0 
                L ${dimensions.width} ${dimensions.height} 
                L ${dimensions.width / 2} ${dimensions.height}
              `}
              fill="none"
              stroke={borderColor}
              strokeWidth="4"
              style={{
                strokeDasharray: pathLength,
                strokeDashoffset: animationComplete ? 0 : pathLength,
                transition: `stroke-dashoffset ${animationDuration}ms ease-out`,
              }}
            />
          </svg>
        )}
      </div>
      <div
        ref={textRef}
        className={styles.textContainer}
        style={{
          color: textColor,
          opacity: animationComplete ? 1 : 0,
          transition: `opacity 0.5s ease-in-out ${animationDuration}ms`,
        }}
      >
        {text}
      </div>
    </div>
  );
};

export default AnimatedSvgBorderBlock;
