export type GoTokenKind = "string" | "keyword" | "identifier" | "operator" | "space";

export interface GoToken {
  readonly text: string;
  readonly kind: GoTokenKind;
}
