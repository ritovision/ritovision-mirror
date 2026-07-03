import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Formik, Form } from 'formik';
import DropdownFormikAdapter from '../DropdownFormikAdapter';

describe('DropdownFormikAdapter Component', () => {
    const mockItems = ['Option 1', 'Option 2', 'Option 3'];

    const renderWithFormik = (
        initialValues = { testField: '' },
        validationSchema?: Record<string, unknown>,
        isSubmitting = false
    ) => {
        return render(
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={() => { }}
                initialStatus={isSubmitting ? { isSubmitting: true } : undefined}
            >
                {(formikProps) => {
                    // Override isSubmitting if needed for testing
                    if (isSubmitting) {
                        (formikProps as { isSubmitting: boolean }).isSubmitting = true;
                    }
                    return (
                        <Form>
                            <DropdownFormikAdapter
                                name="testField"
                                items={mockItems}
                                label="Test Dropdown"
                                headerText="Test Header"
                            />
                        </Form>
                    );
                }}
            </Formik>
        );
    };

    it('renders with Formik integration', () => {
        renderWithFormik();
        expect(screen.getByText('Test Dropdown')).toBeDefined();
        expect(screen.getByText('Test Header')).toBeDefined();
    });

    it('shows pre state when not touched', () => {
        renderWithFormik();
        const container = screen.getByTestId('dropdown');

        // Pre state should not have valid/invalid classes
        expect(container.className).not.toContain('valid');
        expect(container.className).not.toContain('invalid');
    });

    it('updates Formik value when selection is made', async () => {
        renderWithFormik();

        // Open dropdown
        const button = screen.getByRole('button');
        fireEvent.click(button);

        // Select Option 2
        fireEvent.click(screen.getByText('Option 2'));

        // Check that the value updated (check if Option 2 is now displayed)
        expect(screen.getByText('Option 2')).toBeDefined();
    });

    it('shows valid state when touched and no error', async () => {
        renderWithFormik({ testField: 'Option 1' });

        // Open and select to trigger touch
        const button = screen.getByRole('button');
        fireEvent.click(button);
        fireEvent.click(screen.getByText('Option 2'));

        // After selection, the field should be marked as touched and valid
        // We need to wait a bit for async validation
        await new Promise(resolve => setTimeout(resolve, 100));

        const dropdownContainer = screen.getByTestId('dropdown');
        expect(dropdownContainer.className).toContain('valid');
    });

    it('shows disabled state when form is submitting', () => {
        renderWithFormik({ testField: '' }, undefined, true);

        const dropdownContainer = screen.getByTestId('dropdown');
        expect(dropdownContainer.className).toContain('disabled');
        expect(dropdownContainer.getAttribute('aria-disabled')).toBe('true');
    });
});
