import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { EASE_CURVES } from "@/shared/animation/eases.constants";

gsap.registerPlugin(useGSAP, CustomEase, ScrollSmoother, ScrollTrigger);

for (const [name, curve] of Object.entries(EASE_CURVES)) {
  CustomEase.create(name, curve);
}

gsap.defaults({ ease: "mass", duration: 0.9 });
ScrollTrigger.config({ ignoreMobileResize: true });

export { gsap, ScrollSmoother, ScrollTrigger, useGSAP };
