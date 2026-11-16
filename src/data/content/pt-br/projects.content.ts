import type { ProjectsContent } from "@/core/entities/project.entity";
import { MascotId } from "@/core/enums/mascot-id.enum";
import { ProjectId } from "@/core/enums/project-id.enum";
import { CASE_STUDY_SLUGS, PROJECT_URLS } from "@/data/content/shared/profile.constants";

export const PROJECTS_PT_BR: ProjectsContent = {
  title: "Três projetos",
  caseStudyLabel: "estudo de caso",
  items: [
    {
      id: ProjectId.Codebuild,
      index: "01",
      name: "go-codebuild-tool",
      summary:
        "Gera APIs REST e microsserviços gRPC em Go a partir de specs pequenas. O código gerado usa só a biblioteca padrão e o driver do banco.",
      stack: ["Go", "gRPC", "PostgreSQL", "SQL Server", "MySQL", "SQLite"],
      facts: [
        "SQL escrito para quatro bancos",
        "Testes ponta a ponta contra todos eles",
        "11.462 req/s num GET, p50 de 2,5 ms",
        "Código aberto, licença MIT",
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
        "Vocabulário que chega por notificação, com significado e pronúncia. O backend em Go foi gerado com o go-codebuild-tool.",
      stack: ["Go", "PostgreSQL", "React", "PWA", "Web Push"],
      facts: [
        "Push no Android e no iPhone pelo próprio PWA",
        "Pronúncia com voz neural",
        "Uma página estática por termo",
        "Rate limit em quatro camadas",
      ],
      links: [{ label: "expertdict.com", href: PROJECT_URLS.expertiDictSite, external: true }],
      mascot: MascotId.Gopher,
      caseStudySlug: CASE_STUDY_SLUGS.expertiDict,
    },
    {
      id: ProjectId.OperationsPlatform,
      index: "03",
      name: "Plataforma de operação industrial",
      summary:
        "Sistema para equipes de operação e manutenção: estrutura de equipamentos, diagramas ao vivo, registros e rondas pelo celular, rodando na rede do cliente.",
      stack: ["C#", ".NET", "WinUI 3", "React", "Kotlin Multiplatform"],
      facts: [
        "Nove serviços atrás de um gateway",
        "Desktop, web e celular sobre o mesmo backend",
        "Mais de 3 mil casos de teste automatizados",
      ],
      links: [],
      mascot: MascotId.DotnetBot,
      caseStudySlug: null,
    },
  ],
};
