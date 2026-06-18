import type { Player } from '../entities/Player';
import type { LevelDefinition } from '../levels';
import type { RenderMetrics } from './RendererTypes';

export const drawPlayer = (
  context: CanvasRenderingContext2D,
  player: Player,
  level: LevelDefinition,
  metrics: RenderMetrics,
  elapsedSeconds: number,
): void => {
  const scale = metrics.tileSize / level.tileSize;
  const x = metrics.offsetX + player.worldPosition.x * scale;
  const y = metrics.offsetY + player.worldPosition.y * scale;
  const pulse = 1 + Math.sin(elapsedSeconds * 8) * 0.05;
  const radius = metrics.tileSize * 0.32 * pulse;

  const glow = context.createRadialGradient(x, y, radius * 0.2, x, y, radius * 2.1);
  glow.addColorStop(0, 'rgba(245, 251, 248, 0.92)');
  glow.addColorStop(0.28, 'rgba(114, 224, 216, 0.62)');
  glow.addColorStop(1, 'rgba(114, 224, 216, 0)');

  context.fillStyle = glow;
  context.beginPath();
  context.arc(x, y, radius * 2.1, 0, Math.PI * 2);
  context.fill();

  context.fillStyle = '#f5fbf8';
  context.beginPath();
  context.arc(x, y, radius, 0, Math.PI * 2);
  context.fill();

  context.strokeStyle = '#72e0d8';
  context.lineWidth = Math.max(2, metrics.tileSize * 0.08);
  context.beginPath();
  context.arc(x, y, radius * 0.82, 0, Math.PI * 2);
  context.stroke();
};
