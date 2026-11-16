export const Locale = {
  PtBr: "pt-BR",
  En: "en",
} as const;

export type Locale = (typeof Locale)[keyof typeof Locale];
