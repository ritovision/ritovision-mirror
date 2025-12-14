import React from 'react';
import { act } from 'react-dom/test-utils';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Formik, FormikProps } from 'formik';
import * as yup from 'yup';
import CheckmarkContainerFormikAdapter from '../CheckmarkContainerFormikAdapter';

type FormValues = { selections: string[] };

const items = ['One', 'Two', 'Three'];

const validationSchema = yup.object({
  selections: yup.array().of(yup.string()).min(1, 'Pick at least one'),
});

function renderAdapter(onSubmit: () => void = () => {}) {
  const formikRef = React.createRef<FormikProps<FormValues>>();

  render(
    <Formik<FormValues>
      initialValues={{ selections: [] }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      validateOnChange={false}
      validateOnBlur
      innerRef={formikRef}
    >
      <CheckmarkContainerFormikAdapter
        name="selections"
        title="Pick some"
        items={items}
      />
    </Formik>
  );

  return {
    formikRef,
    user: userEvent.setup(),
  };
}

describe('CheckmarkContainerFormikAdapter', () => {
  it('adds and removes selections', async () => {
    const { user, formikRef } = renderAdapter();
    const checkboxes = screen.getAllByRole('checkbox');

    await user.click(checkboxes[0]);
    await waitFor(() => {
      expect(formikRef.current?.values.selections).toEqual([items[0]]);
    });
    expect(checkboxes[0]).toHaveAttribute('aria-checked', 'true');

    await user.click(checkboxes[0]);
    await waitFor(() => {
      expect(formikRef.current?.values.selections).toEqual([]);
    });
    expect(checkboxes[0]).toHaveAttribute('aria-checked', 'false');
  });

  it('supports keyboard activation', async () => {
    const { formikRef } = renderAdapter();
    const checkbox = screen.getAllByRole('checkbox')[1];

    fireEvent.keyDown(checkbox, { key: ' ', code: 'Space' });

    await waitFor(() => {
      expect(formikRef.current?.values.selections).toEqual([items[1]]);
    });
    expect(checkbox).toHaveAttribute('aria-checked', 'true');
  });

  it('shows validation error when submitted empty', async () => {
    const { formikRef } = renderAdapter();

    await waitFor(() => expect(formikRef.current).toBeTruthy());
    await act(async () => {
      await formikRef.current?.submitForm();
    });

    expect(await screen.findByText('Pick at least one')).toBeInTheDocument();
  });

  it('disables interaction while submitting', async () => {
    const { user, formikRef } = renderAdapter();
    const checkbox = screen.getAllByRole('checkbox')[0];

    await waitFor(() => expect(formikRef.current).toBeTruthy());
    act(() => {
      formikRef.current?.setSubmitting(true);
    });

    expect(checkbox).toHaveAttribute('tabindex', '-1');
    await user.click(checkbox);
    expect(formikRef.current?.values.selections).toEqual([]);
  });
});
