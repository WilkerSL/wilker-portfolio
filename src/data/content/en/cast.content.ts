import type { CastContent } from "@/core/entities/cast-content.entity";
import { CastMemberId } from "@/core/enums/cast-member-id.enum";
import { Proficiency } from "@/core/enums/proficiency.enum";

export const CAST_EN: CastContent = {
  title: "What I use",
  lead: "Languages and tools from my day to day, with how often I really use them.",
  proficiencyLabels: {
    [Proficiency.Daily]: "every day",
    [Proficiency.Work]: "at work",
    [Proficiency.Frequent]: "often",
    [Proficiency.Learning]: "learning",
  },
  members: [
    {
      id: CastMemberId.Go,
      name: "Go",
      techs: ["Go"],
      proficiency: Proficiency.Daily,
      summary: "Main focus at work: 13 services with gRPC behind a gateway, queues, cache and SQL migrations. Outside it, go-codebuild-tool.",
    },
    {
      id: CastMemberId.Java,
      name: "Java",
      techs: ["Java", "Spring Boot"],
      proficiency: Proficiency.Work,
      summary: "Where I started at work, with Spring Boot services and APIs before the move to Go.",
    },
    {
      id: CastMemberId.CSharp,
      name: "C#",
      techs: ["C#", ".NET"],
      proficiency: Proficiency.Work,
      summary: ".NET services that read and write industrial data, in a hexagonal architecture, plus desktop applications.",
    },
    {
      id: CastMemberId.ReactTs,
      name: "React and TypeScript",
      techs: ["React", "TypeScript"],
      proficiency: Proficiency.Work,
      summary: "The web and mobile interface of the platform at work, the desktop app screens and PWAs.",
    },
    {
      id: CastMemberId.Rust,
      name: "Rust",
      techs: ["Rust"],
      proficiency: Proficiency.Work,
      summary: "Tauri desktop apps with the heavy lifting on the Rust side: background monitoring, a credential vault and deployment.",
    },
    {
      id: CastMemberId.Python,
      name: "Python",
      techs: ["Python"],
      proficiency: Proficiency.Work,
      summary: "A FastAPI service that transcribes audio and tells speakers apart, plus scripts and automation.",
    },
  ],
};
