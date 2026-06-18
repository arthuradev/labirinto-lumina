import type { ScreenContent } from '../rendering/RendererTypes';
import { GAME_CONFIG } from '../game/GameConfig';

export const getBootScreenContent = (): ScreenContent => ({
  state: 'boot',
  title: GAME_CONFIG.title,
  subtitle: 'Carregando nucleo tecnico.',
  status: 'Preparando canvas, loop e estados.',
  action: 'A tela inicial sera aberta em instantes.',
  details: ['Projeto IA-first com TypeScript, Vite e Canvas.'],
});

export const getStartScreenContent = (): ScreenContent => ({
  state: 'start',
  title: GAME_CONFIG.title,
  subtitle: GAME_CONFIG.subtitle,
  status: 'Campanha atual: tres circuitos originais.',
  action: 'Enter ou clique inicia. C abre controles. M alterna som.',
  details: [
    'Colete fragmentos, use nos de pulso e evite sentinelas.',
    'Pausar, voltar e reiniciar ja funcionam por teclado.',
  ],
  sections: [
    {
      title: 'Objetivo',
      lines: [
        'Complete Circuito Aurora, Malha Prisma e Nucleo Obsidiana.',
        'Todos os fragmentos abrem o proximo circuito.',
      ],
    },
    {
      title: 'Atalhos',
      lines: ['Setas/WASD movem.', 'P ou Esc pausa.', 'M alterna som.', 'R reinicia finais.'],
    },
  ],
});

export const getPlayingScreenContent = (): ScreenContent => ({
  state: 'playing',
  title: 'Circuito ativo',
  subtitle: 'Movimento, coleta, pulso e sentinelas ativos.',
  status: 'Colete todos os fragmentos para avancar.',
  action: 'P ou Esc pausa a partida.',
  details: ['O HUD mostra fase, pontos, vidas, pulso e sentinelas.'],
});
