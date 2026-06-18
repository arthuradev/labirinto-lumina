import type { Direction, MovementDirection } from '../core/direction';
import type { GridPosition, WorldPosition } from '../core/types';
import { gridToWorldCenter } from '../core/vector';
import type { LevelSentinelDefinition, SentinelType } from '../levels';

export interface Sentinel {
  readonly id: string;
  readonly type: SentinelType;
  readonly startGridPosition: GridPosition;
  gridPosition: GridPosition;
  worldPosition: WorldPosition;
  direction: Direction;
  targetGridPosition: GridPosition | null;
  moveProgress: number;
  patrolIndex: number;
  isUnstable: boolean;
  disabledRemainingSeconds: number;
}

export const createSentinels = (
  definitions: readonly LevelSentinelDefinition[],
  tileSize: number,
): Sentinel[] =>
  definitions.map((definition) => ({
    id: definition.id,
    type: definition.type,
    startGridPosition: definition.position,
    gridPosition: definition.position,
    worldPosition: gridToWorldCenter(definition.position, tileSize),
    direction: 'none',
    targetGridPosition: null,
    moveProgress: 0,
    patrolIndex: 0,
    isUnstable: false,
    disabledRemainingSeconds: 0,
  }));

export const resetSentinel = (sentinel: Sentinel, tileSize: number): void => {
  sentinel.gridPosition = sentinel.startGridPosition;
  sentinel.worldPosition = gridToWorldCenter(sentinel.startGridPosition, tileSize);
  sentinel.direction = 'none';
  sentinel.targetGridPosition = null;
  sentinel.moveProgress = 0;
  sentinel.patrolIndex = 0;
  sentinel.isUnstable = false;
  sentinel.disabledRemainingSeconds = 0;
};

export const disableSentinel = (
  sentinel: Sentinel,
  tileSize: number,
  durationSeconds: number,
): void => {
  resetSentinel(sentinel, tileSize);
  sentinel.disabledRemainingSeconds = durationSeconds;
  sentinel.isUnstable = true;
};

export const SENTINEL_PATROL_DIRECTIONS: readonly MovementDirection[] = [
  'right',
  'down',
  'left',
  'up',
];
