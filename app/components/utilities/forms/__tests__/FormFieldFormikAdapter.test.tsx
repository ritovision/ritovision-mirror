import React from 'react';
import { act } from 'react-dom/test-utils';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Formik, FormikProps } from 'formik';
import * as yup from 'yup';
import FormFieldFormikAdapter from '../FormFieldFormikAdapter';

type FormValues = { name: string };

const validationSchema = yup.object({
  name: yup.string().required('Name is required').min(2, 'Too short'),
});

function renderAdapter() {
  const formikRef = React.createRef<FormikProps<FormValues>>();

  render(
    <Formik<FormValues>
      initialValues={{ name: '' }}
      validationSchema={validationSchema}
      onSubmit={() => {}}
      validateOnChange={false}
      validateOnBlur
      innerRef={formikRef}
    >
      <FormFieldFormikAdapter name="name" label="Name" placeholder="Your name" />
    </Formik>
  );

  return {
    formikRef,
    input: screen.getByLabelText('Name') as HTMLInputElement,
    user: userEvent.setup(),
  };
}

describe('FormFieldFormikAdapter', () => {
  it('sets focus and blur state and surfaces validation errors', async () => {
    const { input, user } = renderAdapter();

    await user.click(input);
    expect(input.className).toMatch(/focus/);

    await user.tab(); // blur
    expect(await screen.findByText('Name is required')).toBeInTheDocument();
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  it('revalidates on change after initial blur', async () => {
    const { input, user } = renderAdapter();

    await user.click(input);
    await user.tab(); // blur to mark touched and show error
    expect(await screen.findByText('Name is required')).toBeInTheDocument();

    await user.type(input, 'John');

    await waitFor(() => {
      expect(input).toHaveAttribute('aria-invalid', 'false');
    });
    expect(screen.queryByText('Name is required')).not.toBeInTheDocument();
  });

  it('disables the input while the form is submitting', async () => {
    const { input, formikRef } = renderAdapter();

    await waitFor(() => expect(formikRef.current).toBeTruthy());
    await act(async () => {
      formikRef.current?.setSubmitting(true);
    });

    await waitFor(() => {
      expect(input).toBeDisabled();
    });
  });
});
