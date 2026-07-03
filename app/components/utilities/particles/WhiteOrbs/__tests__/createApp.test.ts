import { describe, expect, it, vi } from 'vitest';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const applicationCtor = vi.fn(function (this: any, options: any) {
  Object.assign(this, options);
  this.ticker = { maxFPS: 0 };
});

vi.mock('pixi.js', () => ({
  __esModule: true,
  Application: applicationCtor,
}));

describe('createPixiApp', () => {
  it('creates an app with the expected options and FPS cap', async () => {
    const view = document.createElement('canvas');
    const { createPixiApp } = await import('../createApp');

    const app = createPixiApp({
      view,
      width: 200,
      height: 100,
      backgroundColor: 0x012345,
    });

    expect(applicationCtor).toHaveBeenCalledWith({
      view,
      width: 200,
      height: 100,
      backgroundColor: 0x012345,
      antialias: true,
      resolution: window.devicePixelRatio || 1,
      autoDensity: true,
    });
    expect(app.ticker.maxFPS).toBe(24);
  });
});
