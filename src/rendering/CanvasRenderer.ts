import type { GameSnapshot } from '../core/types';
import { GAME_CONFIG } from '../game/GameConfig';
import { getScreenContent } from '../screens/StartScreen';

export class CanvasRenderer {
  readonly #canvas: HTMLCanvasElement;
  readonly #context: CanvasRenderingContext2D;

  #width = 0;
  #height = 0;

  constructor(canvas: HTMLCanvasElement) {
    const context = canvas.getContext('2d');

    if (!context) {
      throw new Error('Canvas 2D não está disponível neste navegador.');
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

  render(snapshot: GameSnapshot): void {
    this.resize();
    this.#drawBackground(snapshot.elapsedSeconds);
    this.#drawContent(snapshot);
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

  #drawContent(snapshot: GameSnapshot): void {
    const content = getScreenContent(snapshot.state);
    const centerX = this.#width / 2;
    const centerY = this.#height / 2;
    const panelWidth = Math.min(760, this.#width - 40);
    const panelHeight = Math.min(380, this.#height - 40);
    const panelX = centerX - panelWidth / 2;
    const panelY = centerY - panelHeight / 2;

    this.#context.shadowColor = GAME_CONFIG.colors.shadow;
    this.#context.shadowBlur = 30;
    this.#context.fillStyle = GAME_CONFIG.colors.panel;
    this.#roundRect(panelX, panelY, panelWidth, panelHeight, 8);
    this.#context.fill();
    this.#context.shadowBlur = 0;

    this.#context.strokeStyle = 'rgba(114, 224, 216, 0.32)';
    this.#context.lineWidth = 2;
    this.#roundRect(panelX + 1, panelY + 1, panelWidth - 2, panelHeight - 2, 8);
    this.#context.stroke();

    this.#context.textAlign = 'center';
    this.#context.textBaseline = 'middle';

    this.#context.fillStyle = GAME_CONFIG.colors.accent;
    this.#context.font = '600 13px system-ui, sans-serif';
    this.#context.fillText(`estado: ${content.state}`, centerX, panelY + 46);

    this.#context.fillStyle = GAME_CONFIG.colors.text;
    this.#context.font = '700 42px system-ui, sans-serif';
    this.#context.fillText(content.title, centerX, panelY + 104);

    this.#context.fillStyle = GAME_CONFIG.colors.mutedText;
    this.#context.font = '500 18px system-ui, sans-serif';
    this.#context.fillText(content.subtitle, centerX, panelY + 148);

    this.#context.fillStyle = GAME_CONFIG.colors.warmAccent;
    this.#context.font = '600 20px system-ui, sans-serif';
    this.#context.fillText(content.status, centerX, panelY + 204);

    this.#context.fillStyle = GAME_CONFIG.colors.text;
    this.#context.font = '600 18px system-ui, sans-serif';
    this.#context.fillText(content.action, centerX, panelY + 252);

    this.#context.fillStyle = GAME_CONFIG.colors.mutedText;
    this.#context.font = '400 15px system-ui, sans-serif';

    content.details.forEach((detail, index) => {
      this.#context.fillText(detail, centerX, panelY + 300 + index * 24);
    });

    this.#context.textAlign = 'right';
    this.#context.fillStyle = 'rgba(245, 251, 248, 0.62)';
    this.#context.font = '400 12px ui-monospace, SFMono-Regular, Consolas, monospace';
    this.#context.fillText(`frame ${snapshot.frame}`, this.#width - 18, this.#height - 18);
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
