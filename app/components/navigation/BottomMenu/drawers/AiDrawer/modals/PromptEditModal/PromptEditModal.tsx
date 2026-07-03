'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useDispatch } from 'react-redux'
import Image from 'next/image'
import { addPrompt, updatePrompt, deletePrompt, Prompt } from '@/store/slices/navigation/aiPromptSlice'
import ConfirmationModal from '../../../../modals/ConfirmationModal/ConfirmationModal'
import styles from './PromptEditModal.module.css'

interface PromptEditModalProps {
  isOpen: boolean
  editingPrompt: Prompt | null
  onClose: () => void
  onBack: () => void
}

export default function PromptEditModal({
  isOpen,
  editingPrompt,
  onClose,
  onBack,
}: PromptEditModalProps) {
  const dispatch = useDispatch()
  const [promptText, setPromptText] = useState('')
  const [promptName, setPromptName] = useState('')
  const [hasError, setHasError] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  // Track if component is mounted (for portal SSR compatibility)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (isOpen && editingPrompt) {
      setPromptText(editingPrompt.text)
      setPromptName(editingPrompt.name)
      setHasError(false)
    } else if (isOpen) {
      setPromptText('')
      setPromptName('')
      setHasError(false)
    }
  }, [isOpen, editingPrompt])

  if (!isOpen || !isMounted) return null

  const handleSave = () => {
    if (!promptText.trim() || !promptName.trim()) {
      setHasError(true)
      return
    }

    if (editingPrompt) {
      dispatch(updatePrompt({
        id: editingPrompt.id,
        prompt: {
          name: promptName.trim(),
          text: promptText.trim(),
        }
      }))
    } else {
      dispatch(addPrompt({
        name: promptName.trim(),
        text: promptText.trim(),
      }))
    }

    onBack()
  }

  const handleDeleteConfirm = () => {
    if (editingPrompt) {
      dispatch(deletePrompt(editingPrompt.id))
      setShowDeleteConfirm(false)
      onBack()
    }
  }

  const handleFocus = () => {
    setHasError(false)
  }

  return createPortal(
    <div
      className={styles.modalOverlay}
      onClick={onClose}
      aria-hidden={false}
      data-stop-drawer-close="true"         // ← ignore drawer outside-click while on overlay
      role="presentation"
    >
      <div
        className={styles.promptModal}
        role="dialog"
        aria-modal="true"
        data-stop-drawer-close="true"       // ← ignore drawer outside-click while inside modal
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.editModalContent}>
          <p className={styles.editInstructions}>
            Write a prompt that will appear at the top of your AI conversations.
          </p>

          <div className={styles.formGroup}>
            <label htmlFor="promptTextArea" className={styles.formLabel}>
              Prompt Content
            </label>
            <textarea
              id="promptTextArea"
              className={`${styles.promptTextarea} ${hasError && !promptText.trim() ? styles.inputError : ''}`}
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              onFocus={handleFocus}
              placeholder="Enter your prompt here..."
              rows={6}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="promptNameInput" className={styles.formLabel}>
              Prompt Name
            </label>
            <input
              id="promptNameInput"
              type="text"
              className={`${styles.promptInput} ${hasError && !promptName.trim() ? styles.inputError : ''}`}
              value={promptName}
              onChange={(e) => setPromptName(e.target.value)}
              onFocus={handleFocus}
              placeholder="Give it a name (for reference)"
            />
          </div>

          <div
            className={`${styles.editModalActions} ${
              !editingPrompt ? styles.noDelete : ''
            }`}
          >
            {/* Back Button */}
            <button
              className={`${styles.editActionButton} ${styles.backButton}`}
              onClick={onBack}
              aria-label="Go back to prompt selection"
            >
              <svg
                className={styles.arrowIcon}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Save Button with Icon and Text */}
            <button
              className={`${styles.editActionButton} ${styles.saveButton}`}
              onClick={handleSave}
              aria-label="Save prompt"
            >
              <svg
                className={styles.checkIcon}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                aria-hidden="true"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
              <span>Save</span>
            </button>

            {/* Delete Button (only when editing) */}
            {editingPrompt && (
              <button
                className={`${styles.editActionButton} ${styles.deleteButton}`}
                onClick={() => setShowDeleteConfirm(true)}
                aria-label="Delete prompt"
              >
                <Image
                  src="/images/utilities/icons/trash.svg"
                  alt=""
                  width={18}
                  height={18}
                  aria-hidden="true"
                />
              </button>
            )}
          </div>
        </div>

        {/* Confirmation Modal for Delete */}
        <ConfirmationModal
          isOpen={showDeleteConfirm}
          message="Delete this prompt?"
          onConfirm={handleDeleteConfirm}
          onCancel={() => setShowDeleteConfirm(false)}
        />
      </div>
    </div>,
    document.body
  )
}
