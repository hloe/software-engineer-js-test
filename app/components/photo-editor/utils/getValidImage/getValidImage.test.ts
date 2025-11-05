import { getValidImage } from './getValidImage';
import { VALID_IMAGE_TYPES } from './constants';

describe('getValidImage', () => {
  const createFile = (type: string) =>
    new File(['dummy'], 'dummy.' + type.split('/')[1], { type });

  it('should return null if files is empty', () => {
    const files = {
      length: 0,
      item: () => null,
      0: undefined
    } as unknown as FileList;

    expect(getValidImage(files)).toBeNull();
  });

  it('should return null if files[0] is not a valid image type', () => {
    const file = createFile('application/pdf');
    const files = {
      length: 1,
      0: file,
      item: () => file
    } as unknown as FileList;

    expect(getValidImage(files)).toBeNull();
  });

  it('should return the file if files[0] is a valid image type', () => {
    for (const type of VALID_IMAGE_TYPES) {
      const file = createFile(type);
      const files = {
        length: 1,
        0: file,
        item: () => file
      } as unknown as FileList;

      expect(getValidImage(files)).toBe(file);
    }
  });

  it('should return null if files[0] is undefined', () => {
    const files = {
      length: 1,
      0: undefined,
      item: () => undefined
    } as unknown as FileList;

    expect(getValidImage(files)).toBeNull();
  });
});
