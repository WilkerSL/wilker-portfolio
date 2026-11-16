import type { ArrowIconProps } from "@/shared/ui/icons/arrow-icon.interfaces";

export function ArrowIcon({ className = "" }: ArrowIconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className={`h-4 w-4 transition-transform duration-300 ease-[var(--ease-mass)] group-hover:translate-x-0.5 ${className}`}>
      <path d="M3 8h9.5M8.5 3.5 13 8l-4.5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
