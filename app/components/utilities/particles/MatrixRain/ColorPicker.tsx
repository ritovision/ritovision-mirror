// app/components/utilities/particles/MatrixRain/ColorPicker.tsx
'use client';
import React, { useState, useEffect, useRef } from 'react';

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

const HEX_REGEX = /^[0-9A-Fa-f]{6}$/;

export const MatrixColorPicker: React.FC<ColorPickerProps> = ({ color, onChange }) => {
  const [editing, setEditing] = useState(false);
  const [inputValue, setInputValue] = useState(color.slice(1));
  const textInputRef = useRef<HTMLInputElement>(null);
  const nativeColorRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setInputValue(color.slice(1));
  }, [color]);

  const commitValue = () => {
    const hex = inputValue.trim();
    if (HEX_REGEX.test(hex)) {
      onChange('#' + hex.toUpperCase());
    } else {
      setInputValue(color.slice(1));
    }
    setEditing(false);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {/* hidden native color picker */}
      <input
        ref={nativeColorRef}
        type="color"
        value={color}
        onChange={(e) => onChange(e.target.value)}
        style={{ display: 'none' }}
      />

      {/* color preview square */}
      <div
        onClick={() => nativeColorRef.current?.click()}
        style={{
          width: 32,
          height: 32,
          border: '2px solid var(--secondary-blue)',
          borderRadius: 10,
          backgroundColor: color,
          cursor: 'pointer',
          marginRight: -16,
          zIndex: 2,
        }}
      />

      {/* text box */}
      <div
        onClick={() => {
          setEditing(true);
          setTimeout(() => textInputRef.current?.focus(), 0);
        }}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          width: 100,
          height: 32,
          border: '2px solid var(--secondary-blue)',
          borderRadius: 10,
          background: 'transparent',
          color: 'white',
          fontFamily: 'monospace',
          fontSize: '14px',
          paddingRight: 8,
          paddingLeft: 8,
          overflow: 'hidden',
          cursor: 'text',
        }}
      >
        {editing ? (
          <>
            <span>#</span>
            <input
              ref={textInputRef}
              value={inputValue}
              onChange={(e) => {
                const val = e.target.value.replace(/[^0-9a-fA-F]/g, '');
                if (val.length <= 6) setInputValue(val);
              }}
              onBlur={commitValue}
              onKeyDown={(e) => {
                if (e.key === 'Enter') textInputRef.current?.blur();
                if (e.key === 'Escape') {
                  setInputValue(color.slice(1));
                  setEditing(false);
                }
              }}
              style={{
                flex: 1,
                border: 'none',
                outline: 'none',
                background: 'transparent',
                color: 'white',
                fontFamily: 'monospace',
                fontSize: '14px',
                textAlign: 'right',
              }}
            />
          </>
        ) : (
          <span>
            #{inputValue.toUpperCase()}
          </span>
        )}
      </div>
    </div>
  );
};
