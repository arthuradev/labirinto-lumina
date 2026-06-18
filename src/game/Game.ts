import type { GameSnapshot } from '../core/types';
import { CanvasRenderer } from '../rendering/CanvasRenderer';
import { AudioSystem, type AudioEventName } from '../systems/AudioSystem';
import { HighScoreSystem } from '../systems/HighScoreSystem';
import { InputSystem } from '../systems/InputSystem';
import { GameLoop } from './GameLoop';
import { GameSession, type GameSessionEvent } from './GameSession';
import { GameStateMachine } from './GameStateMachine';

export interface GameOptions {
  readonly canvas: HTMLCanvasElement;
}

export class Game {
  readonly #canvas: HTMLCanvasElement;
  readonly #renderer: CanvasRenderer;
  readonly #stateMachine = new GameStateMachine();
  readonly #inputSystem = new InputSystem();
  readonly #audioSystem = new AudioSystem();
  readonly #highScoreSystem = new HighScoreSystem(getBrowserStorage());
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
      this.#handleSessionEvents(this.#session?.consumeEvents() ?? []);

      if (outcome === 'level-complete') {
        this.#recordHighScoreFromSession(true);
        this.#stateMachine.transitionTo('level-complete');
      } else if (outcome === 'game-over') {
        this.#recordHighScoreFromSession(true);
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
      highScore: this.#highScoreSystem.highScore,
      isAudioMuted: this.#audioSystem.isMuted,
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
    } else if (action.type === 'mute') {
      this.#toggleMute();
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
        this.#audioSystem.play('start');
        this.#stateMachine.transitionTo('playing');
      } else {
        this.#recordHighScoreFromSession(true);
        this.#audioSystem.play('victory');
        this.#stateMachine.transitionTo('victory');
      }

      this.#render();
    } else if (this.#stateMachine.state === 'victory' || this.#stateMachine.state === 'game-over') {
      this.#restart();
    }
  };

  #handleControls(): void {
    if (this.#stateMachine.state === 'start') {
      this.#audioSystem.play('ui');
      this.#stateMachine.transitionTo('controls');
      this.#render();
    } else if (this.#stateMachine.state === 'controls') {
      this.#audioSystem.play('ui');
      this.#stateMachine.transitionTo('start');
      this.#render();
    }
  }

  #handleBack(): void {
    if (this.#stateMachine.state === 'controls') {
      this.#audioSystem.play('ui');
      this.#stateMachine.transitionTo('start');
      this.#render();
    } else if (this.#stateMachine.state === 'playing' || this.#stateMachine.state === 'paused') {
      this.#togglePause();
    }
  }

  #togglePause(): void {
    if (this.#stateMachine.state === 'playing') {
      this.#audioSystem.play('ui');
      this.#stateMachine.transitionTo('paused');
      this.#render();
      return;
    }

    if (this.#stateMachine.state === 'paused') {
      this.#audioSystem.play('ui');
      this.#stateMachine.transitionTo('playing');
      this.#render();
    }
  }

  #render(): void {
    this.#renderer.render(this.#snapshot(), this.#session?.snapshot());
  }

  #startNewSession(): void {
    this.#session = new GameSession();
    this.#audioSystem.play('start');
    this.#stateMachine.transitionTo('playing');
    this.#render();
  }

  #toggleMute(): void {
    this.#audioSystem.toggleMute();
    this.#render();
  }

  #handleSessionEvents(events: readonly GameSessionEvent[]): void {
    for (const event of events) {
      this.#audioSystem.play(AUDIO_EVENTS[event]);
    }
  }

  #recordHighScoreFromSession(playSound: boolean): void {
    const score = this.#session?.snapshot().score.score ?? 0;
    const result = this.#highScoreSystem.record(score);

    if (playSound && result.wasUpdated) {
      this.#audioSystem.play('high-score');
    }
  }

  #restart(): void {
    if (
      this.#stateMachine.state === 'game-over' ||
      this.#stateMachine.state === 'victory' ||
      this.#stateMachine.state === 'level-complete'
    ) {
      this.#audioSystem.play('ui');
      this.#session = null;
      this.#stateMachine.transitionTo('start');
      this.#render();
    }
  }
}

const AUDIO_EVENTS: Record<GameSessionEvent, AudioEventName> = {
  'fragment-collected': 'fragment',
  'pulse-activated': 'pulse',
  'sentinel-crossed': 'sentinel-crossed',
  'player-hit': 'player-hit',
  'level-complete': 'level-complete',
  'game-over': 'game-over',
};

const getBrowserStorage = (): Storage | null => {
  try {
    return window.localStorage;
  } catch {
    return null;
  }
};
