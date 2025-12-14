import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Formik, FormikProps } from 'formik';
import { describe, expect, it } from 'vitest';
import SliderFormikAdapter from '../SliderFormikAdapter';

type FormValues = {
  rating: number;
};

const marks = [10, 20, 30];

const renderFormikSlider = async (initialValue = marks[0]) => {
  const formikRef = React.createRef<FormikProps<FormValues>>();

  render(
    <Formik<FormValues> initialValues={{ rating: initialValue }} onSubmit={() => {}} innerRef={formikRef}>
      <SliderFormikAdapter name="rating" title="Experience" marks={marks} />
    </Formik>
  );

  await waitFor(() => expect(formikRef.current).toBeTruthy());

  return {
    formikRef,
    slider: screen.getByRole('slider') as HTMLInputElement,
  };
};

describe('SliderFormikAdapter', () => {
  it('positions the slider according to the current field value', async () => {
    const { slider } = await renderFormikSlider(marks[1]);

    expect(slider).toHaveValue('1');
  });

  it('updates the Formik field value and touch state on change', async () => {
    const { formikRef, slider } = await renderFormikSlider(marks[0]);

    fireEvent.change(slider, { target: { value: '2' } });

    await waitFor(() => {
      expect(formikRef.current?.values.rating).toBe(marks[2]);
      expect(formikRef.current?.touched.rating).toBe(true);
    });
    expect(slider).toHaveValue('2');
  });

  it('falls back to the first mark when the current value is not in marks', async () => {
    const formikRef = React.createRef<FormikProps<FormValues>>();

    render(
      <Formik<FormValues> initialValues={{ rating: 999 }} onSubmit={() => {}} innerRef={formikRef}>
        <SliderFormikAdapter name="rating" title="Experience" marks={marks} />
      </Formik>
    );

    await waitFor(() => expect(formikRef.current).toBeTruthy());
    const slider = screen.getByRole('slider');

    expect(slider).toHaveValue('0'); // defaults to first mark when value is unmatched
    expect(formikRef.current?.values.rating).toBe(999); // preserves the original Formik value

    fireEvent.change(slider, { target: { value: '2' } });
    await waitFor(() => expect(formikRef.current?.values.rating).toBe(marks[2]));
  });
});
