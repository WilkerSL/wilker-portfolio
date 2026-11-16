import type { Locale } from "@/core/enums/locale.enum";
import type { Project } from "@/core/entities/project.entity";

export interface ProjectCardProps {
  readonly project: Project;
  readonly locale: Locale;
  readonly caseStudyLabel: string;
  readonly reversed: boolean;
}
