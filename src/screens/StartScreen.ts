import type { GameState } from '../core/types';
import type { ScreenContent } from '../rendering/RendererTypes';
import { GAME_CONFIG } from '../game/GameConfig';

export const getScreenContent = (state: GameState): ScreenContent => {
  switch (state) {
    case 'boot':
      return {
        state,
        title: GAME_CONFIG.title,
        subtitle: 'Carregando núcleo técnico.',
        status: 'Estado boot ativo.',
        action: 'Preparando a tela inicial.',
        details: ['Canvas, loop e estados estão sendo conectados.'],
      };
    case 'start':
      return {
        state,
        title: GAME_CONFIG.title,
        subtitle: GAME_CONFIG.subtitle,
        status: 'Colete todos os fragmentos de luz.',
        action: 'Pressione Enter ou clique para iniciar.',
        details: [
          'Nós de pulso dão pontos e ativam energia temporária.',
          'Setas ou WASD movem a Lumina. P pausa a partida.',
        ],
      };
    case 'playing':
      return {
        state,
        title: 'Circuito ativo',
        subtitle: 'Movimento em grid habilitado.',
        status: 'Colete fragmentos e nós de pulso.',
        action: 'Pressione P para pausar.',
        details: ['Todos os fragmentos encerram a fase.', 'Sentinelas entram na Etapa 5.'],
      };
    case 'paused':
      return {
        state,
        title: 'Pausa técnica',
        subtitle: 'Estado paused ativo.',
        status: 'A simulação visual está pausada.',
        action: 'Pressione P para voltar.',
        details: ['A pausa completa de jogo será refinada em etapa própria.'],
      };
    case 'level-complete':
      return {
        state,
        title: 'Fase concluída',
        subtitle: 'Todos os fragmentos foram coletados.',
        status: 'Bônus por vidas restantes aplicado.',
        action: 'Pressione Enter para avançar.',
        details: ['Na versão final, este fluxo avançará entre fases.'],
      };
    case 'game-over':
      return {
        state,
        title: 'Fim de jogo',
        subtitle: 'A luz se dissipou.',
        status: 'Derrota básica preparada.',
        action: 'Pressione Enter ou R para voltar ao início.',
        details: ['Sentinelas vão acionar perda de vidas na Etapa 5.'],
      };
    case 'victory':
      return {
        state,
        title: 'Vitória',
        subtitle: 'Circuito Aurora estabilizado.',
        status: 'Fim de fase básico funcionando.',
        action: 'Pressione Enter ou R para jogar novamente.',
        details: ['Mais fases entram na Etapa 6.'],
      };
  }
};
