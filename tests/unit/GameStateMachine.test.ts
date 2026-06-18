import { describe, expect, it } from 'vitest';

import { GameStateMachine } from '../../src/game/GameStateMachine';

describe('GameStateMachine', () => {
  it('inicia no estado boot', () => {
    const machine = new GameStateMachine();

    expect(machine.state).toBe('boot');
  });

  it('permite o fluxo inicial até playing', () => {
    const machine = new GameStateMachine();

    expect(machine.transitionTo('start')).toBe('start');
    expect(machine.transitionTo('playing')).toBe('playing');
  });

  it('alterna entre playing e paused', () => {
    const machine = new GameStateMachine();

    machine.transitionTo('start');
    machine.transitionTo('playing');

    expect(machine.transitionTo('paused')).toBe('paused');
    expect(machine.transitionTo('playing')).toBe('playing');
  });

  it('permite concluir fase e chegar à vitória', () => {
    const machine = new GameStateMachine();

    machine.transitionTo('start');
    machine.transitionTo('playing');

    expect(machine.transitionTo('level-complete')).toBe('level-complete');
    expect(machine.transitionTo('victory')).toBe('victory');
  });

  it('bloqueia transições inválidas', () => {
    const machine = new GameStateMachine();

    expect(() => machine.transitionTo('paused')).toThrow(
      'Transição inválida de "boot" para "paused".',
    );
  });
});
