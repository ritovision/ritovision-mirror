import { fireEvent, screen, waitFor } from '@testing-library/react';
import React from 'react';
import Toc from '@/projects/entriken/sections/intro/components/Toc';
import { renderWithProviders } from '@/tests/test-utils';
import { enableRealDispatch } from '@/tests/setup';

describe('projects/entriken Toc', () => {
  it('registers toc links and exposes the mapped accordion list', async () => {
    enableRealDispatch();
    const { store, unmount } = renderWithProviders(<Toc />);

    const trigger = await screen.findByRole('button', { name: /table of contents/i });

    await waitFor(() => {
      expect(store.getState().toc.hasToc).toBe(true);
      expect(store.getState().toc.links.length).toBeGreaterThan(0);
    });

    fireEvent.click(trigger);

    expect(await screen.findByRole('navigation', { name: /table of contents/i })).toBeInTheDocument();
    expect(await screen.findByText('Brand Discovery & Audit')).toBeInTheDocument();

    unmount();
    await waitFor(() => expect(store.getState().toc.hasToc).toBe(false));
  });
});
