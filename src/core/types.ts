export type GameState =
  | 'boot'
  | 'start'
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
