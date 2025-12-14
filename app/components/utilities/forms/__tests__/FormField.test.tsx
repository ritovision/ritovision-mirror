import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import FormField from '../FormField';

describe('FormField', () => {
  it('renders label and placeholder', () => {
    render(
      <FormField
        name="name"
        label="Name"
        placeholder="Your name"
        state="pre"
      />
    );

    const input = screen.getByLabelText('Name');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('placeholder', 'Your name');
    expect(screen.getByText('Name')).toHaveAttribute('for', 'name');
  });

  it('shows error text and aria props when invalid', () => {
    render(
      <FormField
        name="email"
        label="Email"
        placeholder="email@example.com"
        state="invalid"
        errorText="Email is required"
      />
    );

    const input = screen.getByLabelText('Email');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute('aria-describedby', 'email-error');
    expect(screen.getByText('Email is required')).toBeInTheDocument();
  });

  it('disables input when state is disabled', () => {
    render(
      <FormField
        name="name"
        label="Name"
        state="disabled"
        placeholder="disabled"
      />
    );

    const input = screen.getByLabelText('Name');
    expect(input).toBeDisabled();
    expect(input).toHaveAttribute('aria-disabled', 'true');
  });

  it('invokes event handlers', () => {
    const onChange = vi.fn();
    const onBlur = vi.fn();
    const onFocus = vi.fn();

    render(
      <FormField
        name="name"
        label="Name"
        state="pre"
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
      />
    );

    const input = screen.getByLabelText('Name');
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: 'John' } });
    fireEvent.blur(input);

    expect(onFocus).toHaveBeenCalled();
    expect(onChange).toHaveBeenCalled();
    expect(onBlur).toHaveBeenCalled();
  });
});
