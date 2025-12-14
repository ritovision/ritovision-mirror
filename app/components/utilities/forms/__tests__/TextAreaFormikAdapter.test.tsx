import React from 'react';
import { act } from 'react-dom/test-utils';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Formik, FormikProps } from 'formik';
import * as yup from 'yup';
import TextAreaFormikAdapter from '../TextAreaFormikAdapter';

type FormValues = { message: string };

const validationSchema = yup.object({
  message: yup.string().required('Message is required').min(5, 'Too short'),
});

function renderAdapter() {
  const formikRef = React.createRef<FormikProps<FormValues>>();

  render(
    <Formik<FormValues>
      initialValues={{ message: '' }}
      validationSchema={validationSchema}
      onSubmit={() => {}}
      validateOnChange={false}
      validateOnBlur
      innerRef={formikRef}
    >
      <TextAreaFormikAdapter
        name="message"
        label="Message"
        placeholder="Enter a message"
      />
    </Formik>
  );

  return {
    formikRef,
    textarea: screen.getByLabelText('Message') as HTMLTextAreaElement,
    user: userEvent.setup(),
  };
}

describe('TextAreaFormikAdapter', () => {
  it('shows focus state then validates on blur', async () => {
    const { textarea, user } = renderAdapter();

    await user.click(textarea);

    const wrapper = textarea.parentElement?.parentElement;
    await waitFor(() => {
      expect(wrapper?.className).toMatch(/focus/);
    });

    await user.tab(); // blur
    expect(await screen.findByText('Message is required')).toBeInTheDocument();
    expect(textarea).toHaveAttribute('aria-invalid', 'true');
  });

  it('revalidates on change after blur', async () => {
    const { textarea, user } = renderAdapter();

    await user.click(textarea);
    await user.tab();
    expect(await screen.findByText('Message is required')).toBeInTheDocument();

    await user.type(textarea, 'Hello there');

    await waitFor(() => {
      expect(textarea).toHaveAttribute('aria-invalid', 'false');
    });
    expect(screen.queryByText('Message is required')).not.toBeInTheDocument();
  });

  it('disables the textarea while submitting', async () => {
    const { textarea, formikRef } = renderAdapter();

    await waitFor(() => expect(formikRef.current).toBeTruthy());
    await act(async () => {
      formikRef.current?.setSubmitting(true);
    });

    await waitFor(() => {
      expect(textarea).toBeDisabled();
    });
  });
});
