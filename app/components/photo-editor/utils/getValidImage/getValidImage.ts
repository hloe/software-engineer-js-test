import { VALID_IMAGE_TYPES } from './constants';

export const getValidImage = (files: FileList): File | null => {
  if (files[0] && VALID_IMAGE_TYPES.includes(files[0].type)) {
    return files[0];
  }

  return null;
};
