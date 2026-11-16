import type { MouseEvent, ReactNode } from "react";

export interface TextLinkProps {
  readonly href: string;
  readonly children: ReactNode;
  readonly external?: boolean;
  readonly className?: string;
  readonly onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
}
