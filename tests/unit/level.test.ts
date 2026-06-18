import { describe, expect, it } from 'vitest';

import type { GridPosition } from '../../src/core/types';
import { LEVEL_01 } from '../../src/levels';
import { CollisionSystem } from '../../src/systems/CollisionSystem';

describe('LEVEL_01', () => {
  it('define um mapa retangular', () => {
    expect(LEVEL_01.tiles).toHaveLength(LEVEL_01.width * LEVEL_01.height);
  });

  it('posiciona o jogador inicial em um tile caminhável', () => {
    const collisionSystem = new CollisionSystem();

    expect(collisionSystem.isWalkable(LEVEL_01, LEVEL_01.playerStart)).toBe(true);
  });

  it('mantém todos os caminhos alcançáveis a partir do início', () => {
    const collisionSystem = new CollisionSystem();
    const reachable = collectReachablePositions(collisionSystem);
    const floorCount = LEVEL_01.tiles.filter((tile) => tile === 'floor').length;

    expect(reachable.size).toBe(floorCount);
  });

  it('mantém fragmentos e nós de pulso alcançáveis', () => {
    const collisionSystem = new CollisionSystem();
    const reachable = collectReachablePositions(collisionSystem);

    expect(LEVEL_01.collectibles).toHaveLength(10);
    expect(LEVEL_01.powerNodes).toHaveLength(3);

    for (const collectible of LEVEL_01.collectibles) {
      expect(reachable.has(toKey(collectible.position))).toBe(true);
    }

    for (const powerNode of LEVEL_01.powerNodes) {
      expect(reachable.has(toKey(powerNode.position))).toBe(true);
    }
  });
});

const collectReachablePositions = (collisionSystem: CollisionSystem): Set<string> => {
  const visited = new Set<string>();
  const queue: GridPosition[] = [LEVEL_01.playerStart];

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
      if (collisionSystem.isWalkable(LEVEL_01, neighbor) && !visited.has(toKey(neighbor))) {
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
