import { MascotId } from "@/core/enums/mascot-id.enum";
import { ProjectId } from "@/core/enums/project-id.enum";
import { SymbolId } from "@/scene/symbols/symbol-id.enum";
import { frameCamera } from "@/scene/views/frame-camera.util";
import type { ViewCamera } from "@/scene/views/mascot-view.interfaces";
import type { CastVisual } from "@/features/cast/cast.types";

export const CASE_VISUAL: Readonly<Record<ProjectId, CastVisual>> = {
  [ProjectId.Codebuild]: { kind: "mascot", mascot: MascotId.Gopher },
  [ProjectId.ExpertiDict]: { kind: "symbol", symbol: SymbolId.React },
  [ProjectId.OperationsPlatform]: { kind: "mascot", mascot: MascotId.DotnetBot },
};

export const CASE_CAMERA: ViewCamera = frameCamera(-0.7, 2.4);

export const CASE_YAW = -0.3;
