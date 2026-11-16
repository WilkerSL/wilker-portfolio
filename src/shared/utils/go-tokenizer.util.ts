import type { GoToken } from "@/shared/utils/go-tokenizer.types";

const KEYWORDS: ReadonlySet<string> = new Set([
  "func",
  "go",
  "return",
  "var",
  "const",
  "type",
  "struct",
  "package",
  "import",
  "chan",
  "defer",
  "select",
  "if",
  "for",
  "range",
]);

export function tokenizeGo(source: string): GoToken[] {
  const pattern = /("[^"\n]*"|`[^`]*`)|([A-Za-z_][A-Za-z0-9_]*)|(\s+)|([^\sA-Za-z_"`]+)/g;
  const tokens: GoToken[] = [];
  for (const match of source.matchAll(pattern)) {
    const [text, literal, word, space] = match;
    if (literal !== undefined) {
      tokens.push({ text, kind: "string" });
    } else if (word !== undefined) {
      tokens.push({ text, kind: KEYWORDS.has(word) ? "keyword" : "identifier" });
    } else if (space !== undefined) {
      tokens.push({ text, kind: "space" });
    } else {
      tokens.push({ text, kind: "operator" });
    }
  }
  return tokens;
}
