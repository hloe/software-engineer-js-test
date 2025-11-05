import { PrintDescription } from '../../types';

export const getIsDataValidPrintDescription = (obj: any): obj is PrintDescription => {
  return Boolean(
    obj &&
    typeof obj === 'object' &&
    obj.canvas &&
    typeof obj.canvas.width === 'number' &&
    typeof obj.canvas.height === 'number' &&
    (
      obj.canvas.photo === null ||
      (
        typeof obj.canvas.photo.id === 'string' &&
        typeof obj.canvas.photo.src === 'string' &&
        typeof obj.canvas.photo.width === 'number' &&
        typeof obj.canvas.photo.height === 'number' &&
        typeof obj.canvas.photo.x === 'number' &&
        typeof obj.canvas.photo.y === 'number'
      )
    )
  );
};
