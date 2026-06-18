import type { MovementDirection } from '../core/direction';
import { createPlayer, type Player } from '../entities/Player';
import { LEVEL_01, type LevelDefinition } from '../levels';
import { CollisionSystem } from '../systems/CollisionSystem';
import { MovementSystem } from '../systems/MovementSystem';
import { GAME_CONFIG } from './GameConfig';

export interface GameSessionSnapshot {
  readonly level: LevelDefinition;
  readonly player: Player;
}

export class GameSession {
  readonly #level = LEVEL_01;
  readonly #player = createPlayer(this.#level.playerStart, this.#level.tileSize);
  readonly #movementSystem = new MovementSystem(
    new CollisionSystem(),
    GAME_CONFIG.player.speedTilesPerSecond,
  );

  requestDirection(direction: MovementDirection): void {
    this.#movementSystem.requestDirection(this.#player, direction);
  }

  update(deltaSeconds: number): void {
    this.#movementSystem.update(this.#player, this.#level, deltaSeconds);
  }

  snapshot(): GameSessionSnapshot {
    return {
      level: this.#level,
      player: this.#player,
    };
  }
}
