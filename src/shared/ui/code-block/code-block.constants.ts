import type { GoTokenKind } from "@/shared/utils/go-tokenizer.types";

export const CODE_TOKEN_CLASS: Readonly<Record<GoTokenKind, string>> = {
  keyword: "text-accent-strong font-medium",
  string: "text-[#b3366a]",
  identifier: "text-ink",
  operator: "text-mute",
  space: "",
};
