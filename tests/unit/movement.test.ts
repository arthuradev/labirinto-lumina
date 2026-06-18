import { describe, expect, it } from 'vitest';

import { createPlayer } from '../../src/entities/Player';
import { LEVEL_01 } from '../../src/levels';
import { CollisionSystem } from '../../src/systems/CollisionSystem';
import { MovementSystem } from '../../src/systems/MovementSystem';

describe('MovementSystem', () => {
  it('move o jogador em grid quando o caminho está livre', () => {
    const player = createPlayer(LEVEL_01.playerStart, LEVEL_01.tileSize);
    const movementSystem = new MovementSystem(new CollisionSystem(), 6);

    movementSystem.requestDirection(player, 'right');
    movementSystem.update(player, LEVEL_01, 0);
    movementSystem.update(player, LEVEL_01, 1 / 6);

    expect(player.gridPosition).toEqual({ x: 2, y: 1 });
  });

  it('impede movimento contra parede', () => {
    const player = createPlayer(LEVEL_01.playerStart, LEVEL_01.tileSize);
    const movementSystem = new MovementSystem(new CollisionSystem(), 6);

    movementSystem.requestDirection(player, 'up');
    movementSystem.update(player, LEVEL_01, 1 / 6);

    expect(player.gridPosition).toEqual(LEVEL_01.playerStart);
    expect(player.targetGridPosition).toBeNull();
  });
});
