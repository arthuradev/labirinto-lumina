import type { GameSnapshot } from '../core/types';
import { CanvasRenderer } from '../rendering/CanvasRenderer';
import { InputSystem } from '../systems/InputSystem';
import { GameLoop } from './GameLoop';
import { GameSession } from './GameSession';
import { GameStateMachine } from './GameStateMachine';

export interface GameOptions {
  readonly canvas: HTMLCanvasElement;
}

export class Game {
  readonly #canvas: HTMLCanvasElement;
  readonly #renderer: CanvasRenderer;
  readonly #stateMachine = new GameStateMachine();
  readonly #inputSystem = new InputSystem();
  readonly #loop: GameLoop;
  readonly #cleanupCallbacks: Array<() => void> = [];

  #session: GameSession | null = null;
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

    this.#render();
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

    if (this.#stateMachine.state === 'playing') {
      const outcome = this.#session?.update(_deltaSeconds);

      if (outcome === 'level-complete') {
        this.#stateMachine.transitionTo('level-complete');
      } else if (outcome === 'game-over') {
        this.#stateMachine.transitionTo('game-over');
      }
    }

    this.#render();
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
    this.#render();
  };

  #handleKeyDown = (event: KeyboardEvent): void => {
    const action = this.#inputSystem.getActionForKey(event.key);

    if (!action) {
      return;
    }

    event.preventDefault();

    if (action.type === 'confirm') {
      this.#handleConfirm();
    } else if (action.type === 'controls') {
      this.#handleControls();
    } else if (action.type === 'back') {
      this.#handleBack();
    } else if (action.type === 'pause') {
      this.#togglePause();
    } else if (action.type === 'restart') {
      this.#restart();
    } else if (this.#stateMachine.state === 'playing') {
      this.#session?.requestDirection(action.direction);
    }
  };

  #handleConfirm = (): void => {
    if (this.#stateMachine.state === 'start' || this.#stateMachine.state === 'controls') {
      this.#startNewSession();
    } else if (this.#stateMachine.state === 'level-complete') {
      if (this.#session?.advanceToNextLevel()) {
        this.#stateMachine.transitionTo('playing');
      } else {
        this.#stateMachine.transitionTo('victory');
      }

      this.#render();
    } else if (this.#stateMachine.state === 'victory' || this.#stateMachine.state === 'game-over') {
      this.#restart();
    }
  };

  #handleControls(): void {
    if (this.#stateMachine.state === 'start') {
      this.#stateMachine.transitionTo('controls');
      this.#render();
    } else if (this.#stateMachine.state === 'controls') {
      this.#stateMachine.transitionTo('start');
      this.#render();
    }
  }

  #handleBack(): void {
    if (this.#stateMachine.state === 'controls') {
      this.#stateMachine.transitionTo('start');
      this.#render();
    } else if (this.#stateMachine.state === 'playing' || this.#stateMachine.state === 'paused') {
      this.#togglePause();
    }
  }

  #togglePause(): void {
    if (this.#stateMachine.state === 'playing') {
      this.#stateMachine.transitionTo('paused');
      this.#render();
      return;
    }

    if (this.#stateMachine.state === 'paused') {
      this.#stateMachine.transitionTo('playing');
      this.#render();
    }
  }

  #render(): void {
    this.#renderer.render(this.#snapshot(), this.#session?.snapshot());
  }

  #startNewSession(): void {
    this.#session = new GameSession();
    this.#stateMachine.transitionTo('playing');
    this.#render();
  }

  #restart(): void {
    if (
      this.#stateMachine.state === 'game-over' ||
      this.#stateMachine.state === 'victory' ||
      this.#stateMachine.state === 'level-complete'
    ) {
      this.#session = null;
      this.#stateMachine.transitionTo('start');
      this.#render();
    }
  }
}
