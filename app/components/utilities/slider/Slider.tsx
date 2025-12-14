'use client';

import React, { useState } from 'react';
import styles from './Slider.module.css';

interface SliderProps {
  /** Title displayed above the slider (centered) */
  title: string;
  /** Array of discrete labels for the slider, e.g. [0, 100, 1000] */
  marks: (string | number)[];
  /** Optional callback fired when the user moves the slider */
  onChange?: (value: string | number) => void;
}

/**
 * A slider with a centered title, a line + knob, and labeled discrete points.
 */
const Slider: React.FC<SliderProps> = ({ title, marks, onChange }) => {
  // Internally track which mark index is selected
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Handle changes to the range input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newIndex = parseInt(e.target.value, 10);
    setSelectedIndex(newIndex);
    onChange?.(marks[newIndex]);
  };

  return (
    <div className={styles.sliderContainer}>
      <div className={styles.sliderTitle}>{title}</div>

      <div className={styles.sliderWrapper}>
        {/* Range input from 0 to marks.length - 1 */}
        <input
          type="range"
          min={0}
          max={marks.length - 1}
          step={1}
          value={selectedIndex}
          onChange={handleChange}
          className={styles.sliderTrack}
          aria-label={title}
        />

        {/* Labels positioned under the track.
            The first and last labels are inset by 10% from the container edges.
            Calculation: leftPercent = offset + (index / (marks.length - 1)) * (100 - 2*offset) */}
        <div className={styles.sliderLabels}>
          {marks.map((mark, index) => {
            const offset = 10; // 10% margin on each side
            const leftPercent = offset + (index / (marks.length - 1)) * (100 - 2 * offset);
            return (
              <div
                key={index}
                className={styles.sliderMark}
                style={{ left: `${leftPercent}%` }}
              >
                {mark}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Slider;
