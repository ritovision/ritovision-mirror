"use client";

import React, { useState } from "react";
import Modal from "./Modal"; // In same folder
import Button from "../buttons/Button"; // One folder up, then buttons
import styles from "../../../styles/forms/page.module.css"; // Adjusted for your structure

const ModalDemo: React.FC = () => {
  // "primaryBlue" for success, "blackRed" for failure.
  const [isOpen, setIsOpen] = useState(false);
  const [variant, setVariant] = useState<"primaryBlue" | "blackRed">("primaryBlue");
  const [message, setMessage] = useState("Your form submission has been received!");

  const openSuccessModal = () => {
    setVariant("primaryBlue");
    setMessage("Your form submission has been received!");
    setIsOpen(true);
  };

  const openFailureModal = () => {
    setVariant("blackRed");
    setMessage("Form submission unsuccessful. An error has occurred.");
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <h2 className={styles.subheading}>Modal Demo</h2>
      <div style={{ display: "flex", gap: "20px", justifyContent: "center" }}>
        <Button
          text="Show Success"
          variant="blueAccentButton"
          onClick={openSuccessModal}
        />
        <Button
          text="Show Failure"
          variant="blueAccentButton"
          onClick={openFailureModal}
        />
      </div>

      <Modal isOpen={isOpen} onClose={closeModal} variant={variant}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          {variant === "primaryBlue" ? (
            /* Checkmark icon with green stroke */
            <svg width="50" height="50" fill="none" stroke="var(--utility-green)" strokeWidth="4">
              <path d="M10 25 L20 35 L40 15" />
            </svg>
          ) : (
            /* X icon with primary red stroke */
            <svg width="50" height="50" fill="none" stroke="var(--primary-red)" strokeWidth="4">
              <path d="M10 10 L40 40 M40 10 L10 40" />
            </svg>
          )}
          <p style={{ margin: "20px 0" }}>{message}</p>
          <Button
            text="Okay"
            variant={variant === "blackRed" ? "blackAndRedButton" : "blueAccentButton"}
            onClick={closeModal}
          />
        </div>
      </Modal>
    </div>
  );
};

export default ModalDemo;
