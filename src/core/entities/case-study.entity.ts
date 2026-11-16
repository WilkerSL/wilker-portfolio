import type { ProjectId } from "@/core/enums/project-id.enum";
import type { ProjectLink } from "@/core/entities/project.entity";

export interface CaseStudyCode {
  readonly caption: string;
  readonly source: string;
}

export interface CaseStudyMetric {
  readonly value: string;
  readonly label: string;
}

export interface CaseStudySection {
  readonly id: string;
  readonly heading: string;
  readonly paragraphs: readonly string[];
  readonly points: readonly string[];
  readonly code: CaseStudyCode | null;
  readonly metrics: readonly CaseStudyMetric[];
}

export interface CaseStudy {
  readonly slug: string;
  readonly projectId: ProjectId;
  readonly title: string;
  readonly summary: string;
  readonly stack: readonly string[];
  readonly sections: readonly CaseStudySection[];
  readonly links: readonly ProjectLink[];
  readonly nextSlug: string | null;
  readonly nextLabel: string;
}
