import { useRef } from "react";
import { gsap, useGSAP } from "@/shared/animation/gsap.setup";
import type { MetricCounterProps } from "@/features/case-study/case-study.interfaces";
import { formatMetric, metricTarget } from "@/features/case-study/metric-counter.util";

export function MetricCounter({ metric, locale }: MetricCounterProps) {
  const valueRef = useRef<HTMLSpanElement>(null);
  const target = metricTarget(metric.value);

  useGSAP(
    () => {
      const element = valueRef.current;
      if (element === null) {
        return;
      }
      const counter = { value: 0 };
      element.textContent = formatMetric(0, locale);
      gsap.to(counter, {
        value: target,
        duration: target > 100 ? 1.6 : 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: element, start: "top 85%", toggleActions: "play none none none" },
        onUpdate: () => {
          element.textContent = formatMetric(counter.value, locale);
        },
      });
    },
    { dependencies: [target, locale] },
  );

  return (
    <div className="min-w-0">
      <span
        ref={valueRef}
        className="block font-display text-[length:var(--step-heading)] leading-none text-ink tabular-nums"
        style={{ fontStretch: "112%", fontWeight: 780 }}
      >
        {metric.value}
      </span>
      <span className="mt-2 block max-w-[24ch] text-[length:var(--step-small)] text-mute">{metric.label}</span>
    </div>
  );
}
