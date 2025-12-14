import reducer, {
  showTopMenu,
  hideTopMenu,
  showBottomMenu,
  hideBottomMenu,
} from '../menuSlice';
import { describe, expect, it } from 'vitest';

const initState = () => reducer(undefined, { type: 'init' });

describe('menuSlice', () => {
  it('shows and hides the top menu', () => {
    const hidden = reducer(initState(), hideTopMenu());
    expect(hidden.isTopMenuVisible).toBe(false);

    const shown = reducer(hidden, showTopMenu());
    expect(shown.isTopMenuVisible).toBe(true);
  });

  it('shows and hides the bottom menu', () => {
    const shown = reducer(initState(), showBottomMenu());
    expect(shown.isBottomMenuVisible).toBe(true);

    const hidden = reducer(shown, hideBottomMenu());
    expect(hidden.isBottomMenuVisible).toBe(false);
  });
});
