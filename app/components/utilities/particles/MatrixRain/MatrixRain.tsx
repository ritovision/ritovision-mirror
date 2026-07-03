// ./app/components/utilities/particles/MatrixRain/MatrixRain.tsx
'use client';
import React, { useRef, useEffect } from 'react';
import * as PIXI from 'pixi.js';
import { MatrixLine } from './MatrixLine';
import { matrixRainConfig } from './config';
import { createPixiApp } from './pixiApp';
import { getPresetSymbols, Preset } from './symbols';

interface MatrixRainProps {
  color: string;
  preset: Preset;
}

export const MatrixRain: React.FC<MatrixRainProps> = ({ color, preset }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<MatrixLine[]>([]);
  const symbolSetRef = useRef<string[]>(getPresetSymbols(preset));
  const initialColorRef = useRef<number>(parseInt(color.replace('#', ''), 16));

  // Update symbol set when preset changes
  useEffect(() => {
    const newSet = getPresetSymbols(preset);
    symbolSetRef.current = newSet;
    linesRef.current.forEach(line => line.setSymbolsSet(newSet));
  }, [preset]);

  // Main Pixi setup
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const pixiApp = createPixiApp(container);
    const config = {
      ...matrixRainConfig,
      columns: Math.floor(container.clientWidth / matrixRainConfig.fontSize),
      height: container.clientHeight,
    };
    const style = new PIXI.TextStyle({
      fontFamily: 'monospace',
      fontSize: config.fontSize,
      fill: 0xffffff,
      fontWeight: 'bold',
    });
    const lines: MatrixLine[] = [];

    const initLines = () => {
      lines.length = 0;
      const colWidth = container.clientWidth / config.columns;
      for (let i = 0; i < config.columns; i++) {
        lines.push(
          new MatrixLine(
            i * colWidth,
            pixiApp.stage,
            config,
            symbolSetRef.current,
            style,
            initialColorRef.current
          )
        );
      }
      linesRef.current = lines;
    };

    const onResize = () => {
      if (!container) return;
      pixiApp.renderer.resize(container.clientWidth, container.clientHeight);
      config.height = container.clientHeight;

      const newCols = Math.floor(container.clientWidth / matrixRainConfig.fontSize);
      const colWidth = container.clientWidth / newCols;

      while (lines.length > newCols) {
        const l = lines.pop();
        if (l) l.destroy();
      }
      lines.forEach((l, idx) => l.resize(idx * colWidth));
      while (lines.length < newCols) {
        lines.push(
          new MatrixLine(
            lines.length * colWidth,
            pixiApp.stage,
            config,
            symbolSetRef.current,
            style,
            initialColorRef.current
          )
        );
      }
      config.columns = newCols;
      linesRef.current = lines;
    };

    initLines();
    window.addEventListener('resize', onResize);
    pixiApp.ticker.add(delta => {
      const dt = delta / 60;
      lines.forEach(l => l.update(dt));
    });

    return () => {
      window.removeEventListener('resize', onResize);
      lines.forEach(l => l.destroy());
      pixiApp.destroy(true, { children: true, texture: true, baseTexture: true });
    };
  }, []);

  // Color updates
  useEffect(() => {
    const num = parseInt(color.replace('#', ''), 16);
    linesRef.current.forEach(l => l.setColor(num));
  }, [color]);

  return (
    <div
      ref={containerRef}
      style={{ width: '100%', height: '100%', position: 'relative' }}
    />
  );
};
