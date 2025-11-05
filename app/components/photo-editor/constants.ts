import { PrintDescription } from './types';

const CANVAS_WIDTH_IN_INCHES = 15;
const CANVAS_HEIGHT_IN_INCHES = 10;

export const PIXELS_PER_INCH = 40;

export const DEFAULT_PRINT_DESCRIPTION: PrintDescription = {
  canvas: {
    width: CANVAS_WIDTH_IN_INCHES * PIXELS_PER_INCH,
    height: CANVAS_HEIGHT_IN_INCHES * PIXELS_PER_INCH,
    photo: null
  },
};
