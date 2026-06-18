import type { Direction, MovementDirection } from '../core/direction';
import { DIRECTION_VECTORS, isMovementDirection } from '../core/direction';
import { addGridPositions } from '../core/grid';
import { gridToWorldCenter, lerpWorldPosition } from '../core/vector';
import type { Player } from '../entities/Player';
import type { LevelDefinition } from '../levels';
import { CollisionSystem } from './CollisionSystem';

export class MovementSystem {
  constructor(
    private readonly collisionSystem: CollisionSystem,
    private readonly speedTilesPerSecond: number,
  ) {}

  requestDirection(player: Player, direction: MovementDirection): void {
    player.requestedDirection = direction;
  }

  update(player: Player, level: LevelDefinition, deltaSeconds: number): void {
    if (player.targetGridPosition) {
      this.#advanceActiveMove(player, level, deltaSeconds);
      return;
    }

    this.#tryStartMove(player, level);
  }

  #advanceActiveMove(player: Player, level: LevelDefinition, deltaSeconds: number): void {
    const target = player.targetGridPosition;

    if (!target) {
      return;
    }

    const nextProgress = player.moveProgress + this.speedTilesPerSecond * deltaSeconds;

    if (nextProgress >= 1) {
      player.gridPosition = target;
      player.worldPosition = gridToWorldCenter(target, level.tileSize);
      player.targetGridPosition = null;
      player.moveProgress = 0;
      this.#tryStartMove(player, level);
      return;
    }

    const from = gridToWorldCenter(player.gridPosition, level.tileSize);
    const to = gridToWorldCenter(target, level.tileSize);

    player.moveProgress = nextProgress;
    player.worldPosition = lerpWorldPosition(from, to, nextProgress);
  }

  #tryStartMove(player: Player, level: LevelDefinition): void {
    const nextDirection = this.#chooseDirection(player, level);

    if (!isMovementDirection(nextDirection)) {
      player.direction = 'none';
      return;
    }

    player.direction = nextDirection;
    player.targetGridPosition = this.#getNextPosition(player, nextDirection);
    player.moveProgress = 0;
  }

  #chooseDirection(player: Player, level: LevelDefinition): Direction {
    if (
      isMovementDirection(player.requestedDirection) &&
      this.#canMove(player, level, player.requestedDirection)
    ) {
      return player.requestedDirection;
    }

    if (isMovementDirection(player.direction) && this.#canMove(player, level, player.direction)) {
      return player.direction;
    }

    return 'none';
  }

  #canMove(player: Player, level: LevelDefinition, direction: MovementDirection): boolean {
    return this.collisionSystem.isWalkable(level, this.#getNextPosition(player, direction));
  }

  #getNextPosition(player: Player, direction: MovementDirection) {
    return addGridPositions(player.gridPosition, DIRECTION_VECTORS[direction]);
  }
}
