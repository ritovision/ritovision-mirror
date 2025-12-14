import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Field } from 'formik';
import * as yup from 'yup';
import { FormikFormProvider } from '../FormikFormProvider';

describe('FormikFormProvider', () => {
  const schema = yup.object({
    name: yup.string().required('Name is required'),
  });

  it('renders children and submits values', async () => {
    const onSubmit = vi.fn();
    const user = userEvent.setup();

    render(
      <FormikFormProvider
        initialValues={{ name: 'Jane' }}
        validationSchema={schema}
        onSubmit={onSubmit}
      >
        <Field aria-label="name" name="name" />
        <button type="submit">Submit</button>
      </FormikFormProvider>
    );

    await user.click(screen.getByRole('button', { name: 'Submit' }));

    expect(onSubmit).toHaveBeenCalled();
    expect(onSubmit.mock.calls[0][0]).toEqual({ name: 'Jane' });
  });

  it('prevents submit when validation fails', async () => {
    const onSubmit = vi.fn();
    const user = userEvent.setup();

    render(
      <FormikFormProvider
        initialValues={{ name: '' }}
        validationSchema={schema}
        onSubmit={onSubmit}
      >
        <Field aria-label="name" name="name" />
        <button type="submit">Submit</button>
      </FormikFormProvider>
    );

    await user.click(screen.getByRole('button', { name: 'Submit' }));

    expect(onSubmit).not.toHaveBeenCalled();
  });
});
