import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import InteractiveSlider from '../InteractiveSlider';

describe('InteractiveSlider', () => {
  const marks = ['Low', 'Medium', 'High'];

  it('renders with the provided title and marks', () => {
    render(<InteractiveSlider title="Interactive control" marks={marks} />);

    expect(screen.getByText('Interactive control')).toBeInTheDocument();
    marks.forEach((mark) => {
      expect(screen.getByText(mark)).toBeInTheDocument();
    });
  });

  it('logs the new value when the slider changes', async () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    render(<InteractiveSlider title="Interactive control" marks={marks} />);
    const slider = screen.getByRole('slider');

    fireEvent.change(slider, { target: { value: '1' } });

    await waitFor(() => expect(slider).toHaveValue('1'));
    expect(consoleSpy).toHaveBeenCalledWith('Slider changed to:', 'Medium');

    consoleSpy.mockRestore();
  });
});
