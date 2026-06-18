import type { GridPosition } from '../core/types';

export type LevelTile = 'wall' | 'floor';
export type LevelTileCode = '#' | '.' | 'P' | 'L' | 'N' | 'V' | 'E' | 'R';
export type LevelSentinelCode = 'V' | 'E' | 'R';
export type SentinelType = 'vigia' | 'eco' | 'rastro';

export interface LevelCollectibleDefinition {
  readonly id: string;
  readonly position: GridPosition;
  readonly points: number;
}

export interface LevelPowerNodeDefinition {
  readonly id: string;
  readonly position: GridPosition;
  readonly points: number;
  readonly durationSeconds: number;
}

export interface LevelSentinelDefinition {
  readonly id: string;
  readonly type: SentinelType;
  readonly position: GridPosition;
}

export interface LevelDefinition {
  readonly id: string;
  readonly name: string;
  readonly width: number;
  readonly height: number;
  readonly tileSize: number;
  readonly tiles: readonly LevelTile[];
  readonly playerStart: GridPosition;
  readonly collectibles: readonly LevelCollectibleDefinition[];
  readonly powerNodes: readonly LevelPowerNodeDefinition[];
  readonly sentinels: readonly LevelSentinelDefinition[];
}

export interface LevelSource {
  readonly id: string;
  readonly name: string;
  readonly tileSize: number;
  readonly rows: readonly string[];
}

export const parseLevel = (source: LevelSource): LevelDefinition => {
  if (source.rows.length === 0) {
    throw new Error(`Fase "${source.id}" não possui linhas.`);
  }

  const width = source.rows[0]?.length ?? 0;
  const tiles: LevelTile[] = [];
  const collectibles: LevelCollectibleDefinition[] = [];
  const powerNodes: LevelPowerNodeDefinition[] = [];
  const sentinels: LevelSentinelDefinition[] = [];
  let playerStart: GridPosition | null = null;

  source.rows.forEach((row, y) => {
    if (row.length !== width) {
      throw new Error(`Fase "${source.id}" tem linha ${y} com largura inválida.`);
    }

    [...row].forEach((code, x) => {
      if (!isLevelTileCode(code)) {
        throw new Error(`Fase "${source.id}" usa tile inválido "${code}" em ${x},${y}.`);
      }

      if (code === 'P') {
        if (playerStart) {
          throw new Error(`Fase "${source.id}" possui mais de um jogador inicial.`);
        }

        playerStart = { x, y };
      } else if (code === 'L') {
        collectibles.push({
          id: `${source.id}-fragment-${collectibles.length + 1}`,
          position: { x, y },
          points: 10,
        });
      } else if (code === 'N') {
        powerNodes.push({
          id: `${source.id}-pulse-node-${powerNodes.length + 1}`,
          position: { x, y },
          points: 50,
          durationSeconds: 8,
        });
      } else if (isLevelSentinelCode(code)) {
        sentinels.push({
          id: `${source.id}-sentinel-${sentinels.length + 1}`,
          type: SENTINEL_TYPES_BY_CODE[code],
          position: { x, y },
        });
      }

      tiles.push(code === '#' ? 'wall' : 'floor');
    });
  });

  if (!playerStart) {
    throw new Error(`Fase "${source.id}" não define posição inicial do jogador.`);
  }

  return {
    id: source.id,
    name: source.name,
    width,
    height: source.rows.length,
    tileSize: source.tileSize,
    tiles,
    playerStart,
    collectibles,
    powerNodes,
    sentinels,
  };
};

const SENTINEL_TYPES_BY_CODE: Record<LevelSentinelCode, SentinelType> = {
  V: 'vigia',
  E: 'eco',
  R: 'rastro',
};

const isLevelSentinelCode = (code: string): code is LevelSentinelCode =>
  code === 'V' || code === 'E' || code === 'R';

const isLevelTileCode = (code: string): code is LevelTileCode =>
  code === '#' ||
  code === '.' ||
  code === 'P' ||
  code === 'L' ||
  code === 'N' ||
  isLevelSentinelCode(code);
