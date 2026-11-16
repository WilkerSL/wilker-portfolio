import type { CodeTone, CodeToken } from "@/scene/props/code-fountain/code-fountain.types";

export const CODE_TOKENS: readonly CodeToken[] = [
  { text: "func", tone: "keyword" },
  { text: "go", tone: "keyword" },
  { text: "chan", tone: "keyword" },
  { text: ":=", tone: "operator" },
  { text: "<-", tone: "operator" },
  { text: "{ }", tone: "operator" },
  { text: "err != nil", tone: "plain" },
  { text: "defer", tone: "keyword" },
  { text: "return", tone: "keyword" },
  { text: "struct", tone: "keyword" },
  { text: "\"ok\"", tone: "string" },
  { text: "fmt.Println()", tone: "plain" },
  { text: "select", tone: "keyword" },
  { text: "[]byte", tone: "plain" },
  { text: "range", tone: "keyword" },
  { text: "http.Get()", tone: "plain" },
  { text: "nil", tone: "keyword" },
  { text: "200 OK", tone: "string" },
];

export const CODE_CHARACTERS = [...new Set(CODE_TOKENS.map((token) => token.text).join(""))].join("");

export const CODE_TONE_COLOR: Readonly<Record<CodeTone, string>> = {
  keyword: "#007da0",
  operator: "#5f6b78",
  plain: "#111114",
  string: "#b3366a",
};

export const FOUNTAIN = {
  fontSize: 0.085,
  gravity: 0.5,
  lifeMin: 1.4,
  lifeMax: 1.9,
  speedMin: 0.55,
  speedMax: 0.95,
  edge: 0.85,
  driftMin: 0.25,
  driftMax: 0.45,
  towardMin: 0.05,
  towardMax: 0.2,
  tilt: 0.3,
  spin: 0.5,
  pop: 0.18,
  fade: 0.55,
  burstBoost: 1.3,
  gapMin: 1,
  gapMax: 1.6,
  maxStep: 1 / 30,
} as const;
