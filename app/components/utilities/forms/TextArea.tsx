// app\components\utilities\forms\TextArea.tsx
import React from 'react';
import styles from './TextArea.module.css';

export type TextAreaState = 'pre' | 'focus' | 'valid' | 'invalid' | 'disabled';

export interface TextAreaProps {
  name: string;
  label: string;
  placeholder?: string;
  state: TextAreaState;
  errorText?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  onFocus: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
}

const TextArea: React.FC<TextAreaProps> = ({
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

  // Using name as the id ensures uniqueness and ties to the name attribute.
  const inputId = name;

  return (
    <div className={styles.fieldContainer}>
      <label htmlFor={inputId} className={styles.fieldLabel}>
        {label}
      </label>
      <div className={`${styles.textareaWrapper} ${stateClass}`}>
        <div className={styles.textareaTop}></div>
        <div className={styles.textareaMiddle}>
          <textarea
            id={inputId}
            name={name}
            placeholder={placeholder || ''}
            aria-label={label}
            aria-invalid={state === 'invalid' ? 'true' : 'false'}
            aria-disabled={state === 'disabled' ? 'true' : undefined}
            aria-describedby={
              state === 'invalid' && errorText ? `${inputId}-error` : undefined
            }
            className={styles.textArea}
            disabled={state === 'disabled'}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            onFocus={onFocus}
          />
        </div>
        <div className={styles.textareaBottom}></div>
      </div>
      {state === 'invalid' && errorText && (
        <span id={`${inputId}-error`} className={styles.errorText}>
          {errorText}
        </span>
      )}
    </div>
  );
};

export default TextArea;
