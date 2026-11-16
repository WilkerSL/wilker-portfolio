export const ProjectId = {
  Codebuild: "codebuild",
  ExpertiDict: "expertidict",
  OperationsPlatform: "operations-platform",
} as const;

export type ProjectId = (typeof ProjectId)[keyof typeof ProjectId];
