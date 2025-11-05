import { Image } from '../../types';

export const convertFileToHTMLImage = (
  file: Image
): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => resolve(img);
    img.onerror = (error) =>
      reject(new Error(`Failed to load image: ${error}`));

    img.src = file.src ?? '';
  });
};