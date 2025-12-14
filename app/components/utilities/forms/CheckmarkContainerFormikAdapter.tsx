'use client';
import React from 'react';
import { useField, useFormikContext } from 'formik';
import styles from './CheckmarkContainer.module.css';

export type ContainerState = 'pre' | 'focus' | 'valid' | 'invalid' | 'disabled';

interface CheckmarkContainerFormikAdapterProps {
  name: string;
  title: string;
  items: string[];
}

const CheckmarkContainerFormikAdapter: React.FC<CheckmarkContainerFormikAdapterProps> = ({
  name,
  title,
  items,
}) => {
  const [field, meta, helpers] = useField(name);
  const formik = useFormikContext();
  
  // Field value should be an array of strings; default to empty array.
  const selectedItems: string[] = field.value || [];

  // Determine visual state.
  let state: ContainerState = 'pre';
  if (formik.isSubmitting) {
    state = 'disabled';
  } else if (meta.touched) {
    state = meta.error ? 'invalid' : 'valid';
  }

  // When toggling an item, update Formik's value.
  const toggleItem = (item: string) => {
    if (state === 'disabled') return;
    let newValue: string[];
    if (selectedItems.includes(item)) {
      newValue = selectedItems.filter(val => val !== item);
    } else {
      newValue = [...selectedItems, item];
    }
    helpers.setValue(newValue);
    helpers.setTouched(true);
  };

  return (
    <div
      className={`${styles.container} ${styles[state]}`}
      role="group"
      aria-labelledby={`${name}-checkmark-container-title`}
    >
      <div id={`${name}-checkmark-container-title`} className={styles.title}>
        {title}
      </div>
      <div className={styles.itemsContainer}>
        {items.map((item, index) => {
          const isChecked = selectedItems.includes(item);
          return (
            <div
              key={index}
              className={styles.item}
              role="checkbox"
              tabIndex={state !== 'disabled' ? 0 : -1}
              aria-checked={isChecked}
              onClick={() => toggleItem(item)}
              onKeyDown={(e) => {
                if (state !== 'disabled' && (e.key === 'Enter' || e.key === ' ')) {
                  e.preventDefault();
                  toggleItem(item);
                }
              }}
            >
              <div className={styles.checkBox}>
                {isChecked && (
                  <svg
                    viewBox="0 0 24 24"
                    className={styles.checkIcon}
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9 16.2l-3.5-3.5L4 14.2l5 5 12-12-1.5-1.5L9 16.2z" />
                  </svg>
                )}
              </div>
              <div className={styles.itemText}>{item}</div>
            </div>
          );
        })}
      </div>
      {meta.touched && meta.error && (
        <span id={`${name}-error`} className={styles.errorText}>
          {meta.error}
        </span>
      )}
    </div>
  );
};

export default CheckmarkContainerFormikAdapter;
