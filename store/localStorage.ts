// /store/localStorage.ts
import { Middleware } from '@reduxjs/toolkit';
import { RootState } from './rootReducer';

// Define which parts of state should NOT be persisted
const TRANSIENT_STATE_KEYS: (keyof RootState)[] = [
  'menu',           // Top/bottom menu visibility
  'bottomMenu',     // Drawer open state, active section
  'toc',            // Table of contents - should be fresh per page
  'mobileModal',    // Mobile menu state
  'menuTransition', // Transition states
];

export const localStorageMiddleware: Middleware = store => next => action => {
  const result = next(action);
  if (typeof window !== 'undefined') {
    try {
      const state = store.getState() as RootState;
      
      // Create a new object with only the states we want to persist
      const persistedState: Partial<RootState> = {};
      
      // Explicitly iterate through state keys and only add non-transient ones
      (Object.keys(state) as Array<keyof RootState>).forEach(key => {
        if (!TRANSIENT_STATE_KEYS.includes(key)) {
          persistedState[key] = state[key] as any;
        }
      });
      
      localStorage.setItem('reduxState', JSON.stringify(persistedState));
    } catch (error) {
      console.error('Error saving state to localStorage:', error);
    }
  }
  return result;
};

export const loadState = () => {
  if (typeof window === 'undefined') return undefined;
  try {
    const serializedState = localStorage.getItem('reduxState');
    if (!serializedState) return undefined;
    
    const parsedState = JSON.parse(serializedState);
    
    // Ensure transient states start fresh (they'll use their initial state from their slices)
    // We explicitly set them to undefined so Redux will use the initial state
    const freshState: Partial<RootState> = {
      ...parsedState,
      menu: undefined,
      bottomMenu: undefined,
      toc: undefined,
      mobileModal: undefined,
      menuTransition: undefined,
    };
    
    return freshState;
  } catch (error) {
    console.error('Error loading state from localStorage:', error);
    return undefined;
  }
};