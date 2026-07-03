import { describe, expect, it, vi, afterEach } from 'vitest';

const loadSlice = () => import('../imageSlice');

afterEach(() => {
  vi.restoreAllMocks();
  vi.resetModules(); // ensure initial state re-evaluates Math.random per test
});

describe('imageSlice', () => {
  it('seeds the initial image using Math.random', async () => {
    vi.spyOn(Math, 'random').mockReturnValue(0);
    const { default: reducer } = await loadSlice();

    const state = reducer(undefined, { type: 'init' });

    expect(state.currentImage).toBe('/images/home/hero/rito-picture1.png');
  });

  it('randomizeImage picks an image based on Math.random', async () => {
    vi.spyOn(Math, 'random')
      .mockReturnValueOnce(0.2) // initial state
      .mockReturnValue(0.71);   // action call
    const { default: reducer, randomizeImage } = await loadSlice();

    const initial = reducer(undefined, { type: 'init' });
    const next = reducer(initial, randomizeImage());

    expect(initial.currentImage).toBe('/images/utilities/imageQuote/Impressions.jpg');
    expect(next.currentImage).toBe('/images/utilities/imageQuote/Roadmap.jpg');
  });
});
