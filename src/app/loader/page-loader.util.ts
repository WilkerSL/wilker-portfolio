import { PAGE_LOADER } from "@/app/loader/page-loader.constants";

function loaderElement(): HTMLElement | null {
  return document.getElementById(PAGE_LOADER.id);
}

export function setLoaderProgress(value: number): void {
  loaderElement()?.style.setProperty("--progress", String(Math.min(1, Math.max(PAGE_LOADER.floor, value))));
}

export function finishLoader(): void {
  const element = loaderElement();
  if (element === null || element.dataset.done !== undefined) {
    return;
  }
  element.style.setProperty("--progress", "1");
  element.dataset.done = "true";
  window.setTimeout(() => element.remove(), PAGE_LOADER.removeMs);
}
