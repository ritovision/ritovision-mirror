import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, fireEvent, act } from '@testing-library/react';
import { renderWithStore } from '@/tests/utils/renderWithStore';
import { enableRealDispatch } from '@/tests/setup';
import { AiDrawerContent } from './AiDrawerContent';
import type { RootState } from '@/store/rootReducer';

vi.mock('../../utils/markdownCopy', () => ({
  copyPageAsMarkdown: vi.fn().mockResolvedValue(undefined),
}));

vi.mock('../../utils/aiDeeplinks', () => ({
  openAIDeeplink: vi.fn(),
}));

describe('AiDrawerContent', () => {
  beforeEach(() => {
    enableRealDispatch();
  });

  const modalState = {
    isSelectionOpen: false,
    openSelection: vi.fn(),
    closeSelection: vi.fn(),
    isEditorOpen: false,
    openEditor: vi.fn(),
    startCreateNew: vi.fn(),
    closeEditor: vi.fn(),
    backToSelection: vi.fn(),
    editingPrompt: null,
  };

  it('shows the active prompt name and opens selection modal', () => {
    renderWithStore(
      <AiDrawerContent opacity={1} fadeDurationMs={0} modalState={modalState} />,
      {
        preloadedState: {
          aiPrompts: {
            prompts: [{ id: 'x', name: 'Custom', text: 'Hello' }],
            activePromptId: 'x',
          },
        } as Partial<RootState>,
      }
    );

    expect(screen.getByText(/Prompt Selected: Custom/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /select ai prompt/i }));
    expect(modalState.openSelection).toHaveBeenCalled();
  });

  it('copies markdown and shows status feedback', async () => {
    const { copyPageAsMarkdown } = await import('../../utils/markdownCopy');

    renderWithStore(
      <AiDrawerContent opacity={1} fadeDurationMs={0} modalState={modalState} />,
      { preloadedState: { aiPrompts: { prompts: [], activePromptId: '' } } as Partial<RootState> }
    );

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /copy page as markdown/i }));
    });
    expect(copyPageAsMarkdown).toHaveBeenCalled();

    await screen.findByText('Copied!', {}, { timeout: 500 });
  });

  it('sends deeplink requests with prompt text', async () => {
    const { openAIDeeplink } = await import('../../utils/aiDeeplinks');
    renderWithStore(
      <AiDrawerContent opacity={1} fadeDurationMs={0} modalState={modalState} />,
      {
        preloadedState: {
          aiPrompts: {
            prompts: [{ id: 'p1', name: 'Name', text: 'Prompt text' }],
            activePromptId: 'p1',
          },
        } as Partial<RootState>,
      }
    );

    fireEvent.click(screen.getByRole('button', { name: /ask chatgpt/i }));
    expect(openAIDeeplink).toHaveBeenCalledWith(
      'chatgpt',
      'Prompt text',
      window.location.href
    );
  });
});
