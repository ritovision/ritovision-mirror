'use client';
import React, { useState } from 'react';
import { useField, useFormikContext } from 'formik';
import TextArea, { TextAreaState } from './TextArea';

interface TextAreaFormikAdapterProps {
  name: string;
  label: string;
  placeholder?: string;
}

const TextAreaFormikAdapter: React.FC<TextAreaFormikAdapterProps> = ({
  name,
  label,
  placeholder,
}) => {
  const [field, meta, helpers] = useField(name);
  const formik = useFormikContext();
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    setIsFocused(false);
    if (!meta.touched) {
      helpers.setTouched(true);
      setHasInteracted(true);
    }
    field.onBlur(e);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    field.onChange(e);
    if (hasInteracted) {
      formik.validateField(name);
    }
  };

  let state: TextAreaState = 'pre';
  if (formik.isSubmitting) {
    state = 'disabled';
  } else if (isFocused) {
    state = 'focus';
  } else if (meta.touched) {
    state = meta.error ? 'invalid' : 'valid';
  }

  return (
    <TextArea
      name={name}
      label={label}
      placeholder={placeholder}
      state={state}
      errorText={meta.error}
      value={field.value || ''}
      onChange={handleChange}
      onBlur={handleBlur}
      onFocus={handleFocus}
    />
  );
};

export default TextAreaFormikAdapter;
