import type { GameSnapshot } from '../core/types';
import { GAME_CONFIG } from '../game/GameConfig';
import { getScreenContent } from '../screens';
import { drawCollectibles, drawPlayer, drawPowerNodes, drawSentinels } from './drawEntities';
import { drawHud, HUD_HEIGHT } from './drawHud';
import { drawMaze } from './drawMaze';
import type { PlayfieldRenderState, RenderMetrics, ScreenContent } from './RendererTypes';

export class CanvasRenderer {
  readonly #canvas: HTMLCanvasElement;
  readonly #context: CanvasRenderingContext2D;

  #width = 0;
  #height = 0;

  constructor(canvas: HTMLCanvasElement) {
    const context = canvas.getContext('2d');

    if (!context) {
      throw new Error('Canvas 2D nao esta disponivel neste navegador.');
    }

    this.#canvas = canvas;
    this.#context = context;
  }

  resize(): void {
    const rect = this.#canvas.getBoundingClientRect();
    const width = Math.max(GAME_CONFIG.canvas.minWidth, Math.floor(rect.width));
    const height = Math.max(GAME_CONFIG.canvas.minHeight, Math.floor(rect.height));
    const pixelRatio = window.devicePixelRatio || 1;
    const displayWidth = Math.floor(width * pixelRatio);
    const displayHeight = Math.floor(height * pixelRatio);

    if (this.#canvas.width !== displayWidth || this.#canvas.height !== displayHeight) {
      this.#canvas.width = displayWidth;
      this.#canvas.height = displayHeight;
    }

    this.#width = width;
    this.#height = height;
    this.#context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  }

  render(snapshot: GameSnapshot, playfield?: PlayfieldRenderState): void {
    this.resize();
    this.#drawBackground(snapshot.elapsedSeconds);

    if (
      playfield &&
      (snapshot.state === 'playing' ||
        snapshot.state === 'paused' ||
        snapshot.state === 'level-complete')
    ) {
      this.#drawPlayfield(snapshot, playfield);
      return;
    }

    this.#drawContent(snapshot, playfield);
  }

  #drawBackground(elapsedSeconds: number): void {
    const gradient = this.#context.createLinearGradient(0, 0, this.#width, this.#height);
    gradient.addColorStop(0, GAME_CONFIG.colors.background);
    gradient.addColorStop(0.66, GAME_CONFIG.colors.backgroundDeep);
    gradient.addColorStop(1, '#17150f');

    this.#context.fillStyle = gradient;
    this.#context.fillRect(0, 0, this.#width, this.#height);

    const drift = (elapsedSeconds * 18) % 64;

    this.#context.strokeStyle = GAME_CONFIG.colors.grid;
    this.#context.lineWidth = 1;

    for (let x = -64 + drift; x < this.#width + 64; x += 64) {
      this.#context.beginPath();
      this.#context.moveTo(x, 0);
      this.#context.lineTo(x, this.#height);
      this.#context.stroke();
    }

    for (let y = -64 + drift; y < this.#height + 64; y += 64) {
      this.#context.beginPath();
      this.#context.moveTo(0, y);
      this.#context.lineTo(this.#width, y);
      this.#context.stroke();
    }
  }

  #drawContent(snapshot: GameSnapshot, playfield?: PlayfieldRenderState): void {
    const content = getScreenContent(snapshot.state);
    const centerX = this.#width / 2;
    const centerY = this.#height / 2;
    const panelWidth = Math.min(820, this.#width - 32);
    const panelHeight = Math.min(540, this.#height - 32);
    const panelX = centerX - panelWidth / 2;
    const panelY = centerY - panelHeight / 2;

    this.#drawPanel(panelX, panelY, panelWidth, panelHeight);

    this.#context.textBaseline = 'middle';
    this.#context.fillStyle = GAME_CONFIG.colors.accent;
    this.#context.font = '600 13px system-ui, sans-serif';
    this.#drawFittedText(
      `estado: ${content.state}`,
      centerX,
      panelY + 42,
      panelWidth - 56,
      'center',
    );

    this.#context.fillStyle = GAME_CONFIG.colors.text;
    this.#context.font = '700 40px system-ui, sans-serif';
    this.#drawFittedText(content.title, centerX, panelY + 96, panelWidth - 56, 'center');

    this.#context.fillStyle = GAME_CONFIG.colors.mutedText;
    this.#context.font = '500 18px system-ui, sans-serif';
    this.#drawFittedText(content.subtitle, centerX, panelY + 138, panelWidth - 56, 'center');

    this.#context.fillStyle = GAME_CONFIG.colors.warmAccent;
    this.#context.font = '600 20px system-ui, sans-serif';
    this.#drawFittedText(content.status, centerX, panelY + 184, panelWidth - 56, 'center');

    this.#context.fillStyle = GAME_CONFIG.colors.text;
    this.#context.font = '600 18px system-ui, sans-serif';
    this.#drawFittedText(content.action, centerX, panelY + 226, panelWidth - 56, 'center');

    this.#drawContentDetails(content, panelX, panelY, panelWidth, panelHeight);

    this.#drawGlobalSummary(snapshot, playfield, panelX, panelY + panelHeight - 82, panelWidth);

    this.#context.textAlign = 'right';
    this.#context.fillStyle = 'rgba(245, 251, 248, 0.62)';
    this.#context.font = '400 12px ui-monospace, SFMono-Regular, Consolas, monospace';
    this.#context.fillText(`frame ${snapshot.frame}`, this.#width - 18, this.#height - 18);
  }

