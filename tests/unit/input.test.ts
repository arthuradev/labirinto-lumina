import { describe, expect, it } from 'vitest';

import { InputSystem } from '../../src/systems/InputSystem';

describe('InputSystem', () => {
  it('traduz teclas de fluxo da UX', () => {
    const inputSystem = new InputSystem();

    expect(inputSystem.getActionForKey('Enter')).toEqual({ type: 'confirm' });
    expect(inputSystem.getActionForKey(' ')).toEqual({ type: 'confirm' });
    expect(inputSystem.getActionForKey('c')).toEqual({ type: 'controls' });
    expect(inputSystem.getActionForKey('Escape')).toEqual({ type: 'back' });
    expect(inputSystem.getActionForKey('Backspace')).toEqual({ type: 'back' });
    expect(inputSystem.getActionForKey('p')).toEqual({ type: 'pause' });
    expect(inputSystem.getActionForKey('r')).toEqual({ type: 'restart' });
  });

  it('mantem movimento por setas e WASD', () => {
    const inputSystem = new InputSystem();

    expect(inputSystem.getActionForKey('ArrowUp')).toEqual({ type: 'direction', direction: 'up' });
    expect(inputSystem.getActionForKey('s')).toEqual({ type: 'direction', direction: 'down' });
    expect(inputSystem.getActionForKey('a')).toEqual({ type: 'direction', direction: 'left' });
    expect(inputSystem.getActionForKey('d')).toEqual({ type: 'direction', direction: 'right' });
  });
});
