import { PIXELS_PER_INCH } from '../../constants';
import { PrintDescription } from '../../types';

const pixelsToInches = (pixels: number): number => {
  return pixels / PIXELS_PER_INCH;
}

export const printDescriptionToInches = (
  printDescription: PrintDescription,
): PrintDescription => ({
  canvas: {
    width: pixelsToInches(printDescription.canvas.width),
    height: pixelsToInches(printDescription.canvas.height),
    photo: printDescription.canvas.photo
      ? {
        ...printDescription.canvas.photo,
        width: pixelsToInches(printDescription.canvas.photo.width),
        height: pixelsToInches(printDescription.canvas.photo.height),
        offsetX: pixelsToInches(printDescription.canvas.photo.offsetX),
        offsetY: pixelsToInches(printDescription.canvas.photo.offsetY)
      }
      : null
  },
});
