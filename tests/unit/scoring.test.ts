import { describe, expect, it } from 'vitest';

import { ScoreSystem } from '../../src/systems/ScoreSystem';

describe('ScoreSystem', () => {
  it('soma pontos de fragmentos e nós de pulso', () => {
    const scoreSystem = new ScoreSystem({
      initialLives: 3,
      fragmentsTotal: 2,
      levelCompleteLifeBonus: 100,
    });

    scoreSystem.addCollectiblePoints(10);
    scoreSystem.addPowerNodePoints(50);

    expect(scoreSystem.state.score).toBe(60);
    expect(scoreSystem.state.fragmentsCollected).toBe(1);
    expect(scoreSystem.state.powerNodesActivated).toBe(1);
  });

  it('soma pontos de sentinela atravessada durante pulso', () => {
    const scoreSystem = new ScoreSystem({
      initialLives: 3,
      fragmentsTotal: 1,
      levelCompleteLifeBonus: 100,
    });

    scoreSystem.addSentinelPulsePoints(200);

    expect(scoreSystem.state.score).toBe(200);
    expect(scoreSystem.state.sentinelsCrossedDuringPulse).toBe(1);
  });

  it('aplica bônus por vidas restantes ao concluir fase', () => {
    const scoreSystem = new ScoreSystem({
      initialLives: 3,
      fragmentsTotal: 1,
      levelCompleteLifeBonus: 100,
    });

    scoreSystem.addCollectiblePoints(10);
    scoreSystem.addLevelCompleteBonus();

    expect(scoreSystem.isLevelComplete()).toBe(true);
    expect(scoreSystem.state.score).toBe(310);
  });

  it('reinicia progresso de fragmentos ao iniciar nova fase', () => {
    const scoreSystem = new ScoreSystem({
      initialLives: 3,
      fragmentsTotal: 1,
      levelCompleteLifeBonus: 100,
    });

    scoreSystem.addCollectiblePoints(10);
    scoreSystem.startLevel(3);

    expect(scoreSystem.state.score).toBe(10);
    expect(scoreSystem.state.fragmentsCollected).toBe(0);
    expect(scoreSystem.state.fragmentsTotal).toBe(3);
  });

  it('identifica game over quando vidas acabam', () => {
    const scoreSystem = new ScoreSystem({
      initialLives: 2,
      fragmentsTotal: 1,
      levelCompleteLifeBonus: 100,
    });

    scoreSystem.loseLife();
    scoreSystem.loseLife();

    expect(scoreSystem.state.lives).toBe(0);
    expect(scoreSystem.isGameOver()).toBe(true);
  });
});
