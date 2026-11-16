import type { MascotId } from "@/core/enums/mascot-id.enum";
import type { ProjectId } from "@/core/enums/project-id.enum";

export interface ProjectLink {
  readonly label: string;
  readonly href: string;
  readonly external: boolean;
}

export interface Project {
  readonly id: ProjectId;
  readonly index: string;
  readonly name: string;
  readonly summary: string;
  readonly stack: readonly string[];
  readonly facts: readonly string[];
  readonly links: readonly ProjectLink[];
  readonly mascot: MascotId;
  readonly caseStudySlug: string | null;
}

export interface ProjectsContent {
  readonly title: string;
  readonly items: readonly Project[];
  readonly caseStudyLabel: string;
}
