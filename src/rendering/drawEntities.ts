import type { Collectible } from '../entities/Collectible';
import type { Player } from '../entities/Player';
import type { PowerNode } from '../entities/PowerNode';
import type { Sentinel } from '../entities/Sentinel';
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

export const drawSentinels = (
  context: CanvasRenderingContext2D,
  sentinels: readonly Sentinel[],
  level: LevelDefinition,
  metrics: RenderMetrics,
  elapsedSeconds: number,
): void => {
  for (const sentinel of sentinels) {
    const { x, y } = toRenderPosition(
      sentinel.worldPosition.x,
      sentinel.worldPosition.y,
      level,
      metrics,
      true,
    );
    const radius = metrics.tileSize * 0.33;
    const rotation = elapsedSeconds * (sentinel.isUnstable ? 3.2 : 1.4);
    const alpha = sentinel.disabledRemainingSeconds > 0 ? 0.28 : 1;

    context.save();
    context.globalAlpha = alpha;
    context.translate(x, y);
    context.rotate(rotation);

    context.fillStyle = getSentinelColor(sentinel.type, sentinel.isUnstable);
    context.beginPath();
    context.moveTo(0, -radius);
    context.lineTo(radius * 0.82, 0);
    context.lineTo(0, radius);
    context.lineTo(-radius * 0.82, 0);
    context.closePath();
    context.fill();

    context.strokeStyle = sentinel.isUnstable ? '#f0c978' : 'rgba(245, 251, 248, 0.72)';
    context.lineWidth = Math.max(2, metrics.tileSize * 0.06);
    context.stroke();

    context.rotate(-rotation);
    context.fillStyle = 'rgba(6, 16, 21, 0.78)';
    context.beginPath();
    context.arc(0, 0, radius * 0.32, 0, Math.PI * 2);
    context.fill();

    context.restore();
  }
};

const toRenderPosition = (
  gridX: number,
  gridY: number,
  level: LevelDefinition,
  metrics: RenderMetrics,
  isWorldPosition = false,
) => {
  const scale = metrics.tileSize / level.tileSize;
  const worldX = isWorldPosition ? gridX : gridX * level.tileSize + level.tileSize / 2;
  const worldY = isWorldPosition ? gridY : gridY * level.tileSize + level.tileSize / 2;

  return {
    x: metrics.offsetX + worldX * scale,
    y: metrics.offsetY + worldY * scale,
  };
};

const getSentinelColor = (type: Sentinel['type'], isUnstable: boolean): string => {
  if (isUnstable) {
    return '#f0c978';
  }

  if (type === 'vigia') {
    return '#d95f78';
  }

  if (type === 'eco') {
    return '#8d7cf0';
  }

  return '#6cc38f';
};
