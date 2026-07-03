import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { SymbolTypeDropdown } from '../SymbolTypeDropdown';

vi.mock('@/components/utilities/dropdown/Dropdown', () => ({
  __esModule: true,
  default: ({
    label,
    items,
    selectedValue,
    onChange,
  }: {
    label: string;
    items: string[];
    selectedValue: string;
    onChange: (val: string) => void;
  }) => (
    <label>
      <span>{label}</span>
      <select
        data-testid="symbol-dropdown"
        value={selectedValue || ''}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">Select</option>
        {items.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </label>
  ),
}));

describe('SymbolTypeDropdown', () => {
  it('renders label and items with default empty selection', () => {
    render(<SymbolTypeDropdown preset="default" onChange={vi.fn()} />);

    expect(screen.getByText('Symbol Type')).toBeInTheDocument();
    const select = screen.getByTestId('symbol-dropdown') as HTMLSelectElement;
    expect(select.value).toBe('');
    expect(select.querySelectorAll('option')).toHaveLength(5); // Select + 4 items
  });

  it('lowercases the selected value before invoking onChange', () => {
    const handleChange = vi.fn();
    render(<SymbolTypeDropdown preset="default" onChange={handleChange} />);

    fireEvent.change(screen.getByTestId('symbol-dropdown'), {
      target: { value: 'Binary' },
    });

    expect(handleChange).toHaveBeenCalledWith('binary');
  });

  it('reflects preset selection when not default', () => {
    render(<SymbolTypeDropdown preset="japanese" onChange={vi.fn()} />);

    const select = screen.getByTestId('symbol-dropdown') as HTMLSelectElement;
    expect(select.value).toBe('Japanese');
  });
});
