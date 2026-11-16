export const CastMemberId = {
  Go: "go",
  Java: "java",
  CSharp: "csharp",
  ReactTs: "react-ts",
  Rust: "rust",
  Python: "python",
} as const;

export type CastMemberId = (typeof CastMemberId)[keyof typeof CastMemberId];
