import { describe, expect, it, beforeEach, afterAll, vi } from 'vitest';
import { Container, TextStyle } from 'pixi.js';

const mocks = vi.hoisted(() => {
  // Minimal PIXI mocks for the MatrixLine class
  class MockText {
    text: string;
    style: Record<string, unknown>;
    x = 0;
    y = 0;
    alpha = 0;
    tint = 0;
    destroyed = false;

    constructor(text: string, style: Record<string, unknown>) {
      this.text = text;
      this.style = style;
    }

    destroy() {
      this.destroyed = true;
    }
  }

  class MockContainer {
    children: MockText[] = [];
    addChild = (child: MockText) => {
      this.children.push(child);
    };
  }

  return { MockText, MockContainer };
});

vi.mock('pixi.js', () => ({
  __esModule: true,
  Text: mocks.MockText,
  Container: mocks.MockContainer,
  TextStyle: class MockTextStyle { },
}));

import { MatrixLine } from '../MatrixLine';

const baseConfig = {
  fontSize: 12,
  maxSpeed: 80,
  minSpeed: 40,
  fadeDuration: 1,
  minLineDuration: 1,
  maxLineDuration: 1,
  symbolSpacing: 1,
  height: 100,
};

describe('MatrixLine', () => {
  const symbols = ['A', 'B', 'C'];

  beforeEach(() => {
    vi.spyOn(Math, 'random').mockReturnValue(0.5);
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  const createLine = (x = 10, config = baseConfig) => {
    const stage = new mocks.MockContainer();
    const line = new MatrixLine(
      x,
      stage as unknown as Container,
      { ...config },
      symbols,
      {} as unknown as TextStyle,
      0x123456
    );
    return { line, stage };
  };

  it('creates symbols with initial tint and positions', () => {
    const { stage } = createLine();
    const spacing = baseConfig.fontSize * baseConfig.symbolSpacing;
    const expectedLength = Math.ceil((baseConfig.height * 2) / spacing);

    expect(stage.children).toHaveLength(expectedLength);
    stage.children.forEach((text, idx) => {
      expect(text.alpha).toBe(0);
      expect(text.tint).toBe(0x123456);
      expect(text.x).toBe(10);
      expect(text.y).toBe(-spacing - idx * spacing);
    });
  });

  it('transitions through fade in, active, and fade out into a new line', () => {
    const { line, stage } = createLine();

    line.update(1); // finish fade in
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect((line as any).state).toBe('active');

    line.update(1); // finish active phase
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect((line as any).state).toBe('fadingOut');

    line.update(1); // finish fade out and recreate
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect((line as any).state).toBe('fadingIn');
    expect(stage.children.every((t) => t.alpha === 0)).toBe(true);
  });

  it('wraps symbols when they pass the bottom and retints/reassigns text', () => {
    const { line, stage } = createLine();
    const symbol = stage.children[0];
    symbol.y = baseConfig.height + 5; // force wrap
    const spacing = baseConfig.fontSize * baseConfig.symbolSpacing;
    const topBefore = stage.children.reduce((prev, curr) =>
      curr.y < prev.y ? curr : prev
    );

    line.update(0); // trigger wrap logic

    const topSymbol = stage.children.reduce((prev, curr) =>
      curr.y < prev.y ? curr : prev
    );
    expect(symbol.y).toBe(topBefore.y - spacing);
    // ensure the wrapped symbol is now the top-most entry
    expect(symbol.y).toBe(topSymbol.y);
    expect(symbol.tint).toBe(0x123456);
    expect(['A', 'B', 'C']).toContain(symbol.text);
  });

  it('resizes all symbols to the new column x while preserving spacing', () => {
    const { line, stage } = createLine();
    line.resize(80);

    const spacing = baseConfig.fontSize * baseConfig.symbolSpacing;
    stage.children.forEach((t, idx) => {
      expect(t.x).toBe(80);
      expect(t.y).toBe(-spacing + idx * spacing);
    });
  });

  it('updates tint via setColor and cleans up via destroy', () => {
    const { line, stage } = createLine();

    line.setColor(0xffffff);
    stage.children.forEach((t) => expect(t.tint).toBe(0xffffff));

    line.destroy();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect((line as any).symbols).toHaveLength(0);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(stage.children.every((t) => (t as any).destroyed)).toBe(true);
  });

  it('updates symbol set and uses it on subsequent wraps', () => {
    const { line, stage } = createLine();
    line.setSymbolsSet(['X']);
    const symbol = stage.children[0];
    symbol.y = baseConfig.height + 1;

    line.update(0);

    expect(symbol.text).toBe('X');
  });
});
