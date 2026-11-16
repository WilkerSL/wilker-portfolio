import type { ChipProps } from "@/shared/ui/chip/chip.interfaces";

export function Chip({ children, tone = "neutral" }: ChipProps) {
  const toneClass = tone === "accent" ? "border-accent/20 bg-accent-soft text-accent-strong" : "border-line bg-white/70 text-mute";
  return <span className={`inline-flex items-center rounded-full border px-3 py-1 font-mono text-[length:var(--step-micro)] leading-none ${toneClass}`}>{children}</span>;
}
