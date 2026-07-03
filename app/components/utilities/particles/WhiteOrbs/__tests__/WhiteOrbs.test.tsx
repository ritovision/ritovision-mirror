import React from 'react';
import { act, render, waitFor } from '@testing-library/react';
import { Container as PixiContainer } from 'pixi.js';
import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import WhiteOrbs from '..';
import { desktopConfig } from '../config';

let mockWidth = 320;
let mockHeight = 180;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let lastApp: any;

const mocks = vi.hoisted(() => {
  const createPixiAppMock = vi.fn();
  const createGradientMaskMock = vi.fn();
  const useIsMobileMock = vi.fn();
  const circleInstances: Array<{ update: ReturnType<typeof vi.fn> }> = [];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const luminescentCircleMock = vi.fn(function (this: any) {
    this.update = vi.fn();
    circleInstances.push(this);
    return this;
  });

  return {
    createPixiAppMock,
    createGradientMaskMock,
    useIsMobileMock,
    circleInstances,
    luminescentCircleMock,
  };
});

vi.mock('../createApp', () => ({
  __esModule: true,
  createPixiApp: mocks.createPixiAppMock,
}));

vi.mock('../mask', () => ({
  __esModule: true,
  createGradientMask: mocks.createGradientMaskMock,
}));

vi.mock('../LuminescentCircle', () => ({
  __esModule: true,
  LuminescentCircle: mocks.luminescentCircleMock,
}));

vi.mock('../useIsMobile', () => ({
  __esModule: true,
  useIsMobile: mocks.useIsMobileMock,
}));

vi.mock('pixi.js', () => {
  class MockContainer {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children: any[] = [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mask: any = null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    addChild = vi.fn((child: any) => {
      this.children.push(child);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (child as any).parent = this;
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    removeChild = vi.fn((child: any) => {
      this.children = this.children.filter((c) => c !== child);
    });
    removeChildren = vi.fn(() => {
      this.children = [];
    });
  }
  return {
    __esModule: true,
    Container: MockContainer,
  };
});

const originalWidth = Object.getOwnPropertyDescriptor(HTMLDivElement.prototype, 'clientWidth');
const originalHeight = Object.getOwnPropertyDescriptor(HTMLDivElement.prototype, 'clientHeight');

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
  if (originalWidth) Object.defineProperty(HTMLDivElement.prototype, 'clientWidth', originalWidth);
  if (originalHeight) Object.defineProperty(HTMLDivElement.prototype, 'clientHeight', originalHeight);
});

beforeEach(() => {
  vi.clearAllMocks();
  mocks.circleInstances.splice(0);
  mockWidth = 320;
  mockHeight = 180;
  mocks.useIsMobileMock.mockReturnValue(false);

  // Suppress verbose console output during tests
  vi.spyOn(console, 'log').mockImplementation(() => { });
  vi.spyOn(console, 'warn').mockImplementation(() => { });
  vi.spyOn(console, 'error').mockImplementation(() => { });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ticker: any = {
    deltaMS: 16,
    add: vi.fn((cb: (delta: number) => void) => {
      ticker.cb = cb;
    }),
    remove: vi.fn(),
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const stage = new (PixiContainer as any)();
  const app = {
    stage,
    renderer: { resize: vi.fn() },
    ticker,
    destroy: vi.fn(),
  };
  lastApp = app;
  mocks.createPixiAppMock.mockReturnValue(app);

  mocks.createGradientMaskMock.mockImplementation(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sprite: any = {
      destroy: vi.fn(),
    };
    // mimic Pixi: attach to stage when created so parent removal works in cleanup
    stage.addChild(sprite);
    return sprite;
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mocks.luminescentCircleMock.mockImplementation(function (this: any) {
    this.update = vi.fn();
    mocks.circleInstances.push(this);
    return this;
  });
});

describe('WhiteOrbs (integration)', () => {
  it('creates a pixi app, circles, ticker, and mask on mount', async () => {
    const { container } = render(
      <WhiteOrbs background={0x0abc12} circleColor={0x010203} glowColor={0x040506} />
    );

    await waitFor(() => expect(mocks.createPixiAppMock).toHaveBeenCalledTimes(1));
    const canvas = container.querySelector('canvas') as HTMLCanvasElement;

    expect(mocks.createPixiAppMock).toHaveBeenCalledWith({
      view: canvas,
      width: mockWidth,
      height: mockHeight,
      backgroundColor: 0x0abc12,
    });

    await waitFor(() =>
      expect(mocks.luminescentCircleMock).toHaveBeenCalledTimes(desktopConfig.count)
    );
    expect(mocks.createGradientMaskMock).toHaveBeenCalledWith(lastApp, expect.anything(), null);
    expect(lastApp.ticker.add).toHaveBeenCalledTimes(1);

    await waitFor(() => expect(canvas.style.opacity).toBe('1'));

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tickerFn = (lastApp.ticker.add as any).mock.calls[0][0] as (
      delta: number
    ) => void;

    act(() => {
      tickerFn(3);
    });
    expect(mocks.circleInstances[0].update).toHaveBeenCalledWith(3, lastApp.ticker.deltaMS);
  });

  it('resizes the renderer and rebuilds the mask on window resize', async () => {
    render(<WhiteOrbs />);
    await waitFor(() => expect(mocks.createGradientMaskMock).toHaveBeenCalledTimes(2));
    const currentMask = mocks.createGradientMaskMock.mock.results[1].value;

    mockWidth = 480;
    mockHeight = 260;

    act(() => {
      window.dispatchEvent(new Event('resize'));
    });

    await waitFor(() =>
      expect(lastApp.renderer.resize).toHaveBeenLastCalledWith(mockWidth, mockHeight)
    );
    expect(mocks.createGradientMaskMock).toHaveBeenCalledTimes(3);
    expect(mocks.createGradientMaskMock.mock.calls[2][2]).toBe(currentMask);
  });

  it('cleans up ticker, mask, and app on unmount', async () => {
    const { unmount } = render(<WhiteOrbs />);
    await waitFor(() => expect(mocks.createGradientMaskMock).toHaveBeenCalledTimes(2));
    const maskSprite = mocks.createGradientMaskMock.mock.results[0].value;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tickerFn = (lastApp.ticker.add as any).mock.calls[0][0];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const circlesContainer = (lastApp.stage.addChild as any).mock.calls[0][0];

    unmount();

    expect(lastApp.ticker.remove).toHaveBeenCalledWith(tickerFn);
    expect(circlesContainer.removeChildren).toHaveBeenCalled();
    expect(lastApp.stage.removeChild).toHaveBeenCalledWith(maskSprite);
    expect(maskSprite.destroy).toHaveBeenCalledWith(true);
    expect(lastApp.destroy).toHaveBeenCalledWith(true);
  });
});
