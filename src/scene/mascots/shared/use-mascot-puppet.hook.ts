import { useCallback, useEffect, useRef, useState } from "react";
import { PUPPET_ENTER, PUPPET_FIDGET, PUPPET_HOP, PUPPET_SPIN, PUPPET_WAVE } from "@/scene/mascots/shared/mascot-puppet.constants";
import type { MascotPuppet } from "@/scene/mascots/shared/mascot-puppet.interfaces";
import type { MascotState } from "@/scene/mascots/shared/mascot-state.types";
import { createMascotState } from "@/scene/mascots/shared/mascot-state.util";
import { TAU } from "@/scene/mascots/shared/toy-motion.constants";
import { gsap } from "@/shared/animation/gsap.setup";

const OVERWRITE = { defaults: { overwrite: "auto" as const } };

function hopTimeline(state: MascotState, height: number, cheer: number): gsap.core.Timeline {
  const rise = PUPPET_HOP.riseTime;
  const stretch = rise * PUPPET_HOP.stretchShare;
  return gsap
    .timeline(OVERWRITE)
    .to(state, { squash: PUPPET_HOP.crouch, cheer: cheer * PUPPET_HOP.crouchCheer, duration: PUPPET_HOP.crouchTime, ease: "power2.out" })
    .addLabel("launch")
    .to(state, { hop: height, duration: rise, ease: "power3.out" }, "launch")
    .to(state, { squash: PUPPET_HOP.stretch, duration: stretch, ease: "power2.out" }, "launch")
    .to(state, { squash: 0, duration: rise - stretch, ease: "sine.inOut" }, `launch+=${stretch}`)
    .to(state, { cheer, duration: rise * 0.8, ease: "back.out(2)" }, "launch")
    .addLabel("fall", `launch+=${rise}`)
    .to(state, { hop: 0, duration: PUPPET_HOP.fallTime, ease: "power2.in" }, "fall")
    .to(state, { cheer: 0, duration: rise + PUPPET_HOP.fallTime, ease: "power2.inOut" }, "fall")
    .addLabel("land", `fall+=${PUPPET_HOP.fallTime}`)
    .to(state, { squash: PUPPET_HOP.land, duration: PUPPET_HOP.landTime, ease: "power1.out" }, "land")
    .to(state, { squash: 0, duration: PUPPET_HOP.settleTime, ease: "elastic.out(1, 0.35)" }, `land+=${PUPPET_HOP.landTime}`);
}

function spinTimeline(state: MascotState, direction: number): gsap.core.Timeline {
  const rise = PUPPET_SPIN.riseTime;
  const air = rise + PUPPET_SPIN.fallTime;
  return gsap
    .timeline(OVERWRITE)
    .to(state, { hop: PUPPET_SPIN.height, duration: rise, ease: "power2.out" }, 0)
    .to(state, { squash: PUPPET_HOP.stretch, duration: rise * PUPPET_HOP.stretchShare, ease: "power2.out" }, 0)
    .to(state, { squash: 0, duration: rise, ease: "sine.inOut" }, rise * PUPPET_HOP.stretchShare)
    .to(state, { cheer: 1, duration: rise * 0.8, ease: "back.out(2)" }, 0)
    .to(state, { spin: state.spin + TAU * direction, duration: air, ease: "power1.inOut" }, 0)
    .to(state, { hop: 0, duration: PUPPET_SPIN.fallTime, ease: "power2.in" }, rise)
    .to(state, { cheer: 0, duration: air, ease: "power2.inOut" }, rise)
    .to(state, { squash: PUPPET_HOP.land, duration: PUPPET_HOP.landTime, ease: "power1.out" }, air)
    .to(state, { squash: 0, duration: PUPPET_HOP.settleTime, ease: "elastic.out(1, 0.35)" }, air + PUPPET_HOP.landTime);
}

function nearSide(state: MascotState): number {
  return state.rotY + state.lookX * PUPPET_WAVE.lookShare <= 0 ? 1 : -1;
}

export function useMascotPuppet(initial: Partial<MascotState> = {}): MascotPuppet {
  const [state] = useState(() => createMascotState(initial));
  const spinning = useRef(false);

  useEffect(() => () => void gsap.killTweensOf(state), [state]);

  const hop = useCallback(() => {
    if (state.hop > PUPPET_HOP.airborne) {
      if (!spinning.current) {
        spinning.current = true;
        spinTimeline(state, nearSide(state)).eventCallback("onComplete", () => {
          spinning.current = false;
        });
      }
      return;
    }
    if (Math.abs(state.squash) > PUPPET_HOP.busySquash) {
      return;
    }
    hopTimeline(state, PUPPET_HOP.height, 1);
  }, [state]);

  const wave = useCallback(() => {
    if (state.wave > 0.05) {
      return;
    }
    state.side = nearSide(state);
    gsap
      .timeline(OVERWRITE)
      .set(state, { swing: 0 })
      .to(state, { wave: 1, duration: PUPPET_WAVE.raise, ease: "back.out(1.7)" })
      .to(state, { swing: PUPPET_WAVE.cycles, duration: PUPPET_WAVE.cycles / PUPPET_WAVE.rate, ease: "none" }, PUPPET_WAVE.raise * 0.5)
      .to(state, { wave: 0, duration: PUPPET_WAVE.lower, ease: "power2.inOut" }, `>-${PUPPET_WAVE.overlap}`);
  }, [state]);

  const enter = useCallback(() => {
    gsap
      .timeline()
      .fromTo(state, { scale: PUPPET_ENTER.hidden }, { scale: 1, duration: PUPPET_ENTER.popTime, ease: "back.out(1.8)" })
      .add(() => void hopTimeline(state, PUPPET_ENTER.hopHeight, PUPPET_ENTER.hopCheer), PUPPET_ENTER.hopAt);
  }, [state]);

  const fidget = useCallback(() => {
    if (gsap.isTweening(state) || state.wave > 0) {
      return;
    }
    const direction = Math.random() < 0.5 ? -1 : 1;
    const pick = Math.floor(Math.random() * 3);
    if (pick === 0) {
      gsap
        .timeline(OVERWRITE)
        .to(state, { glance: direction * PUPPET_FIDGET.glance, duration: PUPPET_FIDGET.glanceTime, ease: "power2.inOut" })
        .to(state, { glance: 0, duration: PUPPET_FIDGET.release, ease: "power2.inOut" }, `+=${PUPPET_FIDGET.glanceHold}`);
      return;
    }
    if (pick === 1) {
      gsap
        .timeline(OVERWRITE)
        .to(state, { tilt: direction * PUPPET_FIDGET.tilt, duration: PUPPET_FIDGET.tiltTime, ease: "back.out(2.2)" })
        .to(state, { tilt: 0, duration: PUPPET_FIDGET.release, ease: "power2.inOut" }, `+=${PUPPET_FIDGET.tiltHold}`);
      return;
    }
    hopTimeline(state, PUPPET_FIDGET.bounce, PUPPET_FIDGET.bounceCheer);
  }, [state]);

  return { state, wave, hop, enter, fidget };
}
