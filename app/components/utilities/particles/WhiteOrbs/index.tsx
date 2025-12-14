// components/utilities/particles/WhiteOrbs/index.tsx
'use client';

import * as PIXI from 'pixi.js';
import { useCallback, useEffect, useRef, useState } from 'react';
import { createPixiApp } from './createApp';
import { createGradientMask } from './mask';
import { LuminescentCircle } from './LuminescentCircle';
import { mobileConfig, desktopConfig } from './config';
import { useIsMobile } from './useIsMobile';
import { WhiteOrbsProps } from './types';
import styles from './styles.module.css';

export default function WhiteOrbs({
  children,
  height,
  background,
  circleColor,
  glowColor,
}: WhiteOrbsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const circlesContainerRef = useRef<PIXI.Container | null>(null);
  const maskSpriteRef = useRef<PIXI.Sprite | null>(null);
  const [app, setApp] = useState<PIXI.Application | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const isMobile = useIsMobile();

  const config = isMobile ? mobileConfig : desktopConfig;

  const applyMask = useCallback(() => {
    if (!app || !circlesContainerRef.current) return;
    maskSpriteRef.current = createGradientMask(
      app,
      circlesContainerRef.current,
      maskSpriteRef.current
    );
  }, [app]);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      if (
        app &&
        containerRef.current &&
        canvasRef.current &&
        circlesContainerRef.current
      ) {
        const width = containerRef.current.clientWidth;
        const height = containerRef.current.clientHeight;
        canvasRef.current.width = width;
        canvasRef.current.height = height;
        app.renderer.resize(width, height);
        applyMask();
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [app, applyMask]);

  // Initialize Pixi.js application
  useEffect(() => {
    if (containerRef.current && canvasRef.current && !app) {
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      const newApp = createPixiApp({
        view: canvasRef.current,
        width,
        height,
        backgroundColor: background ?? 0x012035,
      });
      setApp(newApp);

      const circlesContainer = new PIXI.Container();
      newApp.stage.addChild(circlesContainer);
      circlesContainerRef.current = circlesContainer;

      maskSpriteRef.current = createGradientMask(
        newApp,
        circlesContainer,
        maskSpriteRef.current
      );
    }

    return () => {
      if (circlesContainerRef.current) {
        circlesContainerRef.current.mask = null;
      }
      if (maskSpriteRef.current) {
        if (maskSpriteRef.current.parent) {
          maskSpriteRef.current.parent.removeChild(maskSpriteRef.current);
        }
        maskSpriteRef.current.destroy(true);
        maskSpriteRef.current = null;
      }
      if (app) app.destroy(true);
    };
  }, [app, background]);

  // Create and update particles
  useEffect(() => {
    if (app && circlesContainerRef.current) {
      const circles: LuminescentCircle[] = [];
      for (let i = 0; i < config.count; i++) {
        const circle = new LuminescentCircle({
          config,
          app,
          circlesContainer: circlesContainerRef.current,
          circleColor,
          glowColor,
        });
        circles.push(circle);
      }
      const tickerFn = (delta: number) => {
        const deltaMS = app.ticker.deltaMS;
        circles.forEach((circle) => circle.update(delta, deltaMS));
      };
      app.ticker.add(tickerFn);

      setIsVisible(true);

      return () => {
        if (app?.ticker) {
          app.ticker.remove(tickerFn);
        }
        // Clear only particle containers; keep mask sprite mounted.
        circlesContainerRef.current?.removeChildren();
      };
    }
  }, [isMobile, app, circleColor, glowColor, config]);

  return (
    <div
      ref={containerRef}
      className={styles.container}
      style={height ? { height, minHeight: height } : undefined}
    >
      <canvas
        ref={canvasRef}
        className={styles.pixiContainer}
        style={{
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.5s ease-in-out',
        }}
      />
      {children && <div className={styles.content}>{children}</div>}
    </div>
  );
}
