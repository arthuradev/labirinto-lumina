import type { Direction } from '../core/direction';
import type { GridPosition, WorldPosition } from '../core/types';
import { gridToWorldCenter } from '../core/vector';

export interface Player {
  gridPosition: GridPosition;
  worldPosition: WorldPosition;
  direction: Direction;
  requestedDirection: Direction;
  targetGridPosition: GridPosition | null;
  moveProgress: number;
}

export const createPlayer = (start: GridPosition, tileSize: number): Player => ({
  gridPosition: start,
  worldPosition: gridToWorldCenter(start, tileSize),
  direction: 'none',
  requestedDirection: 'none',
  targetGridPosition: null,
  moveProgress: 0,
});
