import { AUDIO_ENGINE } from "@/shared/audio/sfx.constants";
import type { AudioEngine } from "@/shared/audio/sfx.types";

let engine: AudioEngine | null = null;

function impulseResponse(context: AudioContext): AudioBuffer {
  const length = Math.floor(context.sampleRate * AUDIO_ENGINE.reverbSeconds);
  const buffer = context.createBuffer(2, length, context.sampleRate);
  for (let channel = 0; channel < 2; channel += 1) {
    const data = buffer.getChannelData(channel);
    let smooth = 0;
    for (let index = 0; index < length; index += 1) {
      const t = index / length;
      smooth = smooth * 0.6 + (Math.random() * 2 - 1) * 0.4;
      data[index] = smooth * (1 - t) ** AUDIO_ENGINE.reverbDecay * (index < 64 ? index / 64 : 1);
    }
  }
  return buffer;
}

function noiseBuffer(context: AudioContext): AudioBuffer {
  const buffer = context.createBuffer(1, context.sampleRate * 2, context.sampleRate);
  const data = buffer.getChannelData(0);
  for (let index = 0; index < data.length; index += 1) {
    data[index] = Math.random() * 2 - 1;
  }
  return buffer;
}

function createEngine(): AudioEngine | null {
  if (typeof window === "undefined" || typeof window.AudioContext !== "function") {
    return null;
  }
  const context = new AudioContext({ latencyHint: "interactive" });
  const compressor = context.createDynamicsCompressor();
  compressor.threshold.value = AUDIO_ENGINE.compressorThreshold;
  compressor.ratio.value = AUDIO_ENGINE.compressorRatio;
  compressor.attack.value = 0.004;
  compressor.release.value = 0.2;
  compressor.connect(context.destination);
  const master = context.createGain();
  master.gain.value = AUDIO_ENGINE.masterGain;
  master.connect(compressor);
  const convolver = context.createConvolver();
  convolver.buffer = impulseResponse(context);
  const tone = context.createBiquadFilter();
  tone.type = "lowpass";
  tone.frequency.value = AUDIO_ENGINE.reverbTone;
  const wet = context.createGain();
  wet.gain.value = AUDIO_ENGINE.reverbGain;
  convolver.connect(tone).connect(wet).connect(master);
  return { context, master, reverb: convolver, noise: noiseBuffer(context) };
}

export function audioEngine(): AudioEngine | null {
  engine ??= createEngine();
  if (engine !== null && engine.context.state === "suspended") {
    void engine.context.resume();
  }
  return engine;
}

export function existingAudioEngine(): AudioEngine | null {
  return engine;
}
