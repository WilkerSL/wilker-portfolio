import { useMemo } from "react";
import { tokenizeGo } from "@/shared/utils/go-tokenizer.util";
import { CODE_TOKEN_CLASS } from "@/shared/ui/code-block/code-block.constants";
import type { CodeBlockProps } from "@/shared/ui/code-block/code-block.interfaces";

export function CodeBlock({ code, caption, className = "", compact = false }: CodeBlockProps) {
  const lines = useMemo(() => code.split("\n").map((line) => tokenizeGo(line)), [code]);

  return (
    <figure className={`glass m-0 overflow-hidden rounded-2xl ${className}`}>
      <figcaption className="flex items-center gap-2 border-b border-line/80 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-accent/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
        <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
        <span className="ml-2 truncate font-mono text-[length:var(--step-micro)] text-faint">{caption}</span>
      </figcaption>
      <pre className={`m-0 overflow-x-auto px-4 py-4 font-mono leading-[1.7] ${compact ? "text-[length:0.72rem]" : "text-[length:var(--step-small)]"}`}>
        <code>
          {lines.map((tokens, lineIndex) => (
            <span key={lineIndex} className="block min-h-[1.7em] whitespace-pre">
              {tokens.map((token, tokenIndex) => (
                <span key={tokenIndex} className={CODE_TOKEN_CLASS[token.kind]}>
                  {token.text}
                </span>
              ))}
            </span>
          ))}
        </code>
      </pre>
    </figure>
  );
}
