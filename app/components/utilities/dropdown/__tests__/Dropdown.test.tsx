import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Dropdown from '../Dropdown';

describe('Dropdown Component', () => {
    const mockItems = ['Option 1', 'Option 2', 'Option 3'];

    it('renders with default props', () => {
        render(<Dropdown items={mockItems} />);

        // Check for default label
        expect(screen.getByText('Select an option')).toBeDefined();
        // Check that it is closed by default (options not visible)
        expect(screen.queryByRole('listbox')).toBeNull();
    });

    it('renders with custom label and header text', () => {
        render(<Dropdown items={mockItems} label="Custom Label" headerText="Header Text" />);

        expect(screen.getByText('Custom Label')).toBeDefined();
        expect(screen.getByText('Header Text')).toBeDefined();
    });

    it('toggles open and close on click', () => {
        render(<Dropdown items={mockItems} />);

        const button = screen.getByRole('button');

        // Open
        fireEvent.click(button);
        expect(screen.getByRole('listbox')).toBeDefined();
        expect(screen.getByText('Option 1')).toBeDefined();

        // Close
        fireEvent.click(button);
        expect(screen.queryByRole('listbox')).toBeNull();
    });

    it('selects an item and calls onChange', () => {
        const handleChange = vi.fn();
        render(<Dropdown items={mockItems} onChange={handleChange} />);

        // Open
        fireEvent.click(screen.getByRole('button'));

        // Select Option 2
        fireEvent.click(screen.getByText('Option 2'));

        // Check that it closed
        expect(screen.queryByRole('listbox')).toBeNull();

        // Check that the value updated
        expect(screen.getByText('Option 2')).toBeDefined();

        // Check callback
        expect(handleChange).toHaveBeenCalledWith('Option 2');
    });

    it('respects controlled selectedValue', () => {
        const { rerender } = render(<Dropdown items={mockItems} selectedValue="Option 1" />);

        expect(screen.getByText('Option 1')).toBeDefined();

        rerender(<Dropdown items={mockItems} selectedValue="Option 3" />);
        expect(screen.getByText('Option 3')).toBeDefined();
    });

    it('does not open when disabled', () => {
        render(<Dropdown items={mockItems} state="disabled" />);

        const button = screen.getByRole('button');
        fireEvent.click(button);

        expect(screen.queryByRole('listbox')).toBeNull();
    });

    it('closes when clicking outside', () => {
        render(<Dropdown items={mockItems} initialOpen={true} />);

        expect(screen.getByRole('listbox')).toBeDefined();

        fireEvent.mouseDown(document.body);

        expect(screen.queryByRole('listbox')).toBeNull();
    });

    it('handles keyboard navigation (Enter/Space to toggle)', () => {
        render(<Dropdown items={mockItems} />);

        const button = screen.getByRole('button');

        // Press Enter to open
        fireEvent.keyDown(button, { key: 'Enter' });
        expect(screen.getByRole('listbox')).toBeDefined();

        // Press Space to close
        fireEvent.keyDown(button, { key: ' ' });
        expect(screen.queryByRole('listbox')).toBeNull();
    });

    it('handles keyboard navigation (Enter/Space to select)', () => {
        const handleChange = vi.fn();
        render(<Dropdown items={mockItems} onChange={handleChange} initialOpen={true} />);

        const option = screen.getByText('Option 2');

        // Press Enter to select
        fireEvent.keyDown(option, { key: 'Enter' });
        expect(handleChange).toHaveBeenCalledWith('Option 2');
        expect(screen.queryByRole('listbox')).toBeNull();
    });
});
