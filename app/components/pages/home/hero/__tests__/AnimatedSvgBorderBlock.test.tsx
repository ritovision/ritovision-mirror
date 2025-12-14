import React from 'react';
import { act, render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import AnimatedSvgBorderBlock from '../AnimatedSvgBorderBlock';

const rect = {
  width: 150,
  height: 50,
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  x: 0,
  y: 0,
  toJSON: () => ({}),
};

describe('AnimatedSvgBorderBlock', () => {
  test('does not render border when not visible', () => {
    const { container } = render(
      <AnimatedSvgBorderBlock text="Hidden" textColor="#000" isVisible={false} />
    );

    expect(container.querySelector('svg')).not.toBeInTheDocument();
    expect(screen.getByText('Hidden')).toHaveStyle({ opacity: '0' });
  });

  test('renders border and reveals text after animation completes', () => {
    vi.useFakeTimers();
    const rectSpy = vi
      .spyOn(HTMLElement.prototype, 'getBoundingClientRect')
      .mockReturnValue(rect);

    const { container } = render(
      <AnimatedSvgBorderBlock text="Visible" textColor="#111" isVisible animationDuration={600} />
    );

    const paths = container.querySelectorAll('path');
    expect(paths).toHaveLength(2);
    expect(paths[0].style.strokeDasharray).toBe('200');
    expect(paths[0].style.strokeDashoffset).toBe('200');

    act(() => {
      vi.advanceTimersByTime(600);
    });

    expect(paths[0].style.strokeDashoffset).toBe('0');
    expect(paths[1].style.strokeDashoffset).toBe('0');
    expect(screen.getByText('Visible')).toHaveStyle({ opacity: '1' });

    rectSpy.mockRestore();
    vi.useRealTimers();
  });

  test('resets animation when text changes', () => {
    vi.useFakeTimers();
    const rectSpy = vi
      .spyOn(HTMLElement.prototype, 'getBoundingClientRect')
      .mockReturnValue(rect);

    const { container, rerender } = render(
      <AnimatedSvgBorderBlock text="First" textColor="#111" isVisible animationDuration={300} />
    );

    act(() => {
      vi.advanceTimersByTime(300);
    });
    const initialPath = container.querySelector('path');
    expect(initialPath?.style.strokeDashoffset).toBe('0');

    rerender(
      <AnimatedSvgBorderBlock text="Second" textColor="#111" isVisible animationDuration={300} />
    );

    const updatedPaths = container.querySelectorAll('path');
    expect(rectSpy).toHaveBeenCalledTimes(2);
    // Component does not force-reset animation when text changes; it reuses the
    // existing state and re-measures the element.
    expect(updatedPaths[0].style.strokeDashoffset).toBe('0');
    expect(screen.getByText('Second')).toHaveStyle({ opacity: '1' });

    rectSpy.mockRestore();
    vi.useRealTimers();
  });
});
