// app/components/utilities/slider/InteractiveSlider.tsx

'use client';

import React, { useState } from 'react';
import Slider from './Slider';

interface InteractiveSliderProps {
  title: string;
  marks: (string | number)[];
}

/**
 * A client wrapper for the interactive Slider.
 * It handles its own onChange events so that no event handler is passed from a Server Component.
 */
const InteractiveSlider: React.FC<InteractiveSliderProps> = ({ title, marks }) => {
  const [, setValue] = useState(marks[0]);

  const handleChange = (val: string | number) => {
    setValue(val);
    console.log('Slider changed to:', val);
  };

  return (
    <Slider title={title} marks={marks} onChange={handleChange} />
  );
};

export default InteractiveSlider;
