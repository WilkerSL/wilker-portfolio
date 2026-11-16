import { describe, expect, it } from "vitest";
import { tokenizeGo } from "@/shared/utils/go-tokenizer.util";

describe("tokenizeGo", () => {
  it("keeps every character of the source", () => {
    const source = 'role := "engenheiro de software"\nName string `gen:"required"`';
    expect(tokenizeGo(source).map((token) => token.text).join("")).toBe(source);
  });

  it("tells strings, keywords, identifiers and operators apart", () => {
    const tokens = tokenizeGo('go func() { last := "Lima" }');
    const kindOf = (text: string) => tokens.find((token) => token.text === text)?.kind;
    expect(kindOf('"Lima"')).toBe("string");
    expect(kindOf("go")).toBe("keyword");
    expect(kindOf("func")).toBe("keyword");
    expect(kindOf("last")).toBe("identifier");
    expect(kindOf(":=")).toBe("operator");
  });

  it("treats raw string literals as strings", () => {
    expect(tokenizeGo('`gen:"pk,auto"`')[0]?.kind).toBe("string");
  });
});
