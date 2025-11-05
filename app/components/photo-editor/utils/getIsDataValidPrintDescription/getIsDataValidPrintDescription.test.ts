import { getIsDataValidPrintDescription } from './getIsDataValidPrintDescription';

describe('getIsDataValidPrintDescription', () => {
  it('should return false for null', () => {
    expect(getIsDataValidPrintDescription(null)).toBe(false);
  });

  it('should return false for non-object', () => {
    expect(getIsDataValidPrintDescription(42)).toBe(false);
    expect(getIsDataValidPrintDescription('string')).toBe(false);
    expect(getIsDataValidPrintDescription(undefined)).toBe(false);
  });

  it('should return false if canvas is missing', () => {
    expect(getIsDataValidPrintDescription({})).toBe(false);
    expect(getIsDataValidPrintDescription({ foo: 1 })).toBe(false);
  });

  it('should return false if canvas.width or canvas.height is not a number', () => {
    expect(getIsDataValidPrintDescription({
      canvas: {
        width: 'a',
        height: 1,
        photo: null
      }
    })).toBe(false);
    expect(getIsDataValidPrintDescription({
      canvas: {
        width: 1,
        height: 'b',
        photo: null
      }
    })).toBe(false);
  });

  it('should return true if photo is null', () => {
    expect(getIsDataValidPrintDescription({
      canvas: {
        width: 1,
        height: 2,
        photo: null
      }
    })).toBe(true);
  });

  it('should return true for valid photo with x and y', () => {
    const obj = {
      canvas: {
        width: 100,
        height: 200,
        photo: {
          id: 'id1',
          src: 'img.jpg',
          width: 10,
          height: 20,
          x: 5,
          y: 6,
        },
      },
    };
    expect(getIsDataValidPrintDescription(obj)).toBe(true);
  });

  it('should return false if photo is missing required fields', () => {
    const missingId = {
      canvas: {
        width: 100,
        height: 200,
        photo: {
          src: 'img.jpg',
          width: 10,
          height: 20,
          x: 5,
          y: 6,
        },
      },
    };
    const missingX = {
      canvas: {
        width: 100,
        height: 200,
        photo: {
          id: 'id1',
          src: 'img.jpg',
          width: 10,
          height: 20,
          y: 6,
        },
      },
    };
    const wrongXType = {
      canvas: {
        width: 100,
        height: 200,
        photo: {
          id: 'id1',
          src: 'img.jpg',
          width: 10,
          height: 20,
          x: 'not-a-number',
          y: 6,
        },
      },
    };
    expect(getIsDataValidPrintDescription(missingId)).toBe(false);
    expect(getIsDataValidPrintDescription(missingX)).toBe(false);
    expect(getIsDataValidPrintDescription(wrongXType)).toBe(false);
  });

  it('should return false if photo is not an object', () => {
    expect(getIsDataValidPrintDescription({
      canvas: {
        width: 1,
        height: 2,
        photo: 123
      }
    })).toBe(false);
  });
});
