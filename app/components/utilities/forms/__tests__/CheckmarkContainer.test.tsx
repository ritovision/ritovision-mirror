import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CheckmarkContainer from '../CheckmarkContainer';

describe('CheckmarkContainer', () => {
  const items = ['One', 'Two', 'Three'];

  it('toggles items on click', async () => {
    const user = userEvent.setup();
    render(<CheckmarkContainer title="Pick any" state="pre" items={items} />);

    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes[0]).toHaveAttribute('aria-checked', 'false');

    await user.click(checkboxes[0]);
    expect(checkboxes[0]).toHaveAttribute('aria-checked', 'true');

    await user.click(checkboxes[0]);
    expect(checkboxes[0]).toHaveAttribute('aria-checked', 'false');
  });

  it('supports keyboard activation', () => {
    render(<CheckmarkContainer title="Pick any" state="pre" items={items} />);

    const checkbox = screen.getAllByRole('checkbox')[1];
    fireEvent.keyDown(checkbox, { key: ' ', code: 'Space' });

    expect(checkbox).toHaveAttribute('aria-checked', 'true');
  });

  it('does not toggle when disabled', async () => {
    const user = userEvent.setup();
    render(<CheckmarkContainer title="Pick any" state="disabled" items={items} />);

    const checkbox = screen.getAllByRole('checkbox')[0];
    expect(checkbox).toHaveAttribute('tabindex', '-1');

    await user.click(checkbox);
    expect(checkbox).toHaveAttribute('aria-checked', 'false');
  });
});
