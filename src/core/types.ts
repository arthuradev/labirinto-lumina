export type GameState =
  | 'boot'
  | 'start'
  | 'controls'
  | 'playing'
  | 'paused'
  | 'level-complete'
  | 'game-over'
  | 'victory';

export interface GameSnapshot {
  readonly state: GameState;
  readonly elapsedSeconds: number;
  readonly frame: number;
}

export interface GridPosition {
  readonly x: number;
  readonly y: number;
}

export interface WorldPosition {
  readonly x: number;
  readonly y: number;
}
