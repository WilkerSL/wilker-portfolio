import type { CastContent } from "@/core/entities/cast-content.entity";
import { CastMemberId } from "@/core/enums/cast-member-id.enum";
import { Proficiency } from "@/core/enums/proficiency.enum";

export const CAST_PT_BR: CastContent = {
  title: "O que uso",
  lead: "Linguagens e ferramentas do meu dia a dia, com a frequência real de uso.",
  proficiencyLabels: {
    [Proficiency.Daily]: "uso diário",
    [Proficiency.Work]: "uso no trabalho",
    [Proficiency.Frequent]: "uso frequente",
    [Proficiency.Learning]: "estudando",
  },
  members: [
    {
      id: CastMemberId.Go,
      name: "Go",
      techs: ["Go"],
      proficiency: Proficiency.Daily,
      summary: "Foco principal no trabalho: 13 serviços com gRPC atrás de um gateway, filas, cache e migrações SQL. Fora dele, o go-codebuild-tool.",
    },
    {
      id: CastMemberId.Java,
      name: "Java",
      techs: ["Java", "Spring Boot"],
      proficiency: Proficiency.Work,
      summary: "Onde comecei no trabalho, com serviços e APIs em Spring Boot antes da migração para Go.",
    },
    {
      id: CastMemberId.CSharp,
      name: "C#",
      techs: ["C#", ".NET"],
      proficiency: Proficiency.Work,
      summary: "Serviços .NET que leem e gravam dados industriais, em arquitetura hexagonal, e aplicações desktop.",
    },
    {
      id: CastMemberId.ReactTs,
      name: "React e TypeScript",
      techs: ["React", "TypeScript"],
      proficiency: Proficiency.Work,
      summary: "A interface web e mobile da plataforma do trabalho, as telas dos apps desktop e PWAs.",
    },
    {
      id: CastMemberId.Rust,
      name: "Rust",
      techs: ["Rust"],
      proficiency: Proficiency.Work,
      summary: "Apps desktop em Tauri, com a parte pesada no lado Rust: monitoramento em segundo plano, cofre de credenciais e implantação.",
    },
    {
      id: CastMemberId.Python,
      name: "Python",
      techs: ["Python"],
      proficiency: Proficiency.Work,
      summary: "Um serviço em FastAPI que transcreve áudio e separa quem está falando, além de scripts e automações.",
    },
  ],
};
