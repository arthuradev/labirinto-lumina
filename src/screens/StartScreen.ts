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
          'Atravesse três circuitos originais em sequência.',
          'Setas ou WASD movem a Lumina. P pausa a partida.',
        ],
      };
    case 'playing':
      return {
        state,
        title: 'Circuito ativo',
        subtitle: 'Movimento em grid e sentinelas ativos.',
        status: 'Colete fragmentos, use pulsos e avance entre fases.',
        action: 'Pressione P para pausar.',
        details: ['Todos os fragmentos encerram a fase.', 'Enter avança após cada circuito.'],
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
        details: ['Se ainda houver circuitos, a próxima fase será carregada.'],
      };
    case 'game-over':
      return {
        state,
        title: 'Fim de jogo',
        subtitle: 'A luz se dissipou.',
        status: 'Vidas esgotadas pelas sentinelas.',
        action: 'Pressione Enter ou R para voltar ao início.',
        details: ['A campanha reinicia a partir do primeiro circuito.'],
      };
    case 'victory':
      return {
        state,
        title: 'Vitória',
        subtitle: 'Todos os circuitos foram estabilizados.',
        status: 'As três fases atuais foram concluídas.',
        action: 'Pressione Enter ou R para jogar novamente.',
        details: ['Novas telas e polimento de fluxo entram na Etapa 7.'],
      };
  }
};
