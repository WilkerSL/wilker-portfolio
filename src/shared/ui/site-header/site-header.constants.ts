export const SECTION_IDS = {
  hero: "top",
  about: "about",
  cast: "cast",
  projects: "projects",
  path: "path",
  contact: "contact",
} as const;

export const HEADER_SCROLLED_AT = 16;

export const HEADER_DESKTOP_QUERY = "(min-width: 1024px)";

export const NAV_LINK = "rounded-full px-3 py-1.5 text-[length:var(--step-small)] font-medium text-mute transition-colors hover:bg-white hover:text-ink";

export const MENU_LINK =
  "flex items-center rounded-2xl px-4 py-3.5 text-[length:1.125rem] font-semibold tracking-[-0.01em] text-ink transition-colors active:bg-accent-soft hover:bg-white/80";
