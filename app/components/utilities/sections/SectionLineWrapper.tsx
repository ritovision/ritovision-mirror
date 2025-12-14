"use client";
import React, { HTMLAttributes, forwardRef, useState, useEffect } from 'react';
import styles from './SectionLineWrapper.module.css';

interface SectionLineWrapperProps extends HTMLAttributes<HTMLDivElement> {
  isFirstSection?: boolean;
  hideBottomLine?: boolean;
  lineColor?: string;
  lineWidth?: string;
  /** Viewport width threshold (in pixels) for applying responsive styles */
  responsiveBreakpoint?: number;
  /** Margin value to apply when below the breakpoint (e.g., "15% auto 20% auto") */
  responsiveMargin?: string;
  children: React.ReactNode;
}

const SectionLineWrapper = forwardRef<HTMLDivElement, SectionLineWrapperProps>(
  (
    {
      isFirstSection = false,
      hideBottomLine = false,
      lineColor,
      lineWidth,
      responsiveBreakpoint,
      responsiveMargin,
      className,
      children,
      ...props
    },
    ref
  ) => {
    // Base style for the line elements
    const baseLineStyle = {
      backgroundColor: lineColor || 'var(--secondary-blue)',
      height: lineWidth || '2px'
    };

    // Track if component has mounted (client-only)
    const [hasMounted, setHasMounted] = useState(false);
    // Track the current window width (client only)
    const [windowWidth, setWindowWidth] = useState<number | null>(null);

    useEffect(() => {
      setHasMounted(true);
      const handleResize = () => setWindowWidth(window.innerWidth);
      // Set initial width
      setWindowWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Apply responsive margin only when mounted and windowWidth is known
    const shouldApplyResponsiveStyle =
      hasMounted &&
      responsiveBreakpoint !== undefined &&
      responsiveMargin &&
      windowWidth !== null &&
      windowWidth <= responsiveBreakpoint;

    const finalLineStyle = {
      ...baseLineStyle,
      ...(shouldApplyResponsiveStyle ? { margin: responsiveMargin } : {})
    };

    // Combine any external className with our own styles
    const wrapperClassName = className
      ? `${styles.sectionWrapper} ${className}`
      : styles.sectionWrapper;

    return (
      <section ref={ref} className={wrapperClassName} {...props}>
        {isFirstSection && (
          <div className={styles.line} style={finalLineStyle} />
        )}
        <div className={styles.contentWrapper}>{children}</div>
        {!hideBottomLine && (
          <div className={styles.line} style={finalLineStyle} />
        )}
      </section>
    );
  }
);

SectionLineWrapper.displayName = 'SectionLineWrapper';

export default SectionLineWrapper;
