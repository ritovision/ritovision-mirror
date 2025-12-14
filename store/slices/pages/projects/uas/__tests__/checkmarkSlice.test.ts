import reducer, { setCheck, toggleCheck } from '../checkmarkSlice';
import { describe, expect, it } from 'vitest';

const initState = () => reducer(undefined, { type: 'init' });

describe('uas checkmarkSlice', () => {
  it('toggles a key on and off', () => {
    let state = initState();

    state = reducer(state, toggleCheck('feature'));
    expect(state.feature).toBe(true);

    state = reducer(state, toggleCheck('feature'));
    expect(state.feature).toBe(false);
  });

  it('sets a key to a specific boolean', () => {
    const next = reducer(initState(), setCheck({ key: 'beta', value: true }));

    expect(next.beta).toBe(true);
  });
});
