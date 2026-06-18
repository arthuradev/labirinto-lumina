import type { GridPosition } from '../core/types';
import type { LevelCollectibleDefinition } from '../levels';

export interface Collectible {
  readonly id: string;
  readonly position: GridPosition;
  readonly points: number;
  isCollected: boolean;
}

export const createCollectibles = (
  definitions: readonly LevelCollectibleDefinition[],
): Collectible[] =>
  definitions.map((definition) => ({
    id: definition.id,
    position: definition.position,
    points: definition.points,
    isCollected: false,
  }));
