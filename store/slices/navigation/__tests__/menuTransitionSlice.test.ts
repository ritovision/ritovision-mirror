import reducer, { setMenuTransition } from '../menuTransitionSlice';
import { describe, expect, it } from 'vitest';

const initState = () => reducer(undefined, { type: 'init' });

describe('menuTransitionSlice', () => {
  it('sets transition flag', () => {
    const transitioning = reducer(initState(), setMenuTransition(true));
    expect(transitioning.isTransitioning).toBe(true);

    const idle = reducer(transitioning, setMenuTransition(false));
    expect(idle.isTransitioning).toBe(false);
  });
});
