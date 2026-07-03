import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import HeroOrbsWrapper from '../HeroOrbsWrapper';

const { mobileOrbsMock, desktopOrbsMock } = vi.hoisted(() => ({
  mobileOrbsMock: vi.fn(() => <div data-testid="mobile-orbs" />),
  desktopOrbsMock: vi.fn(() => <div data-testid="desktop-orbs" />),
}));

vi.mock('../HeroOrbs', () => ({
  __esModule: true,
  default: mobileOrbsMock,
}));

vi.mock('../HeroOrbsDesktop', () => ({
  __esModule: true,
  default: desktopOrbsMock,
}));

vi.mock('next/dynamic', () => ({
  __esModule: true,
  default: (importer: () => Promise<{ default: React.ComponentType; }>) => {
    let Loaded: React.ComponentType | undefined;
    importer().then((mod) => {
      Loaded = mod.default || mod;
    });
    return (props: Record<string, unknown>) => (Loaded ? <Loaded {...props} /> : null);
  },
}));

const setViewportWidth = (width: number) => {
  Object.defineProperty(window, 'innerWidth', {
    configurable: true,
    writable: true,
    value: width,
  });
};

beforeEach(() => {
  mobileOrbsMock.mockClear();
  desktopOrbsMock.mockClear();
});

describe('HeroOrbsWrapper', () => {
  test('renders mobile orbs below desktop breakpoint and swaps on resize', async () => {
    setViewportWidth(500);
    render(<HeroOrbsWrapper />);

    expect(screen.getByTestId('mobile-orbs')).toBeInTheDocument();
    expect(screen.queryByTestId('desktop-orbs')).not.toBeInTheDocument();

    await act(async () => {
      setViewportWidth(900);
      window.dispatchEvent(new Event('resize'));
    });

    await waitFor(() => expect(screen.getByTestId('desktop-orbs')).toBeInTheDocument());
  });

  test('renders desktop orbs when viewport starts above breakpoint', async () => {
    setViewportWidth(900);
    render(<HeroOrbsWrapper />);

    await waitFor(() => expect(screen.getByTestId('desktop-orbs')).toBeInTheDocument());
    expect(screen.queryByTestId('mobile-orbs')).not.toBeInTheDocument();
  });

  test('cleans up resize listener on unmount', () => {
    const removeSpy = vi.spyOn(window, 'removeEventListener');
    setViewportWidth(800);

    const { unmount } = render(<HeroOrbsWrapper />);
    unmount();

    expect(removeSpy).toHaveBeenCalledWith('resize', expect.any(Function));
    removeSpy.mockRestore();
  });
});
