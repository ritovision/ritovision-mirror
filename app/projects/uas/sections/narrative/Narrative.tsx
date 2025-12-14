// ./app/projects/uas/sections/narrative/Narrative.tsx
'use client';

import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import React, { ReactNode, useState, useEffect } from 'react';
import Checkmark from './Checkmark';
import styles from './Narrative.module.css';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '@/store/rootReducer';
import { toggleCheck } from '@/store/slices/pages/projects/uas/checkmarkSlice';

export interface NarrativeItem {
  title: string;
  content: ReactNode;
  value: string;
}

interface NarrativeProps {
  item: NarrativeItem;
}

// Use a typed Variants object and provide a valid Easing (cubic-bezier array).
const variants: Variants = {
  open: { height: 'auto', opacity: 1, transition: { duration: 0.3, ease: [0.42, 0, 0.58, 1] } },
  collapsed: { height: 0, opacity: 0, transition: { duration: 0 } },
};

export function Narrative({ item }: NarrativeProps) {
  const dispatch = useDispatch();
  const persistedChecked = useSelector(
    (state: RootState) => !!state.uasCheckmarks[item.value]
  );

  // Defer reading persisted state until client mount to avoid hydration mismatch
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const isChecked = mounted ? persistedChecked : false;

  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    dispatch(toggleCheck(item.value));
  };

  const handleAccordionChange = (value: string) => {
    const opening = !!value;
    setIsOpen(opening);
    // Only turn on the checkbox when accordion opens, and only if not already checked
    if (opening && !persistedChecked) {
      dispatch(toggleCheck(item.value));
    }
  };

  return (
    <div className={styles.narrativeContainer}>
      <Checkmark isChecked={isChecked} onToggle={handleToggle} />

      <div className={styles.accordionWrapper}>
        <AccordionPrimitive.Root
          type="single"
          collapsible
          value={isOpen ? item.value : ''}
          onValueChange={handleAccordionChange}
          className={styles.accordionRoot}
        >
          <AccordionPrimitive.Item value={item.value} className={styles.accordionItem}>
            <AccordionPrimitive.Header className={styles.accordionHeader}>
              <AccordionPrimitive.Trigger className={styles.accordionTrigger}>
                <div className={styles.headerWrapper}>
                  <h2 className={styles.title}>{item.title}</h2>
                  <motion.div
                    className={styles.icon}
                    animate={{ rotate: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      className={styles.iconLine}
                      animate={{
                        rotate: isOpen ? 90 : 0,
                        opacity: isOpen ? 0 : 1,
                      }}
                      transition={{ duration: 0.3 }}
                    />
                    <motion.div
                      className={styles.iconLine}
                      animate={{ rotate: isOpen ? 0 : 90 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                </div>
              </AccordionPrimitive.Trigger>
            </AccordionPrimitive.Header>

            <AccordionPrimitive.Content forceMount asChild>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    className={styles.contentWrapper}
                    initial="collapsed"
                    animate="open"
                    exit="collapsed"
                    variants={variants}
                    style={{ overflow: 'hidden' }}
                  >
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, transition: { duration: 0 } }}
                      transition={{ duration: 0.2 }}
                      className={styles.content}
                    >
                      {item.content}
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </AccordionPrimitive.Content>
          </AccordionPrimitive.Item>
        </AccordionPrimitive.Root>
      </div>
    </div>
  );
}
