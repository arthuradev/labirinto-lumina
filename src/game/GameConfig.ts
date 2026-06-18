export const GAME_CONFIG = {
  title: 'Labirinto Lumina',
  subtitle: 'Uma luz atravessa circuitos escuros em busca de fragmentos.',
  canvas: {
    minWidth: 320,
    minHeight: 240,
  },
  player: {
    speedTilesPerSecond: 6,
    initialLives: 3,
  },
  scoring: {
    levelCompleteLifeBonus: 100,
    sentinelPulsePoints: 200,
  },
  sentinels: {
    speedTilesPerSecond: 3.2,
    disabledSecondsAfterPulse: 4,
  },
  colors: {
    background: '#061015',
    backgroundDeep: '#0b171c',
    panel: 'rgba(8, 24, 28, 0.78)',
    grid: 'rgba(116, 224, 216, 0.13)',
    text: '#f5fbf8',
    mutedText: '#b6cdca',
    accent: '#72e0d8',
    warmAccent: '#f0c978',
    shadow: 'rgba(5, 9, 12, 0.48)',
  },
} as const;
