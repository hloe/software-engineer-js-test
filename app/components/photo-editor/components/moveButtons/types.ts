import { Point } from '../../types';

export type MoveButtonsProps = {
  onMove: (point: Point) => Promise<void>;
};

export type Direction = 'left' | 'right' | 'up' | 'down';
