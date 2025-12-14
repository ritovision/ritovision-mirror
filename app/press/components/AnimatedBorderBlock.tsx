'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import * as PIXI from 'pixi.js';
import styles from './BlockTextSequence.module.css';

interface AnimatedBorderBlockProps {
  text: string;
  textColor: string;
  borderColor?: string;
  isVisible: boolean;
  animationDuration?: number;
  extraClassName?: string;
}

const AnimatedBorderBlock: React.FC<AnimatedBorderBlockProps> = ({
  text,
  textColor,
  borderColor = 'var(--secondary-blue)',
  isVisible,
  animationDuration = 800,
  extraClassName = '',
}) => {
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const pixiAppRef = useRef<PIXI.Application | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const graphicsRef = useRef<PIXI.Graphics | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [showText, setShowText] = useState(false);

  // Function to resolve the effective border color
  const getResolvedBorderColor = useCallback(() => {
    if (typeof window === 'undefined') return '#007bff';
    try {
      const varName = borderColor.startsWith('var(')
        ? borderColor.substring(4, borderColor.length - 1)
        : borderColor;
      const resolved = getComputedStyle(document.documentElement)
        .getPropertyValue(varName)
        .trim();
      return resolved && PIXI.Color.shared.setValue(resolved).alpha > -1 ? resolved : '#64ffda';
    } catch (e) {
      console.warn(`Could not resolve or parse border color: ${borderColor}`, e);
      return '#64ffda';
    }
  }, [borderColor]);

  // Reset text fade state when block is hidden
  useEffect(() => {
    if (!isVisible) {
      setShowText(false);
    }
  }, [isVisible]);

  useEffect(() => {
    if (isVisible && textContainerRef.current) {
      const { offsetWidth, offsetHeight } = textContainerRef.current;
      if (
        offsetWidth > 0 &&
        offsetHeight > 0 &&
        (offsetWidth !== dimensions.width || offsetHeight !== dimensions.height)
      ) {
        setDimensions({ width: offsetWidth, height: offsetHeight });
      }
    }
  }, [isVisible, text, dimensions.width, dimensions.height]);

  useEffect(() => {
    const containerNode = canvasContainerRef.current;

    // Only run the PIXI animation if the block is visible and has valid dimensions.
    if (
      typeof window === 'undefined' ||
      !isVisible ||
      dimensions.width <= 0 ||
      dimensions.height <= 0 ||
      !containerNode
    ) {
      return;
    }

    if (pixiAppRef.current) return;

    const delayTimer = setTimeout(() => {
      let app: PIXI.Application | null = null;

      try {
        app = new PIXI.Application({
          width: dimensions.width,
          height: dimensions.height,
          backgroundAlpha: 0,
          antialias: true,
          resolution: window.devicePixelRatio || 1,
          autoDensity: true,
        });

        pixiAppRef.current = app;

        if (!containerNode) {
          app.destroy(true);
          pixiAppRef.current = null;
          return;
        }

        containerNode.appendChild(app.view as HTMLCanvasElement);

        const graphics = new PIXI.Graphics();
        graphicsRef.current = graphics;
        app.stage.addChild(graphics);

        const lineThickness = 4;
        const resolvedColorString = getResolvedBorderColor();
        const colorNumber = new PIXI.Color(resolvedColorString).toNumber();

        const w = dimensions.width;
        const h = dimensions.height;
        const halfW = w / 2;
        const pathLength = w + h;
        const startTime = Date.now();

        const animate = () => {
          if (!graphicsRef.current || !pixiAppRef.current) {
            if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
            return;
          }

          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / animationDuration, 1);

          graphics.clear();
          graphics.lineStyle(lineThickness, colorNumber);

          const currentLength = progress * pathLength;

          // Left path
          graphics.moveTo(halfW, 0);
          const leftPathSegment1 = halfW;
          const leftPathSegment2 = h;

          if (currentLength <= leftPathSegment1) {
            graphics.lineTo(halfW - currentLength, 0);
          } else if (currentLength <= leftPathSegment1 + leftPathSegment2) {
            graphics.lineTo(0, 0);
            graphics.lineTo(0, currentLength - leftPathSegment1);
          } else {
            graphics.lineTo(0, 0);
            graphics.lineTo(0, h);
            graphics.lineTo(currentLength - (leftPathSegment1 + leftPathSegment2), h);
          }

          // Right path
          graphics.moveTo(halfW, 0);
          const rightPathSegment1 = halfW;
          const rightPathSegment2 = h;

          if (currentLength <= rightPathSegment1) {
            graphics.lineTo(halfW + currentLength, 0);
          } else if (currentLength <= rightPathSegment1 + rightPathSegment2) {
            graphics.lineTo(w, 0);
            graphics.lineTo(w, currentLength - rightPathSegment1);
          } else {
            graphics.lineTo(w, 0);
            graphics.lineTo(w, h);
            graphics.lineTo(w - (currentLength - (rightPathSegment1 + rightPathSegment2)), h);
          }

          if (progress < 1) {
            animationFrameRef.current = requestAnimationFrame(animate);
          } else {
            // PIXI animation complete; trigger text fade-in.
            setShowText(true);
            animationFrameRef.current = null;
          }
        };

        animate();
      } catch (err: unknown) {
        console.error("Pixi init or animation failed:", err);
        if (app) {
          const view = app.view as HTMLCanvasElement;
          if (view?.parentNode) {
            view.parentNode.removeChild(view);
          }
          app.destroy(true);
          if (pixiAppRef.current === app) {
            pixiAppRef.current = null;
          }
          graphicsRef.current = null;
        }
      }
    }, 500); // Delay before starting PIXI animation

    return () => {
      clearTimeout(delayTimer);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      const currentApp = pixiAppRef.current;
      if (currentApp) {
        currentApp.destroy(true);
        pixiAppRef.current = null;
      }
      graphicsRef.current = null;
      if (containerNode) {
        const canvas = containerNode.querySelector('canvas');
        if (canvas) {
          containerNode.removeChild(canvas);
        }
      }
    };
  }, [isVisible, dimensions, borderColor, animationDuration, getResolvedBorderColor]);

  return (
    <div
      className={`${styles.blockWrapper} ${extraClassName}`}
      style={{ opacity: isVisible ? 1 : 0, visibility: isVisible ? 'visible' : 'hidden' }}
    >
      <div ref={canvasContainerRef} className={styles.canvasContainer}></div>
      <div
        ref={textContainerRef}
        className={styles.textContainer}
        style={{
          color: textColor,
          opacity: showText ? 1 : 0,
          transition: 'opacity 0.5s ease-in-out'
        }}
      >
        {text}
      </div>
    </div>
  );
};

export default AnimatedBorderBlock;
