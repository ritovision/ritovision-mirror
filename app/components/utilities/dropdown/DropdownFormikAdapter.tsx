'use client';
import React from 'react';
import { useField, useFormikContext } from 'formik';
import Dropdown, { DropdownState } from './Dropdown';

interface DropdownFormikAdapterProps {
  name: string;
  headerText?: string;
  items: string[];
  label?: string; // placeholder text
}

const DropdownFormikAdapter: React.FC<DropdownFormikAdapterProps> = ({
  name,
  headerText,
  items,
  label = 'Select an option',
}) => {
  const [field, meta, helpers] = useField(name);
  const formik = useFormikContext();

  // Determine visual state.
  let state: DropdownState = 'pre';
  if (formik.isSubmitting) {
    state = 'disabled';
  } else if (meta.touched) {
    state = meta.error ? 'invalid' : 'valid';
  }

  // When a selection is made, update the Formik field.
  const handleChange = (selected: string) => {
    // Update the field value first.
    helpers.setValue(selected);
    // Then trigger validation; once it passes, mark the field as touched.
    formik.validateField(name).then(() => {
      helpers.setTouched(true);
    });
  };

  return (
    <Dropdown
      label={label}
      headerText={headerText}
      items={items}
      state={state}
      onChange={handleChange}
      selectedValue={field.value}
    />
  );
};

export default DropdownFormikAdapter;
