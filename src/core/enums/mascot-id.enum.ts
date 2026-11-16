export const MascotId = {
  Gopher: "gopher",
  Duke: "duke",
  DotnetBot: "dotnet-bot",
  Ferris: "ferris",
  Wilker: "wilker",
} as const;

export type MascotId = (typeof MascotId)[keyof typeof MascotId];
