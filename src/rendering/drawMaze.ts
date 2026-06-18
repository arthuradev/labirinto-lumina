import type { LevelDefinition } from '../levels';
import type { RenderMetrics } from './RendererTypes';

export const drawMaze = (
  context: CanvasRenderingContext2D,
  level: LevelDefinition,
  metrics: RenderMetrics,
): void => {
  for (let y = 0; y < level.height; y += 1) {
    for (let x = 0; x < level.width; x += 1) {
      const tile = level.tiles[y * level.width + x];
      const tileX = metrics.offsetX + x * metrics.tileSize;
      const tileY = metrics.offsetY + y * metrics.tileSize;

      if (tile === 'wall') {
        drawWall(context, tileX, tileY, metrics.tileSize);
      } else {
        drawFloor(context, tileX, tileY, metrics.tileSize);
      }
    }
  }
};

const drawWall = (context: CanvasRenderingContext2D, x: number, y: number, size: number): void => {
  context.fillStyle = '#17333a';
  context.fillRect(x, y, size, size);

  context.strokeStyle = 'rgba(114, 224, 216, 0.36)';
  context.lineWidth = 1;
  context.strokeRect(x + 0.5, y + 0.5, size - 1, size - 1);
};

const drawFloor = (context: CanvasRenderingContext2D, x: number, y: number, size: number): void => {
  context.fillStyle = 'rgba(9, 28, 32, 0.74)';
  context.fillRect(x, y, size, size);

  context.fillStyle = 'rgba(114, 224, 216, 0.14)';
  context.beginPath();
  context.arc(x + size / 2, y + size / 2, Math.max(1.4, size * 0.055), 0, Math.PI * 2);
  context.fill();
};
