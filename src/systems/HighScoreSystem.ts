export interface ScoreStorage {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}

export interface HighScoreState {
  readonly highScore: number;
  readonly wasUpdated: boolean;
}

const HIGH_SCORE_KEY = 'labirinto-lumina:high-score';

export class HighScoreSystem {
  #highScore = 0;

  constructor(
    private readonly storage: ScoreStorage | null,
    private readonly key = HIGH_SCORE_KEY,
  ) {
    this.#highScore = this.#load();
  }

  get highScore(): number {
    return this.#highScore;
  }

  record(score: number): HighScoreState {
    if (score <= this.#highScore) {
      return {
        highScore: this.#highScore,
        wasUpdated: false,
      };
    }

    this.#highScore = score;
    this.#save(score);

    return {
      highScore: this.#highScore,
      wasUpdated: true,
    };
  }

  #load(): number {
    try {
      const value = this.storage?.getItem(this.key);
      const parsedValue = value ? Number.parseInt(value, 10) : 0;

      return Number.isFinite(parsedValue) && parsedValue > 0 ? parsedValue : 0;
    } catch {
      return 0;
    }
  }

  #save(score: number): void {
    try {
      this.storage?.setItem(this.key, String(score));
    } catch {
      // Storage can be unavailable in private sessions; gameplay should continue.
    }
  }
}
