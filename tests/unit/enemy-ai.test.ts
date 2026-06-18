import { describe, expect, it } from 'vitest';

import { createPlayer } from '../../src/entities/Player';
import { createSentinels } from '../../src/entities/Sentinel';
import { parseLevel } from '../../src/levels';
import { CollisionSystem } from '../../src/systems/CollisionSystem';
import { EnemyAISystem } from '../../src/systems/EnemyAISystem';

const TEST_LEVEL = parseLevel({
  id: 'test-ai',
  name: 'Teste de IA',
  tileSize: 32,
  rows: ['#######', '#P.V.R#', '#..E..#', '#######'],
});

describe('EnemyAISystem', () => {
  it('faz a sentinela Vigia perseguir a Lumina', () => {
    const player = createPlayer({ x: 1, y: 1 }, TEST_LEVEL.tileSize);
    const sentinel = createSentinels(TEST_LEVEL.sentinels, TEST_LEVEL.tileSize)[0];
    const enemyAI = new EnemyAISystem(new CollisionSystem(), 3);

    expect(enemyAI.chooseDirection(sentinel, TEST_LEVEL, player, false)).toBe('left');
  });

  it('faz sentinelas instáveis se afastarem durante pulso', () => {
    const player = createPlayer({ x: 1, y: 1 }, TEST_LEVEL.tileSize);
    const sentinel = createSentinels(TEST_LEVEL.sentinels, TEST_LEVEL.tileSize)[0];
    const enemyAI = new EnemyAISystem(new CollisionSystem(), 3);

    expect(enemyAI.chooseDirection(sentinel, TEST_LEVEL, player, true)).toBe('down');
  });

  it('faz a sentinela Rastro seguir patrulha previsível', () => {
    const player = createPlayer({ x: 1, y: 1 }, TEST_LEVEL.tileSize);
    const sentinel = createSentinels(TEST_LEVEL.sentinels, TEST_LEVEL.tileSize)[1];
    const enemyAI = new EnemyAISystem(new CollisionSystem(), 3);

    expect(enemyAI.chooseDirection(sentinel, TEST_LEVEL, player, false)).toBe('down');
  });

  it('faz a sentinela Rastro abandonar patrulha durante pulso', () => {
    const player = createPlayer({ x: 5, y: 2 }, TEST_LEVEL.tileSize);
    const sentinel = createSentinels(TEST_LEVEL.sentinels, TEST_LEVEL.tileSize)[1];
    const enemyAI = new EnemyAISystem(new CollisionSystem(), 3);

    expect(enemyAI.chooseDirection(sentinel, TEST_LEVEL, player, true)).toBe('left');
  });
});
