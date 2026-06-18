import { describe, expect, it } from 'vitest';

import { HighScoreSystem, type ScoreStorage } from '../../src/systems/HighScoreSystem';

class MemoryStorage implements ScoreStorage {
  readonly values = new Map<string, string>();

  getItem(key: string): string | null {
    return this.values.get(key) ?? null;
  }

  setItem(key: string, value: string): void {
    this.values.set(key, value);
  }
}

describe('HighScoreSystem', () => {
  it('carrega recorde salvo e ignora pontuacao menor', () => {
    const storage = new MemoryStorage();

    storage.setItem('score', '500');
    const highScoreSystem = new HighScoreSystem(storage, 'score');

    expect(highScoreSystem.highScore).toBe(500);
    expect(highScoreSystem.record(300)).toEqual({ highScore: 500, wasUpdated: false });
  });

  it('salva novo recorde quando pontuacao aumenta', () => {
    const storage = new MemoryStorage();
    const highScoreSystem = new HighScoreSystem(storage, 'score');

    expect(highScoreSystem.record(750)).toEqual({ highScore: 750, wasUpdated: true });
    expect(storage.getItem('score')).toBe('750');
  });

  it('continua funcionando sem storage disponivel', () => {
    const highScoreSystem = new HighScoreSystem(null);

    expect(highScoreSystem.record(120)).toEqual({ highScore: 120, wasUpdated: true });
    expect(highScoreSystem.highScore).toBe(120);
  });
});
