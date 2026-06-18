import type { GridPosition } from '../core/types';
import type { LevelPowerNodeDefinition } from '../levels';

export interface PowerNode {
  readonly id: string;
  readonly position: GridPosition;
  readonly points: number;
  readonly durationSeconds: number;
  isActivated: boolean;
}

export const createPowerNodes = (definitions: readonly LevelPowerNodeDefinition[]): PowerNode[] =>
  definitions.map((definition) => ({
    id: definition.id,
    position: definition.position,
    points: definition.points,
    durationSeconds: definition.durationSeconds,
    isActivated: false,
  }));
