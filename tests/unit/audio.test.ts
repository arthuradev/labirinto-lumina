import { describe, expect, it } from 'vitest';

import { AudioSystem } from '../../src/systems/AudioSystem';

describe('AudioSystem', () => {
  it('alterna mute e evita tocar quando mutado', () => {
    const audioSystem = new AudioSystem({ contextFactory: () => null });

    expect(audioSystem.isMuted).toBe(false);
    expect(audioSystem.toggleMute()).toBe(true);
    expect(audioSystem.isMuted).toBe(true);
    expect(audioSystem.play('fragment')).toBe(false);
  });

  it('falha silenciosamente quando Web Audio nao esta disponivel', () => {
    const audioSystem = new AudioSystem({ contextFactory: () => null });

    expect(audioSystem.play('start')).toBe(false);
  });
});
