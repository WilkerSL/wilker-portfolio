import type { AboutContent } from "@/core/entities/about-content.entity";

export const ABOUT_PT_BR: AboutContent = {
  title: "Backend primeiro, sem perder a interface de vista",
  paragraphs: [
    "Sou engenheiro de software. Comecei no backend com Java e Spring Boot e hoje trabalho principalmente com Go, desenhando APIs que precisam continuar de pé quando alguém depende delas.",
    "No mesmo trabalho faço a interface web em React com TypeScript, apps desktop em Tauri com Rust, serviços .NET que integram dados industriais, um serviço de transcrição em Python e as ferramentas que fazem build, assinam e implantam tudo isso. Gosto de ferramentas que tiram trabalho repetido do caminho, e foi assim que nasceu o go-codebuild-tool.",
    "Estudo Engenharia de Software.",
  ],
  facts: [
    { label: "Foco", value: "Backend em Go" },
    { label: "No trabalho", value: "13 serviços em Go, web em React e 7 apps desktop em Tauri" },
    { label: "Também", value: "Java com Spring Boot, C# e Python" },
    { label: "Estudando", value: "Engenharia de Software" },
    { label: "Código aberto", value: "go-codebuild-tool, licença MIT" },
  ],
};
