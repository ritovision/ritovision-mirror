// store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import rootReducer, { RootState } from './rootReducer';
import { localStorageMiddleware, loadState } from './localStorage';

const preloadedState = loadState();

const store = configureStore({
  reducer: rootReducer,
  preloadedState,
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(localStorageMiddleware),
});

export type { RootState };
export default store;