  #drawPlayfield(snapshot: GameSnapshot, playfield: PlayfieldRenderState): void {
    const metrics = this.#getPlayfieldMetrics(playfield);

    drawMaze(this.#context, playfield.level, metrics);
    drawCollectibles(
      this.#context,
      playfield.collectibles,
      playfield.level,
      metrics,
      snapshot.elapsedSeconds,
    );
    drawPowerNodes(
      this.#context,
      playfield.powerNodes,
      playfield.level,
      metrics,
      snapshot.elapsedSeconds,
    );
    drawSentinels(
      this.#context,
      playfield.sentinels,
      playfield.level,
      metrics,
      snapshot.elapsedSeconds,
    );
    drawPlayer(this.#context, playfield.player, playfield.level, metrics, snapshot.elapsedSeconds);
    drawHud(
      this.#context,
      snapshot,
      playfield.level,
      playfield.currentLevelNumber,
      playfield.totalLevelCount,
      playfield.score,
      playfield.player.pulseRemainingSeconds,
      playfield.sentinels.length,
      this.#width,
    );

    if (snapshot.state === 'paused') {
      this.#drawPauseOverlay();
    } else if (snapshot.state === 'level-complete') {
      this.#drawLevelCompleteOverlay(
        playfield.score.score,
        playfield.currentLevelNumber,
        playfield.totalLevelCount,
      );
    }
  }

  #getPlayfieldMetrics(playfield: PlayfieldRenderState): RenderMetrics {
    const topMargin = HUD_HEIGHT + 14;
    const maxTileWidth = (this.#width - 48) / playfield.level.width;
    const maxTileHeight = (this.#height - topMargin - 24) / playfield.level.height;
    const tileSize = Math.max(14, Math.floor(Math.min(maxTileWidth, maxTileHeight)));
    const mazeWidth = playfield.level.width * tileSize;
    const mazeHeight = playfield.level.height * tileSize;

    return {
      offsetX: Math.floor((this.#width - mazeWidth) / 2),
      offsetY: Math.floor(topMargin + (this.#height - topMargin - 14 - mazeHeight) / 2),
      tileSize,
    };
  }

  #drawPauseOverlay(): void {
    this.#context.fillStyle = 'rgba(6, 16, 21, 0.62)';
    this.#context.fillRect(0, 0, this.#width, this.#height);
    this.#drawOverlayContent(getScreenContent('paused'));
  }

  #drawLevelCompleteOverlay(
    score: number,
    currentLevelNumber: number,
    totalLevelCount: number,
  ): void {
    const nextAction =
      currentLevelNumber < totalLevelCount
        ? 'Enter abre o proximo circuito.'
        : 'Enter mostra a vitoria.';

    this.#context.fillStyle = 'rgba(6, 16, 21, 0.68)';
    this.#context.fillRect(0, 0, this.#width, this.#height);
    this.#drawOverlayContent(getScreenContent('level-complete'), [
      `fase ${currentLevelNumber}/${totalLevelCount}`,
      `pontos ${score}`,
      nextAction,
    ]);
  }

  #drawPanel(x: number, y: number, width: number, height: number): void {
    this.#context.shadowColor = GAME_CONFIG.colors.shadow;
    this.#context.shadowBlur = 30;
    this.#context.fillStyle = GAME_CONFIG.colors.panel;
    this.#roundRect(x, y, width, height, 8);
    this.#context.fill();
    this.#context.shadowBlur = 0;

    this.#context.strokeStyle = 'rgba(114, 224, 216, 0.32)';
    this.#context.lineWidth = 2;
    this.#roundRect(x + 1, y + 1, width - 2, height - 2, 8);
    this.#context.stroke();
  }

