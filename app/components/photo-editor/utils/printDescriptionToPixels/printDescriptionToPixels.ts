import { PIXELS_PER_INCH } from '../../constants';
import { PrintDescription } from '../../types';

const inchesToPixels = (inches: number): number => {
  return inches * PIXELS_PER_INCH;
}

export const printDescriptionToPixels = (
  printDescription: PrintDescription
): PrintDescription => ({
  canvas: {
    width: inchesToPixels(printDescription.canvas.width),
    height: inchesToPixels(printDescription.canvas.height),
    photo: printDescription.canvas.photo
      ? {
        ...printDescription.canvas.photo,
        width: inchesToPixels(printDescription.canvas.photo.width),
        height: inchesToPixels(printDescription.canvas.photo.height),
        offsetX: inchesToPixels(printDescription.canvas.photo.offsetX),
        offsetY: inchesToPixels(printDescription.canvas.photo.offsetY)
      }
      : null
  }
});
