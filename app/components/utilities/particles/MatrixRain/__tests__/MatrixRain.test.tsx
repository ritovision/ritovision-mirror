import React from 'react';
import { act, render, waitFor } from '@testing-library/react';
import { beforeAll, afterAll, beforeEach, describe, expect, it, vi } from 'vitest';

let mockWidth = 240;
let mockHeight = 120;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let lastApp: any;

const restoreSizeGetters = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  delete (HTMLDivElement.prototype as any).clientWidth;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  delete (HTMLDivElement.prototype as any).clientHeight;
};

// --- Module mocks (declared before imports that use them) ---
vi.mock('pixi.js', () => ({
  __esModule: true,
  TextStyle: class MockTextStyle { },
}));

vi.mock('../pixiApp', () => {
  const createPixiApp = vi.fn(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const app: any = {
      view: document.createElement('canvas'),
      stage: {},
      renderer: { resize: vi.fn() },
      ticker: {
        add: vi.fn((cb: (delta: number) => void) => {
          app.tickerCb = cb;
        }),
      },
      destroy: vi.fn(),
    };
    app.view.style.pointerEvents = 'none';
    lastApp = app;
    return app;
  });

  return { __esModule: true, createPixiApp };
});

type MockLine = {
  resize: ReturnType<typeof vi.fn>;
  setColor: ReturnType<typeof vi.fn>;
  setSymbolsSet: ReturnType<typeof vi.fn>;
  destroy: ReturnType<typeof vi.fn>;
  update: ReturnType<typeof vi.fn>;
  x?: number;
};

const createdLines: MockLine[] = [];

vi.mock('../MatrixLine', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const MatrixLineMock = vi.fn(function (this: any, x: number) {
    const instance: MockLine = {
      resize: vi.fn(),
      setColor: vi.fn(),
      setSymbolsSet: vi.fn(),
      destroy: vi.fn(),
      update: vi.fn(),
      x,
    };
    createdLines.push(instance);
    return instance;
  });

  return {
    __esModule: true,
    MatrixLine: MatrixLineMock,
  };
});

import { MatrixLine } from '../MatrixLine';
import { MatrixRain } from '../MatrixRain';
import { matrixRainConfig } from '../config';

const getLines = () => createdLines;
const getLastApp = () => lastApp;

describe('MatrixRain', () => {
  beforeAll(() => {
    Object.defineProperty(HTMLDivElement.prototype, 'clientWidth', {
      configurable: true,
      get() {
        return mockWidth;
      },
    });
    Object.defineProperty(HTMLDivElement.prototype, 'clientHeight', {
      configurable: true,
      get() {
        return mockHeight;
      },
    });
  });

  afterAll(() => {
    restoreSizeGetters();
  });

  beforeEach(() => {
    vi.clearAllMocks();
    mockWidth = 240;
    mockHeight = 120;
    lastApp = undefined;
    createdLines.splice(0);
  });

  it('creates a pixi app and a line per column, and wires the ticker', async () => {
    render(<MatrixRain color="#112233" preset="default" />);

    const columns = Math.floor(mockWidth / matrixRainConfig.fontSize);
    await waitFor(() => expect(getLines()).toHaveLength(columns));

    const app = getLastApp();
    expect(app.ticker.add).toHaveBeenCalledTimes(1);
    expect(typeof app.tickerCb).toBe('function');

    act(() => {
      app.tickerCb(60); // delta -> dt = 1
    });
    expect(getLines()[0].update).toHaveBeenCalledWith(1);
  });

  it('updates symbol set when preset changes', async () => {
    const { rerender } = render(<MatrixRain color="#112233" preset="default" />);
    await waitFor(() => expect(getLines().length).toBeGreaterThan(0));
    const lines = getLines();
    rerender(<MatrixRain color="#112233" preset="binary" />);

    lines.forEach((line) => {
      expect(line.setSymbolsSet).toHaveBeenCalledTimes(1);
      expect(line.setSymbolsSet.mock.calls[0][0]).toEqual(expect.arrayContaining(['0', '1']));
    });
  });

  it('updates color when prop changes', async () => {
    const { rerender } = render(<MatrixRain color="#112233" preset="default" />);
    await waitFor(() => expect(getLines().length).toBeGreaterThan(0));
    const lines = getLines();

    rerender(<MatrixRain color="#00ff00" preset="default" />);

    lines.forEach((line) => {
      expect(line.setColor).toHaveBeenCalledWith(0x00ff00);
    });
  });

  it('resizes columns and creates/destroys lines on window resize', async () => {
    const initialColumns = Math.floor(mockWidth / matrixRainConfig.fontSize);
    render(<MatrixRain color="#112233" preset="default" />);

    await waitFor(() => expect(getLines()).toHaveLength(initialColumns));
    const lines = getLines();

    // Shrink width to force fewer columns
    mockWidth = 120;
    act(() => {
      window.dispatchEvent(new Event('resize'));
    });

    const remaining = Math.floor(mockWidth / matrixRainConfig.fontSize); // 5
    const appAfterShrink = getLastApp();
    expect(appAfterShrink.renderer.resize).toHaveBeenCalledWith(120, mockHeight);
    lines.slice(remaining).forEach((line) => {
      expect(line.destroy).toHaveBeenCalled();
    });
    lines.slice(0, remaining).forEach((line, idx) => {
      expect(line.resize).toHaveBeenCalledWith(idx * (mockWidth / remaining));
    });

    // Grow width to add more columns
    mockWidth = 360;
    act(() => {
      window.dispatchEvent(new Event('resize'));
    });

    const newCols = Math.floor(mockWidth / matrixRainConfig.fontSize); // 15
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const totalCreated = (MatrixLine as any).mock.calls.length;
    expect(totalCreated).toBe(initialColumns + (newCols - remaining));

    const appAfterGrow = getLastApp();
    expect(appAfterGrow.renderer.resize).toHaveBeenLastCalledWith(360, mockHeight);
  });

  it('cleans up ticker, lines, and pixi app on unmount', async () => {
    const removeSpy = vi.spyOn(window, 'removeEventListener');
    const { unmount } = render(<MatrixRain color="#112233" preset="default" />);
    await waitFor(() => expect(getLines().length).toBeGreaterThan(0));
    const app = getLastApp();
    const lines = getLines();

    unmount();

    expect(removeSpy).toHaveBeenCalledWith('resize', expect.any(Function));
    expect(app.destroy).toHaveBeenCalledWith(true, {
      children: true,
      texture: true,
      baseTexture: true,
    });
    lines.forEach((line) => expect(line.destroy).toHaveBeenCalled());
    removeSpy.mockRestore();
  });
});
