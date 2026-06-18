import { describe, expect, it } from 'vitest';

import { GameSession } from '../../src/game/GameSession';
import { parseLevel } from '../../src/levels';

const TEST_LEVELS = [
  parseLevel({
    id: 'test-level-01',
    name: 'Teste Um',
    tileSize: 32,
    rows: ['#####', '#PL.#', '#####'],
  }),
  parseLevel({
    id: 'test-level-02',
    name: 'Teste Dois',
    tileSize: 32,
    rows: ['#####', '#PL.#', '#####'],
  }),
];

describe('GameSession', () => {
  it('avança para a próxima fase preservando pontuação e vidas', () => {
    const session = new GameSession({ levels: TEST_LEVELS });

    expect(session.snapshot().currentLevelNumber).toBe(1);
    expect(completeCurrentLevel(session)).toBe('level-complete');
    expect(session.hasNextLevel()).toBe(true);

    const completedFirstLevel = session.snapshot();

    expect(completedFirstLevel.score.score).toBe(310);
    expect(completedFirstLevel.score.lives).toBe(3);
    expect(session.advanceToNextLevel()).toBe(true);

    const nextLevel = session.snapshot();

    expect(nextLevel.level.id).toBe('test-level-02');
    expect(nextLevel.currentLevelNumber).toBe(2);
    expect(nextLevel.totalLevelCount).toBe(2);
    expect(nextLevel.score.score).toBe(310);
    expect(nextLevel.score.lives).toBe(3);
    expect(nextLevel.score.fragmentsCollected).toBe(0);
    expect(nextLevel.score.fragmentsTotal).toBe(1);
  });

  it('emite eventos de coleta e conclusao de fase', () => {
    const session = new GameSession({ levels: TEST_LEVELS });

    expect(completeCurrentLevel(session)).toBe('level-complete');
    expect(session.consumeEvents()).toEqual(['fragment-collected', 'level-complete']);
    expect(session.consumeEvents()).toEqual([]);
  });

  it('não avança depois da última fase concluída', () => {
    const session = new GameSession({ levels: TEST_LEVELS });

    expect(completeCurrentLevel(session)).toBe('level-complete');
    expect(session.advanceToNextLevel()).toBe(true);
    expect(completeCurrentLevel(session)).toBe('level-complete');

    expect(session.hasNextLevel()).toBe(false);
    expect(session.advanceToNextLevel()).toBe(false);
  });

  it('exige pelo menos uma fase', () => {
    expect(() => new GameSession({ levels: [] })).toThrow(
      'A sessao de jogo precisa de pelo menos uma fase.',
    );
  });
});

const completeCurrentLevel = (session: GameSession) => {
  session.requestDirection('right');
  session.update(0.01);

  return session.update(1);
};
