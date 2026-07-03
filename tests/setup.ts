// tests/setup.ts
import '@testing-library/jest-dom/vitest';
import React from 'react';
import { beforeEach, vi } from 'vitest';

// React 19 compatibility: Polyfill React.act since it was removed
// Provide a simple synchronous act implementation
if (!(React as any).act) {
  (React as any).act = (callback: () => void | Promise<void>) => {
    const result = callback();
    if (result && typeof result.then === 'function') {
      return result;
    }
    return Promise.resolve();
  };
}

// ---- Animation libraries (global mocks) ----
vi.mock('framer-motion', () => {
  // Proxy that maps motion.div / motion.span / etc to plain elements
  const MotionProxy: any = new Proxy(
    {},
    {
      get: (_target, key) =>
        React.forwardRef<any, any>((props, ref) =>
          React.createElement(
            typeof key === 'string' ? key : 'div',
            { ref, ...props }
          )
        ),
    }
  );

  const AnimatePresence = (props: { children?: React.ReactNode }) =>
    React.createElement(React.Fragment, null, props.children);

  return {
    __esModule: true,
    motion: MotionProxy,
    AnimatePresence,
  };
});

vi.mock('@tsparticles/react', () => ({
  __esModule: true,
  // Simple div so tests can assert particles presence if needed
  Particles: (props: any) =>
    React.createElement('div', { 'data-testid': 'particles', ...props }),
}));

// ---- React Redux ----
const mockDispatch = vi.fn();
let useMockDispatch = true;

export const enableMockDispatch = () => {
  useMockDispatch = true;
};

export const enableRealDispatch = () => {
  useMockDispatch = false;
};

vi.mock('react-redux', async () => {
  const actual = await vi.importActual<typeof import('react-redux')>('react-redux');
  return {
    ...actual,
    useDispatch: () => {
      if (useMockDispatch) return mockDispatch;
      return actual.useDispatch();
    },
  };
});

// ---- Next.js shims ----
let mockedPathname = '/';
export const setMockPathname = (path: string) => {
  mockedPathname = path;
};

vi.mock('next/navigation', () => ({
  usePathname: () => mockedPathname,
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
}));

vi.mock('next/link', () => ({
  default: ({ href, children, ...props }: any) =>
    React.createElement(
      'a',
      { href: typeof href === 'string' ? href : href?.pathname, ...props },
      children
    ),
}));

vi.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // Render a plain img so assertions can read alt/src
    return React.createElement('img', props);
  },
}));

beforeEach(() => {
  vi.clearAllMocks();
  enableMockDispatch();
  mockedPathname = '/';

  // Window/DOM stubs
  (window as any).scrollTo = vi.fn();
  (window as any).open = vi.fn();
  Object.defineProperty(navigator, 'clipboard', {
    value: { writeText: vi.fn() },
    writable: true,
    configurable: true,
  });
});

export { mockDispatch };
