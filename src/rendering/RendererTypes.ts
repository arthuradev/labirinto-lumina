import type { GameState } from '../core/types';
import type { Player } from '../entities/Player';
import type { LevelDefinition } from '../levels';

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
}

export interface RenderMetrics {
  readonly offsetX: number;
  readonly offsetY: number;
  readonly tileSize: number;
}
