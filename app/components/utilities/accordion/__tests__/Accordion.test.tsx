import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { AccordionComponent } from '@/components/utilities/accordion/Accordion';

const sampleItems = [
  { title: 'First Item', content: <div>First content</div>, value: 'first' },
  { title: 'Second Item', content: <div>Second content</div>, value: 'second' },
];

describe('AccordionComponent', () => {
  it('toggles a single item open and closed', () => {
    render(<AccordionComponent items={sampleItems} />);

    const firstTrigger = screen.getByRole('button', { name: /first item/i });

    expect(screen.queryByText('First content')).not.toBeInTheDocument();

    fireEvent.click(firstTrigger);
    expect(screen.getByText('First content')).toBeInTheDocument();
    expect(firstTrigger).toHaveAttribute('aria-expanded', 'true');

    fireEvent.click(firstTrigger);
    expect(screen.queryByText('First content')).not.toBeInTheDocument();
    expect(firstTrigger).toHaveAttribute('aria-expanded', 'false');
  });

  it('allows multiple items to stay open', () => {
    render(<AccordionComponent items={sampleItems} />);

    const firstTrigger = screen.getByRole('button', { name: /first item/i });
    const secondTrigger = screen.getByRole('button', { name: /second item/i });

    fireEvent.click(firstTrigger);
    fireEvent.click(secondTrigger);

    expect(screen.getByText('First content')).toBeInTheDocument();
    expect(screen.getByText('Second content')).toBeInTheDocument();
    expect(firstTrigger).toHaveAttribute('aria-expanded', 'true');
    expect(secondTrigger).toHaveAttribute('aria-expanded', 'true');
  });
});
