import type { ScreenContent } from '../rendering/RendererTypes';

export const getGameOverScreenContent = (): ScreenContent => ({
  state: 'game-over',
  title: 'Fim de jogo',
  subtitle: 'A luz se dissipou no circuito.',
  status: 'As vidas chegaram a zero.',
  action: 'Enter ou R volta ao inicio.',
  details: [
    'Use nos de pulso para atravessar sentinelas com seguranca.',
    'A campanha recomeca do Circuito Aurora.',
  ],
});
