import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import Lightbox from '../Lightbox';
import styles from '../Lightbox.module.css';

const images = [
  { src: '/one.jpg', alt: 'First image' },
  { src: '/two.jpg', alt: 'Second image' },
];

describe('Lightbox', () => {
  it('renders the active image in a portal with caption and controls', async () => {
    render(
      <Lightbox
        images={images}
        activeIndex={0}
        onClose={vi.fn()}
        onPrev={vi.fn()}
        onNext={vi.fn()}
      />
    );

    const overlay = await waitFor(() =>
      document.body.querySelector(`.${styles.overlay}`)
    );
    expect(overlay).toBeInTheDocument();
    expect(overlay).toHaveClass(styles.overlayVisible);

    const img = document.body.querySelector(`.${styles.lightboxImage}`);
    expect(img).toHaveAttribute('src', images[0].src);
    expect(screen.getByText(images[0].alt)).toBeInTheDocument();

    expect(
      screen.getByRole('link', { name: /download image/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /previous/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument();
  });

  it('fades out and calls onClose after delay', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    const onClose = vi.fn();

    render(
      <Lightbox
        images={images}
        activeIndex={0}
        onClose={onClose}
        onPrev={vi.fn()}
        onNext={vi.fn()}
      />
    );

    const closeBtn = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeBtn);

    const overlay = document.body.querySelector(`.${styles.overlay}`);
    expect(overlay).not.toHaveClass(styles.overlayVisible);
    expect(onClose).not.toHaveBeenCalled();

    await vi.advanceTimersByTimeAsync(1000);
    expect(onClose).toHaveBeenCalledTimes(1);
    vi.useRealTimers();
  });

  it('invokes navigation callbacks via buttons and touch gestures', () => {
    const onPrev = vi.fn();
    const onNext = vi.fn();

    render(
      <Lightbox
        images={images}
        activeIndex={1}
        onClose={vi.fn()}
        onPrev={onPrev}
        onNext={onNext}
      />
    );

    const overlay = document.body.querySelector(`.${styles.overlay}`);
    expect(overlay).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /previous/i }));
    fireEvent.click(screen.getByRole('button', { name: /next/i }));
    expect(onPrev).toHaveBeenCalledTimes(1);
    expect(onNext).toHaveBeenCalledTimes(1);

    // Swipe right (prev)
    fireEvent.touchStart(overlay as Element, {
      touches: [{ clientX: 200 }] as unknown as TouchList,
    });
    fireEvent.touchEnd(overlay as Element, {
      changedTouches: [{ clientX: 270 }] as unknown as TouchList,
    });

    // Swipe left (next)
    fireEvent.touchStart(overlay as Element, {
      touches: [{ clientX: 200 }] as unknown as TouchList,
    });
    fireEvent.touchEnd(overlay as Element, {
      changedTouches: [{ clientX: 120 }] as unknown as TouchList,
    });

    expect(onPrev).toHaveBeenCalledTimes(2);
    expect(onNext).toHaveBeenCalledTimes(2);
  });

  it('does not render when inactive', () => {
    render(
      <Lightbox
        images={images}
        activeIndex={null}
        onClose={vi.fn()}
        onPrev={vi.fn()}
        onNext={vi.fn()}
      />
    );

    expect(document.body.querySelector(`.${styles.overlay}`)).toBeNull();
  });
});
