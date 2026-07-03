import React from 'react';
import { act, fireEvent, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { renderWithProviders } from '@/tests/test-utils';
import { setMenuTransition } from '@/store/slices/navigation/menuTransitionSlice';
import HeroOrbs from '../HeroOrbs';

vi.mock('../AnimatedSvgBorderBlock', () => ({
  __esModule: true,
  default: ({
    text,
    isVisible,
  }: {
    text: string;
    isVisible: boolean;
  }) => (
    <div data-testid="animated-orb" data-visible={isVisible ? 'true' : 'false'}>
      {text}
    </div>
  ),
}));

const originalIntersectionObserver = global.IntersectionObserver;
const originalPlay = HTMLMediaElement.prototype.play;
const originalLoad = HTMLMediaElement.prototype.load;

let playMock: ReturnType<typeof vi.fn>;
let loadMock: ReturnType<typeof vi.fn>;
let observerCallbacks: Array<
  (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => void
> = [];

class MockIntersectionObserver {
  callback: (
    entries: IntersectionObserverEntry[],
    observer: IntersectionObserver
  ) => void;
  constructor(
    cb: (
      entries: IntersectionObserverEntry[],
      observer: IntersectionObserver
    ) => void
  ) {
    this.callback = cb;
    observerCallbacks.push(cb);
  }
  observe() { }
  unobserve() { }
  disconnect() {
    observerCallbacks = observerCallbacks.filter((cb) => cb !== this.callback);
  }
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
}

const triggerIntersection = (isIntersecting = true) => {
  observerCallbacks.forEach((cb) =>
    cb([{ isIntersecting } as IntersectionObserverEntry], {} as IntersectionObserver)
  );
};

beforeEach(() => {
  vi.useFakeTimers();
  observerCallbacks = [];
  global.IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver;
  Object.defineProperty(window, 'innerWidth', {
    configurable: true,
    writable: true,
    value: 1200,
  });

  playMock = vi.fn().mockResolvedValue(undefined);
  loadMock = vi.fn();
  HTMLMediaElement.prototype.play = playMock;
  HTMLMediaElement.prototype.load = loadMock;
});

afterEach(() => {
  vi.useRealTimers();
  global.IntersectionObserver = originalIntersectionObserver as unknown as typeof IntersectionObserver;
  HTMLMediaElement.prototype.play = originalPlay;
  HTMLMediaElement.prototype.load = originalLoad;
});

describe('HeroOrbs', () => {
  test('runs orb sequence, fades in video, and shows image on intersection', async () => {
    const { container } = renderWithProviders(<HeroOrbs />);

    const orbs = screen.getAllByTestId('animated-orb');
    expect(orbs.every((orb) => orb.getAttribute('data-visible') === 'false')).toBe(true);

    await act(async () => {
      vi.advanceTimersByTime(0);
    });
    expect(orbs[0]).toHaveAttribute('data-visible', 'true');

    await act(async () => {
      vi.advanceTimersByTime(800);
    });
    expect(orbs[1]).toHaveAttribute('data-visible', 'true');

    await act(async () => {
      vi.advanceTimersByTime(800);
    });
    expect(orbs[2]).toHaveAttribute('data-visible', 'true');

    const video = container.querySelector('video');
    expect(video).toBeInTheDocument();
    await act(async () => {
      vi.advanceTimersByTime(200);
    });
    expect(video?.className || '').toMatch(/videoVisible/);
    expect(playMock).toHaveBeenCalled();

    act(() => triggerIntersection(true));
    const image = screen.getByAltText('Rito');
    expect(image.className).toMatch(/imageVisible/);
  });

  test('waits for transition to end before starting animations', async () => {
    const { store } = renderWithProviders(<HeroOrbs />, {
      preloadedState: { menuTransition: { isTransitioning: true } },
    });

    const orbs = screen.getAllByTestId('animated-orb');
    await act(async () => {
      vi.runOnlyPendingTimers();
    });
    expect(orbs.every((orb) => orb.getAttribute('data-visible') === 'false')).toBe(true);

    act(() => {
      store.dispatch(setMenuTransition(false));
    });

    await act(async () => {
      await Promise.resolve();
    });
    await act(async () => {
      vi.advanceTimersByTime(0);
    });

    expect(screen.getAllByTestId('animated-orb')[0]).toHaveAttribute('data-visible', 'true');
  });

  test('reloads and retries video playback on error', async () => {
    const { container } = renderWithProviders(<HeroOrbs />);
    const video = container.querySelector('video');
    expect(video).toBeInTheDocument();

    await act(async () => {
      if (video) fireEvent.error(video);
    });

    await act(async () => {
      vi.advanceTimersByTime(500);
    });

    expect(loadMock).toHaveBeenCalled();
    expect(playMock).toHaveBeenCalled();
  });
});
