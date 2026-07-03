// components/utilities/particles/WhiteOrbs/mask.ts
import * as PIXI from 'pixi.js';

export function createGradientMask(
  app: PIXI.Application,
  target: PIXI.Container,
  previousMask?: PIXI.Sprite | null
): PIXI.Sprite | null {
  const canvas = document.createElement('canvas');
  canvas.width = app.screen.width;
  canvas.height = app.screen.height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return previousMask ?? null;

  // Clear the previous mask to avoid stacking sprites on the stage.
  if (previousMask) {
    target.mask = null;
    if (previousMask.parent) {
      previousMask.parent.removeChild(previousMask);
    }
    previousMask.destroy(true);
  }

  const fadeHeight = 40;
  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, 'rgba(255,255,255,0)');
  gradient.addColorStop(fadeHeight / canvas.height, 'rgba(255,255,255,1)');
  gradient.addColorStop(1 - fadeHeight / canvas.height, 'rgba(255,255,255,1)');
  gradient.addColorStop(1, 'rgba(255,255,255,0)');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const texture = PIXI.Texture.from(canvas);
  const sprite = new PIXI.Sprite(texture);
  app.stage.addChild(sprite);
  target.mask = sprite;
  return sprite;
}
