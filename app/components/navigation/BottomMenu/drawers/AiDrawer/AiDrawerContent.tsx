// app\components\navigation\BottomMenu\drawers\AiDrawer\AiDrawerContent.tsx
'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectActivePrompt } from '@/store/slices/navigation/aiPromptSlice'
import type { Prompt } from '@/store/slices/navigation/aiPromptSlice'
import { openAIDeeplink } from '../../utils/aiDeeplinks'
import { copyPageAsMarkdown } from '../../utils/markdownCopy'
import styles from './AiDrawer.module.css'

interface AiDrawerContentProps {
  opacity: number;
  fadeDurationMs: number;
  modalState: {
    isSelectionOpen: boolean;
    openSelection: () => void;
    closeSelection: () => void;
    isEditorOpen: boolean;
    openEditor: (prompt: Prompt) => void;
    startCreateNew: () => void;
    closeEditor: () => void;
    backToSelection: () => void;
    editingPrompt: Prompt | null;
  };
}

type StatusPhase = 'in' | 'out' | null

type StatusKind = 'success' | 'error'

interface StatusDetails {
  text: string
  type: StatusKind
}

export function AiDrawerContent({ opacity, fadeDurationMs, modalState }: AiDrawerContentProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const activePrompt = useSelector(selectActivePrompt)
  const promptName = mounted ? activePrompt?.name || 'None' : 'Default'
  const promptText = activePrompt?.text || ''

  const [primaryHiddenNow, setPrimaryHiddenNow] = useState(false)
  const [status, setStatus] = useState<StatusDetails | null>(null)
  const [statusPhase, setStatusPhase] = useState<StatusPhase>(null)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  const clearTimers = () => {
    timers.current.forEach(clearTimeout)
    timers.current = []
  }

  const runStatusFlow = (ok: boolean) => {
    clearTimers()
    setPrimaryHiddenNow(true)
    setStatus({
      text: ok ? 'Copied!' : 'Failed to Copy!',
      type: ok ? 'success' : 'error'
    })
    setStatusPhase('in')
    timers.current.push(
      setTimeout(() => {
        timers.current.push(
          setTimeout(() => {
            setStatusPhase('out')
            timers.current.push(
              setTimeout(() => {
                setStatus(null)
                setStatusPhase(null)
                setPrimaryHiddenNow(false)
              }, 750)
            )
          }, 2000)
        )
      }, 250)
    )
  }

  const handleCopyMarkdown = async () => {
    try {
      await copyPageAsMarkdown()
      runStatusFlow(true)
    } catch (error) {
      console.error('Failed to copy markdown:', error)
      runStatusFlow(false)
    }
  }

  const handleAIClick = (provider: 'chatgpt' | 'claude' | 'perplexity') => {
    const pageUrl = window.location.href
    openAIDeeplink(provider, promptText, pageUrl)
  }

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      if (modalState.isEditorOpen) {
        modalState.closeEditor()
      } else if (modalState.isSelectionOpen) {
        modalState.closeSelection()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [modalState])

  return (
    <>
      <div
        className={styles['ai-content']}
        style={{ opacity, transition: `opacity ${fadeDurationMs}ms ease` }}
      >
        <div className={styles.aiButtons}>
          <button
            className={`${styles.aiDrawerButton} ${styles.copyButton}`}
            onClick={handleCopyMarkdown}
            aria-label="Copy page as markdown"
          >
            <span
              className={[
                styles.buttonIconWrap,
                primaryHiddenNow ? styles.hiddenNow : ''
              ].join(' ')}
            >
              <svg
                className={styles.buttonIcon}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
            </span>

            <span className={styles.statusLabelWrap}>
              <span
                className={[
                  styles.primaryLabel,
                  primaryHiddenNow ? styles.hiddenNow : ''
                ].join(' ')}
              >
                Copy Page as Markdown
              </span>

              <span
                className={[
                  styles.statusLabel,
                  statusPhase === 'in' ? styles.statusIn : '',
                  statusPhase === 'out' ? styles.statusOut : ''
                ].join(' ')}
                role="status"
                aria-live="polite"
                aria-atomic="true"
              >
                {status?.type === 'success' && (
                  <svg
                    className={styles.statusIcon}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                )}
                {status?.text ?? ''}
              </span>
            </span>
          </button>

          <button
            className={`${styles.aiDrawerButton} ${styles.promptButton}`}
            onClick={modalState.openSelection}
            aria-label="Select AI prompt"
          >
            <span className={styles.promptButtonText}>Prompt Selected: {promptName}</span>
          </button>

          <button
            className={`${styles.aiDrawerButton} ${styles.chatgptButton}`}
            onClick={() => handleAIClick('chatgpt')}
            aria-label="Ask ChatGPT"
          >
            <Image
              src="/images/utilities/icons/logos/ChatGPT-logo-white.png"
              alt=""
              width={24}
              height={24}
              className={styles.providerLogo}
              aria-hidden="true"
            />
            <span>Ask ChatGPT</span>
          </button>

          <button
            className={`${styles.aiDrawerButton} ${styles.claudeButton}`}
            onClick={() => handleAIClick('claude')}
            aria-label="Ask Claude"
          >
            <Image
              src="/images/utilities/icons/logos/claude-logo-white.png"
              alt=""
              width={24}
              height={24}
              className={styles.providerLogo}
              aria-hidden="true"
            />
            <span>Ask Claude</span>
          </button>

          <button
            className={`${styles.aiDrawerButton} ${styles.perplexityButton}`}
            onClick={() => handleAIClick('perplexity')}
            aria-label="Ask Perplexity"
          >
            <Image
              src="/images/utilities/icons/logos/perplexity-logo-white.png"
              alt=""
              width={24}
              height={24}
              className={styles.providerLogo}
              aria-hidden="true"
            />
            <span>Ask Perplexity</span>
          </button>
        </div>

        <p className={styles.privacyNote}>
          RitoVision does not store, collect or access any of your conversations. All saved prompts are stored locally in your browser only.
        </p>
      </div>
    </>
  )
}
