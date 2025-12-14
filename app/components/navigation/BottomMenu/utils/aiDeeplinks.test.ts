import { describe, it, expect, vi } from 'vitest';
import { buildDeeplink, openAIDeeplink } from './aiDeeplinks';

describe('aiDeeplinks', () => {
  it('builds provider URLs correctly', () => {
    const prompt = 'Explain';
    const url = 'https://example.com/page';

    expect(buildDeeplink('chatgpt', prompt, url)).toContain('chat.openai.com/?q=');
    expect(buildDeeplink('claude', prompt, url)).toContain('claude.ai/new?q=');
    expect(buildDeeplink('perplexity', prompt, url)).toContain('perplexity.ai/search?q=');
  });

  it('throws on unknown provider', () => {
    // @ts-expect-error invalid provider to verify runtime throw
    expect(() => buildDeeplink('invalid', 'a', 'b')).toThrow('Unknown AI provider');
  });

  it('opens deeplink in a new tab', () => {
    const openSpy = vi.spyOn(window, 'open');
    openAIDeeplink('chatgpt', 'Prompt text', 'https://site');
    expect(openSpy).toHaveBeenCalledWith(expect.stringContaining('chat.openai.com'), '_blank', 'noopener,noreferrer');
  });
});
