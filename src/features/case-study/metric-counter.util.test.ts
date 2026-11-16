import { describe, expect, it } from "vitest";
import { Locale } from "@/core/enums/locale.enum";
import { formatMetric, metricTarget } from "@/features/case-study/metric-counter.util";

describe("metric counter", () => {
  it("reads the number out of a formatted value in either locale", () => {
    expect(metricTarget("11.462")).toBe(11462);
    expect(metricTarget("11,462")).toBe(11462);
    expect(metricTarget("4")).toBe(4);
    expect(metricTarget("")).toBe(0);
  });

  it("formats with the separators of each locale", () => {
    expect(formatMetric(11462, Locale.PtBr)).toBe("11.462");
    expect(formatMetric(11462, Locale.En)).toBe("11,462");
    expect(formatMetric(4.6, Locale.En)).toBe("5");
  });
});
