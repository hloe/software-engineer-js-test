import { useState } from 'react';
import { PrintDescription, Image } from '../../types';
import { DEFAULT_PRINT_DESCRIPTION } from '../../constants';

export const usePrintDescription = () => {
  const [printDescription, setPrintDescription] = useState<PrintDescription>(
    DEFAULT_PRINT_DESCRIPTION
  );

  const updateCanvasImage = (imageUpdate: Image) => {
    const newImage: Image = {
      ...(printDescription.canvas.photo ?? {}),
      ...imageUpdate
    };

    setPrintDescription((prevDescription: PrintDescription) => ({
      ...prevDescription,
      canvas: {
        ...prevDescription.canvas,
        photo: newImage
      },
    }));
  };

  return {
    printDescription,
    updatePrintDescription: setPrintDescription,
    updateCanvasImage
  };
};
