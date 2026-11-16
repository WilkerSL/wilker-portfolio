import { CastMemberId } from "@/core/enums/cast-member-id.enum";
import { MascotId } from "@/core/enums/mascot-id.enum";
import { Proficiency } from "@/core/enums/proficiency.enum";
import type { SfxName } from "@/shared/audio/sfx.types";
import type { ChipTone } from "@/shared/ui/chip/chip.types";
import { SymbolId } from "@/scene/symbols/symbol-id.enum";
import { frameCamera } from "@/scene/views/frame-camera.util";
import type { ViewCamera } from "@/scene/views/mascot-view.interfaces";
import type { CastVisual } from "@/features/cast/cast.types";

export const CAST_VISUAL: Readonly<Record<CastMemberId, CastVisual>> = {
  [CastMemberId.Go]: { kind: "mascot", mascot: MascotId.Gopher },
  [CastMemberId.Java]: { kind: "mascot", mascot: MascotId.Duke },
  [CastMemberId.CSharp]: { kind: "mascot", mascot: MascotId.DotnetBot },
  [CastMemberId.ReactTs]: { kind: "symbol", symbol: SymbolId.React },
  [CastMemberId.Rust]: { kind: "mascot", mascot: MascotId.Ferris },
  [CastMemberId.Python]: { kind: "symbol", symbol: SymbolId.Python },
};

export const CAST_CAMERA: Readonly<Record<CastMemberId, ViewCamera>> = {
  [CastMemberId.Go]: frameCamera(-0.15, 2.2),
  [CastMemberId.Java]: frameCamera(-0.15, 2.02),
  [CastMemberId.CSharp]: frameCamera(-0.15, 2.3),
  [CastMemberId.ReactTs]: frameCamera(-0.1, 2.05),
  [CastMemberId.Rust]: { ...frameCamera(-0.15, 1.8), width: 2.3 },
  [CastMemberId.Python]: frameCamera(-0.1, 2.05),
};

export const CAST_POKE_SOUND: Readonly<Record<CastMemberId, SfxName>> = {
  [CastMemberId.Go]: "squeak",
  [CastMemberId.Java]: "boing",
  [CastMemberId.CSharp]: "blip",
  [CastMemberId.ReactTs]: "pop",
  [CastMemberId.Rust]: "clack",
  [CastMemberId.Python]: "pop",
};

export const PROFICIENCY_TONE: Readonly<Record<Proficiency, ChipTone>> = {
  [Proficiency.Daily]: "accent",
  [Proficiency.Work]: "accent",
  [Proficiency.Frequent]: "neutral",
  [Proficiency.Learning]: "neutral",
};

export const CAST_YAW = -0.3;
