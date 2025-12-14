import { fireEvent, screen, waitFor } from '@testing-library/react';
import React from 'react';
import Toc from '@/projects/fansite/sections/generalInfo/components/Toc';
import { renderWithProviders } from '@/tests/test-utils';
import { enableRealDispatch } from '@/tests/setup';

describe('projects/fansite Toc', () => {
  it('registers toc links and renders mapped list on expand', async () => {
    enableRealDispatch();
    const { store, unmount } = renderWithProviders(<Toc />);

    const trigger = await screen.findByRole('button', { name: /table of contents/i });

    await waitFor(() => {
      expect(store.getState().toc.hasToc).toBe(true);
      expect(store.getState().toc.links.length).toBeGreaterThan(0);
    });

    fireEvent.click(trigger);

    expect(await screen.findByRole('navigation', { name: /table of contents/i })).toBeInTheDocument();
    expect(await screen.findByText('New York Times Highlight & Traffic Surge')).toBeInTheDocument();

    unmount();
    await waitFor(() => expect(store.getState().toc.hasToc).toBe(false));
  });
});
