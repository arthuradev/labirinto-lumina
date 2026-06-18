import type { ScreenContent } from '../rendering/RendererTypes';

export const getVictoryScreenContent = (): ScreenContent => ({
  state: 'victory',
  title: 'Vitoria',
  subtitle: 'Os tres circuitos foram estabilizados.',
  status: 'Campanha atual concluida.',
  action: 'Enter ou R joga novamente.',
  details: [
    'Circuito Aurora, Malha Prisma e Nucleo Obsidiana estao completos.',
    'O recorde local e atualizado quando sua pontuacao supera a anterior.',
  ],
});
