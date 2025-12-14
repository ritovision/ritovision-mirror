import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactForm from '../ContactForm';
import type { FormSubmissionResponse } from '@/lib/forms/client/submitForm';

describe('ContactForm', () => {
  const fillForm = async (user: ReturnType<typeof userEvent.setup>) => {
    await user.type(screen.getByLabelText('Name'), 'Jane');
    await user.type(screen.getByLabelText('Email'), 'jane@example.com');
    await user.type(screen.getByLabelText('Message'), 'Hello world');
  };

  it('submits successfully and shows success modal', async () => {
    const submitFormFn = vi.fn<[], Promise<FormSubmissionResponse>>().mockResolvedValue({
      success: true,
    });
    const user = userEvent.setup();

    render(<ContactForm submitFormFn={submitFormFn} />);
    await fillForm(user);

    await user.click(screen.getByRole('button', { name: 'Send Message' }));

    await waitFor(() => expect(submitFormFn).toHaveBeenCalled());
    expect(submitFormFn).toHaveBeenCalledWith('contact', {
      name: 'Jane',
      email: 'jane@example.com',
      body: 'Hello world',
    });

    expect(
      await screen.findByText('Form submitted successfully!')
    ).toBeInTheDocument();
  });

  it('shows error modal when submission fails', async () => {
    const submitFormFn = vi
      .fn<[], Promise<FormSubmissionResponse>>()
      .mockResolvedValue({ success: false, error: 'Network error' });
    const user = userEvent.setup();

    render(<ContactForm submitFormFn={submitFormFn} />);
    await fillForm(user);

    await user.click(screen.getByRole('button', { name: 'Send Message' }));

    expect(await screen.findByText('Submission failed: Network error')).toBeInTheDocument();
  });

  it('disables submit button while submitting', async () => {
    let resolveSubmit: (value: FormSubmissionResponse) => void;
    const submitFormFn = vi
      .fn<[], Promise<FormSubmissionResponse>>()
      .mockImplementation(
        () =>
          new Promise<FormSubmissionResponse>((resolve) => {
            resolveSubmit = resolve;
          })
      );
    const user = userEvent.setup();

    render(<ContactForm submitFormFn={submitFormFn} />);
    await fillForm(user);

    const submitButton = screen.getByRole('button', { name: 'Send Message' });
    await user.click(submitButton);

    await waitFor(() => expect(submitButton).toBeDisabled());
    resolveSubmit!({ success: true });
    await waitFor(() => expect(submitButton).not.toBeDisabled());
  });
});
