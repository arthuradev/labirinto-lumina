import type { ScreenContent } from '../rendering/RendererTypes';

export const getControlsScreenContent = (): ScreenContent => ({
  state: 'controls',
  title: 'Controles',
  subtitle: 'Tudo que voce precisa para jogar sem mouse.',
  status: 'Entrada por teclado pronta para a campanha atual.',
  action: 'Enter inicia. Esc ou C volta.',
  details: ['A tela de controles tambem aparece resumida na pausa.'],
  sections: [
    {
      title: 'Movimento',
      lines: ['Setas direcionais: mover.', 'WASD: mover.', 'Movimento segue o grid.'],
    },
    {
      title: 'Fluxo',
      lines: [
        'Enter/Espaco: iniciar ou confirmar.',
        'C: abrir/fechar controles no inicio.',
        'R: reiniciar apos fim de jogo, vitoria ou fase concluida.',
      ],
    },
    {
      title: 'Durante o jogo',
      lines: [
        'P ou Esc: pausar/despausar.',
        'Nos de pulso deixam sentinelas instaveis.',
        'Complete as tres fases para vencer.',
      ],
    },
  ],
});
