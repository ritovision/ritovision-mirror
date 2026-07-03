'use client';

import * as Accordion from '@radix-ui/react-accordion';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, ReactNode } from 'react';
import styles from './Accordion.module.css';

export interface AccordionItem {
  title: string;
  content: ReactNode;
  value: string;
}

interface AccordionProps {
  items: AccordionItem[];
}

const variants = {
  open: { height: 'auto', opacity: 1 },
  collapsed: { height: 0, opacity: 0 },
};

export function AccordionComponent({ items }: AccordionProps) {
  const [openItems, setOpenItems] = useState<string[]>([]);

  return (
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
              <Accordion.Trigger className={styles.accordionTrigger}>
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
                      animate={{
                        rotate: isOpen ? 0 : 90,
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                </div>
              </Accordion.Trigger>
            </Accordion.Header>

            <Accordion.Content forceMount asChild>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    className={styles.contentWrapper}
                    initial="collapsed"
                    animate="open"
                    exit="collapsed"
                    variants={variants}
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
  );
}
