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
  pulseRemainingSeconds: number;
}

export const createPlayer = (start: GridPosition, tileSize: number): Player => ({
  gridPosition: start,
  worldPosition: gridToWorldCenter(start, tileSize),
  direction: 'none',
  requestedDirection: 'none',
  targetGridPosition: null,
  moveProgress: 0,
  pulseRemainingSeconds: 0,
});

export const resetPlayer = (player: Player, start: GridPosition, tileSize: number): void => {
  player.gridPosition = start;
  player.worldPosition = gridToWorldCenter(start, tileSize);
  player.direction = 'none';
  player.requestedDirection = 'none';
  player.targetGridPosition = null;
  player.moveProgress = 0;
  player.pulseRemainingSeconds = 0;
};
