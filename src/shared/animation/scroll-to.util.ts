import { ScrollSmoother } from "@/shared/animation/gsap.setup";

export function scrollToSection(id: string, smooth = true): void {
  const target = document.getElementById(id);
  if (target === null) {
    return;
  }
  const smoother = ScrollSmoother.get();
  if (smoother !== undefined) {
    smoother.scrollTo(target, smooth, "top top");
    return;
  }
  target.scrollIntoView({ behavior: smooth ? "smooth" : "auto", block: "start" });
}

export function setScrollPaused(paused: boolean): void {
  ScrollSmoother.get()?.paused(paused);
  document.documentElement.style.overflow = paused ? "hidden" : "";
}

export function scrollToTop(): void {
  const smoother = ScrollSmoother.get();
  if (smoother !== undefined) {
    smoother.scrollTo(0, false);
    return;
  }
  window.scrollTo({ top: 0 });
}
