import type { GridPosition } from './types';

export type MovementDirection = 'up' | 'down' | 'left' | 'right';
export type Direction = MovementDirection | 'none';

export const DIRECTION_VECTORS: Record<MovementDirection, GridPosition> = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
};

export const isMovementDirection = (direction: Direction): direction is MovementDirection =>
  direction !== 'none';
