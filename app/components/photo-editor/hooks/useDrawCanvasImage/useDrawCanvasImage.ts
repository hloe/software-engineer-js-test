import { DrawResult, Options } from './types';
import { DEFAULT_DRAW_RESULT } from './constants';

export const useDrawCanvasImage = (
  canvas?: React.RefObject<HTMLCanvasElement>
) => {
  const calculateImageDimensions = (
    photo: HTMLImageElement,
    canvasWidth: number,
    canvasHeight: number
  ) => {
    const canvasRatio = canvasWidth / canvasHeight;
    const photoRatio = photo.width / photo.height;

    if (photoRatio > canvasRatio) {
      const sourceWidth = photo.height * canvasRatio;

      const horizontalDimensions = {
        sourceWidth,
        sourceHeight: photo.height,
        maxOffsetX: photo.width - sourceWidth,
        maxOffsetY: 0
      };

      return horizontalDimensions;
    } else {
      const sourceHeight = photo.width / canvasRatio;

      const verticalDimensions = {
        sourceWidth: photo.width,
        sourceHeight,
        maxOffsetX: 0,
        maxOffsetY: photo.height - sourceHeight
      };

      return verticalDimensions;
    }
  };

  const calculateOffsets = (options: Options, maxOffsetX: number, maxOffsetY: number) => {
    if (options.center) {
      const centeredImagesOffsets = {
        offsetX: maxOffsetX > 0 ? maxOffsetX / 2 : 0,
        offsetY: maxOffsetY > 0 ? maxOffsetY / 2 : 0
      };

      return centeredImagesOffsets;
    } else {
      const offsetX = options.offsetX ?? 0;
      const offsetY = options.offsetY ?? 0;

      const rangeOffsets = {
        offsetX: Math.max(0, Math.min(offsetX, maxOffsetX)),
        offsetY: Math.max(0, Math.min(offsetY, maxOffsetY))
      };

      return rangeOffsets;
    }
  };

  const drawImageToCanvas = (
    image: HTMLImageElement,
    options: Options
  ): DrawResult => {
    if (!canvas?.current) {
      return DEFAULT_DRAW_RESULT;
    }

    const ctx = canvas?.current?.getContext('2d');
    if (!ctx) {
      return DEFAULT_DRAW_RESULT;
    }

    const canvasWidth = canvas.current.width;
    const canvasHeight = canvas.current.height;

    const { sourceWidth, sourceHeight, maxOffsetX, maxOffsetY } =
      calculateImageDimensions(image, canvasWidth, canvasHeight);

    const { offsetX, offsetY } = calculateOffsets(options, maxOffsetX, maxOffsetY);

    ctx.drawImage(
      image,
      offsetX,
      offsetY,
      sourceWidth,
      sourceHeight,
      0,
      0,
      canvasWidth,
      canvasHeight
    );

    return {
      width: image.width,
      height: image.height,
      offsetX: offsetX,
      offsetY: offsetY
    };
  };

  const clearCanvas = () => {
    if (!canvas?.current) {
      return;
    }

    const ctx = canvas.current.getContext('2d');

    if (!ctx) {
      return;
    }

    ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);
  };

  return {
    clearCanvas,
    drawImageToCanvas
  };
};
