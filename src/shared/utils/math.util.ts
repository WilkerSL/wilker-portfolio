export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function lerp(from: number, to: number, amount: number): number {
  return from + (to - from) * amount;
}

export function inverseLerp(from: number, to: number, value: number): number {
  return from === to ? 0 : clamp((value - from) / (to - from), 0, 1);
}

export function mapRange(value: number, inMin: number, inMax: number, outMin: number, outMax: number): number {
  return lerp(outMin, outMax, inverseLerp(inMin, inMax, value));
}

export function damp(current: number, target: number, lambda: number, delta: number): number {
  return lerp(current, target, 1 - Math.exp(-lambda * delta));
}

export function smoothstep(edge0: number, edge1: number, value: number): number {
  const t = inverseLerp(edge0, edge1, value);
  return t * t * (3 - 2 * t);
}

export function pingPong(value: number): number {
  const wrapped = value - Math.floor(value / 2) * 2;
  return wrapped > 1 ? 2 - wrapped : wrapped;
}
