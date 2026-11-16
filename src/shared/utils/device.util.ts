function matches(query: string): boolean {
  return typeof window !== "undefined" && typeof window.matchMedia === "function" && window.matchMedia(query).matches;
}

export function prefersReducedMotion(): boolean {
  return matches("(prefers-reduced-motion: reduce)");
}

export function hasFinePointer(): boolean {
  return matches("(hover: hover) and (pointer: fine)");
}

export function isCompactViewport(): boolean {
  return matches("(max-width: 767px)");
}

export function isPortrait(): boolean {
  return matches("(orientation: portrait)");
}

export function graphicsRenderer(): string {
  if (typeof document === "undefined") {
    return "";
  }
  const gl = document.createElement("canvas").getContext("webgl2");
  const info = gl?.getExtension("WEBGL_debug_renderer_info");
  const renderer = gl !== null && gl !== undefined && info !== null && info !== undefined ? String(gl.getParameter(info.UNMASKED_RENDERER_WEBGL)) : "";
  gl?.getExtension("WEBGL_lose_context")?.loseContext();
  return renderer;
}