  #drawContentDetails(
    content: ScreenContent,
    panelX: number,
    panelY: number,
    panelWidth: number,
    panelHeight: number,
  ): void {
    const compact = panelHeight < 400;
    const startY = compact ? panelY + panelHeight - 76 : panelY + 276;

    this.#context.fillStyle = GAME_CONFIG.colors.mutedText;
    this.#context.font = '400 15px system-ui, sans-serif';

    content.details.slice(0, compact ? 2 : 4).forEach((detail, index) => {
      this.#drawFittedText(
        detail,
        panelX + panelWidth / 2,
        startY + index * 24,
        panelWidth - 60,
        'center',
      );
    });

    const sections = content.sections ?? [];

    if (compact || sections.length === 0) {
      return;
    }

    const columnCount = Math.min(3, sections.length);
    const columnWidth = (panelWidth - 76) / columnCount;
    const sectionY = startY + Math.max(content.details.length, 1) * 26 + 10;

    sections.forEach((section, index) => {
      const column = index % columnCount;
      const row = Math.floor(index / columnCount);
      const x = panelX + 38 + column * columnWidth;
      const y = sectionY + row * 108;

      this.#context.fillStyle = GAME_CONFIG.colors.accent;
      this.#context.font = '700 14px system-ui, sans-serif';
      this.#drawFittedText(section.title, x, y, columnWidth - 14, 'left');

      this.#context.fillStyle = GAME_CONFIG.colors.mutedText;
      this.#context.font = '400 13px system-ui, sans-serif';

      section.lines.forEach((line, lineIndex) => {
        this.#drawFittedText(`- ${line}`, x, y + 24 + lineIndex * 19, columnWidth - 14, 'left');
      });
    });
  }

  #drawGlobalSummary(
    snapshot: GameSnapshot,
    playfield: PlayfieldRenderState | undefined,
    x: number,
    y: number,
    width: number,
  ): void {
    const sessionParts = playfield
      ? [
          `fase ${playfield.currentLevelNumber}/${playfield.totalLevelCount}`,
          playfield.level.name,
          `pontos ${playfield.score.score}`,
          `vidas ${playfield.score.lives}`,
        ]
      : [];
    const summary = [
      ...sessionParts,
      `recorde ${snapshot.highScore}`,
      `som ${snapshot.isAudioMuted ? 'off' : 'on'}`,
    ].join(' | ');

    this.#context.fillStyle = 'rgba(240, 201, 120, 0.92)';
    this.#context.font = '600 14px system-ui, sans-serif';
    this.#drawFittedText(summary, x + width / 2, y, width - 60, 'center');
  }

  #drawOverlayContent(content: ScreenContent, extraLines: readonly string[] = []): void {
    const panelWidth = Math.min(560, this.#width - 40);
    const panelHeight = Math.min(300, this.#height - 40);
    const panelX = (this.#width - panelWidth) / 2;
    const panelY = (this.#height - panelHeight) / 2;
    const centerX = this.#width / 2;

    this.#drawPanel(panelX, panelY, panelWidth, panelHeight);

    this.#context.textBaseline = 'middle';
    this.#context.fillStyle = GAME_CONFIG.colors.warmAccent;
    this.#context.font = '700 34px system-ui, sans-serif';
    this.#drawFittedText(content.title, centerX, panelY + 56, panelWidth - 48, 'center');

    this.#context.fillStyle = GAME_CONFIG.colors.text;
    this.#context.font = '600 17px system-ui, sans-serif';
    this.#drawFittedText(content.status, centerX, panelY + 98, panelWidth - 48, 'center');

    this.#context.fillStyle = GAME_CONFIG.colors.accent;
    this.#context.font = '600 16px system-ui, sans-serif';
    this.#drawFittedText(content.action, centerX, panelY + 134, panelWidth - 48, 'center');

    const lines = [...extraLines, ...content.details];

    this.#context.fillStyle = GAME_CONFIG.colors.mutedText;
    this.#context.font = '400 14px system-ui, sans-serif';

    lines.slice(0, 5).forEach((line, index) => {
      this.#drawFittedText(line, centerX, panelY + 178 + index * 22, panelWidth - 48, 'center');
    });
  }

  #drawFittedText(
    text: string,
    x: number,
    y: number,
    maxWidth: number,
    align: CanvasTextAlign,
  ): void {
    this.#context.textAlign = align;

    if (this.#context.measureText(text).width <= maxWidth) {
      this.#context.fillText(text, x, y);
      return;
    }

    let fittedText = text;

    while (
      fittedText.length > 4 &&
      this.#context.measureText(`${fittedText}...`).width > maxWidth
    ) {
      fittedText = fittedText.slice(0, -1);
    }

    this.#context.fillText(`${fittedText}...`, x, y);
  }

  #roundRect(x: number, y: number, width: number, height: number, radius: number): void {
    this.#context.beginPath();
    this.#context.moveTo(x + radius, y);
    this.#context.arcTo(x + width, y, x + width, y + height, radius);
    this.#context.arcTo(x + width, y + height, x, y + height, radius);
    this.#context.arcTo(x, y + height, x, y, radius);
    this.#context.arcTo(x, y, x + width, y, radius);
    this.#context.closePath();
  }
}
