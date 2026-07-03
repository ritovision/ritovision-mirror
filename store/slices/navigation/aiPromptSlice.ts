// \test\store\slices\navigation\aiPromptSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Prompt {
  id: string;
  name: string;
  text: string;
}

interface AIPromptState {
  prompts: Prompt[];
  activePromptId: string;
}

const defaultPrompt: Prompt = {
  id: 'default',
  name: 'Default',
  text: 'Please explain this webpage to me',
};

const initialState: AIPromptState = {
  prompts: [defaultPrompt],
  activePromptId: 'default',
};

const aiPromptSlice = createSlice({
  name: "aiPrompts",
  initialState,
  reducers: {
    /**
     * Add a new prompt to the list.
     * Generates a unique ID based on timestamp.
     */
    addPrompt(state, action: PayloadAction<Omit<Prompt, 'id'>>) {
      const id = Date.now().toString();
      state.prompts.push({ ...action.payload, id });
    },

    /**
     * Update an existing prompt by ID.
     */
    updatePrompt(state, action: PayloadAction<{ id: string; prompt: Omit<Prompt, 'id'> }>) {
      const { id, prompt } = action.payload;
      const index = state.prompts.findIndex(p => p.id === id);
      if (index !== -1) {
        state.prompts[index] = { ...prompt, id };
      }
    },

    /**
     * Delete a prompt by ID.
     * If deleting the active prompt, reset to first available or empty string.
     */
    deletePrompt(state, action: PayloadAction<string>) {
      const id = action.payload;
      state.prompts = state.prompts.filter(p => p.id !== id);

      // If deleting active prompt, reset to first available or empty string
      if (state.activePromptId === id) {
        state.activePromptId = state.prompts[0]?.id || '';
      }
    },

    /**
     * Delete all prompts.
     */
    deleteAllPrompts(state) {
      state.prompts = [];
      state.activePromptId = '';
    },

    /**
     * Set the active prompt by ID.
     */
    setActivePrompt(state, action: PayloadAction<string>) {
      state.activePromptId = action.payload;
    },
  },
});

export const {
  addPrompt,
  updatePrompt,
  deletePrompt,
  deleteAllPrompts,
  setActivePrompt,
} = aiPromptSlice.actions;

// Selectors
export const selectPrompts = (state: any) => state.aiPrompts.prompts;
export const selectActivePromptId = (state: any) => state.aiPrompts.activePromptId;
export const selectActivePrompt = (state: any) => {
  const { prompts, activePromptId } = state.aiPrompts;
  return prompts.find((p: Prompt) => p.id === activePromptId);
};

export default aiPromptSlice.reducer;
