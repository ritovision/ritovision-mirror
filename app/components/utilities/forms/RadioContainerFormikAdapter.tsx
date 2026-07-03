'use client';
import React, { useState } from 'react';
import { useField, useFormikContext } from 'formik';
import styles from './RadioContainer.module.css';

export type ContainerState = 'pre' | 'focus' | 'valid' | 'invalid' | 'disabled';

interface RadioContainerFormikAdapterProps {
  name: string;
  title: string;
  items: string[];
}

const RadioContainerFormikAdapter: React.FC<RadioContainerFormikAdapterProps> = ({
  name,
  title,
  items,
}) => {
  const [field, meta, helpers] = useField(name);
  const formik = useFormikContext();
  const [isFocused, setIsFocused] = useState(false);

  // Determine which index is selected based on Formik’s field value.
  const selectedIndex = items.findIndex((item) => item === field.value);

  // Determine visual state.
  let state: ContainerState = 'pre';
  if (formik.isSubmitting) {
    state = 'disabled';
  } else if (isFocused) {
    state = 'focus';
  } else if (meta.touched) {
    state = meta.error ? 'invalid' : 'valid';
  }

  return (
    <div
      className={`${styles.container} ${styles[state]}`}
      role="radiogroup"
      aria-labelledby="radio-container-title"
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    >
      <div id="radio-container-title" className={styles.title}>
        {title}
      </div>
      <div className={styles.itemsContainer}>
        {items.map((item, index) => (
          <div
            key={index}
            className={styles.item}
            role="radio"
            tabIndex={state !== 'disabled' ? 0 : -1}
            aria-checked={selectedIndex === index}
            onClick={() => {
              if (state !== 'disabled') {
                helpers.setValue(item);
                helpers.setTouched(true);
              }
            }}
            onKeyDown={(e) => {
              if (
                state !== 'disabled' &&
                (e.key === 'Enter' || e.key === ' ')
              ) {
                e.preventDefault();
                helpers.setValue(item);
                helpers.setTouched(true);
              }
            }}
          >
            <div className={styles.radioButton}>
              {selectedIndex === index && (
                <div className={styles.radioInner} />
              )}
            </div>
            <div className={styles.itemText}>{item}</div>
          </div>
        ))}
      </div>
      {meta.touched && meta.error && (
        <span id={`${name}-error`} className={styles.errorText}>
          {meta.error}
        </span>
      )}
    </div>
  );
};

export default RadioContainerFormikAdapter;
