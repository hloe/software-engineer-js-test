import { printDescriptionToPixels } from './printDescriptionToPixels';

describe('printDescriptionToPixels', () => {
  it('should convert canvas and photo dimensions from inches to pixels', () => {
    const printDescription = {
      canvas: {
        width: 2,
        height: 3,
        photo: {
          id: 'img1',
          src: 'test.jpg',
          width: 1,
          height: 2,
          offsetX: 0.5,
          offsetY: 1.5
        },
      },
    };

    const result = printDescriptionToPixels(printDescription);

    expect(result.canvas.width).toBe(80);
    expect(result.canvas.height).toBe(120);
    expect(result.canvas.photo).toEqual({
      id: 'img1',
      src: 'test.jpg',
      width: 40,
      height: 80,
      offsetX: 20,
      offsetY: 60
    });
  });

  it('should handle photo as null', () => {
    const printDescription = {
      canvas: {
        width: 1,
        height: 1,
        photo: null
      },
    };

    const result = printDescriptionToPixels(printDescription);

    expect(result.canvas.width).toBe(40);
    expect(result.canvas.height).toBe(40);
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
          offsetY: 0
        },
      },
    };

    const result = printDescriptionToPixels(printDescription);

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
        width: -1,
        height: -2,
        photo: {
          src: 'neg.jpg',
          width: -1,
          height: -2,
          offsetX: -0.5,
          offsetY: -1
        },
      },
    };

    const result = printDescriptionToPixels(printDescription);

    expect(result.canvas.width).toBe(-40);
    expect(result.canvas.height).toBe(-80);
    expect(result.canvas.photo).toEqual({
      src: 'neg.jpg',
      width: -40,
      height: -80,
      offsetX: -20,
      offsetY: -40
    });
  });

  it('should not mutate the original object', () => {
    const printDescription = {
      canvas: {
        width: 1,
        height: 2,
        photo: {
          src: 'test.jpg',
          width: 1,
          height: 2,
          offsetX: 0.5,
          offsetY: 1,
        }
      }
    };

    const original = JSON.parse(JSON.stringify(printDescription));
    printDescriptionToPixels(printDescription);
    expect(printDescription).toEqual(original);
  });
});
