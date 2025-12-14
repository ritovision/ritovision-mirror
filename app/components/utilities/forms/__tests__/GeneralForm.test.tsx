import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import GeneralForm from '../GeneralForm';
import { submitForm } from '@/lib/forms/client/submitForm';

vi.mock('@/lib/forms/client/submitForm', () => ({
  submitForm: vi.fn(),
}));

describe('GeneralForm', () => {
  const fillValidForm = async (user: ReturnType<typeof userEvent.setup>) => {
    await user.type(screen.getByLabelText('Name'), 'Jane Doe');
    await user.type(screen.getByLabelText('Email'), 'jane@example.com');
    await user.type(
      screen.getByLabelText('Message'),
      'This is a long enough message to pass validation.'
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('shows validation errors on submit when fields are empty', async () => {
    const user = userEvent.setup();
    render(<GeneralForm />);

    await user.click(screen.getByRole('button', { name: 'Submit' }));

    expect(await screen.findByText('Name is required')).toBeInTheDocument();
    expect(screen.getByText('Email is required')).toBeInTheDocument();
    expect(screen.getByText('Message is required')).toBeInTheDocument();
  });

  it('submits successfully, resets the form, and shows success modal', async () => {
    const submitFormMock = submitForm as unknown as vi.Mock;
    submitFormMock.mockResolvedValue({ success: true });
    const user = userEvent.setup();

    render(<GeneralForm />);
    await fillValidForm(user);

    await user.click(screen.getByRole('button', { name: 'Submit' }));

    expect(submitFormMock).toHaveBeenCalledWith('general', {
      name: 'Jane Doe',
      email: 'jane@example.com',
      message: 'This is a long enough message to pass validation.',
    });

    expect(
      await screen.findByText('Submission successful. Thank you!')
    ).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByLabelText('Name')).toHaveValue('');
      expect(screen.getByLabelText('Email')).toHaveValue('');
      expect(screen.getByLabelText('Message')).toHaveValue('');
    });
  });

  it('shows error modal when submission fails', async () => {
    const submitFormMock = submitForm as unknown as vi.Mock;
    submitFormMock.mockResolvedValue({ success: false, error: 'Server down' });
    const user = userEvent.setup();

    render(<GeneralForm />);
    await fillValidForm(user);

    await user.click(screen.getByRole('button', { name: 'Submit' }));

    expect(await screen.findByText('Server down')).toBeInTheDocument();
  });
});
