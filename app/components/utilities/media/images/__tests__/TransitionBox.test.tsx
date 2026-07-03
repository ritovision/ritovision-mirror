import React from 'react';
import { act, render } from '@testing-library/react';
import { vi } from 'vitest';
import TransitionBox from '../TransitionBox';
import styles from '../TransitionBox.module.css';

describe('TransitionBox', () => {
  const images = ['/a.jpg', '/b.jpg', '/c.jpg'];

  it('cycles images over time with fading opacity', () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });

    const { container } = render(
      <TransitionBox images={images} duration={500} transitionDuration={200} />
    );

    const wrappers = Array.from(
      container.querySelectorAll(`.${styles.imageWrapper}`)
    );
    expect(wrappers).toHaveLength(images.length);
    expect(wrappers[0]).toHaveStyle({ opacity: '1' });
    expect(wrappers[1]).toHaveStyle({ opacity: '0' });

    act(() => {
      vi.advanceTimersByTime(500);
    });
    expect(wrappers[1]).toHaveStyle({ opacity: '1' });
    expect(wrappers[0]).toHaveStyle({ opacity: '0' });

    act(() => {
      vi.advanceTimersByTime(500);
    });
    expect(wrappers[2]).toHaveStyle({ opacity: '1' });
    expect(wrappers[1]).toHaveStyle({ opacity: '0' });

    act(() => {
      vi.advanceTimersByTime(500);
    });
    expect(wrappers[0]).toHaveStyle({ opacity: '1' });
    expect(wrappers[2]).toHaveStyle({ opacity: '0' });

    vi.useRealTimers();
  });
});
