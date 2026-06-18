import type { ScreenContent } from '../rendering/RendererTypes';

export const getPauseScreenContent = (): ScreenContent => ({
  state: 'paused',
  title: 'Pausa',
  subtitle: 'A simulacao esta congelada.',
  status: 'Respire, leia o mapa e volte quando quiser.',
  action: 'P ou Esc continua.',
  details: ['Setas/WASD movem. R reinicia em telas de conclusao.'],
  sections: [
    {
      title: 'Lembretes',
      lines: [
        'Fragmentos aumentam pontos.',
        'Nos de pulso valem pontos e reduzem risco.',
        'Sentinelas atravessadas durante pulso valem bonus.',
      ],
    },
  ],
});

export const getLevelCompleteScreenContent = (): ScreenContent => ({
  state: 'level-complete',
  title: 'Circuito concluido',
  subtitle: 'Todos os fragmentos desta fase foram coletados.',
  status: 'Bonus por vidas restantes aplicado.',
  action: 'Enter avanca. R reinicia a campanha.',
  details: ['Se este era o ultimo circuito, a proxima confirmacao mostra a vitoria.'],
});
