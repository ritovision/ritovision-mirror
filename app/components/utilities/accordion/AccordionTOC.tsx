// FILE: app\components\utilities\accordion\AccordionTOC.tsx
'use client';

import React, { useState, ReactNode } from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './AccordionTOC.module.css';

export interface AccordionItem {
  value: string;
  /** Allow ReactNode so we can pass JSX (SVG + text) */
  title: ReactNode;
  content: ReactNode;
}

interface AccordionTOCProps {
  items: AccordionItem[];
  /** Optional max-width (e.g. "700px", "80ch"). Falls back to CSS default (1000px). */
  maxWidth?: string;
  /** CSS margin-top for the outer container (e.g. "2rem"). Defaults to "2rem" */
  marginTop?: string;
  /** CSS margin-bottom for the outer container (e.g. "2rem"). Defaults to "2rem" */
  marginBottom?: string;
  /** Optional items to have open by default */
  defaultOpenItems?: string[];
}

// Export ToC-specific styles for use in mapToAccordionItems
export const tocStyles = {
  tocContent: styles.tocContent,
  linkList: styles.linkList,
  linkItem: styles.linkItem || styles.linkList, // Fallback to linkList if linkItem doesn't exist in CSS
  spacer: styles.spacer,
  primaryTitle: styles.primaryTitle,
};

export function AccordionTOC({
  items,
  maxWidth,
  marginTop = '2rem',
  marginBottom = '2rem',
  defaultOpenItems = [],
}: AccordionTOCProps) {
  const [openItems, setOpenItems] = useState<string[]>(defaultOpenItems);

  return (
    <div
      className={styles.outer}
      style={{ marginTop, marginBottom }}
      role="region"
      aria-label="Expandable content sections"
    >
      <div
        className={styles.wrapper}
        style={maxWidth ? { maxWidth } : undefined}
      >
        <Accordion.Root
          type="multiple"
          value={openItems}
          onValueChange={setOpenItems}
          className={styles.accordionRoot}
        >
          {items.map((item) => {
            const isOpen = openItems.includes(item.value);
            return (
              <Accordion.Item
                key={item.value}
                value={item.value}
                className={styles.accordionItem}
              >
                <Accordion.Header className={styles.accordionHeader}>
                  <Accordion.Trigger 
                    className={styles.accordionTrigger}
                    aria-expanded={isOpen}
                    aria-controls={`accordion-content-${item.value}`}
                  >
                    <div className={styles.headerWrapper}>
                      {/* now item.title can be JSX */}
                      <h2 className={styles.title}>{item.title}</h2>
                      <motion.div
                        className={styles.icon}
                        animate={{ rotate: 0 }}
                        transition={{ duration: 0.3 }}
                        aria-hidden="true"
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
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content 
                  forceMount 
                  asChild
                  id={`accordion-content-${item.value}`}
                >
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        className={styles.contentWrapper}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        style={{ overflow: 'hidden' }}
                      >
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          {item.content}
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Accordion.Content>
              </Accordion.Item>
            );
          })}
        </Accordion.Root>
      </div>
    </div>
  );
}