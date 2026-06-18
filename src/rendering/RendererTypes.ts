import type { GameState } from '../core/types';

export interface ScreenContent {
  readonly state: GameState;
  readonly title: string;
  readonly subtitle: string;
  readonly status: string;
  readonly action: string;
  readonly details: readonly string[];
}
