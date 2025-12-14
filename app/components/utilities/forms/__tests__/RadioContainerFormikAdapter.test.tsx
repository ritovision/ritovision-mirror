import React from 'react';
import { act } from 'react-dom/test-utils';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Formik, FormikProps } from 'formik';
import * as yup from 'yup';
import RadioContainerFormikAdapter from '../RadioContainerFormikAdapter';

type FormValues = { choice: string };

const items = ['Alpha', 'Beta', 'Gamma'];

const validationSchema = yup.object({
  choice: yup.string().required('Choose an option'),
});

function renderAdapter(onSubmit: () => void = () => {}) {
  const formikRef = React.createRef<FormikProps<FormValues>>();

  render(
    <Formik<FormValues>
      initialValues={{ choice: '' }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      validateOnChange={false}
      validateOnBlur
      innerRef={formikRef}
    >
      <RadioContainerFormikAdapter name="choice" title="Pick one" items={items} />
    </Formik>
  );

  return {
    formikRef,
    user: userEvent.setup(),
  };
}

describe('RadioContainerFormikAdapter', () => {
  it('selects an item and updates Formik state', async () => {
    const { user, formikRef } = renderAdapter();

    const radios = screen.getAllByRole('radio');
    await user.click(radios[1]);

    await waitFor(() => {
      expect(formikRef.current?.values.choice).toBe(items[1]);
      expect(formikRef.current?.touched.choice).toBe(true);
    });
    expect(radios[1]).toHaveAttribute('aria-checked', 'true');
  });

  it('supports keyboard activation', async () => {
    const { user } = renderAdapter();
    const radios = screen.getAllByRole('radio');

    await user.tab(); // focus first radio
    await user.keyboard('{Enter}');

    expect(radios[0]).toHaveAttribute('aria-checked', 'true');
  });

  it('shows validation error when submitted empty', async () => {
    const { formikRef } = renderAdapter();

    await waitFor(() => expect(formikRef.current).toBeTruthy());
    await act(async () => {
      await formikRef.current?.submitForm();
    });

    expect(await screen.findByText('Choose an option')).toBeInTheDocument();
  });

  it('disables interaction while submitting', async () => {
    const { user, formikRef } = renderAdapter();
    const radios = screen.getAllByRole('radio');

    await waitFor(() => expect(formikRef.current).toBeTruthy());
    act(() => {
      formikRef.current?.setSubmitting(true);
    });

    expect(radios[0]).toHaveAttribute('tabindex', '-1');
    await user.click(radios[0]);
    expect(formikRef.current?.values.choice).toBe('');
  });
});
