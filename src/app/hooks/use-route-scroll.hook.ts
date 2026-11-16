import { useEffect } from "react";
import { useLocation } from "react-router";
import { ScrollTrigger } from "@/shared/animation/gsap.setup";
import { scrollToSection, scrollToTop } from "@/shared/animation/scroll-to.util";

export function useRouteScroll(): void {
  const { pathname, hash } = useLocation();
  const route = `${pathname}${hash}`;

  useEffect(() => {
    const section = route.includes("#") ? route.slice(route.indexOf("#") + 1) : "";
    const frame = window.requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      if (section.length > 0) {
        scrollToSection(section, false);
        return;
      }
      scrollToTop();
    });
    return () => window.cancelAnimationFrame(frame);
  }, [route]);
}
