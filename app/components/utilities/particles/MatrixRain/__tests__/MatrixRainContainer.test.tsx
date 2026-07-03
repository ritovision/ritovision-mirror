import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import { MatrixRainContainer } from '../MatrixRainContainer';

const hoisted = vi.hoisted(() => ({
  MatrixRainMock: vi.fn(({ color, preset }) => (
    <div data-testid="matrix-rain" data-color={color} data-preset={preset} />
  )),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ColorPickerMock: ({ color, onChange }: any) => (
    <div>
      <button data-testid="color-picker" onClick={() => onChange('#00ff00')}>
        pick
      </button>
      <span data-testid="color-value">{color}</span>
    </div>
  ),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  SymbolDropdownMock: ({ preset, onChange }: any) => (
    <div>
      <button data-testid="preset-dropdown" onClick={() => onChange('binary')}>
        preset
      </button>
      <span data-testid="preset-value">{preset}</span>
    </div>
  ),
}));

vi.mock('../MatrixRain', () => ({
  __esModule: true,
  MatrixRain: hoisted.MatrixRainMock,
}));

vi.mock('../ColorPicker', () => ({
  __esModule: true,
  MatrixColorPicker: hoisted.ColorPickerMock,
}));

vi.mock('../SymbolTypeDropdown', () => ({
  __esModule: true,
  SymbolTypeDropdown: hoisted.SymbolDropdownMock,
}));

const originalIO = globalThis.IntersectionObserver;

beforeAll(() => {
  class MockIntersectionObserver {
    private callback: IntersectionObserverCallback;
    root = null;
    rootMargin = '';
    thresholds: ReadonlyArray<number> = [];
    constructor(cb: IntersectionObserverCallback) {
      this.callback = cb;
    }
    observe = (target: Element) =>
      this.callback([{ isIntersecting: true, target } as IntersectionObserverEntry], this as unknown as IntersectionObserver);
    unobserve = vi.fn();
    disconnect = vi.fn();
    takeRecords = vi.fn(() => []);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (globalThis as any).IntersectionObserver = MockIntersectionObserver;
});

afterAll(() => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (globalThis as any).IntersectionObserver = originalIO;
});

describe('MatrixRainContainer', () => {
  it('runs the timed reveal flow and passes color/preset to MatrixRain', () => {
    vi.useFakeTimers();
    try {
      render(<MatrixRainContainer />);

      expect(hoisted.MatrixRainMock).not.toHaveBeenCalled();
      expect(screen.getByText('Fully Encrypted Access to ERC')).toBeInTheDocument();

      // Change controls before reveal
      fireEvent.click(screen.getByTestId('color-picker'));
      fireEvent.click(screen.getByTestId('preset-dropdown'));
      expect(screen.getByTestId('color-value')).toHaveTextContent('#00ff00');
      expect(screen.getByTestId('preset-value')).toHaveTextContent('binary');

      const button = screen.getByRole('button', { name: 'Reveal Encrypted ERC' });
      fireEvent.click(button);
      expect(button).toHaveAttribute('aria-disabled', 'false');

      act(() => {
        vi.advanceTimersByTime(1000);
      });
      expect(button).toBeDisabled();
      expect(button).toHaveAttribute('aria-disabled', 'true');
      expect(document.querySelectorAll('[aria-hidden="true"]').length).toBeGreaterThan(0);

      act(() => {
        vi.advanceTimersByTime(1000);
      });
      expect(hoisted.MatrixRainMock).toHaveBeenCalledTimes(1);
      expect(screen.getByTestId('matrix-rain')).toHaveAttribute('data-color', '#00ff00');
      expect(screen.getByTestId('matrix-rain')).toHaveAttribute('data-preset', 'binary');
      expect(
        screen.queryByText(/Universal Asset Signing ERC paper we co-authored/i)
      ).not.toBeInTheDocument();
    } finally {
      vi.useRealTimers();
    }
  });
});
