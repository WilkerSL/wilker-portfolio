import { CodeBlock } from "@/shared/ui/code-block/code-block.component";
import type { CaseStudySectionProps } from "@/features/case-study/case-study.interfaces";
import { MetricCounter } from "@/features/case-study/metric-counter.component";

export function CaseStudySectionBlock({ section, locale }: CaseStudySectionProps) {
  return (
    <section className="mt-[clamp(4rem,8vw,6.5rem)]">
      <h2 data-reveal className="text-[length:clamp(1.6rem,2.6vw,2.3rem)] leading-tight font-[720] tracking-[-0.02em]" style={{ fontStretch: "108%" }}>
        {section.heading}
      </h2>
      {section.paragraphs.map((paragraph) => (
        <p key={paragraph} data-reveal className="mt-5 text-[length:var(--step-lead)] leading-relaxed">
          {paragraph}
        </p>
      ))}
      {section.points.length > 0 && (
        <div className="mt-7 grid gap-3 sm:grid-cols-2">
          {section.points.map((point) => (
            <p key={point} data-reveal className="m-0 rounded-2xl border border-line bg-white/70 px-4 py-3 text-[length:var(--step-small)] font-medium text-ink">
              {point}
            </p>
          ))}
        </div>
      )}
      {section.code !== null && (
        <div data-reveal className="mt-8">
          <CodeBlock code={section.code.source} caption={section.code.caption} />
        </div>
      )}
      {section.metrics.length > 0 && (
        <div className="mt-9 grid grid-cols-2 gap-4 md:grid-cols-4">
          {section.metrics.map((metric) => (
            <div key={metric.label} data-reveal className="glass rounded-2xl p-5">
              <MetricCounter metric={metric} locale={locale} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
