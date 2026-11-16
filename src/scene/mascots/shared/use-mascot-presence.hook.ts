import type { RefObject } from "react";
import { PUPPET_ENTER, PUPPET_FIDGET } from "@/scene/mascots/shared/mascot-puppet.constants";
import type { MascotPuppet } from "@/scene/mascots/shared/mascot-puppet.interfaces";
import { gsap, ScrollTrigger, useGSAP } from "@/shared/animation/gsap.setup";
import { prefersReducedMotion } from "@/shared/utils/device.util";

export function useMascotPresence(trigger: RefObject<HTMLElement | null>, puppets: readonly MascotPuppet[], entrance = true): void {
  useGSAP(() => {
    const element = trigger.current;
    if (element === null || prefersReducedMotion()) {
      return;
    }
    let timer: gsap.core.Tween | null = null;
    const schedule = () => {
      timer = gsap.delayedCall(gsap.utils.random(PUPPET_FIDGET.gapMin, PUPPET_FIDGET.gapMax), () => {
        puppets[Math.floor(Math.random() * puppets.length)]?.fidget();
        schedule();
      });
    };

    if (entrance) {
      for (const puppet of puppets) {
        puppet.state.scale = PUPPET_ENTER.hidden;
      }
      ScrollTrigger.create({
        trigger: element,
        start: PUPPET_ENTER.start,
        once: true,
        onEnter: () => puppets.forEach((puppet, index) => gsap.delayedCall(index * PUPPET_ENTER.stagger, puppet.enter)),
      });
    }
    ScrollTrigger.create({
      trigger: element,
      start: PUPPET_FIDGET.start,
      end: PUPPET_FIDGET.end,
      onToggle: (self) => {
        timer?.kill();
        if (self.isActive) {
          schedule();
        }
      },
    });

    return () => timer?.kill();
  });
}
