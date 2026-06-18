import type { MovementDirection } from '../core/direction';
import { DIRECTION_VECTORS, MOVEMENT_DIRECTIONS } from '../core/direction';
import { addGridPositions } from '../core/grid';
import type { GridPosition } from '../core/types';
import { gridToWorldCenter, lerpWorldPosition } from '../core/vector';
import type { Player } from '../entities/Player';
import { resetSentinel, SENTINEL_PATROL_DIRECTIONS, type Sentinel } from '../entities/Sentinel';
import type { LevelDefinition } from '../levels';
import { CollisionSystem } from './CollisionSystem';

export class EnemyAISystem {
  constructor(
    private readonly collisionSystem: CollisionSystem,
    private readonly speedTilesPerSecond: number,
  ) {}

  updateSentinels(
    sentinels: Sentinel[],
    level: LevelDefinition,
    player: Player,
    isPulseActive: boolean,
    deltaSeconds: number,
  ): void {
    for (const sentinel of sentinels) {
      this.#updateSentinel(sentinel, level, player, isPulseActive, deltaSeconds);
    }
  }

  chooseDirection(
    sentinel: Sentinel,
    level: LevelDefinition,
    player: Player,
    isPulseActive: boolean,
  ): MovementDirection | null {
    if (sentinel.type === 'rastro' && !isPulseActive) {
      return this.#choosePatrolDirection(sentinel, level);
    }

    const target = this.#getTargetPosition(sentinel, player);
    const candidates = MOVEMENT_DIRECTIONS.filter((direction) =>
      this.#canMove(sentinel.gridPosition, level, direction),
    );

    candidates.sort((left, right) => {
      const leftDistance = getManhattanDistance(
        this.#getNextPosition(sentinel.gridPosition, left),
        target,
      );
      const rightDistance = getManhattanDistance(
        this.#getNextPosition(sentinel.gridPosition, right),
        target,
      );

      return isPulseActive ? rightDistance - leftDistance : leftDistance - rightDistance;
    });

    return candidates[0] ?? null;
  }

  #updateSentinel(
    sentinel: Sentinel,
    level: LevelDefinition,
    player: Player,
    isPulseActive: boolean,
    deltaSeconds: number,
  ): void {
    if (sentinel.disabledRemainingSeconds > 0) {
      sentinel.disabledRemainingSeconds = Math.max(
        0,
        sentinel.disabledRemainingSeconds - deltaSeconds,
      );

      if (sentinel.disabledRemainingSeconds === 0) {
        resetSentinel(sentinel, level.tileSize);
      }

      return;
    }

    sentinel.isUnstable = isPulseActive;

    if (sentinel.targetGridPosition) {
      this.#advanceActiveMove(sentinel, level, deltaSeconds);
      return;
    }

    this.#tryStartMove(sentinel, level, player, isPulseActive);
  }

  #advanceActiveMove(sentinel: Sentinel, level: LevelDefinition, deltaSeconds: number): void {
    const target = sentinel.targetGridPosition;

    if (!target) {
      return;
    }

    const nextProgress = sentinel.moveProgress + this.speedTilesPerSecond * deltaSeconds;

    if (nextProgress >= 1) {
      sentinel.gridPosition = target;
      sentinel.worldPosition = gridToWorldCenter(target, level.tileSize);
      sentinel.targetGridPosition = null;
      sentinel.moveProgress = 0;
      return;
    }

    const from = gridToWorldCenter(sentinel.gridPosition, level.tileSize);
    const to = gridToWorldCenter(target, level.tileSize);

    sentinel.moveProgress = nextProgress;
    sentinel.worldPosition = lerpWorldPosition(from, to, nextProgress);
  }

  #tryStartMove(
    sentinel: Sentinel,
    level: LevelDefinition,
    player: Player,
    isPulseActive: boolean,
  ): void {
    const direction = this.chooseDirection(sentinel, level, player, isPulseActive);

    if (!direction) {
      sentinel.direction = 'none';
      return;
    }

    sentinel.direction = direction;
    sentinel.targetGridPosition = this.#getNextPosition(sentinel.gridPosition, direction);
    sentinel.moveProgress = 0;
  }

  #choosePatrolDirection(sentinel: Sentinel, level: LevelDefinition): MovementDirection | null {
    for (let offset = 0; offset < SENTINEL_PATROL_DIRECTIONS.length; offset += 1) {
      const index = (sentinel.patrolIndex + offset) % SENTINEL_PATROL_DIRECTIONS.length;
      const direction = SENTINEL_PATROL_DIRECTIONS[index];

      if (this.#canMove(sentinel.gridPosition, level, direction)) {
        sentinel.patrolIndex = index;
        return direction;
      }
    }

    return null;
  }

  #getTargetPosition(sentinel: Sentinel, player: Player): GridPosition {
    if (sentinel.type !== 'eco' || player.direction === 'none') {
      return player.gridPosition;
    }

    const vector = DIRECTION_VECTORS[player.direction];

    return {
      x: player.gridPosition.x + vector.x * 2,
      y: player.gridPosition.y + vector.y * 2,
    };
  }

  #canMove(position: GridPosition, level: LevelDefinition, direction: MovementDirection): boolean {
    return this.collisionSystem.isWalkable(level, this.#getNextPosition(position, direction));
  }

  #getNextPosition(position: GridPosition, direction: MovementDirection): GridPosition {
    return addGridPositions(position, DIRECTION_VECTORS[direction]);
  }
}

const getManhattanDistance = (left: GridPosition, right: GridPosition): number =>
  Math.abs(left.x - right.x) + Math.abs(left.y - right.y);
