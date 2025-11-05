import { printDescriptionToInches } from './printDescriptionToInches';
import { PIXELS_PER_INCH } from '../../constants';

describe('printDescriptionToInches', () => {
  it('should convert canvas and photo dimensions from pixels to inches', () => {
    const printDescription = {
      canvas: {
        width: PIXELS_PER_INCH * 2,
        height: PIXELS_PER_INCH * 3,
        photo: {
          id: 'img1',
          src: 'test.jpg',
          width: PIXELS_PER_INCH,
          height: PIXELS_PER_INCH * 2,
          offsetX: PIXELS_PER_INCH * 0.5,
          offsetY: PIXELS_PER_INCH * 1.5
        },
      },
    };

    const result = printDescriptionToInches(printDescription);

    expect(result.canvas.width).toBe(2);
    expect(result.canvas.height).toBe(3);
    expect(result.canvas.photo).toEqual({
      id: 'img1',
      src: 'test.jpg',
      width: 1,
      height: 2,
      offsetX: 0.5,
      offsetY: 1.5
    });
  });

  it('should handle photo as null', () => {
    const printDescription = {
      canvas: {
        width: 40,
        height: 40,
        photo: null,
      },
    };

    const result = printDescriptionToInches(printDescription);

    expect(result.canvas.width).toBe(1);
    expect(result.canvas.height).toBe(1);
    expect(result.canvas.photo).toBeNull();
  });

  it('should handle zero values', () => {
    const printDescription = {
      canvas: {
        width: 0,
        height: 0,
        photo: {
          src: 'zero.jpg',
          width: 0,
          height: 0,
          offsetX: 0,
          offsetY: 0,
        }
      }
    };

    const result = printDescriptionToInches(printDescription);

    expect(result.canvas.width).toBe(0);
    expect(result.canvas.height).toBe(0);
    expect(result.canvas.photo).toEqual({
      src: 'zero.jpg',
      width: 0,
      height: 0,
      offsetX: 0,
      offsetY: 0
    });
  });

  it('should handle negative values', () => {
    const printDescription = {
      canvas: {
        width: -40,
        height: -80,
        photo: {
          src: 'neg.jpg',
          width: -40,
          height: -80,
          offsetX: -20,
          offsetY: -40,
        }
      }
    };

    const result = printDescriptionToInches(printDescription);

    expect(result.canvas.width).toBe(-1);
    expect(result.canvas.height).toBe(-2);
    expect(result.canvas.photo).toEqual({
      src: 'neg.jpg',
      width: -1,
      height: -2,
      offsetX: -0.5,
      offsetY: -1,
    });
  });

  it('should not mutate the original object', () => {
    const printDescription = {
      canvas: {
        width: 40,
        height: 80,
        photo: {
          src: 'test.jpg',
          width: 40,
          height: 80,
          offsetX: 20,
          offsetY: 40,
        }
      }
    };

    const original = JSON.parse(JSON.stringify(printDescription));
    printDescriptionToInches(printDescription);

    expect(printDescription).toEqual(original);
  });
});
