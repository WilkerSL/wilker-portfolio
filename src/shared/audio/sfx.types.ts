export type SfxName =
  | "whoosh"
  | "splat"
  | "pop"
  | "tick"
  | "type"
  | "step"
  | "chime"
  | "thud"
  | "boing"
  | "squeak"
  | "blip"
  | "clack";

export interface SfxOptions {
  readonly volume?: number;
  readonly pitch?: number;
  readonly pan?: number;
}

export interface SfxVoice {
  readonly context: AudioContext;
  readonly output: AudioNode;
  readonly noise: AudioBuffer;
  readonly at: number;
  readonly pitch: number;
  readonly volume: number;
}

export interface SfxRecipe {
  readonly reverb: number;
  play(voice: SfxVoice): void;
}

export interface AudioEngine {
  readonly context: AudioContext;
  readonly master: GainNode;
  readonly reverb: AudioNode;
  readonly noise: AudioBuffer;
}

export interface NoiseShape {
  readonly filter: BiquadFilterType;
  readonly from: number;
  readonly to: number;
  readonly q: number;
  readonly gain: number;
  readonly attack: number;
  readonly release: number;
  readonly offset?: number;
}

export interface SweepShape {
  readonly type: OscillatorType;
  readonly points: readonly (readonly [number, number])[];
  readonly gain: number;
  readonly attack: number;
  readonly release: number;
  readonly offset?: number;
  readonly band?: number;
}
