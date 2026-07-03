import { describe, it, expect, vi, beforeEach } from 'vitest';
import { copyPageAsMarkdown } from './markdownCopy';

describe('markdownCopy', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    document.title = 'Test Page';
    vi.resetModules();
  });

  it('converts page content to markdown and writes to clipboard', async () => {
    document.body.innerHTML = `
      <main>
        <h1>Heading One</h1>
        <p>Hello <strong>world</strong></p>
        <a href="/link">Link Text</a>
      </main>
    `;

    const writeSpy = vi.spyOn(navigator.clipboard, 'writeText');
    await copyPageAsMarkdown();

    expect(writeSpy).toHaveBeenCalledTimes(1);
    const copied = writeSpy.mock.calls[0][0];
    expect(copied).toContain('# Test Page');
    expect(copied).toMatch(/Source: http:\/\/localhost(:\d+)?\//);
    expect(copied).toContain('Hello **world**');
    expect(copied).toContain('[Link Text](/link)');
  });

  it('surfaces clipboard errors', async () => {
    document.body.innerHTML = '<main><p>content</p></main>';
    vi.spyOn(navigator.clipboard, 'writeText').mockRejectedValueOnce(new Error('copy fail'));
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    await expect(copyPageAsMarkdown()).rejects.toThrow('copy fail');
    expect(errorSpy).toHaveBeenCalled();
  });
});
