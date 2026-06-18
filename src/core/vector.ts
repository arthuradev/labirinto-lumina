import type { GridPosition, WorldPosition } from './types';

export const gridToWorldCenter = (position: GridPosition, tileSize: number): WorldPosition => ({
  x: position.x * tileSize + tileSize / 2,
  y: position.y * tileSize + tileSize / 2,
});

export const lerpWorldPosition = (
  from: WorldPosition,
  to: WorldPosition,
  progress: number,
): WorldPosition => ({
  x: from.x + (to.x - from.x) * progress,
  y: from.y + (to.y - from.y) * progress,
});
