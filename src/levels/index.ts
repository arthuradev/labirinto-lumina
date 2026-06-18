import { LEVEL_01 } from './level-01';
import { LEVEL_02 } from './level-02';
import { LEVEL_03 } from './level-03';

import type { LevelDefinition } from './levelTypes';

export { LEVEL_01 } from './level-01';
export { LEVEL_02 } from './level-02';
export { LEVEL_03 } from './level-03';
export const LEVELS = [LEVEL_01, LEVEL_02, LEVEL_03] as const satisfies readonly LevelDefinition[];
export type {
  LevelCollectibleDefinition,
  LevelDefinition,
  LevelPowerNodeDefinition,
  LevelSentinelCode,
  LevelSentinelDefinition,
  LevelSource,
  LevelTile,
  LevelTileCode,
  SentinelType,
} from './levelTypes';
export { parseLevel } from './levelTypes';
