// ./app/components/navigation/BottomMenu/drawers/AiDrawer/AiDrawer.tsx
import React, { forwardRef } from 'react';
import { AiDrawerContent } from './AiDrawerContent';
import { usePromptModals } from './hooks/usePromptModals';
import PromptSelectionModal from './modals/PromptSelectionModal/PromptSelectionModal';
import PromptEditModal from './modals/PromptEditModal/PromptEditModal';
import styles from './AiDrawer.module.css';

interface AiDrawerProps {
  height: number;
  opacity: number;
  fadeDurationMs: number;
}

export const AiDrawer = forwardRef<HTMLDivElement, AiDrawerProps>(
  ({ height, opacity, fadeDurationMs }, ref) => {
    const modalState = usePromptModals();

    return (
      <>
        <div
          ref={ref}
          id="ai-drawer-content"
          className={styles['ai-drawer']}
          style={{
            height: `${height}px`,
            overflowY: 'auto',
            overflowX: 'hidden',
            borderTop: '1px solid var(--secondary-blue)',
          }}
          role="region"
          aria-label="AI assistant"
          tabIndex={-1}
        >
          <AiDrawerContent opacity={opacity} fadeDurationMs={fadeDurationMs} modalState={modalState} />
        </div>

        <PromptSelectionModal
          isOpen={modalState.isSelectionOpen}
          onClose={modalState.closeSelection}
          onCreateNew={modalState.startCreateNew}
          onEdit={modalState.openEditor}
        />

        <PromptEditModal
          isOpen={modalState.isEditorOpen}
          editingPrompt={modalState.editingPrompt}
          onClose={modalState.closeEditor}
          onBack={modalState.backToSelection}
        />
      </>
    );
  }
);

AiDrawer.displayName = 'AiDrawer';
