import type { AboutContent } from "@/core/entities/about-content.entity";

export const ABOUT_EN: AboutContent = {
  title: "Backend first, without losing sight of the interface",
  paragraphs: [
    "I'm a software engineer. I started on the backend with Java and Spring Boot and today I work mostly with Go, designing APIs that have to stay up when someone depends on them.",
    "In the same job I build the React web interface with TypeScript, Tauri desktop apps with Rust, .NET services that integrate industrial data, a Python transcription service and the tools that build, sign and deploy all of it. I like tools that take repeated work out of the way, which is how go-codebuild-tool started.",
    "I'm studying Software Engineering.",
  ],
  facts: [
    { label: "Focus", value: "Backend in Go" },
    { label: "At work", value: "13 Go services, a React web app and 7 Tauri desktop apps" },
    { label: "Also", value: "Java with Spring Boot, C# and Python" },
    { label: "Studying", value: "Software Engineering" },
    { label: "Open source", value: "go-codebuild-tool, MIT license" },
  ],
};
