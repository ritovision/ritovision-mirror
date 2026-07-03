import React, { PropsWithChildren } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import rootReducer, { RootState } from '../../store/rootReducer';

type StoreType = EnhancedStore<RootState>;

interface RenderWithStoreOptions {
  preloadedState?: Partial<RootState>;
  store?: StoreType;
  renderOptions?: Omit<RenderOptions, 'wrapper'>;
}

function createTestStore(preloadedState?: Partial<RootState>): StoreType {
  return configureStore({
    reducer: rootReducer,
    preloadedState: preloadedState as RootState | undefined,
  });
}

export function renderWithStore(
  ui: React.ReactElement,
  options?: RenderWithStoreOptions
) {
  const store = options?.store ?? createTestStore(options?.preloadedState);

  const Wrapper = ({ children }: PropsWithChildren) => (
    <Provider store={store}>{children}</Provider>
  );

  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...options?.renderOptions }),
  };
}

export { createTestStore };
