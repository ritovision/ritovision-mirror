// components/utilities/particles/WhiteOrbs/LuminescentCircle.ts
import * as PIXI from 'pixi.js';
import { Config } from './types';

export class LuminescentCircle {
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

    if (this.x < -this.radius - this.config.glowStrength)
      this.x = this.app.screen.width + this.radius + this.config.glowStrength;
    if (this.x > this.app.screen.width + this.radius + this.config.glowStrength)
      this.x = -this.radius - this.config.glowStrength;
    if (this.y < -this.radius - this.config.glowStrength)
      this.y = this.app.screen.height + this.radius + this.config.glowStrength;
    if (this.y > this.app.screen.height + this.radius + this.config.glowStrength)
      this.y = -this.radius - this.config.glowStrength;

    this.container.position.set(this.x, this.y);

    this.age += deltaMS;

    if (this.age < this.config.fadeInTime) {
      const fadeInFactor = this.age / this.config.fadeInTime;
      this.container.alpha = fadeInFactor;
    } else if (this.age < this.lifespan * 0.7) {
      this.container.alpha = 1;
    } else {
      const dissolveFactor =
        1 - (this.age - this.lifespan * 0.7) / (this.lifespan * 0.3);
      this.container.alpha = Math.max(0, dissolveFactor);
      if (this.age >= this.lifespan) {
        this.container.removeChildren();
        this.initialize();
      }
    }
  }
}