import type { MovementDirection } from '../core/direction';
import { createCollectibles, type Collectible } from '../entities/Collectible';
import { createPlayer, resetPlayer, type Player } from '../entities/Player';
import { createPowerNodes, type PowerNode } from '../entities/PowerNode';
import { createSentinels, resetSentinel, type Sentinel } from '../entities/Sentinel';
import { LEVEL_01, type LevelDefinition } from '../levels';
import { CollectionSystem } from '../systems/CollectionSystem';
import { CollisionSystem } from '../systems/CollisionSystem';
import { EnemyAISystem } from '../systems/EnemyAISystem';
import { MovementSystem } from '../systems/MovementSystem';
import { ScoreSystem, type ScoreState } from '../systems/ScoreSystem';
import { SentinelCollisionSystem } from '../systems/SentinelCollisionSystem';
import { GAME_CONFIG } from './GameConfig';

export interface GameSessionSnapshot {
  readonly level: LevelDefinition;
  readonly player: Player;
  readonly collectibles: readonly Collectible[];
  readonly powerNodes: readonly PowerNode[];
  readonly sentinels: readonly Sentinel[];
  readonly score: ScoreState;
  readonly isLevelComplete: boolean;
  readonly isGameOver: boolean;
}

export type GameSessionOutcome = 'level-complete' | 'game-over' | null;

export class GameSession {
  readonly #level = LEVEL_01;
  readonly #player = createPlayer(this.#level.playerStart, this.#level.tileSize);
  readonly #collectibles = createCollectibles(this.#level.collectibles);
  readonly #powerNodes = createPowerNodes(this.#level.powerNodes);
  readonly #sentinels = createSentinels(this.#level.sentinels, this.#level.tileSize);
  readonly #collisionSystem = new CollisionSystem();
  readonly #collectionSystem = new CollectionSystem();
  readonly #scoreSystem = new ScoreSystem({
    initialLives: GAME_CONFIG.player.initialLives,
    fragmentsTotal: this.#level.collectibles.length,
    levelCompleteLifeBonus: GAME_CONFIG.scoring.levelCompleteLifeBonus,
  });
  readonly #movementSystem = new MovementSystem(
    this.#collisionSystem,
    GAME_CONFIG.player.speedTilesPerSecond,
  );
  readonly #enemyAISystem = new EnemyAISystem(
    this.#collisionSystem,
    GAME_CONFIG.sentinels.speedTilesPerSecond,
  );
  readonly #sentinelCollisionSystem = new SentinelCollisionSystem(
    GAME_CONFIG.scoring.sentinelPulsePoints,
    GAME_CONFIG.sentinels.disabledSecondsAfterPulse,
  );

  #outcome: GameSessionOutcome = null;

  requestDirection(direction: MovementDirection): void {
    this.#movementSystem.requestDirection(this.#player, direction);
  }

  update(deltaSeconds: number): GameSessionOutcome {
    if (this.#outcome) {
      return this.#outcome;
    }

    this.#movementSystem.update(this.#player, this.#level, deltaSeconds);
    this.#updatePulse(deltaSeconds);
    this.#collectCurrentTile();
    this.#enemyAISystem.updateSentinels(
      this.#sentinels,
      this.#level,
      this.#player,
      this.#player.pulseRemainingSeconds > 0,
      deltaSeconds,
    );
    this.#resolveSentinelCollision();

    if (this.#scoreSystem.isLevelComplete()) {
      this.#scoreSystem.addLevelCompleteBonus();
      this.#outcome = 'level-complete';
    } else if (this.#scoreSystem.isGameOver()) {
      this.#outcome = 'game-over';
    }

    return this.#outcome;
  }

  snapshot(): GameSessionSnapshot {
    return {
      level: this.#level,
      player: this.#player,
      collectibles: this.#collectibles,
      powerNodes: this.#powerNodes,
      sentinels: this.#sentinels,
      score: this.#scoreSystem.state,
      isLevelComplete: this.#scoreSystem.isLevelComplete(),
      isGameOver: this.#scoreSystem.isGameOver(),
    };
  }

  #collectCurrentTile(): void {
    const result = this.#collectionSystem.collectAt(
      this.#player.gridPosition,
      this.#collectibles,
      this.#powerNodes,
      this.#scoreSystem,
    );

    if (result.activatedPowerNode) {
      this.#player.pulseRemainingSeconds = result.activatedPowerNode.durationSeconds;
    }
  }

  #updatePulse(deltaSeconds: number): void {
    this.#player.pulseRemainingSeconds = Math.max(
      0,
      this.#player.pulseRemainingSeconds - deltaSeconds,
    );
  }

  #resolveSentinelCollision(): void {
    const result = this.#sentinelCollisionSystem.resolve(
      this.#player,
      this.#sentinels,
      this.#level,
      this.#scoreSystem,
    );

    if (result === 'player-hit' && !this.#scoreSystem.isGameOver()) {
      this.#resetActorsAfterHit();
    }
  }

  #resetActorsAfterHit(): void {
    resetPlayer(this.#player, this.#level.playerStart, this.#level.tileSize);

    for (const sentinel of this.#sentinels) {
      resetSentinel(sentinel, this.#level.tileSize);
    }
  }
}
