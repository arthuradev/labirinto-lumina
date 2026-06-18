import { describe, expect, it } from 'vitest';

import { createPlayer } from '../../src/entities/Player';
import { createSentinels } from '../../src/entities/Sentinel';
import { LEVEL_01 } from '../../src/levels';
import { ScoreSystem } from '../../src/systems/ScoreSystem';
import { SentinelCollisionSystem } from '../../src/systems/SentinelCollisionSystem';

describe('SentinelCollisionSystem', () => {
  it('remove uma vida quando a Lumina encosta em sentinela sem pulso', () => {
    const sentinel = createSentinels(LEVEL_01.sentinels, LEVEL_01.tileSize)[0];
    const player = createPlayer(sentinel.gridPosition, LEVEL_01.tileSize);
    const scoreSystem = createScoreSystem();
    const collisionSystem = new SentinelCollisionSystem(200, 4);

    const result = collisionSystem.resolve(player, [sentinel], LEVEL_01, scoreSystem);

    expect(result).toBe('player-hit');
    expect(scoreSystem.state.lives).toBe(2);
  });

  it('marca sentinela como instável e soma pontos durante pulso', () => {
    const sentinel = createSentinels(LEVEL_01.sentinels, LEVEL_01.tileSize)[0];
    const player = createPlayer(sentinel.gridPosition, LEVEL_01.tileSize);
    const scoreSystem = createScoreSystem();
    const collisionSystem = new SentinelCollisionSystem(200, 4);

    player.pulseRemainingSeconds = 5;
    const result = collisionSystem.resolve(player, [sentinel], LEVEL_01, scoreSystem);

    expect(result).toBe('sentinel-crossed');
    expect(scoreSystem.state.score).toBe(200);
    expect(scoreSystem.state.sentinelsCrossedDuringPulse).toBe(1);
    expect(sentinel.disabledRemainingSeconds).toBe(4);
  });
});

const createScoreSystem = (): ScoreSystem =>
  new ScoreSystem({
    initialLives: 3,
    fragmentsTotal: LEVEL_01.collectibles.length,
    levelCompleteLifeBonus: 100,
  });
