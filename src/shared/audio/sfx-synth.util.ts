import type { NoiseShape, SfxVoice, SweepShape } from "@/shared/audio/sfx.types";

export function envelope(context: BaseAudioContext, at: number, peak: number, attack: number, release: number): GainNode {
  const gain = context.createGain();
  gain.gain.setValueAtTime(0.0001, at);
  gain.gain.exponentialRampToValueAtTime(Math.max(peak, 0.0002), at + attack);
  gain.gain.exponentialRampToValueAtTime(0.0001, at + attack + release);
  return gain;
}

export function partial(voice: SfxVoice, frequency: number, gain: number, decay: number, offset = 0): void {
  const { context, output } = voice;
  const at = voice.at + offset;
  const oscillator = context.createOscillator();
  oscillator.frequency.setValueAtTime(frequency, at);
  const amp = envelope(context, at, gain * voice.volume, 0.0015, decay);
  oscillator.connect(amp).connect(output);
  oscillator.start(at);
  oscillator.stop(at + decay + 0.05);
}

export function modal(voice: SfxVoice, base: number, modes: readonly (readonly [number, number, number])[], level: number, offset = 0): void {
  for (const [ratio, gain, decay] of modes) {
    partial(voice, base * ratio * voice.pitch, level * gain, decay, offset);
  }
}

export function noiseBurst(voice: SfxVoice, shape: NoiseShape): void {
  const { context, output } = voice;
  const at = voice.at + (shape.offset ?? 0);
  const length = shape.attack + shape.release;
  const source = context.createBufferSource();
  source.buffer = voice.noise;
  const filter = context.createBiquadFilter();
  filter.type = shape.filter;
  filter.Q.value = shape.q;
  filter.frequency.setValueAtTime(shape.from * voice.pitch, at);
  filter.frequency.exponentialRampToValueAtTime(Math.max(30, shape.to * voice.pitch), at + length);
  const amp = envelope(context, at, shape.gain * voice.volume, shape.attack, shape.release);
  source.connect(filter).connect(amp).connect(output);
  source.start(at, Math.random() * 1.5);
  source.stop(at + length + 0.05);
}

export function sweep(voice: SfxVoice, shape: SweepShape): OscillatorNode {
  const { context, output } = voice;
  const at = voice.at + (shape.offset ?? 0);
  const oscillator = context.createOscillator();
  oscillator.type = shape.type;
  const [first, ...rest] = shape.points;
  oscillator.frequency.setValueAtTime((first?.[1] ?? 440) * voice.pitch, at);
  for (const [time, frequency] of rest) {
    oscillator.frequency.exponentialRampToValueAtTime(frequency * voice.pitch, at + time);
  }
  const amp = envelope(context, at, shape.gain * voice.volume, shape.attack, shape.release);
  if (shape.band !== undefined) {
    const filter = context.createBiquadFilter();
    filter.type = "bandpass";
    filter.Q.value = shape.band;
    filter.frequency.setValueAtTime((first?.[1] ?? 440) * voice.pitch * 1.6, at);
    for (const [time, frequency] of rest) {
      filter.frequency.exponentialRampToValueAtTime(frequency * voice.pitch * 1.6, at + time);
    }
    oscillator.connect(filter).connect(amp).connect(output);
  } else {
    oscillator.connect(amp).connect(output);
  }
  oscillator.start(at);
  oscillator.stop(at + shape.attack + shape.release + 0.05);
  return oscillator;
}

export function vibrato(voice: SfxVoice, target: OscillatorNode, rate: number, depth: number, duration: number): void {
  const { context, at } = voice;
  const lfo = context.createOscillator();
  lfo.frequency.value = rate;
  const amount = context.createGain();
  amount.gain.setValueAtTime(depth, at);
  amount.gain.exponentialRampToValueAtTime(0.01, at + duration);
  lfo.connect(amount).connect(target.frequency);
  lfo.start(at);
  lfo.stop(at + duration + 0.05);
}
