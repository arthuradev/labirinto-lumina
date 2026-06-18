import type { GameState } from '../core/types';

export const GAME_STATES = [
  'boot',
  'start',
  'controls',
  'playing',
  'paused',
  'level-complete',
  'game-over',
  'victory',
] as const satisfies readonly GameState[];

const STATE_TRANSITIONS: Record<GameState, readonly GameState[]> = {
  boot: ['start'],
  start: ['playing', 'controls'],
  controls: ['start', 'playing'],
  playing: ['paused', 'level-complete', 'game-over', 'victory', 'start'],
  paused: ['playing', 'start'],
  'level-complete': ['victory', 'playing', 'start'],
  'game-over': ['start'],
  victory: ['start'],
};

export class GameStateMachine {
  #state: GameState = 'boot';

  get state(): GameState {
    return this.#state;
  }

  canTransitionTo(nextState: GameState): boolean {
    if (nextState === this.#state) {
      return true;
    }

    return STATE_TRANSITIONS[this.#state].includes(nextState);
  }

  transitionTo(nextState: GameState): GameState {
    if (!this.canTransitionTo(nextState)) {
      throw new Error(`Transicao invalida de "${this.#state}" para "${nextState}".`);
    }

    this.#state = nextState;
    return this.#state;
  }

  resetToStart(): GameState {
    this.#state = 'start';
    return this.#state;
  }
}
