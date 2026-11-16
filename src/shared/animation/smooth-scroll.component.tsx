import { useRef } from "react";
import { ScrollSmoother, useGSAP } from "@/shared/animation/gsap.setup";
import type { SmoothScrollProps } from "@/shared/animation/smooth-scroll.interfaces";
import { prefersReducedMotion } from "@/shared/utils/device.util";
import { SMOOTH_SCROLL_SECONDS, SMOOTH_TOUCH_SECONDS } from "@/shared/animation/eases.constants";

export function SmoothScroll({ children }: SmoothScrollProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (wrapperRef.current === null || contentRef.current === null) {
      return;
    }
    const reduced = prefersReducedMotion();
    const smoother = ScrollSmoother.create({
      wrapper: wrapperRef.current,
      content: contentRef.current,
      smooth: reduced ? 0 : SMOOTH_SCROLL_SECONDS,
      smoothTouch: reduced ? false : SMOOTH_TOUCH_SECONDS,
      effects: false,
    });
    return () => smoother.kill();
  });

  return (
    <div id="smooth-wrapper" ref={wrapperRef} className="relative z-10">
      <div id="smooth-content" ref={contentRef}>
        {children}
      </div>
    </div>
  );
}
