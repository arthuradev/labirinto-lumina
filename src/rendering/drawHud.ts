import type { GameSnapshot } from '../core/types';
import type { LevelDefinition } from '../levels';
import type { ScoreState } from '../systems/ScoreSystem';

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
  context.fillRect(0, 0, width, 58);

  context.textAlign = 'left';
  context.fillStyle = '#f5fbf8';
  context.font = '700 18px system-ui, sans-serif';
  context.fillText('Labirinto Lumina', 20, 22);

  context.fillStyle = '#b6cdca';
  context.font = '500 13px system-ui, sans-serif';
  const statusLine = [
    `fase ${currentLevelNumber}/${totalLevelCount}`,
    level.name,
    `fragmentos ${score.fragmentsCollected}/${score.fragmentsTotal}`,
    `vidas ${score.lives}`,
    `sentinelas ${sentinelCount}`,
  ].join(' · ');

  context.fillText(statusLine, 20, 44);

  context.textAlign = 'right';
  context.fillStyle = '#72e0d8';
  context.font = '500 13px ui-monospace, SFMono-Regular, Consolas, monospace';
  context.fillText(`pontos ${score.score}`, width - 20, 22);

  context.fillStyle = pulseRemainingSeconds > 0 ? '#f0c978' : '#b6cdca';
  context.fillText(
    pulseRemainingSeconds > 0
      ? `pulso ${pulseRemainingSeconds.toFixed(1)}s`
      : `estado: ${snapshot.state}`,
    width - 20,
    44,
  );
};
