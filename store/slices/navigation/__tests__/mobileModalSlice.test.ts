import reducer, { toggleMobileMenu } from '../mobileModalSlice';
import { describe, expect, it } from 'vitest';

const initState = () => reducer(undefined, { type: 'init' });

describe('mobileModalSlice', () => {
  it('toggles the mobile menu open state', () => {
    const opened = reducer(initState(), toggleMobileMenu(true));
    expect(opened.isOpen).toBe(true);

    const closed = reducer(opened, toggleMobileMenu(false));
    expect(closed.isOpen).toBe(false);
  });
});
