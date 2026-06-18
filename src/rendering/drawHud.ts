import type { GameSnapshot } from '../core/types';
import type { LevelDefinition } from '../levels';
import type { ScoreState } from '../systems/ScoreSystem';

export const HUD_HEIGHT = 72;

export const drawHud = (
  context: CanvasRenderingContext2D,
  snapshot: GameSnapshot,
  level: LevelDefinition,
  currentLevelNumber: number,
  totalLevelCount: number,
  score: ScoreState,
  pulseRemainingSeconds: number,
  sentinelCount: number,
  width: number,
): void => {
  context.textBaseline = 'middle';

  context.fillStyle = 'rgba(6, 16, 21, 0.74)';
  context.fillRect(0, 0, width, HUD_HEIGHT);

  context.textAlign = 'left';
  context.fillStyle = '#f5fbf8';
  context.font = '700 18px system-ui, sans-serif';
  context.fillText('Labirinto Lumina', 20, 22);

  context.fillStyle = '#b6cdca';
  context.font = '500 13px system-ui, sans-serif';
  drawFittedText(
    context,
    getStatusLine(level, currentLevelNumber, totalLevelCount, score, sentinelCount, width),
    20,
    44,
    width - 190,
    'left',
  );

  context.fillStyle = 'rgba(182, 205, 202, 0.72)';
  context.font = '500 12px system-ui, sans-serif';
  drawFittedText(
    context,
    `Setas/WASD mover | P/Esc pausar | M som ${snapshot.isAudioMuted ? 'off' : 'on'}`,
    20,
    64,
    width - 220,
    'left',
  );

  context.fillStyle = '#72e0d8';
  context.font = '500 13px ui-monospace, SFMono-Regular, Consolas, monospace';
  drawFittedText(context, `pontos ${score.score}`, width - 20, 22, 160, 'right');

  context.fillStyle = pulseRemainingSeconds > 0 ? '#f0c978' : '#b6cdca';
  drawFittedText(
    context,
    pulseRemainingSeconds > 0
      ? `pulso ${pulseRemainingSeconds.toFixed(1)}s`
      : `estado: ${snapshot.state}`,
    width - 20,
    44,
    160,
    'right',
  );

  context.fillStyle = 'rgba(240, 201, 120, 0.88)';
  context.font = '500 12px ui-monospace, SFMono-Regular, Consolas, monospace';
  drawFittedText(context, `recorde ${snapshot.highScore}`, width - 20, 64, 180, 'right');
};

const getStatusLine = (
  level: LevelDefinition,
  currentLevelNumber: number,
  totalLevelCount: number,
  score: ScoreState,
  sentinelCount: number,
  width: number,
): string => {
  if (width < 680) {
    return [
      `fase ${currentLevelNumber}/${totalLevelCount}`,
      `frag ${score.fragmentsCollected}/${score.fragmentsTotal}`,
      `vidas ${score.lives}`,
      `sent ${sentinelCount}`,
    ].join(' | ');
  }

  return [
    `fase ${currentLevelNumber}/${totalLevelCount}`,
    level.name,
    `fragmentos ${score.fragmentsCollected}/${score.fragmentsTotal}`,
    `vidas ${score.lives}`,
    `sentinelas ${sentinelCount}`,
  ].join(' | ');
};

const drawFittedText = (
  context: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  align: CanvasTextAlign,
): void => {
  context.textAlign = align;

  if (context.measureText(text).width <= maxWidth) {
    context.fillText(text, x, y);
    return;
  }

  let fittedText = text;

  while (fittedText.length > 4 && context.measureText(`${fittedText}...`).width > maxWidth) {
    fittedText = fittedText.slice(0, -1);
  }

  context.fillText(`${fittedText}...`, x, y);
};
