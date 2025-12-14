import React from 'react';
import { act, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { renderWithProviders } from '@/tests/test-utils';
import { setMenuTransition } from '@/store/slices/navigation/menuTransitionSlice';
import HeroOrbsDesktop from '../HeroOrbsDesktop';
import rootReducer from '@/store/rootReducer';

const { blockSequenceMock, whiteOrbsMock } = vi.hoisted(() => {
  return {
    blockSequenceMock: vi.fn(() => <div data-testid="block-sequence" />),
    whiteOrbsMock: vi.fn(
      ({ children, ...props }: { children: React.ReactNode;[key: string]: unknown }) => (
        <div
          data-testid="white-orbs"
          data-height={props.height}
          data-background={String(props.background)}
          data-circle={String(props.circleColor)}
          data-glow={String(props.glowColor)}
        >
          {children}
        </div>
      )
    ),
  };
});

vi.mock('@/press/components/BlockTextSequence', () => ({
  __esModule: true,
  default: blockSequenceMock,
}));

vi.mock('@/components/utilities/particles/WhiteOrbs', () => ({
  __esModule: true,
  default: whiteOrbsMock,
}));

beforeEach(() => {
  blockSequenceMock.mockClear();
  whiteOrbsMock.mockClear();
});

describe('HeroOrbsDesktop', () => {
  test('renders block sequence when not transitioning', () => {
    renderWithProviders(<HeroOrbsDesktop />);

    expect(screen.getByTestId('white-orbs')).toHaveAttribute('data-height', '100vh');
    expect(screen.getByTestId('white-orbs')).toHaveAttribute('data-background', '73781');
    expect(screen.getByTestId('white-orbs')).toHaveAttribute('data-circle', '279148');
    expect(screen.getByTestId('white-orbs')).toHaveAttribute('data-glow', '279148');
    expect(screen.getByTestId('block-sequence')).toBeInTheDocument();
  });

  test('defers block sequence until transition completes', async () => {
    const { store } = renderWithProviders(<HeroOrbsDesktop />, {
      preloadedState: { menuTransition: { isTransitioning: true } } as unknown as ReturnType<typeof rootReducer>,
    });

    expect(screen.queryByTestId('block-sequence')).not.toBeInTheDocument();

    act(() => {
      store.dispatch(setMenuTransition(false));
    });

    await waitFor(() => expect(screen.getByTestId('block-sequence')).toBeInTheDocument());
  });
});
