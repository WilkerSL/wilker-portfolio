import type { RefObject } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/shared/animation/gsap.setup";
import { REVEAL } from "@/shared/animation/eases.constants";
import { prefersReducedMotion } from "@/shared/utils/device.util";

export function useReveal(scope: RefObject<HTMLElement | null>): void {
  useGSAP(
    () => {
      const root = scope.current;
      if (root === null || prefersReducedMotion()) {
        return;
      }
      const elements = gsap.utils.toArray<HTMLElement>("[data-reveal]", root);
      gsap.set(elements, { opacity: 0, y: REVEAL.distance });
      ScrollTrigger.batch(elements, {
        start: REVEAL.start,
        once: true,
        onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, duration: REVEAL.duration, ease: "mass", stagger: REVEAL.stagger, overwrite: true }),
      });
    },
    { scope },
  );
}
