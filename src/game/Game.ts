import type { GameSnapshot } from '../core/types';
import { CanvasRenderer } from '../rendering/CanvasRenderer';
import { GameLoop } from './GameLoop';
import { GameStateMachine } from './GameStateMachine';

export interface GameOptions {
  readonly canvas: HTMLCanvasElement;
}

export class Game {
  readonly #canvas: HTMLCanvasElement;
  readonly #renderer: CanvasRenderer;
  readonly #stateMachine = new GameStateMachine();
  readonly #loop: GameLoop;
  readonly #cleanupCallbacks: Array<() => void> = [];

  #frame = 0;
  #elapsedSeconds = 0;
  #isStarted = false;

  constructor(options: GameOptions) {
    this.#canvas = options.canvas;
    this.#renderer = new CanvasRenderer(options.canvas);
    this.#loop = new GameLoop(this.#update);
  }

  start(): void {
    if (!this.#isStarted) {
      this.#stateMachine.transitionTo('start');
      this.#bindEvents();
      this.#isStarted = true;
    }

    this.#renderer.render(this.#snapshot());
    this.#loop.start();
  }

  stop(): void {
    this.#loop.stop();

    while (this.#cleanupCallbacks.length > 0) {
      this.#cleanupCallbacks.pop()?.();
    }

    this.#isStarted = false;
  }

  #update = (_deltaSeconds: number, elapsedSeconds: number): void => {
    this.#elapsedSeconds = elapsedSeconds;
    this.#frame += 1;
    this.#renderer.render(this.#snapshot());
  };

  #snapshot(): GameSnapshot {
    return {
      state: this.#stateMachine.state,
      elapsedSeconds: this.#elapsedSeconds,
      frame: this.#frame,
    };
  }

  #bindEvents(): void {
    window.addEventListener('resize', this.#handleResize);
    window.addEventListener('keydown', this.#handleKeyDown);
    this.#canvas.addEventListener('pointerdown', this.#handleConfirm);

    this.#cleanupCallbacks.push(() => {
      window.removeEventListener('resize', this.#handleResize);
      window.removeEventListener('keydown', this.#handleKeyDown);
      this.#canvas.removeEventListener('pointerdown', this.#handleConfirm);
    });
  }

  #handleResize = (): void => {
    this.#renderer.render(this.#snapshot());
  };

  #handleKeyDown = (event: KeyboardEvent): void => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.#handleConfirm();
      return;
    }

    if (event.key.toLowerCase() === 'p') {
      event.preventDefault();
      this.#togglePause();
    }
  };

  #handleConfirm = (): void => {
    if (this.#stateMachine.state === 'start') {
      this.#stateMachine.transitionTo('playing');
      this.#renderer.render(this.#snapshot());
    }
  };

  #togglePause(): void {
    if (this.#stateMachine.state === 'playing') {
      this.#stateMachine.transitionTo('paused');
      this.#renderer.render(this.#snapshot());
      return;
    }

    if (this.#stateMachine.state === 'paused') {
      this.#stateMachine.transitionTo('playing');
      this.#renderer.render(this.#snapshot());
    }
  }
}
