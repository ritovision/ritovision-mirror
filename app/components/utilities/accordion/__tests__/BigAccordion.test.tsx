import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { BigAccordion } from '@/components/utilities/accordion/BigAccordion';

const items = [
  { title: 'First Panel', content: <div>First panel body</div>, value: 'first' },
  { title: 'Second Panel', content: <div>Second panel body</div>, value: 'second' },
];

describe('BigAccordion', () => {
  it('opens and closes panels on click', () => {
    render(<BigAccordion items={items} />);

    const trigger = screen.getByRole('button', { name: /first panel/i });

    expect(screen.queryByText('First panel body')).not.toBeInTheDocument();

    fireEvent.click(trigger);
    expect(screen.getByText('First panel body')).toBeInTheDocument();
    expect(trigger).toHaveAttribute('aria-expanded', 'true');

    fireEvent.click(trigger);
    expect(screen.queryByText('First panel body')).not.toBeInTheDocument();
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  it('applies padding and hides underline when disabled', () => {
    render(
      <BigAccordion
        items={[{ title: 'Styled Panel', content: <div>Styled body</div>, value: 'styled' }]}
        contentPadding={3}
        showUnderline={false}
      />
    );

    const trigger = screen.getByRole('button', { name: /styled panel/i });
    fireEvent.click(trigger);

    const contentWrapper = screen.getByText('Styled body').parentElement?.parentElement as HTMLElement;
    expect(contentWrapper).toBeInTheDocument();
    expect(contentWrapper.style.paddingLeft).toBe('3rem');
    expect(contentWrapper.style.paddingRight).toBe('3rem');

    const underline = trigger.querySelector('[class*="underline"]');
    expect(underline).toBeNull();
  });

  it('opens the section matching the location hash and scrolls into view', async () => {
    const originalHash = window.location.hash;
    const originalScroll = Element.prototype.scrollIntoView;
    const scrollSpy = vi.fn();
    window.location.hash = '#second';
    Element.prototype.scrollIntoView = scrollSpy;

    try {
      render(<BigAccordion items={items} />);

      await waitFor(() => {
        expect(screen.getByText('Second panel body')).toBeInTheDocument();
      });
      expect(scrollSpy).toHaveBeenCalled();

      const trigger = screen.getByRole('button', { name: /second panel/i });
      expect(trigger).toHaveAttribute('aria-expanded', 'true');
    } finally {
      Element.prototype.scrollIntoView = originalScroll;
      window.location.hash = originalHash;
    }
  });
});
