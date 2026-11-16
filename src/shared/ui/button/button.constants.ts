import type { ButtonSize, ButtonVariant } from "@/shared/ui/button/button.interfaces";

export const BUTTON_BASE =
  "group inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-[0.005em] whitespace-nowrap transition-[transform,box-shadow,background-color,color] duration-300 ease-[var(--ease-mass)] hover:-translate-y-0.5 active:translate-y-0";

export const BUTTON_SIZE: Readonly<Record<ButtonSize, string>> = {
  md: "px-6 py-3 text-[length:var(--step-small)]",
  sm: "px-4 py-2 text-[length:var(--step-micro)]",
};

export const BUTTON_VARIANT: Readonly<Record<ButtonVariant, string>> = {
  accent: "glass-accent hover:shadow-[inset_0_1px_0_rgb(255_255_255/0.6),0_22px_40px_-16px_rgb(0_173_216/0.8)]",
  glass: "glass text-ink hover:bg-white",
  ghost: "text-ink hover:text-accent-strong",
};
