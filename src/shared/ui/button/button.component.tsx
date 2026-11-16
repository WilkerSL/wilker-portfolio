import { Link } from "react-router";
import { BUTTON_BASE, BUTTON_SIZE, BUTTON_VARIANT } from "@/shared/ui/button/button.constants";
import type { ButtonProps } from "@/shared/ui/button/button.interfaces";

export function Button({ children, variant = "accent", size = "md", href, to, external = false, className = "", onClick }: ButtonProps) {
  const classes = `${BUTTON_BASE} ${BUTTON_SIZE[size]} ${BUTTON_VARIANT[variant]} ${className}`;
  if (to !== undefined) {
    return (
      <Link to={to} className={classes} onClick={onClick}>
        {children}
      </Link>
    );
  }
  if (href !== undefined) {
    return (
      <a href={href} className={classes} onClick={onClick} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" className={classes} onClick={onClick}>
      {children}
    </button>
  );
}
