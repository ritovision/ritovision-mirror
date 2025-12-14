import reducer, {
  setCurrentPage,
  setActiveSection,
  setGlobalOverrides,
  openDrawer,
  toggleDrawer,
  closeDrawer,
} from '../bottomMenuSlice';
import { describe, expect, it } from 'vitest';

const initState = () => reducer(undefined, { type: 'init' });

describe('bottomMenuSlice', () => {
  it('updates page, section, and overrides', () => {
    const overrides = [{ priority: 1, variant: 'compact' }];
    const updated = reducer(initState(), setCurrentPage('/about'));
    const withSection = reducer(updated, setActiveSection('services'));
    const withOverrides = reducer(withSection, setGlobalOverrides(overrides));

    expect(withOverrides.currentPage).toBe('/about');
    expect(withOverrides.activeSection).toBe('services');
    expect(withOverrides.globalOverrides).toEqual(overrides);
  });

  it('opens, toggles, switches, and closes drawers', () => {
    let state = initState();

    state = reducer(state, openDrawer('toc'));
    expect(state.activeDrawer).toBe('toc');

    state = reducer(state, openDrawer('toc'));
    expect(state.activeDrawer).toBeNull();

    state = reducer(state, openDrawer('toc'));
    state = reducer(state, openDrawer('ai'));
    expect(state.activeDrawer).toBe('ai');

    state = reducer(state, toggleDrawer('ai'));
    expect(state.activeDrawer).toBeNull();

    state = reducer(state, toggleDrawer('toc'));
    state = reducer(state, toggleDrawer('ai'));
    expect(state.activeDrawer).toBe('ai');

    state = reducer(state, closeDrawer());
    expect(state.activeDrawer).toBeNull();
  });
});
