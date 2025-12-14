import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { MatrixColorPicker } from '../ColorPicker';

describe('MatrixColorPicker', () => {
  it('bubbles native color input changes', () => {
    const handleChange = vi.fn();
    const { container } = render(
      <MatrixColorPicker color="#abcdef" onChange={handleChange} />
    );

    const colorInput = container.querySelector('input[type="color"]') as HTMLInputElement;
    fireEvent.change(colorInput, { target: { value: '#000000' } });

    expect(handleChange).toHaveBeenCalledWith('#000000');
  });

  it('allows manual hex entry and uppercases on commit', () => {
    vi.useFakeTimers();
    const handleChange = vi.fn();
    try {
      render(<MatrixColorPicker color="#1a2b3c" onChange={handleChange} />);

      fireEvent.click(screen.getByText('#1A2B3C'));
      act(() => {
        vi.runAllTimers();
      });

      const input = screen.getByRole('textbox') as HTMLInputElement;
      fireEvent.change(input, { target: { value: '12ff34' } });
      fireEvent.blur(input);

      expect(handleChange).toHaveBeenCalledWith('#12FF34');
      expect(screen.getByText('#12FF34')).toBeInTheDocument();
    } finally {
      vi.useRealTimers();
    }
  });

  it('reverts to the previous color when an invalid value is committed', () => {
    vi.useFakeTimers();
    const handleChange = vi.fn();
    try {
      render(<MatrixColorPicker color="#ABCDEF" onChange={handleChange} />);

      fireEvent.click(screen.getByText('#ABCDEF'));
      act(() => {
        vi.runAllTimers();
      });

      const input = screen.getByRole('textbox') as HTMLInputElement;
      fireEvent.change(input, { target: { value: 'zzzz' } });
      fireEvent.blur(input);

      expect(handleChange).not.toHaveBeenCalled();
      expect(screen.getByText('#ABCDEF')).toBeInTheDocument();
    } finally {
      vi.useRealTimers();
    }
  });
});
