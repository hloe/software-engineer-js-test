import { Point } from '../../types';
import { Direction } from './types';

const STEP = 10;

export const moveMapper: Record<Direction, Point> = {
  left: { x: -STEP, y: 0 },
  right: { x: STEP, y: 0 },
  up: { x: 0, y: STEP },
  down: { x: 0, y: -STEP }
};
