import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RadioContainer from '../RadioContainer';

describe('RadioContainer', () => {
  const items = ['Option A', 'Option B', 'Option C'];

  it('selects an option on click', async () => {
    const user = userEvent.setup();
    render(<RadioContainer title="Select one" state="pre" items={items} />);

    const radios = screen.getAllByRole('radio');
    expect(radios[1]).toHaveAttribute('aria-checked', 'false');

    await user.click(radios[1]);

    expect(radios[1]).toHaveAttribute('aria-checked', 'true');
    expect(radios[0]).toHaveAttribute('aria-checked', 'false');
  });

  it('selects via keyboard activation', () => {
    render(<RadioContainer title="Select one" state="pre" items={items} />);

    const radios = screen.getAllByRole('radio');
    fireEvent.keyDown(radios[2], { key: 'Enter', code: 'Enter' });

    expect(radios[2]).toHaveAttribute('aria-checked', 'true');
  });

  it('does not allow selection when disabled', async () => {
    const user = userEvent.setup();
    render(<RadioContainer title="Select one" state="disabled" items={items} />);

    const radios = screen.getAllByRole('radio');
    expect(radios[0]).toHaveAttribute('tabindex', '-1');

    await user.click(radios[0]);

    expect(radios[0]).toHaveAttribute('aria-checked', 'false');
  });
});
