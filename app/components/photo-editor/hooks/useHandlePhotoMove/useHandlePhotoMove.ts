import { convertFileToHTMLImage } from '../../utils';
import { PhotoMove } from './types';
import { PrintDescription, Point } from '../../types';

export const useHandlePhotoMove = (
  canvas?: React.RefObject<HTMLCanvasElement>
) => {
  const handlePhotoMove = async (
    moveBy: Point,
    printDescription: PrintDescription
  ): Promise<PhotoMove | null> => {
    const currentImage = printDescription.canvas.photo;

    if (!currentImage || !canvas?.current) {
      return null;
    }

    const imageElement = await convertFileToHTMLImage(currentImage);

    return {
      id: currentImage.id ?? '',
      imageElement,
      offsetX: currentImage.offsetX + moveBy.x,
      offsetY: currentImage.offsetY + moveBy.y
    };
  };

  return { handlePhotoMove };
};