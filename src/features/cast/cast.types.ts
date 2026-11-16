import type { MascotId } from "@/core/enums/mascot-id.enum";
import type { SymbolId } from "@/scene/symbols/symbol-id.enum";

export type CastMascot = Exclude<MascotId, "wilker">;

export type CastVisual = { readonly kind: "mascot"; readonly mascot: CastMascot } | { readonly kind: "symbol"; readonly symbol: SymbolId };
