export const SymbolId = {
  React: "react",
  Spring: "spring",
  Python: "python",
} as const;

export type SymbolId = (typeof SymbolId)[keyof typeof SymbolId];
