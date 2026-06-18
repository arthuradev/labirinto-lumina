import { areGridPositionsEqual } from '../core/grid';
import type { Player } from '../entities/Player';
import { disableSentinel, type Sentinel } from '../entities/Sentinel';
import type { LevelDefinition } from '../levels';
import type { ScoreSystem } from './ScoreSystem';

export type SentinelCollisionResult = 'none' | 'player-hit' | 'sentinel-crossed';

export class SentinelCollisionSystem {
  constructor(
    private readonly sentinelPulsePoints: number,
    private readonly disabledSecondsAfterPulse: number,
  ) {}

  resolve(
    player: Player,
    sentinels: Sentinel[],
    level: LevelDefinition,
    scoreSystem: ScoreSystem,
  ): SentinelCollisionResult {
    for (const sentinel of sentinels) {
      if (
        sentinel.disabledRemainingSeconds > 0 ||
        !areGridPositionsEqual(player.gridPosition, sentinel.gridPosition)
      ) {
        continue;
      }

      if (player.pulseRemainingSeconds > 0) {
        scoreSystem.addSentinelPulsePoints(this.sentinelPulsePoints);
        disableSentinel(sentinel, level.tileSize, this.disabledSecondsAfterPulse);
        return 'sentinel-crossed';
      }

      scoreSystem.loseLife();
      return 'player-hit';
    }

    return 'none';
  }
}
