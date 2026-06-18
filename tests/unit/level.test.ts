import { describe, expect, it } from 'vitest';

import type { GridPosition } from '../../src/core/types';
import { LEVELS, type LevelDefinition } from '../../src/levels';
import { CollisionSystem } from '../../src/systems/CollisionSystem';

describe('LEVELS', () => {
  it('define três fases com progressão de dificuldade', () => {
    expect(LEVELS.map((level) => level.id)).toEqual(['level-01', 'level-02', 'level-03']);
    expect(LEVELS.map((level) => level.collectibles.length)).toEqual([10, 13, 15]);
    expect(LEVELS.map((level) => level.powerNodes.length)).toEqual([3, 3, 4]);
    expect(LEVELS.map((level) => level.sentinels.length)).toEqual([3, 4, 6]);
  });
});

describe.each(LEVELS)('$name', (level) => {
  it('define um mapa retangular', () => {
    expect(level.tiles).toHaveLength(level.width * level.height);
  });

  it('posiciona o jogador inicial em um tile caminhável', () => {
    const collisionSystem = new CollisionSystem();

    expect(collisionSystem.isWalkable(level, level.playerStart)).toBe(true);
  });

  it('mantém todos os caminhos alcançáveis a partir do início', () => {
    const collisionSystem = new CollisionSystem();
    const reachable = collectReachablePositions(level, collisionSystem);
    const floorCount = level.tiles.filter((tile) => tile === 'floor').length;

    expect(reachable.size).toBe(floorCount);
  });

  it('mantém fragmentos e nós de pulso alcançáveis', () => {
    const collisionSystem = new CollisionSystem();
    const reachable = collectReachablePositions(level, collisionSystem);

    for (const collectible of level.collectibles) {
      expect(reachable.has(toKey(collectible.position))).toBe(true);
    }

    for (const powerNode of level.powerNodes) {
      expect(reachable.has(toKey(powerNode.position))).toBe(true);
    }
  });

  it('mantém sentinelas em caminhos alcançáveis', () => {
    const collisionSystem = new CollisionSystem();
    const reachable = collectReachablePositions(level, collisionSystem);

    for (const sentinel of level.sentinels) {
      expect(reachable.has(toKey(sentinel.position))).toBe(true);
    }
  });
});

const collectReachablePositions = (
  level: LevelDefinition,
  collisionSystem: CollisionSystem,
): Set<string> => {
  const visited = new Set<string>();
  const queue: GridPosition[] = [level.playerStart];

  while (queue.length > 0) {
    const current = queue.shift();

    if (!current) {
      continue;
    }

    const key = toKey(current);

    if (visited.has(key)) {
      continue;
    }

    visited.add(key);

    for (const neighbor of getNeighbors(current)) {
      if (collisionSystem.isWalkable(level, neighbor) && !visited.has(toKey(neighbor))) {
        queue.push(neighbor);
      }
    }
  }

  return visited;
};

const getNeighbors = (position: GridPosition): GridPosition[] => [
  { x: position.x + 1, y: position.y },
  { x: position.x - 1, y: position.y },
  { x: position.x, y: position.y + 1 },
  { x: position.x, y: position.y - 1 },
];

const toKey = (position: GridPosition): string => `${position.x},${position.y}`;
