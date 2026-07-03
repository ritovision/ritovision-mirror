import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { usePromptModals } from './usePromptModals';

describe('usePromptModals', () => {
  it('manages modal state transitions', () => {
    const { result } = renderHook(() => usePromptModals());

    act(() => result.current.openSelection());
    expect(result.current.isSelectionOpen).toBe(true);

    act(() => result.current.startCreateNew());
    expect(result.current.isSelectionOpen).toBe(false);
    expect(result.current.isEditorOpen).toBe(true);
    expect(result.current.editingPrompt).toBeNull();

    const prompt = { id: '1', name: 'Name', text: 'Text' };
    act(() => result.current.openEditor(prompt));
    expect(result.current.editingPrompt).toEqual(prompt);

    act(() => result.current.backToSelection());
    expect(result.current.isSelectionOpen).toBe(true);
    expect(result.current.isEditorOpen).toBe(false);

    act(() => result.current.closeSelection());
    act(() => result.current.closeEditor());
    expect(result.current.isSelectionOpen).toBe(false);
    expect(result.current.isEditorOpen).toBe(false);
  });
});
