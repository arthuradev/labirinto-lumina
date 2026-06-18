import { areGridPositionsEqual } from '../core/grid';
import type { GridPosition } from '../core/types';
import type { Collectible } from '../entities/Collectible';
import type { PowerNode } from '../entities/PowerNode';
import type { ScoreSystem } from './ScoreSystem';

export interface CollectionResult {
  readonly collectedFragments: number;
  readonly activatedPowerNode: PowerNode | null;
}

export class CollectionSystem {
  collectAt(
    position: GridPosition,
    collectibles: Collectible[],
    powerNodes: PowerNode[],
    scoreSystem: ScoreSystem,
  ): CollectionResult {
    let collectedFragments = 0;
    let activatedPowerNode: PowerNode | null = null;

    for (const collectible of collectibles) {
      if (!collectible.isCollected && areGridPositionsEqual(collectible.position, position)) {
        collectible.isCollected = true;
        collectedFragments += 1;
        scoreSystem.addCollectiblePoints(collectible.points);
      }
    }

    for (const powerNode of powerNodes) {
      if (!powerNode.isActivated && areGridPositionsEqual(powerNode.position, position)) {
        powerNode.isActivated = true;
        activatedPowerNode = powerNode;
        scoreSystem.addPowerNodePoints(powerNode.points);
      }
    }

    return {
      collectedFragments,
      activatedPowerNode,
    };
  }
}
