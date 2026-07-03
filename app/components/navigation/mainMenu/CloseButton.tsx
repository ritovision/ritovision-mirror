import React from 'react';
import { motion } from 'framer-motion';
import styles from './CloseButton.module.css';
import { closeButtonVariants } from './menuAnimations';

interface CloseButtonProps {
  onClick: () => void;
}

const CloseButton: React.FC<CloseButtonProps> = ({ onClick }) => {
  return (
    <motion.button 
      className={styles.closeButton} 
      onClick={onClick}
      initial="hidden"
      animate="visible"
      whileHover={{ scale: 1.1 }}
      variants={closeButtonVariants}
      aria-label="Close menu"
      type="button"
    >
      <svg 
        width="30" 
        height="30" 
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <line
          x1="4"
          y1="4"
          x2="20"
          y2="20"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <line
          x1="20"
          y1="4"
          x2="4"
          y2="20"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </motion.button>
  );
};

export default CloseButton;