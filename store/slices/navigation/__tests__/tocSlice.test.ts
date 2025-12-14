import reducer, { registerToc, clearToc, TocLink } from '../tocSlice';
import { describe, expect, it } from 'vitest';

const initState = () => reducer(undefined, { type: 'init' });

describe('tocSlice', () => {
  it('registers links and sets hasToc accordingly', () => {
    const links: TocLink[] = [
      { href: '#one', text: 'One', level: 'h2' },
      { href: '#two', text: 'Two', level: 'h3', isPrimary: true },
    ];

    const next = reducer(initState(), registerToc(links));

    expect(next.links).toEqual(links);
    expect(next.hasToc).toBe(true);
  });

  it('clears links and resets hasToc', () => {
    const populated = reducer(initState(), registerToc([{ href: '#one', text: 'One', level: 'h2' }]));

    const cleared = reducer(populated, clearToc());

    expect(cleared.links).toEqual([]);
    expect(cleared.hasToc).toBe(false);
  });
});
