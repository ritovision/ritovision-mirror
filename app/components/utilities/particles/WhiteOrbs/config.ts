// components/utilities/particles/WhiteOrbs/config.ts
import { Config } from './types';

export const mobileConfig: Config = {
  minRadius: 10,
  maxRadius: 25,
  minSpeed: 0.1,
  maxSpeed: 0.5,
  count: 10,
  minLifespan: 10000,
  maxLifespan: 20000,
  glowStrength: 10,
  minAlpha: 0.3,
  maxAlpha: 0.6,
  fadeInTime: 2000,
};

export const desktopConfig: Config = {
  minRadius: 15,
  maxRadius: 40,
  minSpeed: 0.2,
  maxSpeed: 0.8,
  count: 50,
  minLifespan: 10000,
  maxLifespan: 20000,
  glowStrength: 15,
  minAlpha: 0.4,
  maxAlpha: 0.7,
  fadeInTime: 2000,
};