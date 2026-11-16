import type { CaseStudyCode, CaseStudyMetric, CaseStudySection } from "@/core/entities/case-study.entity";
import type { Locale } from "@/core/enums/locale.enum";

export interface CaseStudySectionProps {
  readonly section: CaseStudySection;
  readonly locale: Locale;
}

export interface CodeSampleProps {
  readonly code: CaseStudyCode;
}

export interface MetricCounterProps {
  readonly metric: CaseStudyMetric;
  readonly locale: Locale;
}
