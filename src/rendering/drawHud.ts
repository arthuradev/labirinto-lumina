import type { GameSnapshot } from '../core/types';
import type { LevelDefinition } from '../levels';

export const drawHud = (
  context: CanvasRenderingContext2D,
  snapshot: GameSnapshot,
  level: LevelDefinition,
  width: number,
): void => {
  context.textBaseline = 'middle';

  context.fillStyle = 'rgba(6, 16, 21, 0.74)';
  context.fillRect(0, 0, width, 58);

  context.textAlign = 'left';
  context.fillStyle = '#f5fbf8';
  context.font = '700 18px system-ui, sans-serif';
  context.fillText('Labirinto Lumina', 20, 22);

  context.fillStyle = '#b6cdca';
  context.font = '500 13px system-ui, sans-serif';
  context.fillText(`${level.name} · setas/WASD para mover · P para pausar`, 20, 44);

  context.textAlign = 'right';
  context.fillStyle = '#72e0d8';
  context.font = '500 13px ui-monospace, SFMono-Regular, Consolas, monospace';
  context.fillText(`estado: ${snapshot.state}`, width - 20, 22);
};
