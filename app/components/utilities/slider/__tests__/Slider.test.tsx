import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Slider from '../Slider';

describe('Slider', () => {
  const marks = [0, 50, 100];

  it('renders the title, slider input, and labeled marks', () => {
    render(<Slider title="Test Slider" marks={marks} />);

    expect(screen.getByText('Test Slider')).toBeInTheDocument();

    const slider = screen.getByRole('slider');
    expect(slider).toHaveAttribute('min', '0');
    expect(slider).toHaveAttribute('max', '2');
    expect(slider).toHaveAttribute('step', '1');
    expect(slider).toHaveAttribute('aria-label', 'Test Slider');
    expect(slider).toHaveValue('0');

    expect(screen.getByText('0')).toHaveStyle({ left: '10%' });
    expect(screen.getByText('50')).toHaveStyle({ left: '50%' });
    expect(screen.getByText('100')).toHaveStyle({ left: '90%' });
  });

  it('invokes onChange with the selected mark value and updates the knob', async () => {
    const handleChange = vi.fn();
    render(<Slider title="Pick a number" marks={marks} onChange={handleChange} />);

    const slider = screen.getByRole('slider');
    fireEvent.change(slider, { target: { value: '2' } });

    await waitFor(() => expect(slider).toHaveValue('2'));
    expect(handleChange).toHaveBeenCalledWith(100);
  });
});
