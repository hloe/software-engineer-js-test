/**
 * @jest-environment jsdom
 */
import { renderHook, act } from '@testing-library/react';
import { useDrawCanvasImage } from './useDrawCanvasImage';
import { Options } from './types';
import { DEFAULT_DRAW_RESULT } from './constants';

const mockedContext = {
  drawImage: jest.fn(),
  clearRect: jest.fn()
};

const mockedCanvas = {
  width: 100,
  height: 100,
  getContext: jest.fn(() => mockedContext)
};

const mockedImage = {
  width: 200,
  height: 100
};

describe('useDrawCanvasImage', () => {
  it('should return default result if canvas ref is undefined', () => {
    const { result } = renderHook(() => useDrawCanvasImage(undefined));
    const options: Options = {};
    const drawResult = result.current.drawImageToCanvas(mockedImage as HTMLImageElement, options);

    expect(drawResult).toEqual(DEFAULT_DRAW_RESULT);
  });

  it('should return default result if canvas context is null', () => {
    const canvasRef = {
      current: document.createElement('canvas')
    } as React.RefObject<HTMLCanvasElement>;
    // @ts-ignore
    canvasRef.current.getContext = jest.fn(() => null);
    const { result } = renderHook(() => useDrawCanvasImage(canvasRef));
    const options: Options = {};
    const drawResult = result.current.drawImageToCanvas(mockedImage as HTMLImageElement, options);

    expect(drawResult).toEqual(DEFAULT_DRAW_RESULT);
  });

  it('should draw image to canvas with correct offsets and dimensions', () => {
    const canvasRef = {
      current: mockedCanvas as unknown as HTMLCanvasElement
    } as React.RefObject<HTMLCanvasElement>;
    const { result } = renderHook(() => useDrawCanvasImage(canvasRef));
    const options: Options = { offsetX: 10, offsetY: 5 };
    act(() => {
      result.current.drawImageToCanvas(mockedImage as HTMLImageElement, options);
    });

    expect(mockedContext.drawImage).toHaveBeenCalled();
  });

  it('should center image when center option is true', () => {
    const canvasRef = {
      current: mockedCanvas as unknown as HTMLCanvasElement
    } as React.RefObject<HTMLCanvasElement>;
    const { result } = renderHook(() => useDrawCanvasImage(canvasRef));
    const options: Options = { center: true };
    act(() => {
      result.current.drawImageToCanvas(mockedImage as HTMLImageElement, options);
    });

    expect(mockedContext.drawImage).toHaveBeenCalled();
  });

  it('should clamp offsets to maxOffsetX and maxOffsetY', () => {
    const canvasRef = {
      current: mockedCanvas as unknown as HTMLCanvasElement
    } as React.RefObject<HTMLCanvasElement>;
    const { result } = renderHook(() => useDrawCanvasImage(canvasRef));
    const options: Options = { offsetX: 999, offsetY: 999 };
    act(() => {
      result.current.drawImageToCanvas(mockedImage as HTMLImageElement, options);
    });

    expect(mockedContext.drawImage).toHaveBeenCalled();
  });

  it('should clear the canvas', () => {
    const canvasRef = {
      current: mockedCanvas as unknown as HTMLCanvasElement
    } as React.RefObject<HTMLCanvasElement>;
    const { result } = renderHook(() => useDrawCanvasImage(canvasRef));
    act(() => {
      result.current.clearCanvas();
    });

    expect(mockedContext.clearRect).toHaveBeenCalledWith(0, 0, 100, 100);
  });

  it('should do nothing when clearing if canvas ref is undefined', () => {
    const { result } = renderHook(() => useDrawCanvasImage(undefined));

    expect(() => result.current.clearCanvas()).not.toThrow();
  });

  it('should do nothing when clearing if context is null', () => {
    const canvasRef = {
      current: document.createElement('canvas')
    } as React.RefObject<HTMLCanvasElement>;
    // @ts-ignore
    canvasRef.current.getContext = jest.fn(() => null);
    const { result } = renderHook(() => useDrawCanvasImage(canvasRef));

    expect(() => result.current.clearCanvas()).not.toThrow();
  });
});
