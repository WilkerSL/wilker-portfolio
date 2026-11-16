import { MathUtils } from "three";
import { FOUNTAIN } from "@/scene/props/code-fountain/code-fountain.constants";
import type { FountainParticle } from "@/scene/props/code-fountain/code-fountain.types";

const BACK = 1.70158;

export function createParticle(): FountainParticle {
  return { active: false, age: 0, life: 1, x: 0, y: 0, z: 0, vx: 0, vy: 0, vz: 0, angle: 0, spin: 0 };
}

export function launchParticle(particle: FountainParticle, spread: number, boost: number): void {
  const side = Math.random() < 0.5 ? -1 : 1;
  particle.active = true;
  particle.age = 0;
  particle.life = MathUtils.randFloat(FOUNTAIN.lifeMin, FOUNTAIN.lifeMax);
  particle.x = side * MathUtils.randFloat(spread * FOUNTAIN.edge, spread);
  particle.y = 0;
  particle.z = 0;
  particle.vx = side * MathUtils.randFloat(FOUNTAIN.driftMin, FOUNTAIN.driftMax) * boost;
  particle.vy = MathUtils.randFloat(FOUNTAIN.speedMin, FOUNTAIN.speedMax) * boost;
  particle.vz = MathUtils.randFloat(FOUNTAIN.towardMin, FOUNTAIN.towardMax) * boost;
  particle.angle = MathUtils.randFloatSpread(FOUNTAIN.tilt * 2);
  particle.spin = MathUtils.randFloatSpread(FOUNTAIN.spin * 2);
}

export function stepParticle(particle: FountainParticle, delta: number): void {
  particle.age += delta;
  particle.vy -= FOUNTAIN.gravity * delta;
  particle.x += particle.vx * delta;
  particle.y += particle.vy * delta;
  particle.z += particle.vz * delta;
  particle.angle += particle.spin * delta;
  if (particle.age >= particle.life) {
    particle.active = false;
  }
}

export function particleOpacity(particle: FountainParticle): number {
  return MathUtils.clamp((particle.life - particle.age) / FOUNTAIN.fade, 0, 1);
}

export function particleScale(particle: FountainParticle): number {
  const t = Math.min(1, particle.age / FOUNTAIN.pop) - 1;
  return Math.max(0, 1 + (BACK + 1) * t ** 3 + BACK * t ** 2);
}
