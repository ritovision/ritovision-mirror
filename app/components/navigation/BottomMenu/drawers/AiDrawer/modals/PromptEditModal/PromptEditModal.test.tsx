import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import PromptEditModal from './PromptEditModal';
import { renderWithStore } from '@/tests/utils/renderWithStore';
import { enableRealDispatch } from '@/tests/setup';
import type { RootState } from '@/store/rootReducer';

describe('PromptEditModal', () => {
  beforeEach(() => {
    enableRealDispatch();
  });

  const baseState = {
    aiPrompts: {
      prompts: [{ id: '1', name: 'Default', text: 'Hello' }],
      activePromptId: '1',
    },
  } as Partial<RootState>;

  it('adds a new prompt when fields are valid', async () => {
    const onBack = vi.fn();
    const { store } = renderWithStore(
      <PromptEditModal
        isOpen
        editingPrompt={null}
        onBack={onBack}
        onClose={vi.fn()}
      />,
      { preloadedState: baseState }
    );

    await screen.findByText(/Write a prompt/);

    fireEvent.change(screen.getByLabelText(/Prompt Content/), { target: { value: 'New text' } });
    fireEvent.change(screen.getByLabelText(/Prompt Name/), { target: { value: 'New Name' } });

    fireEvent.click(screen.getByRole('button', { name: /Save prompt/i }));

    await waitFor(() => {
      expect(store.getState().aiPrompts.prompts).toHaveLength(2);
    });
    expect(onBack).toHaveBeenCalled();
  });

  it('shows validation error when fields are empty', async () => {
    renderWithStore(
      <PromptEditModal
        isOpen
        editingPrompt={null}
        onBack={vi.fn()}
        onClose={vi.fn()}
      />,
      { preloadedState: baseState }
    );

    await screen.findByText(/Write a prompt/);
    fireEvent.click(screen.getByRole('button', { name: /Save prompt/i }));

    expect(screen.getByLabelText(/Prompt Content/).className).toContain('inputError');
    expect(screen.getByLabelText(/Prompt Name/).className).toContain('inputError');
  });

  it('deletes the editing prompt when confirmed', async () => {
    const { store } = renderWithStore(
      <PromptEditModal
        isOpen
        editingPrompt={{ id: '1', name: 'Default', text: 'Hello' }}
        onBack={vi.fn()}
        onClose={vi.fn()}
      />,
      { preloadedState: baseState }
    );

    await screen.findByText(/Write a prompt/);

    fireEvent.click(screen.getByRole('button', { name: /Delete prompt/i }));
    const confirm = await screen.findByRole('button', { name: 'Yes' });
    fireEvent.click(confirm);

    await waitFor(() => {
      expect(store.getState().aiPrompts.prompts).toHaveLength(0);
    });
  });
});
