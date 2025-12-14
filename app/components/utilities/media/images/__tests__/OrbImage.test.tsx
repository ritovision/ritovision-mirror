import React from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import OrbImage from '../OrbImage';
import styles from '../OrbImage.module.css';

describe('OrbImage', () => {
  it('shows placeholder until the image loads', async () => {
    const { container } = render(<OrbImage src="/photo.jpg" alt="Orb" />);

    expect(container.querySelector(`.${styles.placeholder}`)).toBeInTheDocument();
    const img = screen.getByAltText('Orb');
    expect(img).toHaveClass(styles.imageHidden);

    fireEvent.load(img);

    await waitFor(() => expect(img).toHaveClass(styles.imageVisible));
    expect(container.querySelector(`.${styles.placeholder}`)).not.toBeInTheDocument();
  });

  it('keeps placeholder visible for at least minPlaceholderMs', () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });

    const { container } = render(
      <OrbImage src="/delayed.jpg" alt="Delayed" minPlaceholderMs={200} />
    );

    const img = screen.getByAltText('Delayed');
    fireEvent.load(img);

    act(() => {
      vi.advanceTimersByTime(199);
    });
    expect(container.querySelector(`.${styles.placeholder}`)).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(container.querySelector(`.${styles.placeholder}`)).not.toBeInTheDocument();
    expect(img).toHaveClass(styles.imageVisible);

    vi.useRealTimers();
  });

  it('keeps placeholder visible on load error', () => {
    const { container } = render(<OrbImage src="/broken.jpg" alt="Broken" />);

    const img = screen.getByAltText('Broken');
    fireEvent.error(img);

    expect(container.querySelector(`.${styles.placeholder}`)).toBeInTheDocument();
    expect(img).toHaveClass(styles.imageHidden);
  });
});
