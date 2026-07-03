// FILE PATH: app/components/utilities/modal/ExternalSite.tsx

"use client";

import React from 'react';
import { Modal } from './index';
import Button from '../buttons/Button';
import styles from './ExternalSite.module.css';

export interface ExternalSiteModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
  message?: string;
  openInNewWindow?: boolean;
}

const ExternalSiteModal: React.FC<ExternalSiteModalProps> = ({
  isOpen,
  onClose,
  url,
  message = "You are about to leave RitoVision.com",
  openInNewWindow = false,
}) => {
  const handleLeave = () => {
    if (openInNewWindow) {
      window.open(url, '_blank');
    } else {
      window.location.href = url;
    }
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} variant="primaryBlue">
      <div className={styles.content}>
        <p className={styles.message}>{message}</p>
        <div className={styles.buttonGroup}>
          <Button
            text="Leave"
            variant="blueAccentButton"
            action={handleLeave}
            className={styles.leaveButton}
          />
          <Button
            text="Stay"
            variant="blackAndRedButton"
            action={onClose}
            className={styles.cancelButton}
          />
        </div>
      </div>
    </Modal>
  );
};

export default ExternalSiteModal;