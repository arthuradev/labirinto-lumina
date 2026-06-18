import type { GridPosition } from './types';

export const toGridIndex = (position: GridPosition, width: number): number =>
  position.y * width + position.x;

export const isInsideGrid = (position: GridPosition, width: number, height: number): boolean =>
  Number.isInteger(position.x) &&
  Number.isInteger(position.y) &&
  position.x >= 0 &&
  position.y >= 0 &&
  position.x < width &&
  position.y < height;

export const addGridPositions = (position: GridPosition, delta: GridPosition): GridPosition => ({
  x: position.x + delta.x,
  y: position.y + delta.y,
});

export const areGridPositionsEqual = (left: GridPosition, right: GridPosition): boolean =>
  left.x === right.x && left.y === right.y;
