/**
 * @jest-environment jsdom
 */
import { renderHook } from '@testing-library/react';
import { useHandlePhotoMove } from './useHandlePhotoMove';

jest.mock('../../utils', () => ({
  convertFileToHTMLImage: jest.fn()
}));

import { convertFileToHTMLImage } from '../../utils';

describe('useHandlePhotoMove', () => {
  const mockImageElement = { width: 100, height: 100 } as HTMLImageElement;

  beforeEach(() => {
    (convertFileToHTMLImage as jest.Mock).mockResolvedValue(mockImageElement);
  });

  it('should return null if photo is null', async () => {
    const canvasRef = { current: {} } as React.RefObject<HTMLCanvasElement>;
    const { result } = renderHook(() => useHandlePhotoMove(canvasRef));
    const printDescription = {
      canvas: {
        width: 200,
        height: 200,
        photo: null
      },
    };
    const moveBy = { x: 10, y: 20 };
    const res = await result.current.handlePhotoMove(moveBy, printDescription);

    expect(res).toBeNull();
  });

  it('should return null if canvas ref is undefined', async () => {
    const { result } = renderHook(() => useHandlePhotoMove(undefined));
    const printDescription = {
      canvas: {
        width: 200,
        height: 200,
        photo: {
          id: 'img1',
          src: 'test.jpg',
          width: 100,
          height: 100,
          offsetX: 5,
          offsetY: 5
        },
      },
    };
    const moveBy = { x: 10, y: 20 };
    const res = await result.current.handlePhotoMove(moveBy, printDescription);

    expect(res).toBeNull();
  });

  it('should return PhotoMove with updated offsets and imageElement', async () => {
    const canvasRef = { current: {} } as React.RefObject<HTMLCanvasElement>;
    const { result } = renderHook(() => useHandlePhotoMove(canvasRef));
    const printDescription = {
      canvas: {
        width: 200,
        height: 200,
        photo: {
          id: 'img1',
          src: 'test.jpg',
          width: 100,
          height: 100,
          offsetX: 5,
          offsetY: 5
        },
      },
    };
    const moveBy = { x: 10, y: 20 };
    const res = await result.current.handlePhotoMove(moveBy, printDescription);
    expect(convertFileToHTMLImage).toHaveBeenCalledWith(printDescription.canvas.photo);

    expect(res).toEqual({
      id: 'img1',
      imageElement: mockImageElement,
      offsetX: 15,
      offsetY: 25
    });
  });

  it('should use empty string for id if photo.id is undefined', async () => {
    const canvasRef = { current: {} } as React.RefObject<HTMLCanvasElement>;
    const { result } = renderHook(() => useHandlePhotoMove(canvasRef));
    const printDescription = {
      canvas: {
        width: 200,
        height: 200,
        photo: {
          src: 'test.jpg',
          width: 100,
          height: 100,
          offsetX: 5,
          offsetY: 5
        },
      },
    };
    const moveBy = { x: 1, y: 2 };
    const res = await result.current.handlePhotoMove(moveBy, printDescription);

    expect(res).toEqual({
      id: '',
      imageElement: mockImageElement,
      offsetX: 6,
      offsetY: 7
    });
  });
});
