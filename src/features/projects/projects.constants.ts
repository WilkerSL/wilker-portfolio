import { MascotId } from "@/core/enums/mascot-id.enum";
import { ProjectId } from "@/core/enums/project-id.enum";
import { SymbolId } from "@/scene/symbols/symbol-id.enum";
import { frameCamera } from "@/scene/views/frame-camera.util";
import type { ViewCamera } from "@/scene/views/mascot-view.interfaces";
import type { CastVisual } from "@/features/cast/cast.types";

export const PROJECT_VISUAL: Readonly<Record<ProjectId, CastVisual>> = {
  [ProjectId.Codebuild]: { kind: "mascot", mascot: MascotId.Gopher },
  [ProjectId.ExpertiDict]: { kind: "symbol", symbol: SymbolId.React },
  [ProjectId.OperationsPlatform]: { kind: "mascot", mascot: MascotId.DotnetBot },
};

export const PROJECT_CAMERA: Readonly<Record<ProjectId, ViewCamera>> = {
  [ProjectId.Codebuild]: frameCamera(-0.6, 2.3),
  [ProjectId.ExpertiDict]: frameCamera(-0.5, 2.3),
  [ProjectId.OperationsPlatform]: frameCamera(-0.6, 2.4),
};

export const PROJECT_YAW = -0.25;
