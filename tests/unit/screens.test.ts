import { describe, expect, it } from 'vitest';

import type { GameState } from '../../src/core/types';
import { getScreenContent } from '../../src/screens';

const SCREEN_STATES: readonly GameState[] = [
  'boot',
  'start',
  'controls',
  'playing',
  'paused',
  'level-complete',
  'game-over',
  'victory',
];

describe('screen content', () => {
  it('define conteudo para todos os estados visuais', () => {
    for (const state of SCREEN_STATES) {
      const content = getScreenContent(state);

      expect(content.state).toBe(state);
      expect(content.title.length).toBeGreaterThan(0);
      expect(content.action.length).toBeGreaterThan(0);
    }
  });

  it('inclui uma tela de controles com secoes navegaveis', () => {
    const content = getScreenContent('controls');

    expect(content.title).toBe('Controles');
    expect(content.sections?.map((section) => section.title)).toEqual([
      'Movimento',
      'Fluxo',
      'Durante o jogo',
    ]);
  });
});
