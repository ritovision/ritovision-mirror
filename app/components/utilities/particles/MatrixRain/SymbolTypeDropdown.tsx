// app/components/utilities/particles/MatrixRain/SymbolTypeDropdown.tsx
'use client';
import React from 'react';
import Dropdown from '@/components/utilities/dropdown/Dropdown';
import { Preset } from './symbols';

const CAPITALIZE = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

interface SymbolTypeDropdownProps {
  preset: Preset;
  onChange: (preset: Preset) => void;
}

export const SymbolTypeDropdown: React.FC<SymbolTypeDropdownProps> = ({
  preset,
  onChange,
}) => {
  const items = ['Default', 'Chinese', 'Japanese', 'Binary'];

  return (
    <div style={{ width: '100%', textAlign: 'center' }}>
      <Dropdown
  label="Symbol Type"
  items={items}
  selectedValue={preset !== 'default' ? CAPITALIZE(preset) : ''}  // ⬅ this line changed
  onChange={(val) => onChange(val.toLowerCase() as Preset)}
/>

    </div>
  );
};
