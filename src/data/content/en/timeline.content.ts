import type { TimelineContent } from "@/core/entities/timeline-content.entity";
import { TimelineBranch } from "@/core/enums/timeline-branch.enum";

export const TIMELINE_EN: TimelineContent = {
  title: "Path",
  command: "git log --graph --oneline",
  branchLabels: {
    [TimelineBranch.Work]: "work",
    [TimelineBranch.Study]: "study",
    [TimelineBranch.Projects]: "projects",
  },
  commits: [
    {
      hash: "e3f9a21",
      year: "2026",
      branch: TimelineBranch.Projects,
      message: "ExpertiDict goes live",
      detail: "Backend generated with go-codebuild-tool.",
    },
    {
      hash: "b81c0d4",
      year: "2026",
      branch: TimelineBranch.Projects,
      message: "go-codebuild-tool opens on GitHub",
      detail: "Open source, MIT license.",
    },
    {
      hash: "5d2e7aa",
      year: "2025",
      branch: TimelineBranch.Study,
      message: "Software Engineering degree starts",
      detail: "Uniasselvi, expected to finish in 2028.",
    },
    {
      hash: "9a40c13",
      year: "2023",
      branch: TimelineBranch.Work,
      message: "Software engineer",
      detail: "Started with Java and Spring Boot and moved the backend to Go: 13 services with gRPC behind a gateway today. I also build the React web interface, 7 Tauri desktop apps with Rust, .NET integration services and a Python transcription service.",
    },
  ],
};
