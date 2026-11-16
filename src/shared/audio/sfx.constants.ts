export const SFX_STORAGE_KEY = "wl.sound";
export const SFX_MIN_INTERVAL_SECONDS = 0.03;

export const AUDIO_ENGINE = {
  masterGain: 0.7,
  compressorThreshold: -14,
  compressorRatio: 4,
  reverbSeconds: 2.4,
  reverbDecay: 2.6,
  reverbTone: 5200,
  reverbGain: 0.9,
} as const;

export const SFX_VARIATION = { pitch: 0.06, volume: 0.12 } as const;

const NOTE = (semitones: number) => 146.83 * 2 ** (semitones / 12);

export const AMBIENT = {
  level: 0.16,
  fadeIn: 2.2,
  fadeOut: 0.6,
  cutoff: 620,
  cutoffLfo: 180,
  lfoRate: 0.04,
  activityCutoff: 1100,
  reverbSend: 0.55,
  chordSeconds: 15,
  glide: 3.2,
  detuneCents: 7,
  voiceGain: 0.11,
  roomGain: 0.05,
  roomCutoff: 260,
  sparkleGain: 0.035,
  sparkleEvery: { min: 3.2, max: 7.5 },
  chords: [
    [NOTE(0), NOTE(3), NOTE(7), NOTE(14)],
    [NOTE(-4), NOTE(0), NOTE(3), NOTE(7)],
    [NOTE(3), NOTE(7), NOTE(10), NOTE(14)],
    [NOTE(-2), NOTE(5), NOTE(7), NOTE(12)],
  ],
  sparkles: [NOTE(24), NOTE(27), NOTE(29), NOTE(31), NOTE(34), NOTE(36)],
} as const;
