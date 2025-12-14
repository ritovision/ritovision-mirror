'use client';
import React from 'react';
import { Formik, Form } from 'formik';
import { IFormProviderProps } from './FormProviderInterface'; // adjust path as needed

export const FormikFormProvider: React.FC<IFormProviderProps> = ({
  initialValues,
  validationSchema,
  onSubmit,
  children,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      validateOnChange={false}
      validateOnBlur={true}
      enableReinitialize={true}
    >
      {() => <Form>{children}</Form>}
    </Formik>
  );
};
