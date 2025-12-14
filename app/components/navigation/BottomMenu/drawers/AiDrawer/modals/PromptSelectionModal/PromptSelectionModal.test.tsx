import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import PromptSelectionModal from './PromptSelectionModal';
import { renderWithStore } from '@/tests/utils/renderWithStore';
import { enableRealDispatch } from '@/tests/setup';
import type { RootState } from '@/store/rootReducer';

describe('PromptSelectionModal', () => {
  beforeEach(() => {
    enableRealDispatch();
  });

  const baseState = {
    aiPrompts: {
      prompts: [
        { id: 'a', name: 'First', text: 'One' },
        { id: 'b', name: 'Second', text: 'Two' },
      ],
      activePromptId: 'a',
    },
  } as Partial<RootState>;

  it('selects a prompt and updates active id', async () => {
    const { store } = renderWithStore(
      <PromptSelectionModal
        isOpen
        onClose={vi.fn()}
        onCreateNew={vi.fn()}
        onEdit={vi.fn()}
      />,
      { preloadedState: baseState }
    );

    await screen.findByText(/Choose an Active Prompt/);

    const secondPrompt = screen.getByRole('button', { name: /Second - Two/ });
    fireEvent.click(secondPrompt);

    expect(store.getState().aiPrompts.activePromptId).toBe('b');
  });

  it('opens edit and delete-all flows', async () => {
    const onEdit = vi.fn();
    const { store } = renderWithStore(
      <PromptSelectionModal
        isOpen
        onClose={vi.fn()}
        onCreateNew={vi.fn()}
        onEdit={onEdit}
      />,
      { preloadedState: baseState }
    );

    await screen.findByText(/Choose an Active Prompt/);

    const editButtons = screen.getAllByRole('button', { name: /Edit prompt/i });
    fireEvent.click(editButtons[0]);
    expect(onEdit).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'a', name: 'First' })
    );

    fireEvent.click(screen.getByRole('button', { name: /Delete All/ }));
    const confirm = await screen.findByRole('button', { name: 'Yes' });
    fireEvent.click(confirm);

    expect(store.getState().aiPrompts.prompts).toHaveLength(0);
  });
});
