// Plan "P + house" mark, redrawn as SVG from the brand PNG so it inherits text colour.
export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="280 140 730 840" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M292 150H685C840 158 997 290 997 460C997 525 975 585 942 632L606 288L292 613Z"
      />
      <path
        fill="currentColor"
        d="M292 710L609 377L898 678C855 725 790 752 722 762H490L292 968Z"
      />
      <g fill="var(--color-brand)">
        <rect x="548" y="493" width="46" height="46" />
        <rect x="612" y="493" width="46" height="46" />
        <rect x="548" y="553" width="46" height="46" />
        <rect x="612" y="553" width="46" height="46" />
      </g>
    </svg>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-3 text-ink ${className}`}>
      <LogoMark className="h-9 w-auto" />
      <span className="flex flex-col leading-none">
        <span className="text-[0.95rem] font-medium tracking-[0.55em]">PLAN</span>
        <span className="mt-1.5 text-[0.5rem] font-medium tracking-[0.42em] opacity-70">
          INTERIOR SOLUTION
        </span>
      </span>
    </span>
  );
}
