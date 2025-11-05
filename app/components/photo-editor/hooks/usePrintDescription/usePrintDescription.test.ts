/**
 * @jest-environment jsdom
 */
import { renderHook, act } from '@testing-library/react';
import { usePrintDescription } from './usePrintDescription';
import { DEFAULT_PRINT_DESCRIPTION } from '../../constants';

describe('usePrintDescription', () => {
  it('should initialize with DEFAULT_PRINT_DESCRIPTION', () => {
    const { result } = renderHook(() => usePrintDescription());

    expect(result.current.printDescription).toEqual(DEFAULT_PRINT_DESCRIPTION);
  });

  it('should update printDescription with updatePrintDescription', () => {
    const { result } = renderHook(() => usePrintDescription());
    const newDescription = {
      canvas: {
        width: 100,
        height: 200,
        photo: {
          id: 'img1',
          src: 'test.jpg',
          width: 50,
          height: 60,
          offsetX: 5,
          offsetY: 6
        },
      },
    };
    act(() => {
      result.current.updatePrintDescription(newDescription);
    });

    expect(result.current.printDescription).toEqual(newDescription);
  });

  it('should update canvas photo with updateCanvasImage', () => {
    const { result } = renderHook(() => usePrintDescription());
    const imageUpdate = {
      id: 'img2',
      src: 'new.jpg',
      width: 70,
      height: 80,
      offsetX: 7,
      offsetY: 8
    };
    act(() => {
      result.current.updateCanvasImage(imageUpdate);
    });

    expect(result.current.printDescription.canvas.photo).toEqual(imageUpdate);
  });

  it('should merge imageUpdate with existing photo', () => {
    const { result } = renderHook(() => usePrintDescription());
    const initialPhoto = {
      id: 'img1',
      src: 'old.jpg',
      width: 10,
      height: 20,
      offsetX: 1,
      offsetY: 2,
    };
    act(() => {
      result.current.updateCanvasImage(initialPhoto);
    });
    const imageUpdate = {
      src: 'updated.jpg',
      width: 10,
      height: 20,
      offsetX: 99,
      offsetY: 2
    };

    act(() => {
      result.current.updateCanvasImage(imageUpdate);
    });

    expect(result.current.printDescription.canvas.photo).toEqual({
      id: 'img1',
      src: 'updated.jpg',
      width: 10,
      height: 20,
      offsetX: 99,
      offsetY: 2
    });
  });

  it('should set photo to new image if no photo exists', () => {
    const { result } = renderHook(() => usePrintDescription());
    const imageUpdate = {
      id: 'img3',
      src: 'photo.jpg',
      width: 30,
      height: 40,
      offsetX: 3,
      offsetY: 4
    };
    act(() => {
      result.current.updateCanvasImage(imageUpdate);
    });

    expect(result.current.printDescription.canvas.photo).toEqual(imageUpdate);
  });
});
