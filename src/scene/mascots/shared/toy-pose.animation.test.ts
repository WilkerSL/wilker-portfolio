import { describe, expect, it } from "vitest";
import { createToyClock, springTo } from "@/scene/mascots/shared/toy-pose.animation";

describe("springTo", () => {
  it("settles on the target without blowing up", () => {
    const spring = { value: 0, velocity: 0 };
    for (let step = 0; step < 240; step += 1) {
      springTo(spring, 1, { stiffness: 42, damping: 9 }, 1 / 60);
    }
    expect(spring.value).toBeCloseTo(1, 3);
    expect(Math.abs(spring.velocity)).toBeLessThan(1e-3);
  });

  it("overshoots a little, like a toy on a spring", () => {
    const spring = { value: 0, velocity: 0 };
    let peak = 0;
    for (let step = 0; step < 120; step += 1) {
      peak = Math.max(peak, springTo(spring, 1, { stiffness: 42, damping: 9 }, 1 / 60));
    }
    expect(peak).toBeGreaterThan(1);
    expect(peak).toBeLessThan(1.15);
  });
});

describe("createToyClock", () => {
  it("starts unprimed and at rest", () => {
    const clock = createToyClock();
    expect(clock.primed).toBe(false);
    expect(clock.yaw).toEqual({ value: 0, velocity: 0 });
  });
});
