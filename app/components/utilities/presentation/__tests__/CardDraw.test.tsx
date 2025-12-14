import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import CardDraw from '../CardDraw';

class IntersectionObserverMock {
  public callback: IntersectionObserverCallback;
  public options?: IntersectionObserverInit;
  public observe = vi.fn();
  public unobserve = vi.fn();
  public disconnect = vi.fn();
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
    this.callback([{ isIntersecting: true, intersectionRatio: 1, target, ...entry } as IntersectionObserverEntry], this as unknown as IntersectionObserver);
  }

  static latest: IntersectionObserverMock | null = null;
}

describe('CardDraw', () => {
  const originalImage = window.Image;
  const originalObserver = window.IntersectionObserver;

  beforeEach(() => {
    // Mock image loading to immediately resolve with a predictable aspect ratio.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).Image = class MockImage {
      width = 200;
      height = 100;
      onload: (() => void) | null = null;
      set src(_value: string) {
        // Trigger load asynchronously to mirror browser behavior.
        setTimeout(() => this.onload && this.onload());
      }
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).IntersectionObserver = vi
      .fn()
      .mockImplementation((callback: IntersectionObserverCallback, options?: IntersectionObserverInit) => {
        return new IntersectionObserverMock(callback, options);
      });
  });

  afterEach(() => {
    window.Image = originalImage;
    window.IntersectionObserver = originalObserver;
    IntersectionObserverMock.latest = null;
  });

  it('animates borders, image, and text once the container becomes visible', async () => {
    render(<CardDraw imageSrc="/photo.jpg" text="Hello world" scrollTriggerOffset={150} />);

    const observer = IntersectionObserverMock.latest;
    expect(observer).toBeTruthy();
    expect(observer?.options?.rootMargin).toBe('0px 0px -150px 0px');

    const svgPaths = document.querySelectorAll('path');
    svgPaths.forEach((path) => {
      expect(path.className).not.toContain('animatePath');
    });

    observer?.trigger({ isIntersecting: true });

    await waitFor(() => {
      svgPaths.forEach((path) => {
        expect(path.className).toContain('animatePath');
      });
    });

    const imageWrapper = document.querySelector('[class*="imageContainer"]') as HTMLElement;
    const textWrapper = document.querySelector('[class*="textContainer"]') as HTMLElement;

    await waitFor(() => {
      expect(imageWrapper.className).toContain('imageVisible');
      expect(textWrapper.className).toContain('textVisible');
    });

    expect(screen.getByAltText('Card background')).toHaveAttribute('src', '/photo.jpg');
    expect(screen.getByText('Hello world')).toBeInTheDocument();
  });

  it('derives the container height from the loaded image aspect ratio', async () => {
    const { container } = render(<CardDraw imageSrc="/wide.jpg" text="Aspect test" />);

    const root = container.firstElementChild as HTMLElement;

    await waitFor(() => {
      expect(root.style.height).toBe('calc(250px)');
    });
  });
});
