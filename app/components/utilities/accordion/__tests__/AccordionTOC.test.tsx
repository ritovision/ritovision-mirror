import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { AccordionTOC, AccordionItem } from '@/components/utilities/accordion/AccordionTOC';

const items: AccordionItem[] = [
  { value: 'section-1', title: 'First Section', content: <div>First body</div> },
  { value: 'section-2', title: <span>Second Section</span>, content: <div>Second body</div> },
];

describe('AccordionTOC', () => {
  it('respects defaultOpenItems and exposes aria wiring', () => {
    render(
      <AccordionTOC
        items={items}
        defaultOpenItems={['section-1']}
        maxWidth="500px"
        marginTop="1rem"
        marginBottom="3rem"
      />
    );

    const region = screen.getByRole('region', { name: /expandable content sections/i });
    expect(region.style.marginTop).toBe('1rem');
    expect(region.style.marginBottom).toBe('3rem');

    const trigger = screen.getByRole('button', { name: /first section/i });
    expect(trigger).toHaveAttribute('aria-controls', 'accordion-content-section-1');
    expect(trigger).toHaveAttribute('aria-expanded', 'true');

    const content = screen.getByText('First body');
    const wrapper = region.querySelector('div');
    expect(wrapper).toHaveStyle({ maxWidth: '500px' });
    expect(content).toBeInTheDocument();
  });

  it('toggles sections open and closed', () => {
    render(<AccordionTOC items={items} />);

    const trigger = screen.getByRole('button', { name: /first section/i });

    expect(screen.queryByText('First body')).not.toBeInTheDocument();

    fireEvent.click(trigger);
    expect(screen.getByText('First body')).toBeInTheDocument();
    expect(trigger).toHaveAttribute('aria-expanded', 'true');

    fireEvent.click(trigger);
    expect(screen.queryByText('First body')).not.toBeInTheDocument();
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });
});
