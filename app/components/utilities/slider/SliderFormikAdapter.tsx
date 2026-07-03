'use client';

import React from 'react';
import { useField } from 'formik';
import styles from './Slider.module.css';

interface SliderFormikAdapterProps {
  name: string;
  title: string;
  marks: (string | number)[];
}

const SliderFormikAdapter: React.FC<SliderFormikAdapterProps> = ({ name, title, marks }) => {
  const [field, , helpers] = useField(name);

  let selectedIndex = 0;
  const fieldValue = field.value;
  if (fieldValue !== undefined) {
    const index = marks.findIndex((mark) => mark === fieldValue);
    if (index >= 0) {
      selectedIndex = index;
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newIndex = parseInt(e.target.value, 10);
    if (!Number.isNaN(newIndex) && newIndex >= 0 && newIndex < marks.length) {
      helpers.setValue(marks[newIndex]);
      helpers.setTouched(true);
    }
  };

  return (
    <div>
      <div className={styles.sliderContainer}>
        <div className={styles.sliderTitle}>{title}</div>
        <div className={styles.sliderWrapper}>
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
          <div className={styles.sliderLabels}>
            {marks.map((mark, index) => {
              const offset = 10;
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
    </div>
  );
};

export default SliderFormikAdapter;
