export type AudioEventName =
  | 'ui'
  | 'start'
  | 'fragment'
  | 'pulse'
  | 'sentinel-crossed'
  | 'player-hit'
  | 'level-complete'
  | 'game-over'
  | 'victory'
  | 'high-score';

export interface AudioSystemOptions {
  readonly contextFactory?: () => AudioContext | null;
  readonly initialMuted?: boolean;
}

type OscillatorWave = OscillatorType;

interface Tone {
  readonly frequency: number;
  readonly duration: number;
  readonly offset?: number;
  readonly wave?: OscillatorWave;
  readonly gain?: number;
}

const EVENT_TONES: Record<AudioEventName, readonly Tone[]> = {
  ui: [{ frequency: 520, duration: 0.05, wave: 'triangle', gain: 0.035 }],
  start: [
    { frequency: 330, duration: 0.08, wave: 'sine' },
    { frequency: 495, duration: 0.1, offset: 0.06, wave: 'sine' },
    { frequency: 660, duration: 0.12, offset: 0.12, wave: 'triangle' },
  ],
  fragment: [{ frequency: 740, duration: 0.055, wave: 'sine', gain: 0.035 }],
  pulse: [
    { frequency: 260, duration: 0.11, wave: 'triangle', gain: 0.045 },
    { frequency: 520, duration: 0.13, offset: 0.04, wave: 'sine', gain: 0.04 },
  ],
  'sentinel-crossed': [
    { frequency: 610, duration: 0.08, wave: 'triangle', gain: 0.045 },
    { frequency: 910, duration: 0.09, offset: 0.055, wave: 'sine', gain: 0.04 },
  ],
  'player-hit': [
    { frequency: 180, duration: 0.16, wave: 'sawtooth', gain: 0.035 },
    { frequency: 120, duration: 0.16, offset: 0.08, wave: 'triangle', gain: 0.032 },
  ],
  'level-complete': [
    { frequency: 392, duration: 0.1, wave: 'sine' },
    { frequency: 523, duration: 0.1, offset: 0.075, wave: 'sine' },
    { frequency: 784, duration: 0.18, offset: 0.15, wave: 'triangle' },
  ],
  'game-over': [
    { frequency: 240, duration: 0.18, wave: 'triangle', gain: 0.038 },
    { frequency: 190, duration: 0.18, offset: 0.13, wave: 'triangle', gain: 0.034 },
    { frequency: 145, duration: 0.22, offset: 0.26, wave: 'sine', gain: 0.03 },
  ],
  victory: [
    { frequency: 440, duration: 0.11, wave: 'sine' },
    { frequency: 660, duration: 0.11, offset: 0.08, wave: 'sine' },
    { frequency: 880, duration: 0.14, offset: 0.16, wave: 'triangle' },
    { frequency: 990, duration: 0.18, offset: 0.28, wave: 'sine', gain: 0.035 },
  ],
  'high-score': [
    { frequency: 700, duration: 0.09, wave: 'triangle', gain: 0.04 },
    { frequency: 1050, duration: 0.12, offset: 0.08, wave: 'sine', gain: 0.035 },
  ],
};

export class AudioSystem {
  readonly #contextFactory: () => AudioContext | null;

  #context: AudioContext | null = null;
  #isMuted: boolean;

  constructor(options: AudioSystemOptions = {}) {
    this.#contextFactory = options.contextFactory ?? createBrowserAudioContext;
    this.#isMuted = options.initialMuted ?? false;
  }

  get isMuted(): boolean {
    return this.#isMuted;
  }

  toggleMute(): boolean {
    this.#isMuted = !this.#isMuted;

    if (!this.#isMuted) {
      this.play('ui');
    }

    return this.#isMuted;
  }

  play(eventName: AudioEventName): boolean {
    if (this.#isMuted) {
      return false;
    }

    const context = this.#getContext();

    if (!context) {
      return false;
    }

    if (context.state === 'suspended') {
      void context.resume();
    }

    const startTime = context.currentTime + 0.01;

    for (const tone of EVENT_TONES[eventName]) {
      this.#scheduleTone(context, tone, startTime);
    }

    return true;
  }

  #getContext(): AudioContext | null {
    if (!this.#context) {
      this.#context = this.#contextFactory();
    }

    return this.#context;
  }

  #scheduleTone(context: AudioContext, tone: Tone, startTime: number): void {
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    const toneStart = startTime + (tone.offset ?? 0);
    const toneEnd = toneStart + tone.duration;
    const peakGain = tone.gain ?? 0.04;

    oscillator.type = tone.wave ?? 'sine';
    oscillator.frequency.setValueAtTime(tone.frequency, toneStart);
    oscillator.frequency.exponentialRampToValueAtTime(Math.max(60, tone.frequency * 0.94), toneEnd);

    gain.gain.setValueAtTime(0.0001, toneStart);
    gain.gain.exponentialRampToValueAtTime(peakGain, toneStart + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, toneEnd);

    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start(toneStart);
    oscillator.stop(toneEnd + 0.02);
  }
}

const createBrowserAudioContext = (): AudioContext | null => {
  const audioWindow = window as Window &
    typeof globalThis & {
      webkitAudioContext?: typeof AudioContext;
    };
  const AudioContextConstructor = audioWindow.AudioContext ?? audioWindow.webkitAudioContext;

  if (!AudioContextConstructor) {
    return null;
  }

  try {
    return new AudioContextConstructor();
  } catch {
    return null;
  }
};
