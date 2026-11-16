import type { TimelineContent } from "@/core/entities/timeline-content.entity";
import { TimelineBranch } from "@/core/enums/timeline-branch.enum";

export const TIMELINE_PT_BR: TimelineContent = {
  title: "Trajetória",
  command: "git log --graph --oneline",
  branchLabels: {
    [TimelineBranch.Work]: "trabalho",
    [TimelineBranch.Study]: "estudo",
    [TimelineBranch.Projects]: "projetos",
  },
  commits: [
    {
      hash: "e3f9a21",
      year: "2026",
      branch: TimelineBranch.Projects,
      message: "ExpertiDict no ar",
      detail: "Backend gerado com o go-codebuild-tool.",
    },
    {
      hash: "b81c0d4",
      year: "2026",
      branch: TimelineBranch.Projects,
      message: "go-codebuild-tool aberto no GitHub",
      detail: "Código aberto, licença MIT.",
    },
    {
      hash: "5d2e7aa",
      year: "2025",
      branch: TimelineBranch.Study,
      message: "Começo de Engenharia de Software",
      detail: "Uniasselvi, conclusão prevista para 2028.",
    },
    {
      hash: "9a40c13",
      year: "2023",
      branch: TimelineBranch.Work,
      message: "Engenheiro de software",
      detail: "Comecei com Java e Spring Boot e migrei o backend para Go: hoje são 13 serviços com gRPC atrás de um gateway. Também faço a interface web em React, 7 apps desktop em Tauri com Rust, serviços .NET de integração e um serviço de transcrição em Python.",
    },
  ],
};
