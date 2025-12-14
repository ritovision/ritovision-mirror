import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import DynamicFormSwitcher from '../DynamicFormSwitcher';

// Mock components for testing
const FormA = () => <div data-testid="form-a">Form A Content</div>;
const FormB = () => <div data-testid="form-b">Form B Content</div>;

describe('DynamicFormSwitcher Component', () => {
    const formsMap = {
        formA: { label: 'Form A', component: FormA },
        formB: { label: 'Form B', component: FormB },
    };

    it('renders the default form initially', () => {
        render(
            <DynamicFormSwitcher
                defaultForm="formA"
                formsMap={formsMap}
            />
        );

        expect(screen.getByTestId('form-a')).toBeDefined();
        expect(screen.queryByTestId('form-b')).toBeNull();
        // Check dropdown label
        expect(screen.getByText('Form A')).toBeDefined();
    });

    it('switches forms when a new option is selected', async () => {
        render(
            <DynamicFormSwitcher
                defaultForm="formA"
                formsMap={formsMap}
                animationDuration={0} // Disable animation for easier testing
            />
        );

        // Open dropdown
        const button = screen.getByRole('button');
        fireEvent.click(button);

        // Select Form B
        const optionB = screen.getByText('Form B');
        fireEvent.click(optionB);

        // Wait for Form B to appear and Form A to disappear
        await waitFor(() => {
            expect(screen.getByTestId('form-b')).toBeDefined();
        });
        expect(screen.queryByTestId('form-a')).toBeNull();
    });

    it('renders correct header text', () => {
        render(
            <DynamicFormSwitcher
                defaultForm="formA"
                formsMap={formsMap}
                dropdownHeader="Choose your destiny"
            />
        );

        expect(screen.getByText('Choose your destiny')).toBeDefined();
    });

    it('handles simplified formsMap (component only)', () => {
        const simpleMap = {
            SimpleA: FormA,
            SimpleB: FormB
        };

        render(
            <DynamicFormSwitcher
                defaultForm="SimpleA"
                formsMap={simpleMap as Record<string, React.ComponentType>} // Type cast to match component-only formsMap
            />
        );

        expect(screen.getByTestId('form-a')).toBeDefined();
        expect(screen.getByText('SimpleA')).toBeDefined();
    });
});
