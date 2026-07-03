import { render, screen } from '@testing-library/react';
import React from 'react';
import { AccordionText } from '@/components/utilities/accordion/AccordionText';

describe('AccordionText', () => {
  it('renders an optional heading and splits text into paragraphs', () => {
    const text = 'Paragraph one.\n\nParagraph two.';
    render(<AccordionText heading="Details" text={text} />);

    expect(screen.getByRole('heading', { name: /details/i, level: 3 })).toBeInTheDocument();
    const paragraphs = screen.getAllByText(/paragraph/i);
    expect(paragraphs).toHaveLength(2);
    expect(paragraphs[0]).toHaveTextContent('Paragraph one.');
    expect(paragraphs[1]).toHaveTextContent('Paragraph two.');
  });

  it('omits the heading when none is provided', () => {
    render(<AccordionText text="Only body content" />);
    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
    expect(screen.getByText('Only body content')).toBeInTheDocument();
  });
});
