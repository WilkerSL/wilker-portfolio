import { audioEngine } from "@/shared/audio/audio-engine.service";
import { startAmbient } from "@/shared/audio/ambient.service";
import { SFX_MIN_INTERVAL_SECONDS, SFX_VARIATION } from "@/shared/audio/sfx.constants";
import { SFX_RECIPES } from "@/shared/audio/sfx-recipes.util";
import type { SfxName, SfxOptions } from "@/shared/audio/sfx.types";
import { useSoundStore } from "@/shared/audio/sound.store";

const lastPlayed = new Map<SfxName, number>();

function vary(amount: number): number {
  return 1 + (Math.random() * 2 - 1) * amount;
}

export function playSfx(name: SfxName, options: SfxOptions = {}): void {
  if (!useSoundStore.getState().enabled) {
    return;
  }
  const engine = audioEngine();
  if (engine === null) {
    return;
  }
  const { context } = engine;
  const now = context.currentTime;
  if (now - (lastPlayed.get(name) ?? -1) < SFX_MIN_INTERVAL_SECONDS) {
    return;
  }
  lastPlayed.set(name, now);
  const recipe = SFX_RECIPES[name];
  const panner = context.createStereoPanner();
  panner.pan.value = options.pan ?? 0;
  panner.connect(engine.master);
  const send = context.createGain();
  send.gain.value = recipe.reverb;
  panner.connect(send).connect(engine.reverb);
  recipe.play({
    context,
    output: panner,
    noise: engine.noise,
    at: now + 0.005,
    pitch: (options.pitch ?? 1) * vary(SFX_VARIATION.pitch),
    volume: (options.volume ?? 1) * vary(SFX_VARIATION.volume),
  });
}

export function unlockAudio(): void {
  if (useSoundStore.getState().enabled && audioEngine() !== null) {
    startAmbient();
  }
}
