import type { GridPosition } from '../core/types';

export type LevelTile = 'wall' | 'floor';
export type LevelTileCode = '#' | '.' | 'P';

export interface LevelDefinition {
  readonly id: string;
  readonly name: string;
  readonly width: number;
  readonly height: number;
  readonly tileSize: number;
  readonly tiles: readonly LevelTile[];
  readonly playerStart: GridPosition;
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
  };
};

const isLevelTileCode = (code: string): code is LevelTileCode =>
  code === '#' || code === '.' || code === 'P';
