'use client';
import React, { useState } from 'react';
import { useField, useFormikContext } from 'formik';
import FormField, { FormFieldState } from './FormField';

interface FormFieldFormikAdapterProps {
  name: string;
  label: string;
  placeholder?: string;
}

const FormFieldFormikAdapter: React.FC<FormFieldFormikAdapterProps> = ({
  name,
  label,
  placeholder,
}) => {
  const [field, meta, helpers] = useField(name);
  const formik = useFormikContext();
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(Boolean(e));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    if (!meta.touched) {
      helpers.setTouched(true);
      setHasInteracted(true);
    }
    field.onBlur(e);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    field.onChange(e);
    if (hasInteracted) {
      formik.validateField(name);
    }
  };

  let state: FormFieldState = 'pre';
  if (formik.isSubmitting) {
    state = 'disabled';
  } else if (isFocused) {
    state = 'focus';
  } else if (meta.touched) {
    state = meta.error ? 'invalid' : 'valid';
  }

  return (
    <FormField
      name={name}
      label={label}
      placeholder={placeholder}
      state={state}
      errorText={meta.error}
      value={field.value}
      onChange={handleChange}
      onBlur={handleBlur}
      onFocus={handleFocus}
    />
  );
};

export default FormFieldFormikAdapter;
