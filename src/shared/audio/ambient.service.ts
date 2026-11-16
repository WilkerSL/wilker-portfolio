import { audioEngine, existingAudioEngine } from "@/shared/audio/audio-engine.service";
import { AMBIENT } from "@/shared/audio/sfx.constants";
import { modal } from "@/shared/audio/sfx-synth.util";
import type { AmbientRig } from "@/shared/audio/ambient.types";
import type { AudioEngine } from "@/shared/audio/sfx.types";

let rig: AmbientRig | null = null;

function brownNoise(context: AudioContext): AudioBuffer {
  const buffer = context.createBuffer(1, context.sampleRate * 4, context.sampleRate);
  const data = buffer.getChannelData(0);
  let last = 0;
  for (let index = 0; index < data.length; index += 1) {
    last = (last + 0.02 * (Math.random() * 2 - 1)) / 1.02;
    data[index] = last * 3.2;
  }
  return buffer;
}

function createPads(engine: AudioEngine, filter: BiquadFilterNode, sources: AudioScheduledSourceNode[]): OscillatorNode[][] {
  const { context } = engine;
  const chord = AMBIENT.chords[0] ?? [];
  return chord.map((frequency) =>
    [-AMBIENT.detuneCents, AMBIENT.detuneCents].map((detune, index) => {
      const oscillator = context.createOscillator();
      oscillator.type = index === 0 ? "triangle" : "sine";
      oscillator.frequency.value = frequency;
      oscillator.detune.value = detune;
      const gain = context.createGain();
      gain.gain.value = AMBIENT.voiceGain / chord.length;
      oscillator.connect(gain).connect(filter);
      oscillator.start();
      sources.push(oscillator);
      return oscillator;
    }),
  );
}

function nextChord(engine: AudioEngine, current: AmbientRig): void {
  current.chord = (current.chord + 1) % AMBIENT.chords.length;
  const chord = AMBIENT.chords[current.chord] ?? [];
  const now = engine.context.currentTime;
  current.pads.forEach((voices, index) => {
    const frequency = chord[index];
    if (frequency === undefined) {
      return;
    }
    for (const oscillator of voices) {
      oscillator.frequency.setTargetAtTime(frequency, now, AMBIENT.glide / 3);
    }
  });
}

function sparkle(engine: AudioEngine, current: AmbientRig): void {
  const { context } = engine;
  const note = AMBIENT.sparkles[Math.floor(Math.random() * AMBIENT.sparkles.length)] ?? 587;
  const panner = context.createStereoPanner();
  panner.pan.value = Math.random() * 1.4 - 0.7;
  panner.connect(current.output);
  modal(
    { context, output: panner, noise: engine.noise, at: context.currentTime + 0.02, pitch: 1, volume: 1 },
    note,
    [
      [1, 1, 2.4],
      [2.01, 0.3, 1.2],
      [3.02, 0.12, 0.7],
    ],
    AMBIENT.sparkleGain * (0.6 + current.activity * 0.8),
  );
}

function scheduleSparkle(engine: AudioEngine, current: AmbientRig): void {
  const delay = AMBIENT.sparkleEvery.min + Math.random() * (AMBIENT.sparkleEvery.max - AMBIENT.sparkleEvery.min);
  current.timers.push(
    window.setTimeout(() => {
      if (rig !== current) {
        return;
      }
      sparkle(engine, current);
      scheduleSparkle(engine, current);
    }, delay * 1000),
  );
}

function trackActivity(engine: AudioEngine, current: AmbientRig): void {
  const now = performance.now();
  const scroll = window.scrollY;
  const seconds = Math.max(0.001, (now - current.lastTime) / 1000);
  const velocity = Math.abs(scroll - current.lastScroll) / seconds;
  current.lastScroll = scroll;
  current.lastTime = now;
  const target = Math.min(1, velocity / 2600);
  current.activity += (target - current.activity) * (target > current.activity ? 0.2 : 0.04);
  current.filter.frequency.setTargetAtTime(AMBIENT.cutoff + current.activity * AMBIENT.activityCutoff, engine.context.currentTime, 0.25);
  current.frame = window.requestAnimationFrame(() => trackActivity(engine, current));
}

export function startAmbient(): void {
  const engine = audioEngine();
  if (engine === null || rig !== null) {
    return;
  }
  const { context } = engine;
  const output = context.createGain();
  output.gain.value = 0.0001;
  output.connect(engine.master);
  const send = context.createGain();
  send.gain.value = AMBIENT.reverbSend;
  output.connect(send).connect(engine.reverb);
  const filter = context.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = AMBIENT.cutoff;
  filter.Q.value = 0.6;
  filter.connect(output);
  const sources: AudioScheduledSourceNode[] = [];
  const lfo = context.createOscillator();
  lfo.frequency.value = AMBIENT.lfoRate;
  const depth = context.createGain();
  depth.gain.value = AMBIENT.cutoffLfo;
  lfo.connect(depth).connect(filter.frequency);
  lfo.start();
  sources.push(lfo);
  const room = context.createBufferSource();
  room.buffer = brownNoise(context);
  room.loop = true;
  const roomFilter = context.createBiquadFilter();
  roomFilter.type = "lowpass";
  roomFilter.frequency.value = AMBIENT.roomCutoff;
  const roomGain = context.createGain();
  roomGain.gain.value = AMBIENT.roomGain;
  room.connect(roomFilter).connect(roomGain).connect(output);
  room.start();
  sources.push(room);
  const current: AmbientRig = {
    output,
    filter,
    sources,
    pads: [],
    timers: [],
    chord: 0,
    activity: 0,
    lastScroll: window.scrollY,
    lastTime: performance.now(),
    frame: 0,
  };
  current.pads.push(...createPads(engine, filter, sources));
  rig = current;
  output.gain.setTargetAtTime(AMBIENT.level, context.currentTime, AMBIENT.fadeIn / 3);
  current.timers.push(window.setInterval(() => nextChord(engine, current), AMBIENT.chordSeconds * 1000));
  scheduleSparkle(engine, current);
  trackActivity(engine, current);
}

export function stopAmbient(): void {
  const engine = existingAudioEngine();
  const current = rig;
  if (engine === null || current === null) {
    return;
  }
  rig = null;
  current.timers.forEach((timer) => {
    window.clearTimeout(timer);
    window.clearInterval(timer);
  });
  window.cancelAnimationFrame(current.frame);
  const { context } = engine;
  current.output.gain.setTargetAtTime(0.0001, context.currentTime, AMBIENT.fadeOut / 3);
  for (const source of current.sources) {
    source.stop(context.currentTime + AMBIENT.fadeOut * 2);
  }
}

export function pauseAudio(paused: boolean): void {
  const engine = existingAudioEngine();
  if (engine === null) {
    return;
  }
  void (paused ? engine.context.suspend() : engine.context.resume());
}
