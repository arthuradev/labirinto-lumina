import { describe, expect, it } from 'vitest';

import { createCollectibles } from '../../src/entities/Collectible';
import { createPowerNodes } from '../../src/entities/PowerNode';
import { LEVEL_01 } from '../../src/levels';
import { CollectionSystem } from '../../src/systems/CollectionSystem';
import { ScoreSystem } from '../../src/systems/ScoreSystem';

describe('CollectionSystem', () => {
  it('coleta fragmento apenas uma vez', () => {
    const collectibles = createCollectibles(LEVEL_01.collectibles);
    const powerNodes = createPowerNodes(LEVEL_01.powerNodes);
    const scoreSystem = createScoreSystem();
    const collectionSystem = new CollectionSystem();
    const firstFragment = collectibles[0];

    collectionSystem.collectAt(firstFragment.position, collectibles, powerNodes, scoreSystem);
    collectionSystem.collectAt(firstFragment.position, collectibles, powerNodes, scoreSystem);

    expect(firstFragment.isCollected).toBe(true);
    expect(scoreSystem.state.score).toBe(10);
    expect(scoreSystem.state.fragmentsCollected).toBe(1);
  });

  it('ativa nó de pulso e retorna duração', () => {
    const collectibles = createCollectibles(LEVEL_01.collectibles);
    const powerNodes = createPowerNodes(LEVEL_01.powerNodes);
    const scoreSystem = createScoreSystem();
    const collectionSystem = new CollectionSystem();
    const firstPowerNode = powerNodes[0];

    const result = collectionSystem.collectAt(
      firstPowerNode.position,
      collectibles,
      powerNodes,
      scoreSystem,
    );

    expect(result.activatedPowerNode?.durationSeconds).toBe(8);
    expect(firstPowerNode.isActivated).toBe(true);
    expect(scoreSystem.state.score).toBe(50);
  });
});

const createScoreSystem = (): ScoreSystem =>
  new ScoreSystem({
    initialLives: 3,
    fragmentsTotal: LEVEL_01.collectibles.length,
    levelCompleteLifeBonus: 100,
  });
