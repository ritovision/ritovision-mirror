import React from 'react';
import { AnyObjectSchema } from 'yup';

export interface IFormProviderProps<T extends Record<string, unknown> = Record<string, unknown>> {
  initialValues: T;
  validationSchema: AnyObjectSchema;
  onSubmit: (values: T) => void;
  children: React.ReactNode;
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
  enableReinitialize?: boolean;
}

export type FormProviderComponent<T extends Record<string, unknown> = Record<string, unknown>> = React.FC<IFormProviderProps<T>>;
