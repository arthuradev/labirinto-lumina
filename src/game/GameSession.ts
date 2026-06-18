import type { MovementDirection } from '../core/direction';
import { createCollectibles, type Collectible } from '../entities/Collectible';
import { createPlayer, resetPlayer, type Player } from '../entities/Player';
import { createPowerNodes, type PowerNode } from '../entities/PowerNode';
import { createSentinels, resetSentinel, type Sentinel } from '../entities/Sentinel';
import { LEVELS, type LevelDefinition } from '../levels';
import { CollectionSystem } from '../systems/CollectionSystem';
import { CollisionSystem } from '../systems/CollisionSystem';
import { EnemyAISystem } from '../systems/EnemyAISystem';
import { MovementSystem } from '../systems/MovementSystem';
import { ScoreSystem, type ScoreState } from '../systems/ScoreSystem';
import { SentinelCollisionSystem } from '../systems/SentinelCollisionSystem';
import { GAME_CONFIG } from './GameConfig';

export interface GameSessionSnapshot {
  readonly level: LevelDefinition;
  readonly currentLevelNumber: number;
  readonly totalLevelCount: number;
  readonly player: Player;
  readonly collectibles: readonly Collectible[];
  readonly powerNodes: readonly PowerNode[];
  readonly sentinels: readonly Sentinel[];
  readonly score: ScoreState;
  readonly isLevelComplete: boolean;
  readonly isGameOver: boolean;
}

export type GameSessionEvent =
  | 'fragment-collected'
  | 'pulse-activated'
  | 'sentinel-crossed'
  | 'player-hit'
  | 'level-complete'
  | 'game-over';

export type GameSessionOutcome = 'level-complete' | 'game-over' | null;

export interface GameSessionOptions {
  readonly levels?: readonly LevelDefinition[];
}

export class GameSession {
  readonly #levels: readonly LevelDefinition[];
  readonly #collisionSystem = new CollisionSystem();
  readonly #collectionSystem = new CollectionSystem();
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

  readonly #scoreSystem: ScoreSystem;

  #levelIndex = 0;
  #level: LevelDefinition;
  #player: Player;
  #collectibles: Collectible[];
  #powerNodes: PowerNode[];
  #sentinels: Sentinel[];
  #events: GameSessionEvent[] = [];
  #outcome: GameSessionOutcome = null;

  constructor(options: GameSessionOptions = {}) {
    this.#levels = options.levels ?? LEVELS;
    const firstLevel = this.#levels[0];

    if (!firstLevel) {
      throw new Error('A sessao de jogo precisa de pelo menos uma fase.');
    }

    this.#level = firstLevel;
    this.#player = createPlayer(this.#level.playerStart, this.#level.tileSize);
    this.#collectibles = createCollectibles(this.#level.collectibles);
    this.#powerNodes = createPowerNodes(this.#level.powerNodes);
    this.#sentinels = createSentinels(this.#level.sentinels, this.#level.tileSize);
    this.#scoreSystem = new ScoreSystem({
      initialLives: GAME_CONFIG.player.initialLives,
      fragmentsTotal: this.#level.collectibles.length,
      levelCompleteLifeBonus: GAME_CONFIG.scoring.levelCompleteLifeBonus,
    });
  }

  hasNextLevel(): boolean {
    return this.#levelIndex < this.#levels.length - 1;
  }

  advanceToNextLevel(): boolean {
    if (this.#outcome !== 'level-complete' || !this.hasNextLevel()) {
      return false;
    }

    this.#levelIndex += 1;
    this.#loadCurrentLevel();
    this.#scoreSystem.startLevel(this.#level.collectibles.length);
    this.#outcome = null;

    return true;
  }

  requestDirection(direction: MovementDirection): void {
    this.#movementSystem.requestDirection(this.#player, direction);
  }

  consumeEvents(): readonly GameSessionEvent[] {
    const events = [...this.#events];
    this.#events = [];

    return events;
  }

  update(deltaSeconds: number): GameSessionOutcome {
    this.#events = [];

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
      this.#events.push('level-complete');
      this.#outcome = 'level-complete';
    } else if (this.#scoreSystem.isGameOver()) {
      this.#events.push('game-over');
      this.#outcome = 'game-over';
    }

    return this.#outcome;
  }

  snapshot(): GameSessionSnapshot {
    return {
      level: this.#level,
      currentLevelNumber: this.#levelIndex + 1,
      totalLevelCount: this.#levels.length,
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

    if (result.collectedFragments > 0) {
      this.#events.push('fragment-collected');
    }

    if (result.activatedPowerNode) {
      this.#events.push('pulse-activated');
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

    if (result === 'sentinel-crossed') {
      this.#events.push('sentinel-crossed');
    } else if (result === 'player-hit') {
      this.#events.push('player-hit');
    }

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

  #loadCurrentLevel(): void {
    const level = this.#levels[this.#levelIndex];

    if (!level) {
      throw new Error(`Fase ${this.#levelIndex + 1} nao encontrada na sequencia.`);
    }

    this.#level = level;
    this.#player = createPlayer(this.#level.playerStart, this.#level.tileSize);
    this.#collectibles = createCollectibles(this.#level.collectibles);
    this.#powerNodes = createPowerNodes(this.#level.powerNodes);
    this.#sentinels = createSentinels(this.#level.sentinels, this.#level.tileSize);
  }
}
