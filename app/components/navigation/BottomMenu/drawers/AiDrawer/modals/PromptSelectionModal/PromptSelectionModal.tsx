'use client'

import type { MouseEvent } from 'react'
import { useMemo, useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import { useSelector, useDispatch } from 'react-redux'
import { selectPrompts, selectActivePromptId, setActivePrompt, deletePrompt, deleteAllPrompts, Prompt } from '@/store/slices/navigation/aiPromptSlice'
import ConfirmationModal from '../../../../modals/ConfirmationModal/ConfirmationModal'
import styles from './PromptSelectionModal.module.css'

interface PromptSelectionModalProps {
  isOpen: boolean
  onClose: () => void
  onCreateNew: () => void
  onEdit: (prompt: Prompt) => void
}

export default function PromptSelectionModal({
  isOpen,
  onClose,
  onCreateNew,
  onEdit,
}: PromptSelectionModalProps) {
  const dispatch = useDispatch()
  const prompts = useSelector(selectPrompts)
  const activePromptId = useSelector(selectActivePromptId)

  // Track animation state
  const [animatingPromptId, setAnimatingPromptId] = useState<string | null>(null)
  const [animationPhase, setAnimationPhase] = useState<
    'hidden' | 'showingActivated' | 'hidingActivated' | 'showingOriginal' | null
  >(null)
  const timeoutRefs = useRef<NodeJS.Timeout[]>([])

  // Track delete all confirmation
  const [showDeleteAllConfirm, setShowDeleteAllConfirm] = useState(false)

  // Store which prompt ID to sort by when modal opens
  const [sortByPromptId, setSortByPromptId] = useState<string | null>(null)

  // Track previous isOpen state to detect when modal first opens
  const prevIsOpen = useRef(false)

  // Track if component is mounted (for portal SSR compatibility)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (isOpen && !prevIsOpen.current) {
      setSortByPromptId(activePromptId)
    } else if (!isOpen && prevIsOpen.current) {
      setSortByPromptId(null)
      timeoutRefs.current.forEach(clearTimeout)
      timeoutRefs.current = []
      setAnimatingPromptId(null)
      setAnimationPhase(null)
    }
    prevIsOpen.current = isOpen
  }, [isOpen, activePromptId])

  const sortedPrompts = useMemo(() => {
    const sortId = sortByPromptId
    if (!sortId) return prompts
    return [...prompts].sort((a, b) => {
      if (a.id === sortId) return -1
      if (b.id === sortId) return 1
      return 0
    })
  }, [prompts, sortByPromptId])

  if (!isOpen || !isMounted) return null

  const handleSelectPrompt = (id: string) => {
    timeoutRefs.current.forEach(clearTimeout)
    timeoutRefs.current = []

    dispatch(setActivePrompt(id))

    setAnimatingPromptId(id)
    setAnimationPhase('hidden')

    const timeout1 = setTimeout(() => setAnimationPhase('showingActivated'), 0)
    const timeout2 = setTimeout(() => setAnimationPhase('hidingActivated'), 1750)
    const timeout3 = setTimeout(() => setAnimationPhase('showingOriginal'), 2500)
    const timeout4 = setTimeout(() => {
      setAnimatingPromptId(null)
      setAnimationPhase(null)
    }, 2750)

    timeoutRefs.current.push(timeout1, timeout2, timeout3, timeout4)
  }

  const handleDelete = (e: MouseEvent, id: string) => {
    e.stopPropagation()
    dispatch(deletePrompt(id))
  }

  const handleEdit = (e: MouseEvent, prompt: Prompt) => {
    e.stopPropagation()
    onEdit(prompt)
  }

  const handleDeleteAllConfirm = () => {
    dispatch(deleteAllPrompts())
    setShowDeleteAllConfirm(false)
  }

  return createPortal(
    <div
      className={styles.modalOverlay}
      onClick={onClose}
      aria-hidden={false}
      data-stop-drawer-close="true"
      role="presentation"
    >
      <div
        className={styles.promptModal}
        role="dialog"
        aria-modal="true"
        data-stop-drawer-close="true"
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.modalHeader}>
          <h3 className={styles.modalTitle}>Choose an Active Prompt</h3>
          <p className={styles.modalInstructions}>
            When asking an AI provider, it will autofill before the current page's URL.
          </p>
        </div>
        <div className={styles.promptList}>
          {sortedPrompts.map((prompt: Prompt) => {  // ← typed to fix TS7006
            const isActive = prompt.id === activePromptId
            const isAnimating = prompt.id === animatingPromptId

            let promptTextClass = ''
            let activationMessageClass = ''

            if (isAnimating) {
              if (animationPhase === 'hidden') {
                promptTextClass = styles.promptTextHidden
              } else if (animationPhase === 'showingActivated') {
                promptTextClass = styles.promptTextHidden
                activationMessageClass = styles.activatedTextIn
              } else if (animationPhase === 'hidingActivated') {
                promptTextClass = styles.promptTextHidden
                activationMessageClass = styles.activatedTextOut
              } else if (animationPhase === 'showingOriginal') {
                promptTextClass = styles.promptTextIn
              }
            }

            return (
              <div
                key={prompt.id}
                className={`${styles.promptListButton} ${isActive ? styles.activePrompt : ''}`}
                onClick={() => handleSelectPrompt(prompt.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    handleSelectPrompt(prompt.id)
                  }
                }}
              >
                <div className={styles.promptTextWrapper}>
                  <span className={`${styles.promptListText} ${promptTextClass}`}>
                    <span className={styles.promptName}>{prompt.name}</span>
                    {' - '}
                    <span className={styles.promptText}>{prompt.text}</span>
                  </span>
                  {isAnimating && (
                    <span className={`${styles.activationMessage} ${activationMessageClass}`}>
                      Prompt Activated!
                    </span>
                  )}
                </div>
                <div className={styles.promptActions}>
                  <button
                    className={styles.promptActionButton}
                    onClick={(e) => handleEdit(e, prompt)}
                    aria-label="Edit prompt"
                  >
                    <Image
                      src="/images/utilities/icons/edit.svg"
                      alt=""
                      width={16}
                      height={16}
                      aria-hidden="true"
                    />
                  </button>
                  <button
                    className={`${styles.promptActionButton} ${styles.deleteButton}`}
                    onClick={(e) => handleDelete(e, prompt.id)}
                    aria-label="Delete prompt"
                  >
                    <Image
                      src="/images/utilities/icons/trash.svg"
                      alt=""
                      width={14}
                      height={14}
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        <div className={styles.promptModalFooter}>
          <button
            className={styles.promptFooterButton}
            onClick={onClose}
            aria-label="Go back"
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

          <button
            className={styles.promptFooterButton}
            onClick={onCreateNew}
          >
            + Create Prompt
          </button>

          <button
            className={`${styles.promptFooterButton} ${styles.deleteAllButton}`}
            onClick={() => setShowDeleteAllConfirm(true)}
          >
            <span>Delete All</span>
            <Image
              src="/images/utilities/icons/trash.svg"
              alt=""
              width={14}
              height={14}
              aria-hidden="true"
              className={styles.trashIcon}
            />
          </button>
        </div>

        <ConfirmationModal
          isOpen={showDeleteAllConfirm}
          message="Delete all saved prompts?"
          onConfirm={handleDeleteAllConfirm}
          onCancel={() => setShowDeleteAllConfirm(false)}
        />
      </div>
    </div>,
    document.body
  )
}
