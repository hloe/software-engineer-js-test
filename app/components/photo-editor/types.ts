export type Image = {
  id?: string;
  src: string;
  width: number;
  height: number;
  offsetX: number;
  offsetY: number;
};

export type PrintDescription = {
  canvas: {
    width: number;
    height: number;
    photo: Image | null;
  };
};

export type Point = {
  x: number;
  y: number;
};
