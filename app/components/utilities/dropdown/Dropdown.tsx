// ./app/components/utilities/dropdown/Dropdown.tsx
'use client';

import React, { useState, useRef, useEffect } from 'react';
import styles from './Dropdown.module.css';

export type DropdownState = 'pre' | 'valid' | 'invalid' | 'disabled';

interface DropdownProps {
  /** Label or placeholder shown before a selection is made */
  label?: string;
  /** Custom header text displayed above the dropdown (optional) */
  headerText?: string;
  /** The list of dropdown options */
  items: string[];
  /** Visual state for border/color styling */
  state?: DropdownState;
  /** Optional callback fired when a user selects an item */
  onChange?: (selected: string) => void;
  /**
   * (Style guide only) Forces the dropdown to render opened initially.
   * Real usage typically toggles open/closed in response to user clicks.
   */
  initialOpen?: boolean;
  /**
   * Controlled prop: if provided, the dropdown will display this value
   * as the selected value.
   */
  selectedValue?: string;
}

/**
 * A dropdown component with states: pre, valid, invalid, disabled.
 * Manages its 'opened' state internally. No white focus outline.
 */
const Dropdown: React.FC<DropdownProps> = ({
  label = 'Select an option',
  headerText,
  items,
  state = 'pre',
  onChange,
  initialOpen = false,
  selectedValue,
}) => {
  const [isOpen, setIsOpen] = useState(initialOpen);
  // If a controlled value is provided, use it; otherwise, use internal state.
  const [internalSelected, setInternalSelected] = useState<string>(selectedValue ?? '');

  // When selectedValue prop changes, update internal state.
  useEffect(() => {
    if (selectedValue !== undefined) {
      setInternalSelected(selectedValue);
    }
  }, [selectedValue]);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown if user clicks outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Toggle dropdown open/close if not disabled
  const handleToggle = () => {
    if (state !== 'disabled') {
      setIsOpen((prev) => !prev);
    }
  };

  // Handle selecting an item
  const handleSelect = (item: string) => {
    setInternalSelected(item);
    setIsOpen(false);
    onChange?.(item);
  };

  // Display text is either the chosen value or the placeholder label
  const displayText = internalSelected || label;

  // Build container class from the visual state + open
  const containerClass = `
    ${styles.dropdownContainer}
    ${styles[state]}
    ${isOpen ? styles.open : ''}
  `;

  // Triangle direction depends on isOpen
  const triangleClass = isOpen ? styles.triangleUp : styles.triangleDown;

  return (
    <div
      className={containerClass}
      ref={dropdownRef}
      data-testid="dropdown"
      aria-disabled={state === 'disabled' ? 'true' : undefined}
    >
      {/* Render header text above the dropdown if provided */}
      {headerText && (
        <div className={styles.dropdownHeader}>{headerText}</div>
      )}

      {/* The clickable "button" area */}
      <div
        className={styles.dropdownButton}
        onClick={handleToggle}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleToggle();
          }
        }}
        role="button"
        tabIndex={0}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className={styles.displayText}>{displayText}</span>
        {/* Inline SVG for the triangle icon */}
        <svg
          className={`${styles.triangleIcon} ${triangleClass}`}
          width="12"
          height="12"
          viewBox="0 0 10 6"
          aria-hidden="true"
        >
          <path
            d="M1 1 L5 5 L9 1"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      </div>

      {/* The dropdown list (only shown if isOpen) */}
      {isOpen && (
        <ul
          className={styles.dropdownList}
          role="listbox"
          aria-label="Dropdown options"
        >
          {items.map((item, index) => (
            <li
              key={index}
              role="option"
              tabIndex={0}
              aria-selected={item === internalSelected}
              className={styles.dropdownItem}
              onClick={() => handleSelect(item)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleSelect(item);
                }
              }}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
