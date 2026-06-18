import { describe, expect, it } from 'vitest';

import { LEVEL_01 } from '../../src/levels';
import { CollisionSystem } from '../../src/systems/CollisionSystem';

describe('CollisionSystem', () => {
  it('bloqueia posições fora do mapa', () => {
    const collisionSystem = new CollisionSystem();

    expect(collisionSystem.isWalkable(LEVEL_01, { x: -1, y: 1 })).toBe(false);
    expect(collisionSystem.isWalkable(LEVEL_01, { x: LEVEL_01.width, y: 1 })).toBe(false);
  });

  it('bloqueia paredes e libera caminhos', () => {
    const collisionSystem = new CollisionSystem();

    expect(collisionSystem.isWalkable(LEVEL_01, { x: 0, y: 0 })).toBe(false);
    expect(collisionSystem.isWalkable(LEVEL_01, { x: 2, y: 1 })).toBe(true);
  });
});
