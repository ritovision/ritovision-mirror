// app/components/pages/projects/CustomWhiteOrbs.tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as PIXI from 'pixi.js';
import styles from './CustomWhiteOrbs.module.css';

type Config = {
  minRadius: number;
  maxRadius: number;
  minSpeed: number;
  maxSpeed: number;
  count: number;
  minLifespan: number;
  maxLifespan: number;
  glowStrength: number;
  minAlpha: number;
  maxAlpha: number;
  fadeInTime: number;
};

type CustomWhiteOrbsProps = {
  children?: React.ReactNode;
  height?: string;
  background?: number;
  circleColor?: number;
  glowColor?: number;
};

const desktopConfig: Config = {
  minRadius: 75,
  maxRadius: 200,
  minSpeed: 0.05,
  maxSpeed: 0.2,
  count: 12,
  minLifespan: 10000,
  maxLifespan: 20000,
  glowStrength: 15,
  minAlpha: 0.4,
  maxAlpha: 0.7,
  fadeInTime: 2000,
};

class LuminescentCircle {
  private config: Config;
  private app: PIXI.Application;
  private container: PIXI.Container;
  private glow!: PIXI.Graphics;
  private circle!: PIXI.Graphics;
  private x!: number;
  private y!: number;
  private speedX!: number;
  private speedY!: number;
  private radius!: number;
  private alpha!: number;
  private lifespan!: number;
  private age: number = 0;
  private circleColor: number;
  private glowColor: number;

  constructor({
    config,
    app,
    circlesContainer,
    circleColor,
    glowColor,
  }: {
    config: Config;
    app: PIXI.Application;
    circlesContainer: PIXI.Container;
    circleColor?: number;
    glowColor?: number;
  }) {
    this.config = config;
    this.app = app;
    this.circleColor = circleColor ?? 0xffffff;
    this.glowColor = glowColor ?? 0xffffff;
    this.container = new PIXI.Container();
    circlesContainer.addChild(this.container);
    this.initialize();
  }

  initialize() {
    this.radius =
      this.config.minRadius +
      Math.random() * (this.config.maxRadius - this.config.minRadius);
    const sizeFactor =
      (this.radius - this.config.minRadius) /
      (this.config.maxRadius - this.config.minRadius);
    const baseSpeed =
      this.config.minSpeed +
      (this.config.maxSpeed - this.config.minSpeed) * (1 - sizeFactor);
    const randomMultiplier = Math.random() * 0.4 + 0.8;
    this.speedX =
      baseSpeed * randomMultiplier * (Math.random() > 0.5 ? 1 : -1);
    this.speedY =
      baseSpeed * randomMultiplier * (Math.random() > 0.5 ? 1 : -1);
    this.alpha =
      this.config.minAlpha +
      Math.random() * (this.config.maxAlpha - this.config.minAlpha);
    this.x = Math.random() * this.app.screen.width;
    this.y = Math.random() * this.app.screen.height;
    this.lifespan =
      this.config.minLifespan +
      Math.random() * (this.config.maxLifespan - this.config.minLifespan);
    this.age = 0;
    this.container.alpha = 0;

    this.glow = new PIXI.Graphics();
    this.glow.beginFill(this.glowColor, 0.3);
    this.glow.drawCircle(0, 0, this.radius + this.config.glowStrength);
    this.glow.endFill();
    this.glow.filters = [new PIXI.BlurFilter(this.config.glowStrength)];
    this.container.addChild(this.glow);

    this.circle = new PIXI.Graphics();
    this.circle.beginFill(this.circleColor, this.alpha);
    this.circle.drawCircle(0, 0, this.radius);
    this.circle.endFill();
    this.container.addChild(this.circle);

    this.container.position.set(this.x, this.y);
  }

  update(delta: number, deltaMS: number) {
    this.x += this.speedX * delta;
    this.y += this.speedY * delta;

    const b = this.radius + this.config.glowStrength;
    if (this.x < -b) this.x = this.app.screen.width + b;
    if (this.x > this.app.screen.width + b) this.x = -b;
    if (this.y < -b) this.y = this.app.screen.height + b;
    if (this.y > this.app.screen.height + b) this.y = -b;

    this.container.position.set(this.x, this.y);

    this.age += deltaMS;
    if (this.age < this.config.fadeInTime) {
      this.container.alpha = this.age / this.config.fadeInTime;
    } else if (this.age < this.lifespan * 0.7) {
      this.container.alpha = 1;
    } else {
      const fadeOut = this.lifespan * 0.3;
      const t = (this.age - this.lifespan * 0.7) / fadeOut;
      this.container.alpha = Math.max(0, 1 - t);
      if (this.age >= this.lifespan) {
        this.container.removeChildren();
        this.initialize();
      }
    }
  }
}

export default function CustomWhiteOrbs({
  children,
  height,
  background = 0x012035,
  circleColor = 0x04426C,
  glowColor = 0x04426C,
}: CustomWhiteOrbsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMobile, setIsMobile] = useState(true);

  // Assume mobile on server/first render to avoid hydration mismatch
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 730);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    if (!containerRef.current || !canvasRef.current) return;

    const w = containerRef.current.clientWidth;
    const h = containerRef.current.clientHeight;
    canvasRef.current.width = w;
    canvasRef.current.height = h;

    const pixiApp = new PIXI.Application({
      view: canvasRef.current,
      width: w,
      height: h,
      antialias: true,
      autoDensity: true,
      resolution: window.devicePixelRatio || 1,
      backgroundAlpha: 0,  // transparent background
    });
    pixiApp.ticker.maxFPS = 16;

    const circlesContainer = new PIXI.Container();
    pixiApp.stage.addChild(circlesContainer);

    const circles: LuminescentCircle[] = [];
    for (let i = 0; i < desktopConfig.count; i++) {
      circles.push(
        new LuminescentCircle({
          config: desktopConfig,
          app: pixiApp,
          circlesContainer,
          circleColor,
          glowColor,
        })
      );
    }

    pixiApp.ticker.add((delta) => {
      const ms = pixiApp.ticker.deltaMS;
      circles.forEach((c) => c.update(delta, ms));
    });

    // fade in canvas
    canvasRef.current.style.opacity = '0';
    requestAnimationFrame(() => {
      if (canvasRef.current) canvasRef.current.style.opacity = '1';
    });

    const onResize = () => {
      if (!containerRef.current || !canvasRef.current) return;
      const nw = containerRef.current.clientWidth;
      const nh = containerRef.current.clientHeight;
      canvasRef.current.width = nw;
      canvasRef.current.height = nh;
      pixiApp.renderer.resize(nw, nh);
    };
    window.addEventListener('resize', onResize);
    onResize();

    return () => {
      window.removeEventListener('resize', onResize);
      pixiApp.destroy(true, { children: true, texture: true, baseTexture: true });
    };
  }, [isMobile, circleColor, glowColor, background]);

  return (
    <div
      ref={containerRef}
      className={styles.container}
      style={height ? { height, minHeight: height } : undefined}
    >
      {!isMobile && <canvas ref={canvasRef} className={styles.pixiContainer} />}
      {children && <div className={styles.content}>{children}</div>}
    </div>
  );
}
