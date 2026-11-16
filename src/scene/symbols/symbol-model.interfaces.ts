import type { SymbolId } from "@/scene/symbols/symbol-id.enum";

export interface SymbolModelProps {
  readonly symbol: SymbolId;
  readonly active: { readonly current: boolean };
}
