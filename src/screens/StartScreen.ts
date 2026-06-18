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
        status: 'Núcleo técnico pronto.',
        action: 'Pressione Enter ou clique para iniciar.',
        details: [
          'Tela inicial funcional no Canvas.',
          'Movimento, labirinto e colisão entram na Etapa 3.',
        ],
      };
    case 'playing':
      return {
        state,
        title: 'Núcleo em execução',
        subtitle: 'Estado playing ativo.',
        status: 'A partida ainda não possui gameplay.',
        action: 'Pressione P para pausar.',
        details: ['O loop principal está rodando.', 'Renderização e estado já estão separados.'],
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
        subtitle: 'Estado reservado para progressão futura.',
        status: 'Sem fase jogável nesta etapa.',
        action: 'Retorno ao início nas próximas etapas.',
        details: ['Este estado existe para manter o contrato arquitetural.'],
      };
    case 'game-over':
      return {
        state,
        title: 'Fim de jogo',
        subtitle: 'Estado reservado para derrota futura.',
        status: 'Sem condição de derrota nesta etapa.',
        action: 'Retorno ao início nas próximas etapas.',
        details: ['Este estado existe para manter o contrato arquitetural.'],
      };
    case 'victory':
      return {
        state,
        title: 'Vitória',
        subtitle: 'Estado reservado para conclusão futura.',
        status: 'Sem condição de vitória nesta etapa.',
        action: 'Retorno ao início nas próximas etapas.',
        details: ['Este estado existe para manter o contrato arquitetural.'],
      };
  }
};
