import { act, render } from '@testing-library/react';
import React from 'react';
import TypewriterHeading from '../TypewriterHeading';

class IntersectionObserverMock {
  public callback: IntersectionObserverCallback;
  public options?: IntersectionObserverInit;
  public observe = vi.fn();
  public disconnect = vi.fn();
  public unobserve = vi.fn();
  public root = null;
  public rootMargin = '';
  public thresholds: ReadonlyArray<number> = [];
  public takeRecords = vi.fn(() => []);

  constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
    this.callback = callback;
    this.options = options;
    IntersectionObserverMock.latest = this;
  }

  trigger(entry: Partial<IntersectionObserverEntry>) {
    const target = document.createElement('div');
    this.callback([{ intersectionRatio: 1, isIntersecting: true, target, ...entry } as IntersectionObserverEntry], this as unknown as IntersectionObserver);
  }

  static latest: IntersectionObserverMock | null = null;
}

describe('TypewriterHeading', () => {
  const originalObserver = window.IntersectionObserver;

  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).IntersectionObserver = vi
      .fn()
      .mockImplementation((callback: IntersectionObserverCallback, options?: IntersectionObserverInit) => {
        return new IntersectionObserverMock(callback, options);
      });
  });

  afterEach(() => {
    window.IntersectionObserver = originalObserver;
    IntersectionObserverMock.latest = null;
    vi.useRealTimers();
  });

  it('types phrases sequentially when startTyping is true', () => {
    vi.useFakeTimers();

    const { container } = render(<TypewriterHeading phrases={['Line one', 'Line two']} typingSpeed={5} startTyping />);

    // Debug: Check what's rendered
    console.log('Rendered HTML:', container.innerHTML);

    // Find the animatedText element by class
    const animatedText = container.querySelector('[class*="animatedText"]') as HTMLElement;
    console.log('Found animatedText:', animatedText);
    expect(animatedText).toBeInTheDocument();

    act(() => {
      vi.runAllTimers();
    });

    expect(animatedText.textContent).toBe('Line oneLine two');
  });

  it('waits for the scroll trigger before typing and uses percentage thresholds', () => {
    vi.useFakeTimers();

    const { container } = render(<TypewriterHeading phrases={['Scroll start']} typingSpeed={5} scrollTrigger={50} />);

    const observer = IntersectionObserverMock.latest;
    expect(observer?.options?.threshold).toBe(0.5);

    const animatedText = container.querySelector('[class*="animatedText"]') as HTMLElement;
    expect(animatedText).toBeInTheDocument();

    act(() => {
      observer?.trigger({ intersectionRatio: 0.6 });
    });

    act(() => {
      vi.runAllTimers();
    });

    expect(animatedText.textContent).toBe('Scroll start');
  });
});
