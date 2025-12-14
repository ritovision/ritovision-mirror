// components/utilities/particles/WhiteOrbs/createApp.ts
import * as PIXI from 'pixi.js';

export function createPixiApp({
  view,
  width,
  height,
  backgroundColor,
}: {
  view: HTMLCanvasElement;
  width: number;
  height: number;
  backgroundColor: number;
}) {
  const app = new PIXI.Application({
    view,
    width,
    height,
    backgroundColor,
    antialias: true,
    resolution: window.devicePixelRatio || 1,
    autoDensity: true,
  });
  // Keep animation smooth but light; matches the single-file WhiteOrbs implementation.
  app.ticker.maxFPS = 24;
  return app;
}
