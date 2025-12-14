import reducer, {
  addPrompt,
  updatePrompt,
  deletePrompt,
  deleteAllPrompts,
  setActivePrompt,
  selectPrompts,
  selectActivePromptId,
  selectActivePrompt,
  Prompt,
} from '../aiPromptSlice';
import { describe, expect, it, vi, afterEach } from 'vitest';

const initState = () => reducer(undefined, { type: 'init' });

afterEach(() => {
  vi.restoreAllMocks();
});

describe('aiPromptSlice', () => {
  it('adds a prompt with a generated id', () => {
    vi.spyOn(Date, 'now').mockReturnValue(1700000000000);
    const state = initState();

    const next = reducer(state, addPrompt({ name: 'Notes', text: 'Take notes' }));

    expect(next.prompts).toHaveLength(2);
    expect(next.prompts[1]).toEqual({
      id: '1700000000000',
      name: 'Notes',
      text: 'Take notes',
    });
  });

  it('updates an existing prompt in place', () => {
    const state = initState();

    const next = reducer(state, updatePrompt({
      id: 'default',
      prompt: { name: 'Renamed', text: 'Updated text' },
    }));

    expect(next.prompts[0]).toEqual({
      id: 'default',
      name: 'Renamed',
      text: 'Updated text',
    });
  });

  it('deletes the active prompt and reassigns activePromptId', () => {
    vi.spyOn(Date, 'now').mockReturnValue(1700000000001);
    const withExtra = reducer(initState(), addPrompt({ name: 'Second', text: 'More' }));
    const extraId = withExtra.prompts[1].id;

    const afterDelete = reducer(withExtra, deletePrompt('default'));

    expect(afterDelete.prompts).toEqual([
      { id: extraId, name: 'Second', text: 'More' },
    ]);
    expect(afterDelete.activePromptId).toBe(extraId);
  });

  it('clears prompts and active id when deleteAllPrompts is dispatched', () => {
    const state = initState();

    const next = reducer(state, deleteAllPrompts());

    expect(next.prompts).toEqual([]);
    expect(next.activePromptId).toBe('');
  });

  it('sets the active prompt id and selectors return expected values', () => {
    const prompts: Prompt[] = [
      { id: 'a', name: 'One', text: 'First' },
      { id: 'b', name: 'Two', text: 'Second' },
    ];
    const sliceState = {
      prompts,
      activePromptId: 'b',
    };
    const rootState = { aiPrompts: sliceState } as any;

    const activeSet = reducer(sliceState, setActivePrompt('a'));

    expect(activeSet.activePromptId).toBe('a');
    expect(selectPrompts(rootState)).toEqual(prompts);
    expect(selectActivePromptId(rootState)).toBe('b');
    expect(selectActivePrompt(rootState)).toEqual(prompts[1]);
  });

  it('clears active prompt id when deleting the last prompt', () => {
    const cleared = reducer(initState(), deletePrompt('default'));

    expect(cleared.prompts).toEqual([]);
    expect(cleared.activePromptId).toBe('');
  });
});
