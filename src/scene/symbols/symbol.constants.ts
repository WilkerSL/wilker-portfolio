import { MODEL_URL } from "@/scene/shared/model-assets.constants";
import { SymbolId } from "@/scene/symbols/symbol-id.enum";
import type { SymbolSpec } from "@/scene/symbols/symbol.types";

export const SYMBOLS: Readonly<Record<SymbolId, SymbolSpec>> = {
  [SymbolId.React]: { url: MODEL_URL.react, fit: 1.35, glow: 0.18, lift: 0.95 },
  [SymbolId.Spring]: { url: MODEL_URL.spring, fit: 1.2, glow: 0, lift: 0.85 },
  [SymbolId.Python]: { url: MODEL_URL.python, fit: 1.25, glow: 0, lift: 0.9 },
};

export const SYMBOL_MOTION = {
  idleSpin: 0.45,
  activeSpin: 3.4,
  spinDamping: 3,
  bob: 0.05,
  bobRate: 1.4,
  tilt: 0.12,
} as const;
