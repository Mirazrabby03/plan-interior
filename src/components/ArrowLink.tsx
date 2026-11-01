import Link from "next/link";
import type { ComponentProps } from "react";

// Text link with a trailing arrow that slides on hover.
export function ArrowLink({ children, className = "", ...props }: ComponentProps<typeof Link>) {
  return (
    <Link {...props} className={`group eyebrow inline-flex items-center gap-4 ${className}`}>
      <span className="link-line">{children}</span>
      <svg
        width="28"
        height="10"
        viewBox="0 0 28 10"
        fill="none"
        stroke="currentColor"
        className="transition-transform duration-500 ease-[var(--ease-luxe)] group-hover:translate-x-1.5"
        aria-hidden="true"
      >
        <path d="M0 5h27M22 1l5 4-5 4" />
      </svg>
    </Link>
  );
}
