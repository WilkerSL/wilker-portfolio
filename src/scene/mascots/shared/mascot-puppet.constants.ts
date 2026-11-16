export const PUPPET_HOP = {
  height: 0.34,
  airborne: 0.04,
  busySquash: 0.02,
  crouch: -0.14,
  crouchTime: 0.11,
  crouchCheer: 0.2,
  riseTime: 0.3,
  stretch: 0.12,
  stretchShare: 0.3,
  fallTime: 0.26,
  land: -0.16,
  landTime: 0.06,
  settleTime: 0.6,
} as const;

export const PUPPET_SPIN = {
  height: 0.42,
  riseTime: 0.3,
  fallTime: 0.34,
} as const;

export const PUPPET_WAVE = {
  raise: 0.38,
  cycles: 3,
  rate: 2.4,
  lower: 0.5,
  overlap: 0.12,
  lookShare: 0.4,
} as const;

export const PUPPET_ENTER = {
  hidden: 0.0001,
  popTime: 0.7,
  hopAt: 0.08,
  hopHeight: 0.22,
  hopCheer: 0.5,
  stagger: 0.11,
  start: "top 85%",
} as const;

export const PUPPET_FIDGET = {
  gapMin: 4,
  gapMax: 8,
  glance: 0.5,
  glanceTime: 0.5,
  glanceHold: 0.9,
  tilt: 0.16,
  tiltTime: 0.32,
  tiltHold: 0.8,
  release: 0.6,
  bounce: 0.12,
  bounceCheer: 0.25,
  start: "top 90%",
  end: "bottom 10%",
} as const;
