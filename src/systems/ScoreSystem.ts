export interface ScoreState {
  score: number;
  lives: number;
  fragmentsCollected: number;
  fragmentsTotal: number;
  powerNodesActivated: number;
}

export interface ScoreSystemOptions {
  readonly initialLives: number;
  readonly fragmentsTotal: number;
  readonly levelCompleteLifeBonus: number;
}

export class ScoreSystem {
  readonly #state: ScoreState;

  constructor(private readonly options: ScoreSystemOptions) {
    this.#state = {
      score: 0,
      lives: options.initialLives,
      fragmentsCollected: 0,
      fragmentsTotal: options.fragmentsTotal,
      powerNodesActivated: 0,
    };
  }

  get state(): ScoreState {
    return { ...this.#state };
  }

  addCollectiblePoints(points: number): void {
    this.#state.score += points;
    this.#state.fragmentsCollected += 1;
  }

  addPowerNodePoints(points: number): void {
    this.#state.score += points;
    this.#state.powerNodesActivated += 1;
  }

  addLevelCompleteBonus(): void {
    this.#state.score += this.#state.lives * this.options.levelCompleteLifeBonus;
  }

  loseLife(): void {
    this.#state.lives = Math.max(0, this.#state.lives - 1);
  }

  isLevelComplete(): boolean {
    return (
      this.#state.fragmentsTotal > 0 &&
      this.#state.fragmentsCollected === this.#state.fragmentsTotal
    );
  }

  isGameOver(): boolean {
    return this.#state.lives === 0;
  }
}
