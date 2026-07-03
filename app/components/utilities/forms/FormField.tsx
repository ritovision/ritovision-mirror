// app\components\utilities\forms\FormField.tsx
import React from 'react';
import styles from './FormField.module.css';

export type FormFieldState = 'pre' | 'focus' | 'valid' | 'invalid' | 'disabled';

export interface FormFieldProps {
  name: string;
  label: string;
  placeholder?: string;
  state: FormFieldState;
  errorText?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const FormField: React.FC<FormFieldProps> = ({
  name,
  label,
  placeholder,
  state,
  errorText,
  value,
  onChange,
  onBlur,
  onFocus,
}) => {
  let stateClass = '';
  switch (state) {
    case 'pre':
      stateClass = styles.pre;
      break;
    case 'focus':
      stateClass = styles.focus;
      break;
    case 'valid':
      stateClass = styles.valid;
      break;
    case 'invalid':
      stateClass = styles.invalid;
      break;
    case 'disabled':
      stateClass = styles.disabled;
      break;
    default:
      stateClass = styles.pre;
  }

  // Use the name as part of the id
  const inputId = name;

  return (
    <div className={styles.fieldContainer}>
      <label htmlFor={inputId} className={styles.fieldLabel}>
        {label}
      </label>
      <input
        id={inputId}
        name={name}
        type="text"
        placeholder={placeholder || ''}
        aria-label={label}
        aria-invalid={state === 'invalid' ? 'true' : 'false'}
        aria-disabled={state === 'disabled' ? 'true' : undefined}
        aria-describedby={
          state === 'invalid' && errorText ? `${inputId}-error` : undefined
        }
        className={`${styles.formField} ${stateClass}`}
        disabled={state === 'disabled'}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
      />
      {state === 'invalid' && errorText && (
        <span id={`${inputId}-error`} className={styles.errorText}>
          {errorText}
        </span>
      )}
    </div>
  );
};

export default FormField;
