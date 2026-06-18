export type GameLoopTick = (deltaSeconds: number, elapsedSeconds: number) => void;

const MAX_DELTA_SECONDS = 0.1;

export class GameLoop {
  #frameId: number | null = null;
  #lastTimestamp = 0;
  #elapsedSeconds = 0;
  #isRunning = false;

  constructor(private readonly tickHandler: GameLoopTick) {}

  get isRunning(): boolean {
    return this.#isRunning;
  }

  start(): void {
    if (this.#isRunning) {
      return;
    }

    this.#isRunning = true;
    this.#lastTimestamp = performance.now();
    this.#frameId = requestAnimationFrame(this.#tick);
  }

  stop(): void {
    if (this.#frameId !== null) {
      cancelAnimationFrame(this.#frameId);
      this.#frameId = null;
    }

    this.#isRunning = false;
  }

  #tick = (timestamp: number): void => {
    if (!this.#isRunning) {
      return;
    }

    const rawDeltaSeconds = (timestamp - this.#lastTimestamp) / 1000;
    const deltaSeconds = Math.min(Math.max(rawDeltaSeconds, 0), MAX_DELTA_SECONDS);

    this.#lastTimestamp = timestamp;
    this.#elapsedSeconds += deltaSeconds;
    this.tickHandler(deltaSeconds, this.#elapsedSeconds);
    this.#frameId = requestAnimationFrame(this.#tick);
  };
}
