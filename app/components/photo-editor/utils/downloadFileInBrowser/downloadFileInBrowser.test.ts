/**
 * @jest-environment jsdom
 */
import { downloadFileInBrowser } from './downloadFileInBrowser';

describe('downloadFileInBrowser', () => {
  let createObjectURLSpy: jest.SpyInstance;
  let revokeObjectURLSpy: jest.SpyInstance;
  let createElementSpy: jest.SpyInstance;
  let mockClick: jest.Mock;

  beforeAll(() => {
    window.URL.createObjectURL = jest.fn(() => 'blob:http://test');
    window.URL.revokeObjectURL = jest.fn();
  });

  beforeEach(() => {
    createObjectURLSpy = jest.spyOn(window.URL, 'createObjectURL');
    revokeObjectURLSpy = jest.spyOn(window.URL, 'revokeObjectURL');
    mockClick = jest.fn();
    createElementSpy = jest.spyOn(document, 'createElement').mockImplementation((tag: string) => {
      if (tag === 'a') {
        return {
          set href(val: string) {},
          get href() { return ''; },
          set download(val: string) {},
          get download() { return ''; },
          click: mockClick,
        } as any;
      }
      return {} as any;
    });
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should create a blob, anchor, and trigger download with default mimeType', () => {
    const data = JSON.stringify({ foo: 'bar' });
    const filename = 'test.json';

    downloadFileInBrowser(data, filename);

    expect(createObjectURLSpy).toHaveBeenCalled();
    expect(createElementSpy).toHaveBeenCalledWith('a');
    expect(mockClick).toHaveBeenCalled();
    expect(revokeObjectURLSpy).toHaveBeenCalled();
  });

  it('should set the correct filename on the anchor', () => {
    let anchorDownload = '';
    createElementSpy.mockImplementation((tag: string) => {
      if (tag === 'a') {
        return {
          set href(val: string) {},
          get href() { return ''; },
          set download(val: string) { anchorDownload = val; },
          get download() { return anchorDownload; },
          click: mockClick,
        } as any;
      }
      return {} as any;
    });

    const data = 'test';
    const filename = 'file.txt';

    downloadFileInBrowser(data, filename);

    expect(anchorDownload).toBe(filename);
  });
});
