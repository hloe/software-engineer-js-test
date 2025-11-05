/**
 * @jest-environment jsdom
 */
import { convertFileToHTMLImage } from './convertFileToHTMLImage';

describe('convertFileToHTMLImage', () => {
  let originalImage: typeof window.Image;

  beforeAll(() => {
    originalImage = window.Image;
  });

  afterAll(() => {
    window.Image = originalImage;
  });

  it('should resolve with an HTMLImageElement when image loads', async () => {
    class MockImage {
      src = '';
      onload: (() => void) | null = null;
      constructor() {
        setTimeout(() => {
          if (this.onload) this.onload();
        }, 0);
      }
    }
    // @ts-ignore
    window.Image = MockImage;

    const file = {
      src: 'test.jpg',
      width: 100,
      height: 100,
      offsetX: 0,
      offsetY: 0
    };

    const img = await convertFileToHTMLImage(file);

    expect(img).toBeInstanceOf(MockImage);
    expect(img.src).toBe('test.jpg');
  });

  it('should reject if image fails to load', async () => {
    class MockImage {
      src = '';
      onerror: ((err: any) => void) | null = null;
      constructor() {
        setTimeout(() => {
          if (this.onerror) this.onerror('error');
        }, 0);
      }
    }
    // @ts-ignore
    window.Image = MockImage;

    const file = {
      src: 'bad.jpg',
      width: 100,
      height: 100,
      offsetX: 0,
      offsetY: 0
    };

    await expect(convertFileToHTMLImage(file)).rejects.toThrow('Failed to load image: error');
  });

  it('should set img.src to file.src', async () => {
    let setSrc = '';
    class MockImage {
      onload: (() => void) | null = null;
      set src(val: string) {
        setSrc = val;
        if (this.onload) this.onload();
      }
      get src() {
        return setSrc;
      }
    }
    // @ts-ignore
    window.Image = MockImage;

    const file = {
      src: 'foo.png',
      width: 1,
      height: 1,
      offsetX: 0,
      offsetY: 0
    };

    await convertFileToHTMLImage(file);

    expect(setSrc).toBe('foo.png');
  });
});
