import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import TextArea from '../TextArea';

describe('TextArea', () => {
  it('renders label and placeholder', () => {
    render(
      <TextArea
        name="message"
        label="Message"
        placeholder="Type here"
        state="pre"
        value=""
        onChange={() => {}}
        onBlur={() => {}}
        onFocus={() => {}}
      />
    );

    const textarea = screen.getByLabelText('Message');
    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveAttribute('placeholder', 'Type here');
    expect(screen.getByText('Message')).toHaveAttribute('for', 'message');
  });

  it('shows error text and aria props when invalid', () => {
    render(
      <TextArea
        name="message"
        label="Message"
        state="invalid"
        errorText="Message is required"
        value=""
        onChange={() => {}}
        onBlur={() => {}}
        onFocus={() => {}}
      />
    );

    const textarea = screen.getByLabelText('Message');
    expect(textarea).toHaveAttribute('aria-invalid', 'true');
    expect(textarea).toHaveAttribute('aria-describedby', 'message-error');
    expect(screen.getByText('Message is required')).toBeInTheDocument();
  });

  it('disables textarea when state is disabled', () => {
    render(
      <TextArea
        name="message"
        label="Message"
        state="disabled"
        value="Disabled content"
        onChange={() => {}}
        onBlur={() => {}}
        onFocus={() => {}}
      />
    );

    const textarea = screen.getByLabelText('Message');
    expect(textarea).toBeDisabled();
    expect(textarea).toHaveAttribute('aria-disabled', 'true');
  });

  it('invokes event handlers', () => {
    const onChange = vi.fn();
    const onBlur = vi.fn();
    const onFocus = vi.fn();

    render(
      <TextArea
        name="message"
        label="Message"
        state="pre"
        value=""
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
      />
    );

    const textarea = screen.getByLabelText('Message');
    fireEvent.focus(textarea);
    fireEvent.change(textarea, { target: { value: 'Hello' } });
    fireEvent.blur(textarea);

    expect(onFocus).toHaveBeenCalled();
    expect(onChange).toHaveBeenCalled();
    expect(onBlur).toHaveBeenCalled();
  });
});
