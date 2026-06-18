import type { Collectible } from '../entities/Collectible';
import type { Player } from '../entities/Player';
import type { PowerNode } from '../entities/PowerNode';
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
  const isPulseActive = player.pulseRemainingSeconds > 0;
  const pulse = 1 + Math.sin(elapsedSeconds * (isPulseActive ? 12 : 8)) * 0.05;
  const radius = metrics.tileSize * 0.32 * pulse;

  const glow = context.createRadialGradient(x, y, radius * 0.2, x, y, radius * 2.1);
  glow.addColorStop(0, 'rgba(245, 251, 248, 0.92)');
  glow.addColorStop(0.28, isPulseActive ? 'rgba(240, 201, 120, 0.7)' : 'rgba(114, 224, 216, 0.62)');
  glow.addColorStop(1, 'rgba(114, 224, 216, 0)');

  context.fillStyle = glow;
  context.beginPath();
  context.arc(x, y, radius * 2.1, 0, Math.PI * 2);
  context.fill();

  context.fillStyle = '#f5fbf8';
  context.beginPath();
  context.arc(x, y, radius, 0, Math.PI * 2);
  context.fill();

  context.strokeStyle = isPulseActive ? '#f0c978' : '#72e0d8';
  context.lineWidth = Math.max(2, metrics.tileSize * 0.08);
  context.beginPath();
  context.arc(x, y, radius * 0.82, 0, Math.PI * 2);
  context.stroke();
};

export const drawCollectibles = (
  context: CanvasRenderingContext2D,
  collectibles: readonly Collectible[],
  level: LevelDefinition,
  metrics: RenderMetrics,
  elapsedSeconds: number,
): void => {
  for (const collectible of collectibles) {
    if (collectible.isCollected) {
      continue;
    }

    const { x, y } = toRenderPosition(
      collectible.position.x,
      collectible.position.y,
      level,
      metrics,
    );
    const radius = metrics.tileSize * (0.12 + Math.sin(elapsedSeconds * 6) * 0.015);

    context.fillStyle = '#b8fff8';
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.fill();

    context.strokeStyle = 'rgba(184, 255, 248, 0.4)';
    context.lineWidth = 2;
    context.beginPath();
    context.arc(x, y, radius * 1.8, 0, Math.PI * 2);
    context.stroke();
  }
};

export const drawPowerNodes = (
  context: CanvasRenderingContext2D,
  powerNodes: readonly PowerNode[],
  level: LevelDefinition,
  metrics: RenderMetrics,
  elapsedSeconds: number,
): void => {
  for (const powerNode of powerNodes) {
    if (powerNode.isActivated) {
      continue;
    }

    const { x, y } = toRenderPosition(powerNode.position.x, powerNode.position.y, level, metrics);
    const size = metrics.tileSize * (0.34 + Math.sin(elapsedSeconds * 5) * 0.025);

    context.save();
    context.translate(x, y);
    context.rotate(Math.PI / 4);
    context.fillStyle = '#f0c978';
    context.fillRect(-size / 2, -size / 2, size, size);
    context.restore();

    context.strokeStyle = 'rgba(240, 201, 120, 0.42)';
    context.lineWidth = 2;
    context.beginPath();
    context.arc(x, y, size * 0.95, 0, Math.PI * 2);
    context.stroke();
  }
};

const toRenderPosition = (
  gridX: number,
  gridY: number,
  level: LevelDefinition,
  metrics: RenderMetrics,
) => {
  const scale = metrics.tileSize / level.tileSize;

  return {
    x: metrics.offsetX + (gridX * level.tileSize + level.tileSize / 2) * scale,
    y: metrics.offsetY + (gridY * level.tileSize + level.tileSize / 2) * scale,
  };
};
