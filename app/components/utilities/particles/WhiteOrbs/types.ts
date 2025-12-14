// ./app/components/utilities/particles/WhiteOrbs/types.ts
import type { ReactNode } from 'react';

export type Config = {
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

export type WhiteOrbsProps = {
  children?: ReactNode;
  height?: string;
  background?: number;
  circleColor?: number;
  glowColor?: number;
};
