'use client';

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Dropdown from './Dropdown';
import styles from './DynamicFormSwitcher.module.css';

type FormEntry =
  | React.ComponentType
  | {
      label: string;
      component: React.ComponentType;
    };

interface DynamicFormSwitcherProps {
  defaultForm: string;
  formsMap: Record<string, FormEntry>;
  dropdownHeader?: string;
  animationDuration?: number; // in seconds
}

const DynamicFormSwitcher: React.FC<DynamicFormSwitcherProps> = ({
  defaultForm,
  formsMap,
  dropdownHeader = 'Select a form',
  animationDuration = 0.5,
}) => {
  const [selectedKey, setSelectedKey] = useState<string>(defaultForm);

  // Extract labels and component references
  const formOptions = Object.entries(formsMap).map(([key, value]) => {
    return {
      key,
      label: typeof value === 'function' ? key : value.label,
      component: typeof value === 'function' ? value : value.component,
    };
  });

  const selected = formOptions.find((item) => item.key === selectedKey);
  const SelectedComponent = selected?.component ?? (() => null);

  return (
    <div className={styles.container}>
      <Dropdown
        headerText={dropdownHeader}
        items={formOptions.map((f) => f.label)}
        selectedValue={selected?.label}
        onChange={(selectedLabel) => {
          const match = formOptions.find((f) => f.label === selectedLabel);
          if (match) setSelectedKey(match.key);
        }}
      />

      <motion.div
        layout
        transition={{ duration: animationDuration }}
        className={styles.formContainer}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedKey}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: animationDuration }}
          >
            <SelectedComponent />
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default DynamicFormSwitcher;
