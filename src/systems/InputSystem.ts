import type { MovementDirection } from '../core/direction';

export type InputAction =
  | { readonly type: 'confirm' }
  | { readonly type: 'pause' }
  | { readonly type: 'direction'; readonly direction: MovementDirection };

const DIRECTION_KEYS: Record<string, MovementDirection> = {
  arrowup: 'up',
  w: 'up',
  arrowdown: 'down',
  s: 'down',
  arrowleft: 'left',
  a: 'left',
  arrowright: 'right',
  d: 'right',
};

export class InputSystem {
  getActionForKey(key: string): InputAction | null {
    const normalizedKey = key.toLowerCase();

    if (normalizedKey === 'enter' || normalizedKey === ' ') {
      return { type: 'confirm' };
    }

    if (normalizedKey === 'p') {
      return { type: 'pause' };
    }

    const direction = DIRECTION_KEYS[normalizedKey];

    if (direction) {
      return { type: 'direction', direction };
    }

    return null;
  }
}
