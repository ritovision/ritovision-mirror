import * as PIXI from 'pixi.js';

export const createPixiApp = (container: HTMLDivElement): PIXI.Application => {
  const app = new PIXI.Application({
    width: container.clientWidth,
    height: container.clientHeight,
    backgroundAlpha: 0,
    resolution: window.devicePixelRatio || 1,
    autoDensity: true,
  });
  container.appendChild(app.view as HTMLCanvasElement);
  (app.view as HTMLCanvasElement).style.pointerEvents = 'none';
  return app;
};