import type { GameState } from '../core/types';
import type { ScreenContent } from '../rendering/RendererTypes';
import { getControlsScreenContent } from './ControlsScreen';
import { getGameOverScreenContent } from './GameOverScreen';
import {
  getBootScreenContent,
  getPlayingScreenContent,
  getStartScreenContent,
} from './StartScreen';
import { getLevelCompleteScreenContent, getPauseScreenContent } from './PauseScreen';
import { getVictoryScreenContent } from './VictoryScreen';

export const getScreenContent = (state: GameState): ScreenContent => {
  switch (state) {
    case 'boot':
      return getBootScreenContent();
    case 'start':
      return getStartScreenContent();
    case 'controls':
      return getControlsScreenContent();
    case 'playing':
      return getPlayingScreenContent();
    case 'paused':
      return getPauseScreenContent();
    case 'level-complete':
      return getLevelCompleteScreenContent();
    case 'game-over':
      return getGameOverScreenContent();
    case 'victory':
      return getVictoryScreenContent();
  }
};
