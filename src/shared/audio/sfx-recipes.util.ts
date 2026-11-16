import { modal, noiseBurst, partial, sweep, vibrato } from "@/shared/audio/sfx-synth.util";
import type { SfxName, SfxRecipe } from "@/shared/audio/sfx.types";

export const SFX_RECIPES: Readonly<Record<SfxName, SfxRecipe>> = {
  pop: {
    reverb: 0.16,
    play: (voice) => {
      modal(voice, 620, [
        [1, 1, 0.12],
        [2.41, 0.35, 0.06],
        [4.63, 0.12, 0.035],
      ], 0.2);
      noiseBurst(voice, { filter: "highpass", from: 3200, to: 3200, q: 0.7, gain: 0.05, attack: 0.001, release: 0.012 });
    },
  },
  tick: {
    reverb: 0.04,
    play: (voice) => {
      noiseBurst(voice, { filter: "bandpass", from: 4200, to: 3800, q: 3, gain: 0.06, attack: 0.001, release: 0.016 });
      partial(voice, 2600 * voice.pitch, 0.025, 0.018);
    },
  },
  type: {
    reverb: 0.05,
    play: (voice) => {
      const tone = 1800 + Math.random() * 1400;
      noiseBurst(voice, { filter: "bandpass", from: tone, to: tone * 0.9, q: 5, gain: 0.08, attack: 0.001, release: 0.022 });
      partial(voice, 170 * voice.pitch, 0.035, 0.03);
      noiseBurst(voice, { filter: "bandpass", from: tone * 1.2, to: tone, q: 6, gain: 0.035, attack: 0.001, release: 0.014, offset: 0.045 + Math.random() * 0.02 });
    },
  },
  whoosh: {
    reverb: 0.35,
    play: (voice) => {
      noiseBurst(voice, { filter: "bandpass", from: 300, to: 2200, q: 1.1, gain: 0.26, attack: 0.16, release: 0.34 });
      noiseBurst(voice, { filter: "lowpass", from: 900, to: 300, q: 0.6, gain: 0.08, attack: 0.08, release: 0.3 });
    },
  },
  splat: {
    reverb: 0.2,
    play: (voice) => {
      noiseBurst(voice, { filter: "lowpass", from: 3200, to: 220, q: 0.9, gain: 0.38, attack: 0.003, release: 0.22 });
      sweep(voice, { type: "sine", points: [[0, 170], [0.2, 52]], gain: 0.34, attack: 0.003, release: 0.22 });
      noiseBurst(voice, { filter: "bandpass", from: 1400, to: 900, q: 6, gain: 0.08, attack: 0.002, release: 0.06, offset: 0.02 });
    },
  },
  step: {
    reverb: 0.06,
    play: (voice) => {
      noiseBurst(voice, { filter: "lowpass", from: 900, to: 260, q: 0.7, gain: 0.1, attack: 0.003, release: 0.06 });
      sweep(voice, { type: "sine", points: [[0, 120], [0.06, 70]], gain: 0.08, attack: 0.002, release: 0.07 });
    },
  },
  chime: {
    reverb: 0.55,
    play: (voice) => {
      const bell: readonly (readonly [number, number, number])[] = [
        [1, 1, 1.5],
        [2.01, 0.42, 1.05],
        [2.99, 0.22, 0.75],
        [4.2, 0.1, 0.5],
        [5.43, 0.06, 0.32],
      ];
      modal(voice, 880, bell, 0.07);
      modal(voice, 1318.5, bell, 0.05, 0.11);
    },
  },
  thud: {
    reverb: 0.12,
    play: (voice) => {
      sweep(voice, { type: "sine", points: [[0, 95], [0.3, 42]], gain: 0.4, attack: 0.002, release: 0.3 });
      noiseBurst(voice, { filter: "lowpass", from: 700, to: 140, q: 0.8, gain: 0.18, attack: 0.002, release: 0.1 });
    },
  },
  boing: {
    reverb: 0.2,
    play: (voice) => {
      const spring = sweep(voice, { type: "sine", points: [[0, 170], [0.08, 260], [0.5, 230]], gain: 0.16, attack: 0.006, release: 0.48 });
      vibrato(voice, spring, 16, 38, 0.5);
      noiseBurst(voice, { filter: "lowpass", from: 600, to: 200, q: 0.7, gain: 0.08, attack: 0.002, release: 0.05 });
    },
  },
  squeak: {
    reverb: 0.18,
    play: (voice) => {
      const path: readonly (readonly [number, number])[] = [[0, 760], [0.05, 1380], [0.13, 1180], [0.19, 980]];
      sweep(voice, { type: "sawtooth", points: path, gain: 0.07, attack: 0.012, release: 0.17, band: 7 });
      sweep(voice, { type: "square", points: path.map(([time, frequency]) => [time, frequency * 1.004] as const), gain: 0.025, attack: 0.012, release: 0.15, band: 9 });
      noiseBurst(voice, { filter: "lowpass", from: 500, to: 180, q: 0.7, gain: 0.06, attack: 0.002, release: 0.04 });
    },
  },
  blip: {
    reverb: 0.22,
    play: (voice) => {
      sweep(voice, { type: "sine", points: [[0, 660], [0.05, 690]], gain: 0.12, attack: 0.004, release: 0.07 });
      sweep(voice, { type: "sine", points: [[0, 990], [0.06, 1040]], gain: 0.1, attack: 0.004, release: 0.09, offset: 0.075 });
      sweep(voice, { type: "square", points: [[0, 1980], [0.06, 2080]], gain: 0.012, attack: 0.004, release: 0.06, offset: 0.075 });
    },
  },
  clack: {
    reverb: 0.12,
    play: (voice) => {
      const shell: readonly (readonly [number, number, number])[] = [
        [1, 1, 0.05],
        [2.76, 0.4, 0.03],
        [5.4, 0.18, 0.018],
      ];
      modal(voice, 1650, shell, 0.12);
      noiseBurst(voice, { filter: "highpass", from: 2600, to: 2600, q: 0.8, gain: 0.07, attack: 0.001, release: 0.01 });
      modal(voice, 1520, shell, 0.1, 0.075);
      noiseBurst(voice, { filter: "highpass", from: 2400, to: 2400, q: 0.8, gain: 0.05, attack: 0.001, release: 0.01, offset: 0.075 });
    },
  },
};
