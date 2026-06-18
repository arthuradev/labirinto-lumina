import { isInsideGrid, toGridIndex } from '../core/grid';
import type { GridPosition } from '../core/types';
import type { LevelDefinition } from '../levels';

export class CollisionSystem {
  isWalkable(level: LevelDefinition, position: GridPosition): boolean {
    if (!isInsideGrid(position, level.width, level.height)) {
      return false;
    }

    return level.tiles[toGridIndex(position, level.width)] === 'floor';
  }
}
