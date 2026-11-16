import type { SectionHeadingProps } from "@/shared/ui/section-heading/section-heading.interfaces";

export function SectionHeading({ title, lead, inverted = false }: SectionHeadingProps) {
  return (
    <div className="max-w-[44rem]">
      <h2
        data-reveal
        className={`font-display text-[length:var(--step-title)] leading-[1.02] font-[720] tracking-[-0.025em] ${inverted ? "!text-white" : ""}`}
        style={{ fontStretch: "110%" }}
      >
        {title}
      </h2>
      {lead !== undefined && (
        <p data-reveal className={`mt-5 text-[length:var(--step-lead)] leading-relaxed ${inverted ? "text-white/85" : "text-mute"}`}>
          {lead}
        </p>
      )}
    </div>
  );
}
