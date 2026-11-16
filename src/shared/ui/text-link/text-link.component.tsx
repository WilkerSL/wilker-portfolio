import { Link } from "react-router";
import { playSfx } from "@/shared/audio/sfx.service";
import type { TextLinkProps } from "@/shared/ui/text-link/text-link.interfaces";

const hover = () => playSfx("tick", { volume: 0.45 });

const BASE =
  "group relative inline-flex items-baseline gap-2 whitespace-nowrap transition-colors duration-200 hover:text-accent-strong";
const LINE =
  "pointer-events-none absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-500 ease-[var(--ease-mass)] group-hover:scale-x-100 group-focus-visible:scale-x-100";

export function TextLink({ href, children, external = false, className = "", onClick }: TextLinkProps) {
  const classes = `${BASE} ${className}`;
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} onClick={onClick} onPointerEnter={hover}>
        {children}
        <span className={LINE} />
      </a>
    );
  }
  return (
    <Link to={href} className={classes} onClick={onClick} onPointerEnter={hover}>
      {children}
      <span className={LINE} />
    </Link>
  );
}
