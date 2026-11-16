import type { ProjectsContent } from "@/core/entities/project.entity";
import { MascotId } from "@/core/enums/mascot-id.enum";
import { ProjectId } from "@/core/enums/project-id.enum";
import { CASE_STUDY_SLUGS, PROJECT_URLS } from "@/data/content/shared/profile.constants";

export const PROJECTS_EN: ProjectsContent = {
  title: "Three projects",
  caseStudyLabel: "case study",
  items: [
    {
      id: ProjectId.Codebuild,
      index: "01",
      name: "go-codebuild-tool",
      summary:
        "Generates REST APIs and gRPC microservices in Go from small spec files. The generated code uses only the standard library and the database driver.",
      stack: ["Go", "gRPC", "PostgreSQL", "SQL Server", "MySQL", "SQLite"],
      facts: [
        "SQL written for four databases",
        "End-to-end tests against all of them",
        "11,462 req/s on a GET, p50 of 2.5 ms",
        "Open source, MIT license",
      ],
      links: [{ label: "GitHub", href: PROJECT_URLS.codebuildRepo, external: true }],
      mascot: MascotId.Gopher,
      caseStudySlug: CASE_STUDY_SLUGS.codebuild,
    },
    {
      id: ProjectId.ExpertiDict,
      index: "02",
      name: "ExpertiDict",
      summary:
        "Vocabulary delivered by notification, with meaning and pronunciation. The Go backend was generated with go-codebuild-tool.",
      stack: ["Go", "PostgreSQL", "React", "PWA", "Web Push"],
      facts: [
        "Push on Android and iPhone from the PWA itself",
        "Pronunciation with a neural voice",
        "One static page per term",
        "Rate limits in four layers",
      ],
      links: [{ label: "expertdict.com", href: PROJECT_URLS.expertiDictSite, external: true }],
      mascot: MascotId.Gopher,
      caseStudySlug: CASE_STUDY_SLUGS.expertiDict,
    },
    {
      id: ProjectId.OperationsPlatform,
      index: "03",
      name: "Industrial operations platform",
      summary:
        "A system for operations and maintenance teams: equipment structure, live diagrams, logs and inspection rounds on the phone, running inside the customer network.",
      stack: ["C#", ".NET", "WinUI 3", "React", "Kotlin Multiplatform"],
      facts: [
        "Nine services behind a gateway",
        "Desktop, web and mobile on the same backend",
        "Over 3,000 automated test cases",
      ],
      links: [],
      mascot: MascotId.DotnetBot,
      caseStudySlug: null,
    },
  ],
};
