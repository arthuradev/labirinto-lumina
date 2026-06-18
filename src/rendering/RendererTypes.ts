import type { GameState } from '../core/types';
import type { Collectible } from '../entities/Collectible';
import type { Player } from '../entities/Player';
import type { PowerNode } from '../entities/PowerNode';
import type { Sentinel } from '../entities/Sentinel';
import type { LevelDefinition } from '../levels';
import type { ScoreState } from '../systems/ScoreSystem';

export interface ScreenContent {
  readonly state: GameState;
  readonly title: string;
  readonly subtitle: string;
  readonly status: string;
  readonly action: string;
  readonly details: readonly string[];
}

export interface PlayfieldRenderState {
  readonly level: LevelDefinition;
  readonly player: Player;
  readonly collectibles: readonly Collectible[];
  readonly powerNodes: readonly PowerNode[];
  readonly sentinels: readonly Sentinel[];
  readonly score: ScoreState;
  readonly isLevelComplete: boolean;
  readonly isGameOver: boolean;
}

export interface RenderMetrics {
  readonly offsetX: number;
  readonly offsetY: number;
  readonly tileSize: number;
}
